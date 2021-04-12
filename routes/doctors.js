const express = require('express')
const {doctors, doctor} = require('../controllers/doctors')
const User = require('../models/user')
const {auth} = require('../helpers/authorize')
const {paginate} = require('../helpers/pagination')

const router = express.Router()

router.get('/doctors/:id', auth, doctor)
// router.get('/doctors', auth, paginate(User), doctors)
router.get('/doctors', doctors)

module.exports = router