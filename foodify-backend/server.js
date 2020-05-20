require('dotenv').config()
const User = require('./models/user')
const express = require('express')
const bodyParser = require('body-parser') // need for post do more research
const app = express()
app.use(bodyParser.json()) //need for post do more research
app.use(bodyParser.urlencoded({ extended: false })) // need for post do more research

// Gets Root
app.get('/', (request, response) => {
    User.countDocuments({}).then(count => {
        response.send(`foodify currently has ${count} users`)
    })
})

// Gets all users from MongoDB
app.get('/api/users', (request, response) => {
    User.find({}).then(result => {
        response.json(result)
    })
})

// Gets individual user by id from MongoDB
app.get('/api/users/:id', (request, response) => {
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
app.post('/api/users', (request, response) => {
    const body = request.body

    console.log(body)

    if(body === undefined) {
        return response.status(400).json({body})
    }

    const user = new User({
        username: body.username,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
        groceries: body.groceries
    })

    user.save().then(savedUser => {
        response.json(savedUser)
    })
})

const port = process.env.PORT
app.listen(port)
console.log(`Server running on port ${port}`)