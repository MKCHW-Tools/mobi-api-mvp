const service = require("../services/userServices")

exports.getAllUsers = async (req) => {
    try {
        const users = await service.getAllUsers()
        return users;
    } catch (err) {
        throw err;
    }
}

exports.setUserStatus = async(req) => {
    // #swagger.tags = ['Admin']
    try{
        const userId = req.query.id
        const status = req.query.status

        const updateStatus = await service.setUserStatus(userId, status)

        return updateStatus
    } catch(err){
        throw err;
    }
}