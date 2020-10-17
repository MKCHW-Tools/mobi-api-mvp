require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    if(!req.header('Authorization'))
        return res.status(403).send('Missing token')

    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')
    if( !token ) return res.status(403).json({
        result:'Failure',
        msg:'You need to sign in'
    })

    try {
        const jwtInfo = jwt.verify(token, process.env.JWT_KEY, (err, verifiedJWT) => {
            console.log(verified)
        })

        const user = await User.findOne({_id: jwtInfo._id, 'tokens.token': token})

        if (!user) return res.status(403).send('You need to sign in')
        
        req.user = user
        // req.token = token

        next()

    } catch( e ) {

        if(e instanceof TokenExpiredError) {
            console.log(e.message)
            res.status(403).json({
                result: "Failure",
                msg: 'Expired token'
            })
        }

    }
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