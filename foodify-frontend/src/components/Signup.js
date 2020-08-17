import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import foodifyLogo from '../images/logo.png'
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
    const history = useHistory()

    const handleSignup = async (event) => {
        event.preventDefault()
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
                    <h2 style={{padding: '10px 0', margin: 0, display: 'inline-block'}}>Welcome to foodify!</h2>
                </HeadingContainer>

                <p style={{color: 'red', fontSize: '13px', textAlign: 'center', height: '10px'}}>{message}</p>

                <form onSubmit={handleSignup}>
                    <div>
                        <Label>Full Name</Label>
                        <InputField type='text' value={name} onChange={({target}) => setName(target.value)}/>
                    </div>
                    <div>
                        <Label>Email</Label>
                        <InputField type='text' value={email} onChange={({target}) => setEmail(target.value)} />
                    </div>
                    <div>
                        <Label>Password</Label>
                        <InputField type='password' value={password} onChange={({target}) => setPassword(target.value)}/>
                    </div>
                    
                    <Button type='submit'>Create your account</Button>
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