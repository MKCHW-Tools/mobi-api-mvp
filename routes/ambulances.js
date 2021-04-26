const express = require('express')
const {ambulances, ambulance} = require('../controllers/ambulances')
const Ambulance = require('../models/ambulance')
const {auth} = require('../helpers/authorize')
const {paginate} = require('../helpers/pagination')

const ambulanceRouter = express.Router()

ambulanceRouter.get('/:id', auth, ambulance)
ambulanceRouter.get('/', auth, paginate(Ambulance), ambulances)

module.exports = {
    ambulanceRouter
}