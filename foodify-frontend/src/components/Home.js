import React, { useState } from 'react'
import axios from 'axios'

import MyGroceries from './MyGroceries'
import Recipes from './Recipes'

const Home = () => {
  const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY
  const [ message, setNewMessage ] = useState('')
  const [ recipes, setRecipes ] = useState([])
  const [ groceries, setGroceries ] = useState([
    {
      name: 'Apple',
      quantity: 2, 
      expiration: new Date(),
    },
    {
      name: 'Lettuce',
      quantity: 1, 
      expiration: new Date(),
    },
    {
      name: 'Bread',
      quantity: 1, 
      expiration: new Date(),
    }
  ])


  const handleAddSubmit = (event) => {
    event.preventDefault()
    const name = document.getElementById('itemName').value
    const quantity = document.getElementById('itemQuantity').value
    const date = document.getElementById('itemDate').value
    
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

    setNewMessage('Grocery Item has successfully been added')
    setInterval(() => {
      setNewMessage('')
    }, 3000)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const groceryList = document.getElementsByClassName('grocery')
    let checkedIngredients = []

    // Stores checked ingredients in checkedIngredients array
    for(let i = 0; i < groceryList.length; i++){
      if(groceryList[i].checked){
        checkedIngredients = checkedIngredients.concat(groceryList[i].value)
      }
    }

    // Retrieves recipes from API based on selected ingredients
    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${checkedIngredients.map(ingredient => `${ingredient},+`)}&number=15&apiKey=${API_KEY}`)
      .then(response => {
        setRecipes(response.data)
      })
  }

  return (
    <div>
        <h1>Foodify</h1>
        <p>{message}</p>
        <form onSubmit={handleAddSubmit}>
          <label>Item</label><input type='text' id='itemName'/> <br />
          <label>Quantity</label><input type='number' id='itemQuantity'/> <br />
          <label>Expiration Date</label><input type='date' id='itemDate'/> <br />
          <input type='submit' value='Add Grocery'/>
        </form>

        <h2>My Groceries</h2>
        <MyGroceries groceries={groceries} handleSubmit={handleSubmit} />

        <h2>Recipes</h2>
        <Recipes recipes={recipes} />
    </div>
  )
}

export default Home;
