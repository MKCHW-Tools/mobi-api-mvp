const Chat = require('../models/chat')

exports.chats = async (request, response) => {

    const {total, paginatedDocs:{next = 0}, paginatedDocs:{previous = 0}, paginatedDocs} = response

    if(!paginatedDocs) return response.status(404).send('chats not found')

    const {docs: chats} = paginatedDocs

    return response.status(200).json({
        "result" : "Success",
        total,
        next,
        previous,
        chats
    })
}

exports.chat = async (request, response) => {

    const {id} = request.params

    if(!id) return response.status(404).send('Not Found')

    const message = await Chat.getChat(id)

    if(!message)
        return response.status(404).json({
            'result': 'Failure',
            'msg': 'Message Not Found'
        })

    const {createdAt, updatedAt, _id, msg, sender, threads} = message

    response.status(200).send({
        "result":"Success",
        "message": {
            createdAt,
            updatedAt,
            _id,
            msg,
            sender,
        }
    })
}