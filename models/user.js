require('dotenv').config()
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    lastUpdatedAt: {
        type: Date
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if (!validator.isEmail(value)) throw new Error(`Invalid Email address`)
        }
    },
    status: {
        type: String,
        default: 'active'
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        maxLength: 12
    },
    avator: {
        type: String,

    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    roles: [
        {
            type: String,
            required: true
        }
    ],
    capabilities: [
        {
            type: String,
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 8)

    return next()
})

userSchema.methods.generateAuthToken = async function() {

    const user = this
    const token = jwt.sign({_id: user._id }, process.env.JWT_KEY, { expiresIn: '1800s' })
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async function( phone = '', email = '', username = '', password = '' ) {

    let user

    if( email != '' ) {
        user = await User.findOne({email: email})

    } else if( phone != '' ) {
        user = await User.findOne({phone: phone})

    } else if( username != '' ) {
        user = await User.findOne({username: username})

    }

    if ( !user || user == null || user.length == 0 ) throw new Error( `User not found ${phone}, ${email}, ${username}` )

    const isPasswordMatch = await bcrypt.compare( password, user.password )

    if ( !isPasswordMatch ) throw new Error('Invalid login credentials')

    return user
}

userSchema.statics.update = async function(id, data) {

    const user = await User.findByIdAndUpdate( id, data, {new: true})

    return user
}

userSchema.statics.delete = async id => {
    const user = await User.findByIdAndRemove(id)
    return user

}

const User = mongoose.model('User', userSchema)

module.exports = User