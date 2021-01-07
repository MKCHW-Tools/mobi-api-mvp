const express = require('express')
const {doctors} = require('../controllers/doctors')
const User = require('../models/user')
const {auth} = require('../helpers/authorize')
const {canViewProfile} = require('../capabilities/users')
const {paginate} = require('../helpers/pagination')

const router = express.Router()

router.get('/doctors/:id', auth, async (req, res) => {
    
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

router.get('/doctors', auth, paginate(User), doctors)

module.exports = router