require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateToken = async refreshToken => {
    let user = {}
    
    if(!refreshToken) return res.status(403).json({
        result: 'Failure',
        msg: 'You need to sign in'
    })
    
    jwt.verify(refreshToken, process.env.REFRESH_KEY_SECRET, async (err, verifiedToken) => {
        if(err instanceof jwt.TokenExpiredError)
            return res.status(403).json({
                'result': 'Failure',
                'msg': 'Expired refresh token'
            })

        if(!verifiedToken) return res.status(403).send('You need to sign in')

        const tokenOwner = await User.findOne({username: verifiedToken.username})
        console.log(tokenOwner)
        if (!tokenOwner) return res.status(403).send('You need to sign in')

        user = tokenOwner

    })

    return user
}

module.exports = {
    validateToken
}