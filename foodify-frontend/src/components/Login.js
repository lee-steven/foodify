import React, { useState, useEffect } from 'react'
import { useHistory, Redirect, Link } from 'react-router-dom'

import loginService from '../services/login'
import groceryService from '../services/groceries'
import auth from '../services/auth'

import foodifyLogo from '../images/logo.png'

const container = {
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    padding: '15px 30px 40px 30px'
}
const label = {
    fontSize: '13px',
    marginBottom: '5px',
    display: 'block'
}
const styleInputField = {
    width: '360px',
    height: '30px',
    border: 'none',
    outline: 'none',
    borderRadius: '3px',
    marginBottom: '8px', 
    color: 'gray',
    fontSize: '14px',
    padding: '3px'
}
const styleButton = {
    border: 'none',
    width: '368px',
    backgroundColor: '#48AB5F',
    color: 'white',
    borderRadius: '5px',
    padding: '9px 10px',
    margin: '10px 0',
    fontSize: '14px',
    outline: 'none',
    cursor: 'pointer',
}

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ user, setUser ] = useState(null)
    const [ message, setMessage ] = useState(' ')
    const history = useHistory()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedFoodifyUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            auth.login(user.id)
            groceryService.setToken(user.token)
            history.push('/home')
        }
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                email, password
            }) // returns token, email, first/last name, id

            window.localStorage.setItem('loggedFoodifyUser', JSON.stringify(user))
            console.log('Login successful! ', user)
            auth.login(user.id)
            groceryService.setToken(user.token)
            setUser(user)
            setEmail('')
            setPassword('')
            history.push('/home')
        } catch(exception) {
            setMessage('Wrong username or password')
            setTimeout(() => {
                setMessage(' ')
            }, 5000);
        }
    }

    return (
        <div style={{margin: '0 auto', paddingTop: '18vh', width: '430px', height: 'auto',}}>
            <span>
                <img src={foodifyLogo} alt="foodify Logo" height='40px' style={{display: 'inline-block', paddingRight: '10px'}}/>
                <h1 style={{display: 'inline-block',  color: '#292929', position: 'relative', bottom: '10px'}}>foodify</h1>
            </span>
            <div style={ container }>
                <div style={{marginBottom: '12px'}}>
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block'}}>Sign in</h2>
                    <p style={{textDecoration: 'underline', fontSize: '12px', display: 'inline-block', float: 'right', position: 'relative', bottom: -6, color: '#636363'}}>Forgot password?</p>
                </div>

                <p style={{color: 'red', fontSize: '13px', textAlign: 'center', height: '10px'}}>{message}</p>

                <form onSubmit={handleLogin}>
                    <div>
                        <label style={label}>Email</label>
                        <input type='text' value={email} onChange={({target}) => setEmail(target.value)} style={styleInputField} />
                    </div>
                    <div>
                        <label style={label}>Password</label>
                        <input type='password' style={styleInputField} value={password} onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    <button style={styleButton} type='submit'>Sign in</button>
                </form>

            </div>

            <div style={{marginTop: '10px', fontSize: '15px', padding: '10px'}}>
                <label>Don't have an account?</label><br/>
                <Link to='/signup'>
                    <button style={{border: 'none', backgroundColor: 'transparent', padding: '0', fontFamily: 'degular, Helvetica, Arial, sans-serif', textDecoration: 'underline', outline: 'none', cursor: 'pointer' }}>Sign up</button>
                </Link>
            </div>
        </div>
    )
}

export default Login