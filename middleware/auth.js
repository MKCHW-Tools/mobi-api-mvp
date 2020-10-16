require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '')
    if( token == null || token == '' || token.length == 0) {
        res.status(403)
        return res.send('You need to sign in')
    }

    const jwtInfo = jwt.verify(token, process.env.JWT_KEY)

    const user = await User.findOne({_id: jwtInfo._id, 'tokens.token': token})

    if (!user) {
        res.status(403)
        return res.send('You need to sign in')
    }
        // req.path
        // req.user = user
        // req.token = token

    next()
}

const authRole = role => {

    return (req, res, next) => {
        if( !req.user.roles.includes(role) ) {
            res.status(401)
            return res.send('Not Allowed')
        }

        next()
    }
}

module.exports = {
    auth,
    authRole
}