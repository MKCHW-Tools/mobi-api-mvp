const express = require('express')
const {validateToken} = require('../helpers/validate.token')
const User = require('../models/user')
const {signAccessToken, signRefreshToken} = require('../helpers/jwt')

const router = express.Router()

// Get the refresh token from the headers
// Validate the refresh Token
// Generate new access Token
// Generate new refresh Token
// Update user tokens
// Return tokens

router.get('/token/refresh', validateToken,async (req, res) => {
    const {owner} = req

    if(!owner) {
        return res.status(403).json({
            'result':'Failure',
            'msg':'You need to sign in'
        })
    }
    const {username} = owner

    newAccessToken = await signAccessToken({username})
    newRefreshToken = await signRefreshToken({username})
    
    // //Update user tokens

    return res.status(201).json({
        'result' : 'Success',
        'accessToken' : newAccessToken,
        'refreshToken' : newRefreshToken
    })
    
})

module.exports = router