// const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const User = require("../models/user");

module.exports = {
	findAllChats: (userId, criteria) => {
		return new Promise((resolve, reject) => {
			Chat.find({
				$and: [
					// the user themselves is at least in the chat
					{ users: { $elemMatch: { $eq: criteria._id } } },
					// here, userId is a list of the id of participating users
					...userId.map( _id => (
						{ users: { $elemMatch: { $eq: _id } } }
					))
				]
			})
				.populate("users", "name avatar email")
				.populate("latestMessage")
				.then((result) => {
					console.log("Result", result);
					resolve(result);
				})
				.catch((err) => {
					console.log("Error on getting chat details", err);
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

	findChat: (chat) => {
		return new Promise((resolve, reject) => {
			Chat.findOne({ _id: chat._id })
				.populate("users", "name avatar email")
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
			// Chat.find({ users: { $elemMatch: { $eq: req.user._id } } });
			Chat.find({
				users: { $elemMatch: { $eq: criteria._id } },
			})
				.populate("users", "name avatar email")
				.populate("latestMessage")
				.sort({ updatedAt: -1 })
				.then((result) => {
					result = User.populate(result, {
						path: "latestMessage.sender",
						model: "Message",
					});
					console.log("Result", result);
					resolve(result);
				})
				.catch((err) => {
					console.log("Error on getting chat details", err);
					reject(err);
				});
		});
	},
};
