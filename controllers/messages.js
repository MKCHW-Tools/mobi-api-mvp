const express = require("express");
const asyncHandler = require("express-async-handler");
const {
  createMessage,
  updateLatestMessage,
  getAllMessages: getAllChatMessages,
} = require("../services/messageService");

module.exports = {
  sendMessage: asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    console.log("Request Body", req.body);

    if (!content || !chatId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    const newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
    };

    try {
      var message = await createMessage(newMessage);
      console.log("message ", message);

      console.log("chatId ", req.body.chatId);
      message = await updateLatestMessage(req.body.chatId, message);
      console.log("update message ", message);

      if (message) {
        res.json(message);
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }),

  getAllMessages: asyncHandler(async (req, res) => {
    const chatId = req.params.chatId;
    try {
      const messages = await getAllChatMessages(chatId);
      if (chatId) {
        res.status(200).json(messages);
      } else {
        res.status(400).send("Messages not found");
      }
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }),
};
