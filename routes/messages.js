const express = require("express");
const { sendMessage } = require("../controllers/messages");
const { auth } = require("../helpers/authorize");

const messageRouter = express.Router();


messageRouter.route("/").post(auth, sendMessage)


module.exports = {
    messageRouter
};