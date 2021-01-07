const User = require('../models/user')

exports.doctors = async (request, response) => {

    const {total, paginatedDocs:{next = 0}, paginatedDocs:{previous = 0}, paginatedDocs} = response

    if(!paginatedDocs) return response.status(404).send('Doctors not found')

    const doctors = []
    const {docs} = paginatedDocs

/*     docs.forEach( doc => {
        let {_id, createdAt, name, username, phone, roles, email} = doc
        if( roles.includes('doctors')) {
            doctors.push({
                createdAt,
                _id,
                username,
                name,
                phone,
                email,
                roles
            })
        }
    }) */

    doctors = docs.map ( doc => {
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