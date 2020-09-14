import React from 'react'
import styled from 'styled-components'
import { device } from '../constants/styled'

const Navigation = () => {
    return (
        <NavigationContainer>
            All Groceries
        </NavigationContainer>
    )
}

const NavigationContainer = styled.div`
    background-color: #F6F6F6;
    
    @media ${device.mobileS} {
        display: none;
    }

    @media ${device.tablet} {
        display: block;
    }
`


export default Navigation;