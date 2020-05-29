const User = require('../models/user')
const groceriesRouter = require('express').Router()
const Grocery = require('../models/grocery')

// Gets all groceries from MongoDB
groceriesRouter.get('/', async (request, response) => {

    const groceries = await Grocery.find({}).populate('user', {email: 1, firstName: 1, lastName: 1})
    
    response.json(groceries.map(grocery => grocery.toJSON()))
})

// Adding NEW grocery to MongoDB
groceriesRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findById(body.userId)
    if(body === undefined) {
        return response.status(400).json({body})
    }

    const grocery = new Grocery({
        name: body.name,
        quantity: body.quantity,
        expiration: body.date,
        user: user._id
    })

    const savedGrocery = await grocery.save()
    user.groceries = user.groceries.concat(savedGrocery._id)
    await user.save()

    response.json(savedGrocery.toJSON())
})

module.exports = groceriesRouter