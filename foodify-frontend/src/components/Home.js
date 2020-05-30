import React, { useState, useEffect } from 'react'
import axios from 'axios'
import groceryServices from '../services/groceries'

import { trackPromise } from 'react-promise-tracker'


import Navigation from './Navigation'
import MyGroceries from './MyGroceries'
import Recipes from './Recipes'

import './Home.css'

// CSS
const container = {
  display: 'grid',
  gridTemplateColumns: '12fr 4fr',
  height: '92%',
  marginTop: 0,
  paddingTop: 0,
}
const inputFields = { 
  marginBottom: '13px'
}
const fieldLabel = {
  color: 'gray',
  fontWeight: 500,
  fontSize: '14px',
}
const field = {
  border: '1px solid #dbdbdb',
  borderRadius: '3px',
  padding: '7px 5px',
  outline: 'none'
}
const cancelButton = {
  borderStyle: 'none',
  border: '1px solid lightgray',
  borderRadius: '5px',
  padding: '10px 30px',
  margin: '15px 10px 5px 0px',
  fontSize: '14px',
  outline: 'none',
  cursor: 'pointer'
}
const addButton = {
  borderStyle: 'none',
  border: '1px solid #48AB5F',
  borderRadius: '5px',
  backgroundColor: '#48AB5F',
  padding: '10px 50px',
  margin: '15px 0px 5px 10px',
  fontSize: '14px',
  color: 'white',
  outline: 'none',
  cursor: 'pointer'

}



const Home = () => {
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY
  const [ message, setNewMessage ] = useState('')
  const [ recipes, setRecipes ] = useState([])
  const [ groceries, setGroceries ] = useState([])

  useEffect( () => {
    groceryServices.getAll()
    .then(response => setGroceries(response))
  }, [])

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
    modal.style.display = "none"
  }
  // Closes modal on window click
  window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
  const handleCancelButton = () => {
    let modal = document.getElementById("myModal");
    modal.style.display = "none"
  }

  
  return (
    <div style={{height: '100%'}}>
   
        <Navigation />
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeButton}>&times;</span>
            <h2>Add Grocery Item</h2>

            <form onSubmit={handleAddSubmit} style ={{paddingTop: '20px'}}>
              <div style={inputFields}>
                <label style={fieldLabel}>item </label><br />
                <input type='text' id='itemName' style={field}/> <br />
              </div>

              <div style={inputFields}>
                <label style={fieldLabel}>quantity</label><br />
                <input type='number' id='itemQuantity' style={field}/> <br />
              </div>

              <div style={inputFields}>
                <label style={fieldLabel}>expiration date</label><br />
                <input type='date' id='itemDate' style={field}/> <br />
                </div>

              <div style={{textAlign: 'right'}}>
              <button className="buttonDefault" style={cancelButton} onClick={handleCancelButton}>Cancel</button>
              <input type='submit' value='Add Grocery' style={addButton}/>
              </div>
            </form>
          </div>
        </div>


        <div style={container}>
          <MyGroceries groceries={groceries} handleSubmit={handleSubmit} modalButtonClick={modalButtonClick}/>
          <Recipes recipes={recipes} />
        </div>
        
        {/* TODO ADD MESSAGE VARIABLE */}
    </div>
  )
}

export default Home;
