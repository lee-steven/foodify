const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const grocerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    expiration: Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

grocerySchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Grocery', grocerySchema)