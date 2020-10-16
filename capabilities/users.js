const {ROLES} = require('../roles')

const canUpdateUser = (editor, userId) => {
    editorID = String(editor._id)
    userID = String(userId)
    return editor.roles.includes(ROLES.ADMIN) || editorID === userID
}

const canViewProfile = (viewer, profileId) => {
    viewerID = String(viewer._id)
    profileID = String(profileId)
    return viewer.roles.includes(ROLES.ADMIN) || viewerID === profileID
}

module.exports = {
    canUpdateUser,
    canViewProfile
}