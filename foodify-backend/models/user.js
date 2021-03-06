const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
    },
    passwordHash: String,
    firstName: { 
        type: String,
        required: true,
        min: 1,
    },
    lastName: { 
        type: String,
        required: true,
        min: 1,
    },
    groceries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grocery'
        }
    ]
})

userSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email)
 }, 'The e-mail field cannot be empty.')

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)