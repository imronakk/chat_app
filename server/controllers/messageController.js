const Message = require('../models/messageModel')

module.exports.addMsg = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            sender: from,
            users: [from, to],
        })
        if (data) return res.json({ msg: "Message Added successfully" })
        return res.json({ msg: "Message Failed to add" })
    } catch (error) {
        next(error);
    }
}
module.exports.getAllMsg = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        const projectMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectMessages)
    } catch (error) {
        next(error);
    }
}