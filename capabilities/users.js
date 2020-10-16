const {ROLES} = require('../roles')

const canUpdateUser = (editor, userId) => {
    editorID = parseInt(editor._id)
    userID = parseInt(userId)
    return editor.roles.includes(ROLES.ADMIN) || editorID === userID
}

const canViewProfile = (viewer, profileId) => {
    viewerID = String(viewer._id)
    profileID = String(profileId)
    console.log( 'viewer ', viewerID , 'user',  profileID)
    return viewer.roles.includes(ROLES.ADMIN) /*|| viewerID === profileID*/
}

module.exports = {
    canUpdateUser,
    canViewProfile
}