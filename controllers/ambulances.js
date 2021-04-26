const User = require('../models/user')

exports.ambulances = async (request, response) => {

    const {total, paginatedDocs:{next = 0}, paginatedDocs:{previous = 0}, paginatedDocs} = response

    if(!paginatedDocs) return response.status(404).send('Ambulances not found')

    const {docs: ambulances} = paginatedDocs

    return response.status(200).json({
        "result" : "Success",
        total,
        next,
        previous,
        ambulances
    })
}

exports.ambulance = async (request, response) => {
    
    const {id} = request.params
    
    if(!id) return response.status(404).send('Not Found')

    const profile = await User.getUser(id)

    if(!profile) 
        return response.status(404).json({
            'result': 'Failure',
            'msg': 'Profile Not Found'
        })

    const {createdAt, _id, username, name, email, phone, roles} = profile

    response.status(200).send({
        "result":"Success",
        "profile": {
            createdAt,
            _id,
            username,
            name,
            email,
            phone,
            roles
        }
    })
}