const express = require('express')
const User = require('../models/user')
const {auth, authRole} = require('../helpers/auth')
const {canViewProfile, canUpdateUser} = require('../capabilities/users')
const {paginate} = require('../helpers/pagination')
const {ROLES} = require('../helpers/roles')

const router = express.Router()

router.post('/users/signup', async (req, res) => {
    if(!req.body) return res.status(404).send({
        "result": "Failure",
        "msg": "Missing data"
    })

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
        }
    })
})

router.post('/users/add', auth, authRole(ROLES.ADMIN), async (req, res) => {
    if(!req.body) return res.status(404).send({
        "result": "Failure",
        "msg": "Missing data"
    })

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
        }
    })
})

router.post('/users/login', async function(req, res) {
    
    const {phone, username, email, password} = req.body

    try {
                
        if( !phone && !username && !email || !password) {
            res.status(401).send({
                "result": "Failure",
                "msg": "Email or Phone or Username and password are required!"
            })
            console.log(req.body)

        } else {
            const user =  await User.findByCredentials(phone, email, username, password)

            if ( !user || user.length <= 0 ) {
    
                res.status(401).send({
                    "result": "Failure",
                    "msg": "Wrong login details"
                })
    
            } else {
    
                const loggedIn = new User(user)
                const token = await loggedIn.generateAuthToken()
    
                res.status(200).send({
                    'result':'Success',
                    'user': loggedIn,
                    'token': token
                })
            }
        }

    } catch (error) {
        res.status(400).send({
            'result':'Failure',
            'msg': 'Techinical error, check console'
        })
        console.log(error)
    }
})

const authProfileViewer = async (req, res, next) => {

    if(!req.user) return res.status(403).send('You need to Login please')

    if(!canViewProfile(req.user, req.params.id)) return res.status(403).send('Not Allowed')

    next()
}

router.get('/users/:id', auth, authProfileViewer, async (req, res) => {
    
    const {id} = req.params
    
    if(!id) return res.status(404).send('Not Found')

    const profile = await User.getUser(id)

    if(!profile._id) return res.status(404).send('Not Found')

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

    // const users = await User.getUsers()
    const users = res.paginatedResults

    if(!users) return res.status(404).send('Users not found')

    const visibleUsers = []

    users.forEach( user => {
        let {_id, createdAt, name, username, phone, roles, email} = user
        visibleUsers.push({
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
        visibleUsers
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

router.put('/users/:id', auth, authUpdateUser, async (req, res) => {
    const {id} = req.params
    
    if( !id ) return res.status(500).send('Missing ID')

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

router.delete('/users/delete/:id', auth, authRole('admin'), async (req, res) => {
    
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

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => token.token != req.token)
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(500).send(error)
    }
})

router.post('/users/logout-all', auth, async (req, res) => {
    try {
        req.user.tokens.splice(0, token => req.user.tokens.length)
        await req.user.save()
        res.send()

    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router