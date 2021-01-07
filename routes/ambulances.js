const express = require('express')
const {ambulances, ambulance} = require('../controllers/ambulances')
const Ambulance = require('../models/ambulance')
const {auth} = require('../helpers/authorize')
const {paginate} = require('../helpers/pagination')

const router = express.Router()

router.get('/ambulances/:id', auth, ambulance)
router.get('/ambulances', auth, paginate(Ambulance), ambulances)

module.exports = router