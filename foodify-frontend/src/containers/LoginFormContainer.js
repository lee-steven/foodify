import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import loginService from '../services/login'
import groceryService from '../services/groceries'
import auth from '../services/auth'
import Login from '../components/Login'

const LoginFormContainer = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ user, setUser ] = useState(null)
    const [ message, setMessage ] = useState('')
    const [ isAuthing, setIsAuthing ] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedFoodifyUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            auth.login(user.id)
            groceryService.setToken(user.token)
            history.push('/')
        }
    }, [])

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        } else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            setIsAuthing(true)
            const user = await loginService.login({
                email, password
            }) // returns token, email, first/last name, id
            window.localStorage.setItem('loggedFoodifyUser', JSON.stringify(user))
            auth.login(user.id)
            groceryService.setToken(user.token)
            setUser(user)
            setTimeout(() => {
                setIsAuthing(false)
                setEmail('')
                setPassword('')
                history.push('/')
            }, 1000)
        } catch(exception) {
            setIsAuthing(false)
            setMessage('Wrong username or password')
            setTimeout(() => {
                setMessage(' ')
            }, 5000);
        }
    }


    return (
        <Login 
            email={email}
            password={password}
            user={user}
            message={message}
            isAuthing={isAuthing}
            handleChange={handleChange}
            handleLogin={handleLogin}
        />
    )
}

export default LoginFormContainer