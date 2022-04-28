const express = require('express')
const {chats, chat} = require('../controllers/ambulances')
const Chat = require('../models/chat')
const {auth} = require('../helpers/authorize')
const {paginate} = require('../helpers/pagination')

const chatRouter = express.Router()

chatRouter.get('/:id', auth, chat)
chatRouter.get('/', auth, paginate(Chat), chats)
chatRouter.post('/add', auth)
chatRouter.put('/:id', auth)
chatRouter.delete('/:id', auth)

module.exports = {
    chatRouter
}