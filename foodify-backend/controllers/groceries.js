const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const groceriesRouter = require('express').Router()
const Grocery = require('../models/grocery')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}

// Gets all groceries from MongoDB
groceriesRouter.get('/', async (request, response) => {
    const groceries = await Grocery.find({}).populate('user', {email: 1, firstName: 1, lastName: 1})
    response.json(groceries.map(grocery => grocery.toJSON()))
})

groceriesRouter.get('/:id', async (request, response) => {
    try {
        const grocery = await Grocery.findById(request.params.id)
        response.json(grocery.toJSON())
    } catch(error) {
        response.status(400).send({error: "Grocery null"})
    }
})

// Adding NEW grocery to MongoDB
groceriesRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, config.SECRET)

    if(!token || !decodedToken.id){
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
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