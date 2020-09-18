import React, { useState } from 'react'
import Modal from 'react-modal'
import logo from '../images/logo.png'
import StarIcon from '../images/star.svg'
import BellIcon from '../images/bell.svg'
import UserIcon from '../images/user.svg'
import LogoutIcon from '../images/log-out.svg'
import MenuIcon from '../images/menu.svg'
import styled from 'styled-components'
import auth from '../services/auth'
import { useHistory } from 'react-router-dom'
import { device } from '../constants/styled'


// CSS
const logoutButton = {
    border: 'none',
    backgroundColor: 'transparent',
    fontFamily: 'degular, Helvetica, Arial, sans-serif',
    fontSize: '15px',
    fontWeight: 500,
    color: '#292929',
    cursor: 'pointer',
    outline: 'none',
}

const modalStyle = {
    overlay: {
        backgroundColor: 'transparent',
        width: '100%',
        top: '20px',
    },
    content: {
        overflow: 'visible',
        padding: '10px 0px 8px 30px',
        height: '25px',
        width: '140px',
        right: '40px',
        left: 'auto',
    }
}

Modal.setAppElement('#root')

const Header = () => {
    const history = useHistory()
    const [ isOpen, setIsOpen ] = useState(false)

    const handleLogout = () => {
        window.localStorage.removeItem('loggedFoodifyUser')
        auth.logout()
        history.push('login')
    }

    // const openHamburgerMenu = () => {
    //     let modal = document.getElementById('myModal')
    //     modal.style.display = 'block'
    // }

    return(
        <nav style={{height: '5%', margin: 0, padding: '10px 0 30px 0', borderBottom: '1px solid #E0E0E0'}}>
            
            <span style={{ paddingLeft: '40px', margin: '10px 0'}}>
                <img src={logo} alt='foodify Logo' height='40px' style={{ display: 'inline-block', paddingRight: '15px'}}/>
                <h3 style={{ fontSize: '24px', color: '#292929', display: 'inline-block', position: 'relative', top: '-10px' }}>foodify</h3>
            </span>

            <HeaderButtons>
                <span style={{padding: '0 15px',}}>
                    <img src={StarIcon} alt="Star Icon" />
                    <label style={{position: 'relative', top: '-4px', paddingLeft: '5px', fontWeight: 500, fontSize: '15px'}}>Favorites</label>
                </span>
                <span style={{padding: '0 15px',}}>
                    <img src={BellIcon} alt="Bell Icon" />
                    <label style={{position: 'relative', top: '-4px', paddingLeft: '5px', fontWeight: 500, fontSize: '15px'}}>Notifications</label>
                </span>
                <span style={{padding: '0 15px',}} >
                    <NavButton onClick={(() => isOpen ? setIsOpen(false) :setIsOpen(true))}> 
                        <img src={UserIcon} alt="User Icon" />
                        <label style={{position: 'relative', top: '-4px', paddingLeft: '5px', fontWeight: 500, fontSize: '15px', zIndex:-1}}>Account</label>
                           <Modal
                                isOpen={isOpen}
                                style={modalStyle}
                                onRequestClose={(() => setIsOpen(false))}
                                contentLabel='Account Modal'
                            >
                                <button onClick={handleLogout} style={logoutButton}>
                                    <img src={LogoutIcon} alt='Log out Icon' />
                                    <span style={{ position: 'relative', top: '-4px', paddingLeft: '17px'}}>Log out</span>
                                </button>
                                <ModalArrow />
                            </Modal>
                    </NavButton>
                </span>
            </HeaderButtons>

            <HamburgerMenuContainer>
                <img src={MenuIcon} alt='Hamburger Menu Icon' />
            </HamburgerMenuContainer>
         
            {/* <div id="myModal" class="modal">
                <div class="modal-content">
                <div class="modal-header">
                    <span class="close">&times;</span>
                    <h2>Modal Header</h2>
                </div>
                <div class="modal-body">
                    <p>Some text in the Modal Body</p>
                    <p>Some other text...</p>
                </div>
                <div class="modal-footer">
                    <h3>Modal Footer</h3>
                </div>
                </div>
            </div> */}
        </nav>
    )
}

const HeaderButtons = styled.span`
    @media ${device.mobileS} {
        display: none;
    }

    @media ${device.tablet} {
        display: inline-block;
        float: right;
        padding-right: 70px;
        position: relative;
        top: 22px;
    }
`

const NavButton = styled.span`
    cursor: pointer;
`

const ModalArrow = styled.div`
    content: '';
    height: 7px;
    width: 7px;
    position: absolute;
    background-color: white;
    top: -5px;
    left: 45%;
    border-top: lightgray solid 1px;
    border-left: lightgray solid 1px;
    transform: rotate(45deg);
`

const HamburgerMenuContainer = styled.span`
    @media ${device.mobileS} {
        display: inline-block;
        float: right;
        padding: 17px 30px;
    }

    @media ${device.tablet} {
        display: none;
    }
`

export default Header