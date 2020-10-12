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
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        maxLength: 12
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function(next){
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.methods.generateAuthToken = async function(){
    const user = this
    const token = jwt.sign({_id: user._id }, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async function(phone = '', email = '', username = '', password = '') {

    //let user = await User.find({$and: [{'email': {$exists: false}}, {"email": email}]})
    let user

    if( email != '' ) {
        user = await User.findOne({email: {$eq: email}})
        console.log('email: ', email)
    } else if( phone != '' ) {
        user = await User.findOne({phone: {$eq: phone}} )
        console.log('phone: ', phone)
    } else if( username != '' ) {
        user = await User.findOne({username: {$eq: username}})
        console.log( 'username: ', username)
    }

    //throw new Error({error: `User not found ${phone}, ${email}, ${username}` })

    if ( !user || user == null ) return ({'error':'failure'})

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if ( !isPasswordMatch ) throw new Error({error: 'Invalid login credentials' })

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User