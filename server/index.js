const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoute = require('./routes/userRoute')

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoute)

const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB is connected successfully");
}).catch((e)=>{
    console.error(`Error connecting to MongoDB Atlas cluster - ${e.message}`);
});

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is connected to PORT: ${process.env.PORT}`);
});
