const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    passwordHash: String,
    firstName: String,
    lastName: String,
    groceries: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grocery'
        }
        // {
        //     name: {
        //         type: String,
        //         required: true,
        //     },
        //     quantity: {
        //         type: Number,
        //         required: true
        //     },
        //     expiration: Date,
        //     user: {
        //         type: mongoose.Schema.Types.ObjectId,
        //         ref: 'User'
        //     }
        // }
    ]
})

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