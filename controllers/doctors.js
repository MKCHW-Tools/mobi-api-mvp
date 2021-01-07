const User = require('../models/user')

exports.doctors = async (request, response) => {

    const {total, paginatedDocs:{next = 0}, paginatedDocs:{previous = 0}, paginatedDocs} = response

    if(!paginatedDocs) return response.status(404).send('Users not found')

    const users = []
    const {docs} = paginatedDocs

    docs.forEach( doc => {
        let {_id, createdAt, name, username, phone, roles, email} = doc
        users.push({
            createdAt,
            _id,
            username,
            name,
            phone,
            email,
            roles
        })
    })

    return response.status(200).json({
        "result" : "Success",
        total,
        next,
        previous,
        users
    })
}