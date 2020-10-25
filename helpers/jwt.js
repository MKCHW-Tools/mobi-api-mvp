require('dotenv').config()
const jwt = require('jsonwebtoken')

const signAccessToken = async payload => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_KEY_SECRET, {expiresIn: '30s'})
    return accessToken
}

const signRefreshToken = async payload => {
    const refreshToken = jwt.sign(payload, process.env.REFRESH_KEY_SECRET, {expiresIn: '7d'})
    return refreshToken
}

module.exports = {
    signAccessToken,
    signRefreshToken
}