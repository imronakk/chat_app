const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')
const messageRoute = require('./routes/messageRoute')
const socket = require('socket.io');
const path = require('path')
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoute)
app.use("/api/message", messageRoute)

// -------------------------- DEVELOPMENT --------------------------
// # MONGO_URL = "mongodb://127.0.0.1:27017/chat_application"

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "../client/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"))
    });
}

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB is connected successfully");
}).catch((e) => {
    console.error(`Error connecting to MongoDB Atlas cluster - ${e.message}`);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is connected to PORT: ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    })

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.io);
        if (sendUserSocket) {
            io.io(sendUserSocket).emit("msg-recieve", data.message);
        }
    });
});