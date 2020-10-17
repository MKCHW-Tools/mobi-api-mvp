require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    if(!req.header('Authorization'))
        return res.status(403).send('Missing token')

    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')
    if( token == null || token == '' || token.length == 0) return res.status(403).send('You need to sign in')

    const jwtInfo = jwt.verify(token, process.env.JWT_KEY)

    const user = await User.findOne({_id: jwtInfo._id, 'tokens.token': token})

    if (!user) return res.status(403).send('You need to sign in')
    
    req.user = user
    // req.token = token

    next()
}

const authRole = role => {

    return (req, res, next) => {
        if( !req.user.roles.includes(role) ) return res.status(403).send('Not Allowed')

        next()
    }
}

module.exports = {
    auth,
    authRole
}