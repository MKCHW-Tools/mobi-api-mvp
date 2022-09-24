const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");

module.exports = {
  findAllCharts: (userId, criteria) => {
    return new Promise((resolve, reject) => {
      Chat.find({
        $and: [
          { users: { $elemMatch: { $eq: criteria._id } } },
          { users: { $elemMatch: { $eq: userId } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .then((result) => {
          console.log("Result", result);
          resolve(result);
        })
        .catch((err) => {
          console.log("Error on geting chat details", err);
          reject(err);
        });
    });
  },

  populateChatWithUserDetails: (chat) => {
    return new Promise((resolve, reject) => {
      User.populate(chat, {
        path: "latestMessage.sender",
        select: "username avator name",
      })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log("Error on populating user details", err);
        });
    });
  },

  createChat: (chat) => {
    return new Promise((resolve, reject) => {
      Chat.create(chat)
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log("Error on creating chat", err);
        });
    });
  },

  findChart: (chat) => {
    return new Promise((resolve, reject) => {
      Chat.findOne({ _id: chat._id })
        .populate("users", "-password")
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          console.log("Error on creating chat", err);
        });
    });
  },

  findAllSortedChats: (criteria) => {
    return new Promise((resolve, reject) => {
      Chat.find({
        $and: [
          { users: { $elemMatch: { $eq: criteria._id } } },
        ],
      })
        .populate("users", "-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then((result) => {
          result = User.populate(result, {
            path:"latestMessage.sender",
            select: "name avator email"
          })
          console.log("Result", result);
          resolve(result);
        })
        .catch((err) => {
          console.log("Error on geting chat details", err);
          reject(err);
        });
    });
  },
};
