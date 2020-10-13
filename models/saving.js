require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')

const savingSchema = mongoose.Schema({
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
    },
    type: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports =  mongoose.model( 'saving', savingSchema )