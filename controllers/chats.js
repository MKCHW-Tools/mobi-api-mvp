const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const {
	findAllChats,
	populateChatWithUserDetails,
	createChat,
	findChat,
	findAllSortedChats,
} = require("../services/chatService");

module.exports = {
	accessChat: asyncHandler(async (req, res) => {
		// #swagger.tags = ['Chat']
		const { userId } = req.body;
		console.log("userId", userId);
		console.log("request", req.user._id);

		if (!userId) {
			console.log("UserId param not sent with request");
			return res.sendStatus(400);
		}

		let isChat = await findAllChats(userId, req.user._id);
		console.log("isChat", isChat);
		isChat = await populateChatWithUserDetails(isChat);

		// Check whether chat has more than one person
		if (isChat.length > 0) {
			res.send(isChat[0]);
		} else {
			let chatData = {
				chatName: "chat",
				users: userId,
			};

			try {
				const createdChat = await createChat(chatData);
				const fullChat = await findChat(createdChat);
				res.status(200).json(fullChat);
			} catch (error) {
				res.status(400);
				throw new Error(error.message);
			}
		}
	}),

	fetchChats: asyncHandler(async (req, res) => {
		// #swagger.tags = ['Chat']
		console.log("request", req.user._id);
		const criteria = req.user;
		try {
			const getAllChats = await findAllSortedChats(criteria);
			if (getAllChats) {
				return res.status(200).send(getAllChats);
			}
		} catch (error) {
			res.status(400);
			throw new Error(error.message);
		}
	}),
};
