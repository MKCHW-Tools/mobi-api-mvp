const {ROLES} = require('../roles')

const canUpdateUser = (editor, userId) => {
    return editor.roles.includes(ROLES.ADMIN) || editor === userId
}

const canViewUserProfile = (user, profileId) => {
    return user.roles.include(ROLES.ADMIN) || user._id === profileId
}

module.exports = {
    canUpdateUser,
    canViewUserProfile
}