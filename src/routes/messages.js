const express = require("express");
const { sendMessage, getAllMessages } = require("../controllers/messages");
const { auth } = require("../helpers/authorize");

const messageRouter = express.Router();

  //@description     Create New Message
messageRouter.route("/").post(auth, sendMessage)

//@description     Get all Messages from particular chat
messageRouter.route("/:chatId").get(auth, getAllMessages)


module.exports = {
    messageRouter
};