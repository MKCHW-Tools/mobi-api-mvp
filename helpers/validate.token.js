require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const validateToken = async (req, res, next) => {

    if(!req.header('Authorization')) return res.status(403).json({
        result: 'Failure',
        msg: 'Missing token'
    })

    const refreshToken = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')

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
        // console.log(tokenOwner)
        if (!tokenOwner) return res.status(403).send('You need to sign in')

        req.owner = tokenOwner

    })

    return next()
}

module.exports = {
    validateToken
}