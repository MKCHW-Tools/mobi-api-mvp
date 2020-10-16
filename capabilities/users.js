const {ROLES} = require('../roles')

const canUpdateUser = (editor, userId) => {
    console.log('Editor', editor._id)
    console.log('UserId', userId)
    
    return editor.roles.includes(ROLES.ADMIN) || editor._id === userId
}

const canViewUserProfile = (user, profileId) => {
    return user.roles.include(ROLES.ADMIN) || user._id === profileId
}

module.exports = {
    canUpdateUser,
    canViewUserProfile
}