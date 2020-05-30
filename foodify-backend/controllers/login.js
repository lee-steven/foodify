const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ email: body.email }) // find user associated with email
    const passwordCorrect = user === null 
    ? false 
    : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && passwordCorrect)){
        return response.status(401).json({ error: 'invalid email or password'})
    }

    const userForToken = {
        email: user.email,
        id: user._id
    }

    const token = jwt.sign(userForToken, config.SECRET)

    response.status(200).send({ token, email: user.email, firstName: user.firstName, lastName: user.lastName})
})

module.exports = loginRouter