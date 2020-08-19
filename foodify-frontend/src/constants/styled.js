import styled from 'styled-components'
import background from '../images/backgroundImage.jpg'

// Courtesy of https://jsramblings.com/how-to-use-media-queries-with-styled-components/
const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}

const device = {
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
  };

export const BackgroundContainer = styled.div`
    height: 100%;
    background-position: center;
    position: fixed;
    top: 0; 
    left: 0;
    right:0;
    bottom: 0;

    @media ${device.mobileS} {
        background: linear-gradient(rgba(241,241,241,.91), rgba(241,241,241,.91)), url(${background});
    }

    @media ${device.tablet} {
        background: linear-gradient(rgba(255,255,255,.91), rgba(255,255,255,.91)), url(${background});
    }
`

export const Container = styled.div`
    margin: 0 auto;
    
    height: auto;

    @media ${device.mobileS} {
        width: 300px;
        padding-top: 10vh;
    }

    @media ${device.tablet} {
        width: 430px;
        padding-top: 18vh;
    }
`

export const LogoContainer = styled.span`
    margin: 0 auto;

    @media ${device.mobileS} {
        display: block;
        text-align: center;
        width: 200px;
    }

    @media ${device.tablet} {
        display: inline;
        text-align: none;
        width: auto;
    }
`

export const FormContainer = styled.div`
    height: 100%;
    @media ${device.mobileS} {
        padding: 10px 0px;
    }
    @media ${device.tablet} {
        padding: 15px 30px 40px 30px;
        border-radius: 8px;
        background-color: #f2f2f2;
    }
`

export const HeadingContainer = styled.div`
    margin-bottom: 12px;

    @media ${device.mobileS} {
        text-align: center;
    }

    @media ${device.tablet} {
        text-align: left;
    }
`

export const Label = styled.label`
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 7px;
    display: block;
`

export const InputField = styled.input`
    display: block;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 3px;
    margin-bottom: 8px; 
    color: #2d2d2d;
    font-size: 14px;
    font-family: degular, Helvetica, Arial, sans-serif;
    padding: 5px 15px;

    @media ${device.mobileS} {
        max-width: 90%;
        width: 100%;
    }

    @media ${device.tablet} {
        width: 335px;
    }
`

export const Button = styled.button`
    border: none;
    background-color: #39B54A;
    color: white;
    border-radius: 5px;
    padding: 13px 10px;
    margin: 10px 0;
    font-family: degular, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 550;
    outline: none;
    cursor: pointer;
    transition: background 0.3s ease-in-out;

    &:hover {
        background-color: #279E42;
    }

    @media ${device.mobileS} {
        max-width: 100%;
        width: 100%;
    }

    @media ${device.tablet} {
        width: 368px;
    }
`
export const RedirectLink = styled.button`
    border: none;
    background-color: transparent;
    padding: 0;
    font-family: degular, Helvetica, Arial, sans-serif;
    font-weight: 600;
    outline: none;
    cursor: pointer;
    color: #39B54A;

    &: hover {
        text-decoration: underline;
    }
`