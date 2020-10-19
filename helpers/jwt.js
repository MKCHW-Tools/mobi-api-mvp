require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const signRefreshToken = userid => {
    const savedUser = await User.findOne({_id: userid})
    console.log(savedUser)

    const refreshToken = jwt.sign({}, {
        userId: savedUser._id
    }, process.env.REFRESH_KEY, {expiresIn: '1m'})
    
    return {refreshToken}
}

module.exports = {
    signRefreshToken
}