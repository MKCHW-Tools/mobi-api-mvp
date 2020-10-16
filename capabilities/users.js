const {ROLES} = require('../roles')

const canUpdateUser = (editor, userId) => {
    console.log(editor.roles.includes(ROLES.ADMIN) || editor._id === userId)
    return editor.roles.includes(ROLES.ADMIN) || editor._id == userId
}

const canViewUserProfile = (user, profileId) => {
    return user.roles.include(ROLES.ADMIN) || user._id === profileId
}

module.exports = {
    canUpdateUser,
    canViewUserProfile
}