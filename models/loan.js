require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')

const loanSchema = mongoose.Schema({
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
    guarantors: [
        {
            type: String,
        }
    ],
    security: [
        {
           name: {
               type: String
           },
           serial: {
                type: String
           },
           date_acquired: {
                type: Date
           },
           value: {
               type: Number
           }
        }
    ],
    currency: {
        type: String,
        required: true,
    },
    expiry: {
        type: Date,
    },
    principle: {
        type: Number,
        required: true
    },
    expecting: {
        principal: {
            type: Number,
        },
        interest: {
            type: Number,
        },
        total: {
            type: Number
        }
    },
    payments: [
        {
            method: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                required: true,
                default: Date.now()
            },
            amount: {
                type: Number,
                required: true
            },
            balance: {
                type: Number,
                required: true
            }
        }
    ]
})

module.exports =  mongoose.model( 'loan', loanSchema )