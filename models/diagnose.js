require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')

const diagnoseSchema = mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    patient: {
        id: {
            type: String
        },
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
            required: true
        },
        location: {
            type: String
        }
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
    pregnant: {
        type: Number,
    },
    trimesters: [
        {
            no: {
                type: Number
            },
            info: {
                type: String,
            },
            date: {
                type: String
            }   
        }
    ]
})

module.exports =  mongoose.model('diagnose', diagnoseSchema)