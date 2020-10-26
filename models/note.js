require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const noteSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastUpdatedAt: {
        type: Date
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: String
    },
    status: {
        type: String,
        default: 'active'
    },
    details: {
        type:String
    },
    category: {
        type: String
    },
    tags: [{type:String}]
})

noteSchema.statics.getNotes = async () => {
    const notes = await Note.find({})
    return notes
}

noteSchema.statics.getNote = async id => {
    const note = await Note.findOne({_id: id})
    return note
}

noteSchema.statics.update = async function(id, data) {

    const note = await Note.findByIdAndUpdate( id, data, {new: true})
    return note
}

noteSchema.statics.delete = async id => {
    const note = await Note.findByIdAndRemove(id)
    return note

}

const Note = mongoose.model('Note', noteSchema)

module.exports = Note