// import http from "http"
const express = require('express')
const app = express()

// Hardcoded users for now
const users = [
    {
        username: 'test1',
        password: 'test1',
        firstName: 'Test',
        lastName: 'One',
        groceries: [
            'Apple', 'Oranges', 'Lemons'
        ],
        id: 1,
    },
    {
        username: 'test2',
        password: 'test2',
        firstName: 'Test',
        lastName: 'Two',
        groceries: [
            'Meat', 'Brussel Sprouts', 'Garlic'
        ],
        id: 2,
    },
    {
        username: 'test3',
        password: 'test3',
        firstName: 'Test',
        lastName: 'Three',
        groceries: [
            'Oil', 'Flour', 'Sugar'
        ],
        id: 3,
    }
]

// Gets Root
app.get('/', (request, response) => {
    response.send('Hello World')
})

// Gets all users
app.get('/api/users', (request, response) => {
    response.json(users)
})

// Gets individual user
app.get('/api/users/:id', (request, response) => {
    const id = Number(request.params.id)
    const user = users.find(user => user.id === id)

    if(user) {
        response.json(user)
    } else{ // if user id doesn't exist
        response.status(404).end()
    }
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)