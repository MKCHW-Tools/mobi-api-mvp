const express = require('express')
const {doctors, doctor} = require('../controllers/doctors')
const User = require('../models/user')
const {auth} = require('../helpers/authorize')
const {paginate} = require('../helpers/pagination')

const doctorRouter = express.Router()

doctorRouter.get('/:id', auth, doctor)
doctorRouter.get('/', auth, paginate(User), doctors)

module.exports = {
    doctorRouter
}