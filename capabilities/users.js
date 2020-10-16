const {ROLES} = require('../roles')

const canUpdateUser = (user, userToUpdate) => {
    return user.roles.include(ROLES.ADMIN) || user._id === userToUpdate._id
}

const canViewUserProfile = (user, profile) => {
    return user.roles.include(ROLES.ADMIN) || user._id === profile._id
}

module.exports = {
    canUpdateUser,
    canViewUserProfile
}