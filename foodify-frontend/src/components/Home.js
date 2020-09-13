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

import './Home.css'

// CSS
const container = {
  display: 'grid',
  gridTemplateColumns: '300px auto',
  height: '92%',
  marginTop: 0,
  paddingTop: 0,
}

const fieldLabel = {
  color: 'gray',
  fontWeight: 500,
  fontSize: '14px',
}

const cancelButton = {

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
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeButton}>&times;</span>
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
          </div>
        </div>

        <div id="recipesModal" class="modal">
          <div class="modal-content" style={{width: '75%', height: '70%', marginTop: '83px'}}>
            <span class="close" onClick={closeButton}>&times;</span>
            <Recipes recipes={recipes}/>
          </div>
        </div>


        <div style={container}>
          {/* <MyGroceries groceries={groceries} handleSubmit={handleSubmit} modalButtonClick={modalButtonClick}/>
          <Recipes recipes={recipes} /> */}
          <Navigation/>
          <MyGroceries groceries={groceries} handleSubmit={handleSubmit} modalButtonClick={modalButtonClick}/>
        </div>
        
        {/* TODO ADD MESSAGE VARIABLE */}
    </div>
  )
}

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
  padding: 10px 30px;
  margin: 15px 10px 5px 0px;
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
  padding: 10px 50px;
  margin: 15px 0px 5px 10px;
  font-size: 14px;
  color: white;
  outline: none;
  cursor: pointer;
  font-family: degular, Helvetica, Arial, sans-serif;
  font-weight: 600;
`


export default Home;
