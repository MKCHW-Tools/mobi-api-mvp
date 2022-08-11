require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const threadSignature = {
    msg:{
        type: String,
        required: true
    },
    sender:{
        name:{
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        }
    }
}
const chatSignature = {
        to: {
            name:{
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            }
        },
        startedBy: {
            name:{
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            }
        }
}

const threadSchema = new mongoose.Schema(threadSignature,{timestamps: true});
chatSignature['thread'] = [threadSchema]
const chatSchema = mongoose.Schema(chatSignature, {timestamp: true})

chatSchema.statics.getChats = async () => {
    const chats = await Chat.find({})
    return chats
}

chatSchema.statics.getChat = async id => {
    const chat = await Chat.findOne({_id: id})
    return chat
}

chatSchema.statics.update = async (id, data) => {

    const chat = await Chat.findByIdAndUpdate( id, data, {new: true})
    return chat
}

chatSchema.statics.delete = async id => {
    const chat = await Chat.findByIdAndRemove(id)
    return chat

}

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat