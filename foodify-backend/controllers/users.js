const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Gets all users from MongoDB
usersRouter.get('/', async (request, response) => {

    const users = await User.find({}).populate('groceries')
    response.json(users.map(u => u.toJSON()))
})

// Gets individual user by id from MongoDB
usersRouter.get('/:id', (request, response) => {
    User.findById(request.params.id)
        .then(user => {
            if(user){
                response.json(user)
            } else{
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(error)
            response.status(400).send({error: "Erroneous id"})
        })
})


// Adding NEW user to MongoDB
usersRouter.post('/', async (request, response) => {
    const body = request.body

    if(body === undefined) {
        return response.status(400).json({body})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
   
    const user = new User({
        email: body.email,
        passwordHash,
        firstName: body.firstName,
        lastName: body.lastName,
        groceries: body.groceries
    })

    user.save().then(savedUser => {
        response.json(savedUser)
    })
})

module.exports = usersRouter