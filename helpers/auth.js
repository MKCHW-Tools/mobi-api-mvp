require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {

    if(!req.header('Authorization')) return res.status(403).json({
        result: 'Failure',
        msg: 'Missing token'
    })

    const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '')

    if( !token ) return res.status(403).json({
        result:'Failure',
        msg:'You need to sign in'
    })
    
    jwt.verify(token, process.env.KEY, async (err, verifiedJWT) => {
        if(err instanceof jwt.TokenExpiredError){
            console.log('Will refresh jwt')
        } else {
            
            //console.log(verified)
            const user = await User.findOne({_id: verifiedJWT._id, 'tokens.token': token })

            if (!user) return res.status(403).send('You need to sign in')
            
            req.user = user
            // req.token = token
    
            next()

        }
    })

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