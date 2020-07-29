require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')

const diagnoseSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: {
        type: Date,
        default: Date.now
    },
    details: {
        type: String,
        required: true,
        trim: true
    },
    currency: {
        type: String,
        required: true,
    },
    pregnant: {
        type: Number,
    },
    trimesters: [
        {
            info: String,
                
        }
    ]
})

module.exports =  mongoose.model('diagnose', diagnoseSchema)