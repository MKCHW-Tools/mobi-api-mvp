const {ROLES} = require('../roles')

const canUpdateUser = (user, userId) => {
    return user.roles.includes(ROLES.ADMIN) || user._id === userId
}

const canViewUserProfile = (user, profileId) => {
    return user.roles.include(ROLES.ADMIN) || user._id === profileId
}

module.exports = {
    canUpdateUser,
    canViewUserProfile
}