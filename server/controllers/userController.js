const bcrypt = require('bcrypt');
const Users = require('../models/userModles')

module.exports.register = async (req,res,next) => {
    try {
        const { name, email, password } = req.body;
        const userNameChecker = await Users.findOne({ username: name })
        if (userNameChecker)
            return res.json({ msg: "Username is already used. ", status: false })
        const emailNameChecker = await Users.findOne({ email })
        if (emailNameChecker)
            return res.json({ msg: "Email is already used. ", status: false })
        //hashing password  
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hasedPwd = await bcrypt.hash(password, salt);
        const user = await Users.create({
            email,
            password:hasedPwd,
            username:name
        })
        delete user.password; 
        return res.json({status:true , user})
    } catch (error) {
        return res.send(error)
    }   
}