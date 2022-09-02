const asyncHandler = require("express-async-handler");
const Chat = require("../models/chat");
const { findAllCharts, populateChatWithUserDetails, createChat, findChart, findAllSortedChats } = require("../services/chatService");

module.exports ={
    accessChat: asyncHandler(async (req, res)=>{
        const {userId} = req.body;
        console.log("userId", userId);
        console.log("request", req.user._id);

        if (!userId){
            console.log("UserId param not sent with request")
            return res.sendStatus(400);
        }

        var isChat = await findAllCharts(userId, req.user._id)
        console.log("isChat", isChat)
        isChat = await populateChatWithUserDetails(isChat)

        // Check whether chat has more than one person
        if(isChat.length > 0){
            res.send(isChat[0])
        } else {
            var chatData = {
                chatName: "sender",
                users: [req.user._id, userId]
            };

            try{
                const createdChat = await createChat(chatData);
                const fullChat = await findChart(createdChat)
                res.status(200).json(fullChat)
            }catch(error){
                res.status(400);
                throw new Error(error.message)
            }
        }
    }),

    fetchChats: asyncHandler(async(req, res)=>{
        const criteria = req.user._id
        try{
            const getAllChats = await findAllSortedChats(criteria)
            if(getAllChats){
                res.status(200).send(getAllChats);
            }
        }catch (error){
            res.status(400)
            throw new Error(error.message)
        }
         
    })
}
