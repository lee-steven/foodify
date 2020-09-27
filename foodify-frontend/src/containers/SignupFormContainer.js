import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import userService from '../services/users'
import loginService from '../services/login'
import auth from '../services/auth'
import Signup from '../components/Signup'
import groceryService from '../services/groceries'

const SignupFormContainer = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ message, setMessage ] = useState(' ')
    const [ isAuthing, setIsAuthing ] = useState(false)
    const history = useHistory()

    const handleChange = (e) => {
        if(e.target.name === 'name'){
            setName(e.target.value)
        } else if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        const nameArr = name.split(' ')
        const firstName = nameArr[0]
        const lastName = nameArr[1]
        try{
            setIsAuthing(true)
            const newUser = await userService.createUser({
                email, password, firstName, lastName
            })

            const user = await loginService.login({
                email, password
            }) // returns token, email, first/last name, id
            
            window.localStorage.setItem('loggedFoodifyUser', JSON.stringify(user))
            auth.login(user.id)
            groceryService.setToken(user.token)

            setTimeout(() => {
                setIsAuthing(false)
                setName('')
                setEmail('')
                setPassword('')
                history.push('/')
            }, 1300)
        } catch(exception){
            setIsAuthing(false)
            setMessage('There was an error creating your account')
            setTimeout(() => {
                setMessage(' ')
            }, 5000);
        }

    }

    return (
        <Signup
            name={name}
            email={email}
            password={password}
            message={message}
            isAuthing={isAuthing}
            handleChange={handleChange}
            handleSignup={handleSignup}
        />
    )
}

export default SignupFormContainer