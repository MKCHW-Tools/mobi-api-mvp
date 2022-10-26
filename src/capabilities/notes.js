const {ROLES} = require('../helpers/roles')

const canEditNote = (user, userId) => {
    const userID = String(userId)
    return user.roles.includes(ROLES.ADMIN) || user._id == userID
}

const canViewNote = (user, userId) => {
    const userID = String(userId)
    return user.roles.includes(ROLES.ADMIN) || user._id == userID
}

const canDeleteNote = (user, userId) => {
    const userID = String(userId)
    return user.roles.includes(ROLES.ADMIN) || user._id == userID
}

module.exports = {
    canEditNote,
    canViewNote,
    canDeleteNote,
}