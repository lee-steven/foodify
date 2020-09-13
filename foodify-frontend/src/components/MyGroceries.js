import React, { useState } from 'react'
import styled from 'styled-components'
import trashIcon from '../images/trash.png'
import searchIcon from '../images/searchIcon.png'

// CSS
const container = {
  height: '100%',
  borderRight: '1px solid #E0E0E0',
  borderBottom: '1px solid #E0E0E0',
  padding: '40px'
}
const groceriesContainer = {
  overflow: 'scroll',
  height: '80%',
  maxHeight: '80%',
}
const handleSubmitButton = {
  fontSize: '14px', 
  fontWeight: 600, 
  color: 'white', 
  border: '1px solid #48AB5F', 
  borderRadius:'15px', 
  backgroundColor: '#48AB5F', 
  width: '200px', 
  height: '40px', 
  outline: 'none', 
  cursor: 'pointer', 
  margin: '0 0 0 15px',
  position: 'absolute',
  bottom: '2%',
  left: '2%',
}

const whiteBackground = {
  backgroundColor: 'white',
  borderRadius: '5px',
}

const grayBackground = {
  backgroundColor: '#F5F5F5',
  borderRadius: '5px',
}

const MyGroceries = ({groceries, handleSubmit, modalButtonClick}) => {

  let groceryIndex = 0;
  
  const [ toggleButton, setToggleButton ] = useState('Add New Grocery Item')

  const handleInputChecked = (e) => {
    const groceryList = document.getElementsByClassName('grocery')
    let checkedIngredients = []

    for(let i = 0; i < groceryList.length; i++){
      if(groceryList[i].checked){
        checkedIngredients = checkedIngredients.concat(groceryList[i].value)
      }
    }

    checkedIngredients.length > 0
      ? setToggleButton('Search for Recipes')
      : setToggleButton('Add New Grocery Item')
  }

  return (
    <div style={container} >
      <div>
        <h1 style={{marginTop: 0, fontSize: '40px'}}>My Groceries</h1>
      </div>

      <div>
        <div style={{display: 'inline-block', width: '40%'}}>
          <SearchInput type='text' placeholder='Search...' />
        </div>
        <div style={{display: 'inline-block', float: 'right'}}>
          <Button onClick={toggleButton === 'Add New Grocery Item' ? modalButtonClick : handleSubmit}>{toggleButton}</Button>
        </div>
      </div>

      <Categories>
        <span style={{paddingLeft: '12px'}}><input type="checkbox" value=""/></span>
        <span>Grocery Item</span>
        <span>Quantity</span>
        <span>Purchase Date</span>
        <span></span>
      </Categories>

      <div style={groceriesContainer} className='scrollable'>
          {groceries && groceries.map(grocery => {
            return (
              <GroceryItem key={grocery.name} style={groceryIndex++ % 2 === 0 ? whiteBackground : grayBackground}>
                <div style={{paddingLeft: '12px'}}>
                  <input type="checkbox" value={grocery.name} className="grocery" onChange={handleInputChecked}/>
                  <GroceryLabel style={{paddingLeft: '13%'}}>{grocery.name} </GroceryLabel>
                </div>
                <GroceryLabel>{grocery.quantity}</GroceryLabel>
                <GroceryLabel>09/12/20</GroceryLabel>
                <span>
                  <img src={trashIcon} height='15px' alt='delete' />
                </span>
              </GroceryItem>
            )
          })}
      </div>

      <button onClick={handleSubmit} style={handleSubmitButton}>
          <img src={searchIcon} height='15px' alt="" style={{paddingRight: '10px', position: 'relative', bottom: '-2px'}}/>
        Search Recipes
      </button>
    </div>
  )
}

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 20px;
  border-radius: 10px;
  border: 1px solid #D6D6D6;
  outline: none;

  ::placeholder {
    color: #AAAAAA;
    font-family: degular, Helvetica, Arial, sans-serif;
    font-size: 14px;
  }
`

const Button = styled.button`
  border-radius: 10px;
  color: white;
  font-size: 15px;
  background-color: #39B54A;
  font-family: degular, Helvetica, Arial, sans-serif;
  font-weight: 600;
  padding: 8px 30px;
  border: 1px solid #39B54A;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`
const Categories = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr 3fr 3fr 1fr;
  color: #6F6F6F;
  font-size: 14px;
  border-bottom: 1px solid #DBDBDB;
  padding-bottom: 10px;
  margin-top: 20px;
`

const GroceryItem = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 6fr 3fr 3fr 1fr;
  padding: 13px 0;
`

const GroceryLabel = styled.label`
  font-weight: 500;
`

export default MyGroceries