const User = require('../models/user')

exports.doctors = async (request, response) => {
// #swagger.tags = ['Doctors']
    const {total, paginatedDocs:{next = 0}, paginatedDocs:{previous = 0}, paginatedDocs} = response

    if(!paginatedDocs) return response.status(404).send('Doctors not found')

    const {docs} = paginatedDocs

    const doctors = docs.filter( doc => doc.roles.includes('doctor') ).map( doc => {
        let {_id, createdAt, name, username, phone, roles, email} = doc
        return {_id, createdAt, email, username, phone, roles, name }
    })

    return response.status(200).json({
        "result" : "Success",
        total,
        next,
        previous,
        doctors
    })
}

exports.doctor = async (request, response) => {
    // #swagger.tags = ['Doctors']
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