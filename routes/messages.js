const express = require("express");
const { sendMessage, getAllMessages } = require("../controllers/messages");
const { auth } = require("../helpers/authorize");
const sendResponse = require('../helpers/sendResponse')

const messageRouter = express.Router();

  //@description     Create New Message
messageRouter.route("/").post(auth, sendMessage)
// messageRouter.post("/", async(req, res)=>{
//   // #swagger.tags = ['Messages']
//   try{
//     let data = sendMessage(req, res)
//     sendResponse.sendSuccessMessage("success", data, res)
//   } catch(error){
//     console.log('error==>', err);
//     sendResponse.sendErorMessage(err.message, {}, res);
//   }
// });

//@description     Get all Messages from particular chat
messageRouter.route("/:chatId").get(auth, getAllMessages)


module.exports = {
    messageRouter
};