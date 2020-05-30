import React, { useState } from 'react'
import loginService from '../services/login'
import groceryService from '../services/groceries'

import foodifyLogo from '../images/logo.png'

const container = {
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    padding: '15px 30px 30px 30px'
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

    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                email, password
            })
            console.log('Login successful! ', user)
            groceryService.setToken(user.token)
            setUser(user)
            setEmail('')
            setPassword('')
        } catch(exception) {
            console.log('Wrong Credentials')
        }
    }

    return (
        <div style={{margin: '0 auto', paddingTop: '20vh', width: '430px', height: 'auto',}}>
            <span>
                <img src={foodifyLogo} alt="foodify Logo" height='40px' style={{display: 'inline-block', paddingRight: '10px'}}/>
                <h1 style={{display: 'inline-block',  color: '#292929', position: 'relative', bottom: '10px'}}>foodify</h1>
            </span>
            <div style={ container }>
                <div style={{marginBottom: '12px'}}>
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block'}}>Sign in</h2>
                    <p style={{textDecoration: 'underline', fontSize: '12px', display: 'inline-block', float: 'right', position: 'relative', bottom: -6, color: '#636363'}}>Forgot password?</p>
                </div>

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
                <button>Sign up</button>
            </div>
        </div>
    )
}

export default Login