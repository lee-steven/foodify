import React from 'react'
import { Link } from 'react-router-dom'
import foodifyLogo from '../images/logo.png'
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

const Signup = ({
    name,
    email,
    password,
    message,
    isAuthing,
    handleChange,
    handleSignup
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
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block', fontWeight: 600}}>Welcome to foodify!</h2>
                </HeadingContainer>

                <p style={{color: 'red', fontSize: '13px', textAlign: 'center', height: '10px'}}>{message}</p>

                <form onSubmit={handleSignup}>
                    <div>
                        <Label>Full Name</Label>
                        <InputField 
                            type='text' 
                            name='name' 
                            value={name} 
                            onChange={handleChange} 
                            placeholder="i.e. Johnny Appleseed"
                        />
                    </div>
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