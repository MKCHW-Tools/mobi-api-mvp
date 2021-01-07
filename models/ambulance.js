require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')

const ambulanceSchema = mongoose.Schema({
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
    item: {
        type: String,
        required: true,
        trim: true
    },
    desciption: {
        type: String,
        trim: true
    },
    currency: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
        required: true
    },
    unit_cost: {
        type: Number,
    }
})

module.exports =  mongoose.model( 'ambulance', ambulanceSchema )