const express = require('express')
const {ambulances, ambulance} = require('../controllers/ambulances')
const Ambulance = require('../models/ambulance')
const {auth} = require('../helpers/authorize')
const {paginate} = require('../helpers/pagination')

const ambulanceRouter = express.Router()

ambulanceRouter.get('/:id', auth, ambulance)
ambulanceRouter.get('/', auth, paginate(Ambulance), ambulances)
// TODO add ambulance
// ambulanceRouter.post('/add', auth)
// ambulanceRouter.put('/:id', auth)
// ambulanceRouter.delete('/:id', auth)

module.exports = {
    ambulanceRouter
}