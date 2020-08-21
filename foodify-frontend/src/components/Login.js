import React from 'react'
import { Link } from 'react-router-dom'
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
import foodifyLogo from '../images/logo.png'
import Loader from 'react-loader-spinner'


const Login = ({
    email,
    password,
    user,
    message,
    isAuthing,
    handleChange,
    handleLogin
}) => {
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
                        <InputField 
                            type='text' 
                            name='email' 
                            value={email} 
                            onChange={handleChange} 
                            placeholder="Enter your email..."
                        />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <InputField 
                            type='password' 
                            name='password' 
                            value={password} 
                            onChange={handleChange} 
                            placeholder="Enter your password..."
                        />
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