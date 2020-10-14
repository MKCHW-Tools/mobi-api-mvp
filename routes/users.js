const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

router.post('/users', async function(req, res) {
    try {
        const user = new User(req.body)
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
        
    } catch (error) {
        res.status(400).send(error)
    }
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

router.get('/users/profile', auth, async (req, res) => {

    res.send(req.user)
})

router.get('/users', async (req, res) => {

    res.send([
        'user'
    ])
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

router.put('/users/:id', auth, async (req, res) => {
    const id = req.params.id
    const user =  await User.update( id, req.body )

})

router.delete('/users/delete/:id', auth, async (req, res) => {

    const id = req.params.id

    if( !id ) {
        return res.status(500).send({
            'result' : 'Failure',
            'msg' : 'Invalid resource'
        })

    }

    try {
        const user =  await User.delete( id )
        
        res.status(200).send({
            'result' : 'Success',
            'mgs' : 'Deleted successfully',
            'user' : user
        })

    } catch(err) {
        throw new Error(err)
    }
     
})

module.exports = router