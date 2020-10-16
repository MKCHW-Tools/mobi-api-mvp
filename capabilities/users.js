const {ROLES} = require('../roles')

const canUpdateUser = (editor, userId) => {
    editorID = parseInt(editor._id)
    userID = parseInt(userId)
    return editor.roles.includes(ROLES.ADMIN) || editorID === userID
}

const canViewUserProfile = (user, profileId) => {
    return user.roles.include(ROLES.ADMIN) || user._id === profileId
}

module.exports = {
    canUpdateUser,
    canViewUserProfile
}