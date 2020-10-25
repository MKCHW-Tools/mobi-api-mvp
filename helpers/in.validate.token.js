require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const inValidateToken = async (req, res, next) => {

    if(!req.header('Authorization')) return res.status(403).json({
        result: 'Failure',
        msg: 'Missing token'
    })

    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')

    if(!token) return res.status(403).json({
        result: 'Failure',
        msg: 'You need to sign in'
    })
    
    if(!token) return res.status(403).send('You need to sign in')

    const owner = await User.findOne({token})
    await User.update(id, {token: null})
    
    return next()

}

module.exports = {
    inValidateToken
}