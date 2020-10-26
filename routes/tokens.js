const express = require('express')
const {validateToken} = require('../helpers/validate.token')
const {signAccessToken, signRefreshToken} = require('../helpers/jwt')
const {auth} = require('../helpers/auth')
const { canInvalidateTokens } = require('../capabilities/tokens')
const User = require('../models/user')

const router = express.Router()

// Get the refresh token from the headers
// Validate the refresh Token
// Generate new access Token
// Generate new refresh Token
// Update user tokens
// Return tokens

router.get('/tokens/refresh', validateToken, async (req, res) => {
    const {owner} = req

    if(!owner) {
        return res.status(403).json({
            'result':'Failure',
            'msg':'You need to sign in'
        })
    }

    const {_id, username} = owner

    newAccessToken = await signAccessToken({username})
    newRefreshToken = await signRefreshToken({username})
    
    const updated = await User.update(_id, {accessToken: newAccessToken, refreshToken: newRefreshToken})

    if(updated._id) 
        return res.status(201).json({
            'result' : 'Success',
            'accessToken' : newAccessToken,
            'refreshToken' : newRefreshToken,

        })
    
    return res.status(404).json({
        'result' : 'Failure',
        'msg' : 'Refreshing tokens failed'

    })
    
})

const authInvalidateTokens = async (req, res, next) => {

    if(!req.user)
        return res.status(403).json({
            'result': 'Failure',
            'msg':'Login to perform the action'
        })
    
    if(!canInvalidateTokens(req.user, req.params.id)) 
        return res.status(403).json({
            'result': 'Failure',
            'msg': 'Not Authorized to perform action'
        })

    next()
}

router.post('/tokens/in-validate', auth, authInvalidateTokens, async (req, res) => {
    
    const {tokens} = req.body

    if(tokens !== undefined && tokens.length <= 0) 
        return res.status(404).json({
            'result':'Failure',
            'msg':'Tokens not supplied'
        })

    tokens.forEach(async token => {
        const owner = (token.type == 1) ? await User.findOne({accessToken: token.accessToken}) : await User.findOne({refreshToken: token.refreshToken})
        console.log(owner)
        if(owner) {
            (token.type == 1) ? await User.update(owner._id,{accessToken:''}) : await User.update(owner._id,{refreshToken:''})
        }
    })

    return res.status(200).json({
        'result':'Success',
        'msg': 'Tokens invalidated'
    })
    
})

module.exports = router