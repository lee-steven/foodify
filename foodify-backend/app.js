const config = require('./utils/config')
const express = require('express')
const app = express()
const cors =  require('cors')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const groceriesRouter = require('./controllers/groceries')

console.log('Connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Successfully connected to MongoDB')
})
.catch((error) => {
    console.error('Error connecting to MongoDB', error)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/groceries', groceriesRouter)

module.exports = app

