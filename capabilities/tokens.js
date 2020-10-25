const {ROLES} = require('../helpers/roles')

const canInvalidateTokens = (user, userId) => {
    const userID = String(userId)
    return user.roles.includes(ROLES.ADMIN) || user._id == userID
}

module.exports = {
    canInvalidateTokens
}