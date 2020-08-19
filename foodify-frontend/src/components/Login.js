import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import {
    BackgroundContainer,
    Container,
    LogoContainer,
    FormContainer,
    HeadingContainer,
    Label,
    InputField,
    Button,
    RedirectLink
} from '../constants/styled.js'

import loginService from '../services/login'
import groceryService from '../services/groceries'
import auth from '../services/auth'
import foodifyLogo from '../images/logo.png'
import Loader from 'react-loader-spinner'


const Login = () => {
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
        <BackgroundContainer>
        <Container>
            <LogoContainer>
                <img src={foodifyLogo} alt="foodify Logo" height='40px' style={{display: 'inline-block', paddingRight: '10px'}}/>
                <h1 style={{display: 'inline-block',  color: '#292929', position: 'relative', bottom: '10px'}}>foodify</h1>
            </LogoContainer>
            <FormContainer>
                <HeadingContainer>
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block', fontWeight: 600}}>Welcome Back!</h2>
                </HeadingContainer>

                <p style={{color: 'red', fontSize: '13px', textAlign: 'center', height: '10px'}}>{message}</p>

                <form onSubmit={handleLogin}>
                    <div>
                        <Label>Email</Label>
                        <InputField type='text' value={email} onChange={({target}) => setEmail(target.value)} placeholder="Enter your email..."/>
                    </div>
                    <div>
                        <Label>Password</Label>
                        <InputField type='password' value={password} onChange={({target}) => setPassword(target.value)} placeholder="Enter your password..."/>
                    </div>
                    <Button type='submit'>
                        {isAuthing 
                            ? <Loader type="ThreeDots" color="white" width="35" height="10" />
                            : 'Log in' }

                    </Button>
                </form>

                <div style={{marginTop: '7px', fontSize: '14px', }}>
                <p style={{textDecoration: 'underline', fontSize: '12px', display: 'inline-block', float: 'right', position: 'relative', bottom: -6, color: '#636363'}}>Forgot password?</p>
                <label>Don't have an account? </label>
                <Link to='/signup'>
                    <RedirectLink>Sign up</RedirectLink>
                </Link>
            </div>
            </FormContainer>
        </Container> 
        </BackgroundContainer>
    )
}

export default Login