require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')

const ambulanceSchema = mongoose.Schema({
    user: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdatedAt: {
        type: Date,
    },
    
    msdn: {
        type: String,
        trim: true
    },
    plate: {
        type: String,
        trim: true
    },
    hospital: {
        type: String,
        required: true,
    },
    driver: {
        type: String,
    },
    address: {
        type: String,
    },
    cordinates: {
        type: String,
    },
})

module.exports =  mongoose.model( 'Ambulance', ambulanceSchema )