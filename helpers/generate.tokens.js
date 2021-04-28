require('dotenv').config()
const jwt = require('jsonwebtoken')

const signAccessToken = async payload => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_KEY_SECRET, {expiresIn: '7d'})
    return accessToken
}

const signRefreshToken = async payload => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY_SECRET, {expiresIn: '30d'})
    return refreshToken
}

module.exports = {
    signAccessToken,
    signRefreshToken
}