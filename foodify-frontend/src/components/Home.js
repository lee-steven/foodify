import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import auth from '../services/auth'
import groceryServices from '../services/groceries'
import userServices from '../services/users'
import { useLocation, useHistory } from "react-router-dom";
import { trackPromise } from 'react-promise-tracker'
import Header from './Header'
import Navigation from './Navigation'
import MyGroceries from './MyGroceries'
import Recipes from './Recipes'
import { device } from '../constants/styled'

// CSS
const fieldLabel = {
  color: 'gray',
  fontWeight: 500,
  fontSize: '14px',
}

const Home = (props) => {
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY
  const [ message, setNewMessage ] = useState('')
  const [ recipes, setRecipes ] = useState([])
  const [ groceries, setGroceries ] = useState([])
  const location = useLocation()
  const history = useHistory()

  useEffect( () => {
    userServices.getUser(auth.getUserId())
    .then(response => response.groceries) // array of grocery ids
    .then(groceryItems => {
      groceryItems.forEach(grocery => {
        groceryServices.getById(grocery)
        .then(response => {
          setGroceries(state => [...state, response])
        })
      })
    })
  }, [])

  useEffect(() => {
    if(location.state){
      console.log(location.state.user)
    }
 
  }, [location])

  // Handles adding Grocery Item
  const handleAddSubmit = (event) => {
    event.preventDefault()

    let name = document.getElementById('itemName').value
    let quantity = document.getElementById('itemQuantity').value
    let date = document.getElementById('itemDate').value
    
    if(!name || !quantity || !date){
      setNewMessage('Please fill out all fields')
      setInterval(() => {
        setNewMessage('')
      }, 3000)
      return
    }

    const newGroceryItem = {
      name: name,
      quantity: quantity,
      date: date,
    }

    // groceryServices.create(newGroceryItem)
    
    setGroceries([...groceries, newGroceryItem])

    // Close Modal and clear input fields
    document.getElementById('itemName').value = ''
    document.getElementById('itemQuantity').value = ''
    document.getElementById('itemDate').value = ''
    
    let modal = document.getElementById("myModal");
    modal.style.display = "none"


    setNewMessage('Grocery Item has successfully been added')
    setInterval(() => {
      setNewMessage('')
    }, 3000)
  }

  // Handles submit for selected grocery items to search for recipes
  const handleSubmit = (event) => {
    // Opens recipes modal
    let modal = document.getElementById("recipesModal");
    modal.style.display = "block";

    const groceryList = document.getElementsByClassName('grocery')
    let checkedIngredients = []

    // Stores checked ingredients in checkedIngredients array
    for(let i = 0; i < groceryList.length; i++){
      if(groceryList[i].checked){
        checkedIngredients = checkedIngredients.concat(groceryList[i].value)
      }
    }

    // Retrieves recipes from API based on selected ingredients
    trackPromise(
      axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${checkedIngredients.map(ingredient => `${ingredient},+`)}&number=15&apiKey=${API_KEY}`)
        .then(response => {
          setRecipes(response.data)
      })
    )

  }

  // Opens add grocery item modal
  const modalButtonClick = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  // Closes Modal on 'x' click
  const closeButton = () => {
    let modal = document.getElementById("myModal");
    let recipesModal = document.getElementById("recipesModal");
    modal.style.display = "none"
    recipesModal.style.display = "none"
  }
  // Closes modal on window click
  window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    let recipesModal = document.getElementById("recipesModal");

    if (event.target === modal) {
      modal.style.display = "none";
    } else if(event.target === recipesModal){
      recipesModal.style.display = "none";
    }
  }
  const handleCancelButton = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "none"
  }

  
  return (
    <div style={{height: '100%', overflow: 'hidden'}}>
   
        <Header />
        <Modal id="myModal">
          <ModalContent>
            <Close onClick={closeButton}>&times;</Close>
            <ModalContentMobile>
            <h2>Add Grocery Item</h2>

            <form onSubmit={handleAddSubmit} style ={{paddingTop: '20px'}}>
              <InputDiv>
                <label style={fieldLabel}>Grocery Item </label><br />
                <Input type='text' id='itemName' style={{width: '95%'}}/> <br />
              </InputDiv>

              <div style={{display: 'flex'}}>
                <InputDiv style={{width: '30%'}}>
                  <label style={fieldLabel}>Quantity</label><br />
                  <Input type='number' id='itemQuantity' style={{width: '80px'}}/> <br />
                </InputDiv>

                <InputDiv style={{paddingLeft: '20px', width: '100%'}}>
                  <label style={fieldLabel}>Purchase Date</label><br />
                  <Input type='date' id='itemDate' style={{width: '93%'}}/> <br />
                </InputDiv>
              </div>

              <div style={{textAlign: 'right', marginTop: '30px'}}>
                <CancelButton className="buttonDefault" onClick={handleCancelButton}>Cancel</CancelButton>
                <AddItemButton type='submit' value='Add Grocery Item'/>
              </div>
            </form>
            </ModalContentMobile>
          </ModalContent>
        </Modal>

        <Modal id="recipesModal">
          <RecipesModalContent>
            <Close style={{position: 'relative', right: '20px', top: '20px'}} onClick={closeButton}>&times;</Close>
            <Recipes recipes={recipes}/>
          </RecipesModalContent>
        </Modal>


        <Container>
          <Navigation/>
          <MyGroceries groceries={groceries} handleSubmit={handleSubmit} modalButtonClick={modalButtonClick}/>
        </Container>
      </div>
  )
}

const Modal = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: none; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`

const ModalContent = styled.div`
  background-color: #fefefe;

  @media ${device.mobileS} {
    border: none;
    margin: 0;
    height: 100%;
    padding: 40px;
  }

  @media ${device.tablet} {
    width: 360px; /* Could be more or less, depending on screen size */
    border-style: none;
    border-radius: 10px;
    margin: 12% auto; /* 15% from the top and centered */
    padding: 40px 60px;
    height: auto;
  }
`

const Close = styled.span`
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;

  &:hover {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`

const ModalContentMobile = styled.div`
  @media ${device.mobileS} {
    margin-top: 30%;
  }

  @media ${device.tablet} {
    margin-top: 0;
  }
`

const RecipesModalContent = styled.div`
  background-color: #fefefe;

  @media ${device.mobileS} {
    width: auto;
    height: 100%;
    margin-top: 0;
  }

  @media ${device.tablet} {
    border-style: none;
    border-radius: 10px;
    padding: 40px 60px;
    width: 75%;
    height: 70%;
    margin: 83px auto;
  }
`

const InputDiv = styled.div`
  margin-bottom: 13px;
`

const Input = styled.input`
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  padding: 9px 15px;
  padding-right: 0;
  outline: none;
  height: 20px;
  width: 100%;
  font-family: degular, Helvetica, Arial, sans-serif;
`

const CancelButton = styled.button`
  border-style: none;
  padding: 10px 20px;
  margin: 15px 5px 5px 0px;
  font-size: 14px;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  font-family: degular, Helvetica, Arial, sans-serif;
  font-weight: 500;
`

const AddItemButton = styled.input`
  border-style: none;
  border: 1px solid #39B54A;
  border-radius: 5px;
  background-color: #39B54A;
  padding: 10px 40px;
  margin: 15px 0px 5px 10px;
  font-size: 14px;
  color: white;
  outline: none;
  cursor: pointer;
  font-family: degular, Helvetica, Arial, sans-serif;
  font-weight: 600;
`
const Container = styled.div`
  height: 92%;
  margin-top: 0;
  padding-top: 0;
  width: 100%;

  @media ${device.mobileS} {
    display: block;
  }

  @media ${device.tablet} {
      display: grid;
      grid-template-columns: 300px auto;
  }
`

export default Home;
