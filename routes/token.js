const express = require('express')
const validateToken = require('../helpers/validate.token')
const User = require('../models/user')

const router = express.Router()

// Get the refresh token from the headers
// Validate the refresh Token
// Generate new access Token
// Generate new refresh Token
// Update user tokens
// Return tokens

router.get('/token/refresh', async (req, res) => {
    console.log('Refreshing')
    if( !req.header('Authorization') ) return res.status(403).json({
        result: 'Failure',
        msg: 'Missing token'
    })

    const refreshToken = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')
    console.log(refreshToken)

    if( !refreshToken) return res.status(403).json({
        result: 'Failure',
        msg: 'You need to sign in'
    })

    const user = await validateToken(refreshToken)
    console.log(user)
    // if(!user.tokenOwner) {
    //     return res.status(403).json({
    //         'result':'Failure',
    //         'msg':'You need to sign in'
    //     })
    // }
    // console.log(user)
    // const {username} = user.tokenOwner

    // newAccessToken = await signAccessToken({username})
    // newRefreshToken = await signRefreshToken({username})
    
    // //Update user tokens

    // return res.status(201).json({
    //     'result' : 'Success',
    //     'accessToken' : newAccessToken,
    //     'refreshToken' : newRefreshToken
    // })
    
})

router.get('/token', async (req, res) => { console.log('Token') })

module.exports = router