const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
        unique: true
    },
    email: {
        unique:true,
        maxlength:50,
        type: String
    },
    password: {
        type :String ,
        required:true,
        minlength:5
    },
    isImageAvatar: {
        type:Boolean,
        default:false
    },
    avatarImage: {
        type: String,
        default: ""
    },
})

module.exports = mongoose.model("Users", userSchema)