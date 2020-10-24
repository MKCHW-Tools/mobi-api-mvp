const express = require('express')
const validateToken = require('../helpers/validateToken')
const User = require('../models/user')

const router = express.Router()

// Get the refresh token from the headers
// Validate the refresh Token
// Generate new access Token
// Generate new refresh Token
// Update user tokens
// Return tokens

router.post('/token/refresh', async (req, res) => {

    if( !req.header('Authorization') ) return res.status(403).json({
        result: 'Failure',
        msg: 'Missing token'
    })

    const refreshToken = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')

    if( !refreshToken) return res.status(403).json({
        result: 'Failure',
        msg: 'You need to sign in'
    })

    const user = await validateToken(refreshToken)

    if(!user.tokenOwner) {
        return res.status(403).json({
            'result':'Failure',
            'msg':'You need to sign in'
        })
    }
    const {username} = user.tokenOwner

    newAccessToken = await signAccessToken({username})
    newRefreshToken = await signRefreshToken({username})
    
    //Update user tokens

    return res.status(201).json({
        'result' : 'Success',
        'accessToken' : newAccessToken,
        'refreshToken' : newRefreshToken
    })
})

module.exports = router