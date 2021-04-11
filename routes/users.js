const express = require('express')
const User = require('../models/user')
const {auth, authRole} = require('../helpers/authorize')
const {canViewProfile, canUpdateUser} = require('../capabilities/users')
const {paginate} = require('../helpers/pagination')
const {ROLES} = require('../helpers/roles')
const bcrypt = require('bcrypt')
const {signAccessToken, signRefreshToken} = require('../helpers/generate.tokens')

const router = express.Router()

router.post('/signup', async (req, res) => {
    if(!req.body) return res.status(404).send({
        "result": "Failure",
        "msg": "Missing data"
    })
    
    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 8)
    const {username:uname} = req.body

    accessToken = await signAccessToken({uname})
    refreshToken = await signRefreshToken({uname})

    req.body.accessToken = accessToken
    req.body.refreshToken = refreshToken

    const user = new User(req.body)
    await user.save()

    const {createdAt, _id, username, name, email, phone, roles} = user

    res.status(200).send({
        "result":"Success",
        "user":{
            createdAt,
            _id,
            username,
            name,
            email,
            phone,
            roles
        },
        "accessToken": accessToken,
        "refreshToken": refreshToken
    })
})

router.post('/add', auth, authRole(ROLES.ADMIN), async (req, res) => {
    
    if(!req.body) return res.status(404).send({
        "result": "Failure",
        "msg": "Missing data"
    })

    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 8)

    const {username:uname} = req.body

    accessToken = await signAccessToken({uname})
    refreshToken = await signRefreshToken({uname})

    req.body.accessToken = accessToken
    req.body.refreshToken = refreshToken

    const user = new User(req.body)
    await user.save()

    const {createdAt, _id, username, name, email, phone, roles} = user

    res.status(200).send({
        "result":"Success",
        "user":{
            createdAt,
            _id,
            username,
            name,
            email,
            phone,
            roles
        },
        "accessToken": accessToken,
        "refreshToken": refreshToken
    })
})

router.post('/login', async function(req, res) {
    
    const {username, password} = req.body

    try {
                
        if( !username && !password)
            return res.status(401).send({
                "result": "Failure",
                "msg": "Username and password are required!"
            })

        const user =  await User.findByCredentials(username, password)

        if ( !user )
            return res.status(401).send({
                "result": "Failure",
                "msg": "Wrong login details"
            })

        const accessToken = await signAccessToken({username})
        const refreshToken = await signRefreshToken({username})
        
        const updated = await User.update(user._id, {accessToken, refreshToken})

        if(updated._id)
            return res.status(200).send({
                'result':'Success',
                accessToken,
                refreshToken
            })

        return res.status(200).send({
            'result':'Failure',
            userName,
            updated
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            'result':'Failure',
            'msg': 'Techinical error, check console'
        })
    }
})

const authProfileViewer = async (req, res, next) => {

    if(!req.user) return res.status(403).send('You need to Login please')

    if(!canViewProfile(req.user, req.params.id)) return res.status(403).send('Not Allowed')

    next()
}

router.get('/:id', auth, authProfileViewer, async (req, res) => {
    
    const {id} = req.params
    
    if(!id) return res.status(404).send('Not Found')

    const profile = await User.getUser(id)

    if(!profile) 
        return res.status(404).json({
            'result': 'Failure',
            'msg': 'Profile Not Found'
        })

    const {createdAt, _id, username, name, email, phone, roles} = profile

    res.status(200).send({
        "result":"Success",
        "profile": {
            createdAt,
            _id,
            username,
            name,
            email,
            phone,
            roles
        }
    })
})

router.get('/users', auth, authRole(ROLES.ADMIN), paginate(User), async (req, res) => {

    const {total, paginatedDocs:{next = 0}, paginatedDocs:{previous = 0}, paginatedDocs} = res

    if(!paginatedDocs) return res.status(404).send('Users not found')

    const users = []
    const {docs} = paginatedDocs

    docs.forEach( doc => {
        let {_id, createdAt, name, username, phone, roles, email} = doc
        users.push({
            createdAt,
            _id,
            username,
            name,
            phone,
            email,
            roles
        })
    })

    return res.status(200).json({
        "result" : "Success",
        total,
        next,
        previous,
        users
    })
})

const authUpdateUser = async (req, res, next) => {

    if(!req.user) return res.status(403).send('Not Allowed')
    if(!req.params.id) return res.status(404).send('Missing ID')

    if(!canUpdateUser(req.user, req.params.id)) {
        return res.status(403).send('Not Allowed')
    }

    next()
}

router.put('/:id', auth, authUpdateUser, async (req, res) => {
    const {id} = req.params
    
    if( !id ) return res.status(500).send('Missing ID')

    if(req.body.password) req.body.password = await bcrypt.hash(req.body.password, 8)

    const user =  await User.update( id, req.body )
    
    if(user) {

        const {createdAt, _id, username, name, phone, email, roles} = user

        return res.status(200).send({
            'result' : 'Success',
            'mgs' : 'Updated successfully',
            'user' : {
                _id,
                createdAt,
                username,
                name,
                email,
                phone,
                roles
            }
        })
        
    }

    return res.status(500).send({
        'result' : 'Failure',
        'msgs' : 'Updates failed',
    })
    
})

router.delete('/delete/:id', auth, authRole(ROLES.ADMIN), async (req, res) => {
    
    const id = req.params.id
    
    const {user} = req.user
    
    if( !id ) {
        return res.status(500).send({
            'result' : 'Failure',
            'msg' : 'Invalid resource'
        })
        
    }
    
    try {
        
        const user = await User.delete( id )
        if(user) {
            res.status(200).send({
                'result' : 'Success',
                'mgs' : 'Deleted successfully',
                'user' : user
            })
        } else {
            res.status(404).send({
                'result' : 'Failure',
                'msgs' : 'Unknown user',
            })
        }
        
    } catch( e ) {
        console.log(e)
    }
    
})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => token.token != req.token)
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens.splice(0, token => req.user.tokens.length)
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router