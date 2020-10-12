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

    try {
        
        const {phone, username, email, password} = req.body
        
        // if( !phone || !username || !email || !password) {
        //     return res.status(401).send({
        //         "result": "failure",
        //         "msg": "Some of the required fields are missing"
        //     })
        // }

        // console.log( req.body )

        const user =  await User.findByCredentials(phone, email, username, password)

        console.log( user )

        if ( !user || user.length <= 0 ) {

            res.status(401).send({
                "result": "Failure",
                "msg": "Login failed"
            })

        } else {
            const token = await User.generateAuthToken()
            res.send({user, token})
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({
            'result':'Failure',
            'details': error
        })
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

})

router.delete('/users/delete/:id', auth, async (req, res) => {

})

module.exports = router