const {ROLES} = require('../roles')

const canUpdateUser = (editor, userId) => {
    console.log(userId.localeCompare(editor._id))
    return editor.roles.includes(ROLES.ADMIN) || userId.localeCompare(editor._id)
}

const canViewUserProfile = (user, profileId) => {
    return user.roles.include(ROLES.ADMIN) || user._id === profileId
}

module.exports = {
    canUpdateUser,
    canViewUserProfile
}