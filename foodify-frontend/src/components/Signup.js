import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import foodifyLogo from '../images/logo.png'
import userService from '../services/users'
import auth from '../services/auth'
import Loader from 'react-loader-spinner'


import {
    BackgroundContainer,
    Container,
    LogoContainer,
    FormContainer,
    Label,
    InputField,
    Button,
    RedirectLink,
    HeadingContainer
} from '../constants/styled.js'

const Signup = () => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    // const [ user, setUser ] = useState(null)
    const [ message, setMessage ] = useState(' ')
    const [ isAuthing, setIsAuthing ] = useState(false)
    const history = useHistory()

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
            window.localStorage.setItem('loggedFoodifyUser', JSON.stringify(newUser))
            auth.login(newUser.id)

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
        <BackgroundContainer>
        <Container>
            <LogoContainer>
                <img src={foodifyLogo} alt="foodify Logo" height='40px' style={{display: 'inline-block', paddingRight: '10px'}}/>
                <h1 style={{display: 'inline-block',  color: '#292929', position: 'relative', bottom: '10px'}}>foodify</h1>
            </LogoContainer>
            <FormContainer>
                <HeadingContainer>
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block', fontWeight: 600}}>Welcome to foodify!</h2>
                </HeadingContainer>

                <p style={{color: 'red', fontSize: '13px', textAlign: 'center', height: '10px'}}>{message}</p>

                <form onSubmit={handleSignup}>
                    <div>
                        <Label>Full Name</Label>
                        <InputField type='text' value={name} onChange={({target}) => setName(target.value)} placeholder="i.e. Johnny Appleseed"/>
                    </div>
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
                            : 'Create your account'
                        }
                    </Button>
                </form>

                <div style={{marginTop: '10px', fontSize: '15px'}}>
                <label>Already have an account? </label>
                <Link to='/login'>
                    <RedirectLink>Log in</RedirectLink>
                </Link>
            </div>

            </FormContainer>
        </Container>
        </BackgroundContainer>
    )
}

export default Signup