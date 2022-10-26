const express = require("express");
const { accessChat, fetchChats } = require("../controllers/chats");
// const Chat = require('../models/chat')
const { auth } = require("../helpers/authorize");
const { paginate } = require("../helpers/pagination");

const chatRouter = express.Router();

// chatRouter.get('/:id', auth, chat)
// chatRouter.get('/', auth, paginate(Chat), chats)
// chatRouter.post('/add', auth)
// chatRouter.put('/:id', auth)
// chatRouter.delete('/:id', auth)

chatRouter.route("/").post(auth, accessChat);
chatRouter.route("/").get(auth, fetchChats);

module.exports = {
	chatRouter,
};
