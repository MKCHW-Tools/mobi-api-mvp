const Chat = require("../models/chat");
const Message = require("../models/message");
const User = require("../models/user");

module.exports = {
  createMessage: (newMesage) => {
    return new Promise((resolve, reject) => {
      Message.create(newMesage)
        .then((result) => {
          result = result.populate("sender", "name avator").populate("chat");

          result = User.populate(result, {
            path: "chat.users",
            select: "name avator email",
          });

          console.log("Create message result ", result);
          resolve(result);
        })
        .catch((err) => {
          console.log("Error on creating message ", err);
          reject(err);
        });
    });
  },

  updateLatestMessage: (chatId, message) => {
    return new Promise((resolve, reject) => {
      Chat.findByIdAndUpdate(chatId, { latestMessage: message })
        .then((result) => {
          console.log("update message result ", result);
          resolve(result);
        })
        .catch((err) => {
          console.log("error in updating latest message", err);
          reject(err);
        });
    });
  },

  getAllMessages: (chatId) => {
    return new Promise((resolve, reject) => {
      Message.find({ chat: chatId })
        .populate("sender", "name avator email")
        .populate("chat")
        .then((result) => {
          console.log("get  message result ", result);
          resolve(result);
        })
        .catch((err) => {
          console.log("error in getting all messages", err);
          reject(err);
        });
    });
  },
};
