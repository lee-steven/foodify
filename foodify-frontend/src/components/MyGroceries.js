import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import trashIcon from '../images/trash.png'
import SearchIcon from '../images/search.svg'
import SearchWhiteIcon from '../images/search-white.svg'
import PlusIcon from '../images/plus.svg'
import { device } from '../constants/styled'
import { Checkbox, useCheckboxState } from 'pretty-checkbox-react'

import '@djthoms/pretty-checkbox';


const whiteBackground = {
  backgroundColor: 'white',
  borderRadius: '5px',
}

const grayBackground = {
  backgroundColor: '#F5F5F5',
  borderRadius: '5px',
}

const MyGroceries = ({groceries, checkbox, handleSubmit, modalButtonClick}) => {

  let groceryIndex = 0;
  
  const [ toggleButton, setToggleButton ] = useState('Add New Grocery Item')
  const [ filteredGroceries, setFilteredGroceries ] = useState([])

  useEffect(() => {
    setFilteredGroceries(groceries)
    handleInputChecked()
  }, [groceries, checkbox])

  const onSearchChange = e => {
    setFilteredGroceries([])
    if(e.target.value){
      let searchInput = e.target.value
      searchInput = searchInput.toLowerCase()

      const filtered = []
      for(let i = 0; i < groceries.length; i++) {
        if(groceries[i].name.toLowerCase().includes(searchInput)){
          filtered.push(groceries[i])
        }
      }
      setFilteredGroceries(filtered)
    } else {
      setFilteredGroceries(groceries)
    }
  }

  const handleInputChecked = () => {
    checkbox.state.length > 0
      ? setToggleButton('Search for Recipes')
      : setToggleButton('Add New Grocery Item')
  }

  const handleAllInputChecked = (e) => {

  }

  const shortenGroceryDate = date => {
    if(date === undefined) return
    const splitDate = date.split('-')
    let shortenedDate = ''
    shortenedDate = shortenedDate.concat(splitDate[1], '/', splitDate[2].substring(0, 2), '/', splitDate[0])
    return shortenedDate
  }

  return (
    <Container>
      <div>
        <h1 style={{marginTop: 0, fontSize: '40px'}}>My Groceries</h1>
      </div>

      <div>
        <SearchInputContainer>
          <img src={SearchIcon} alt="Search Icon" style={{position: 'relative', bottom: '-29px', left: '10px'}}/>
          <SearchInput type='text' placeholder='Search...' onChange={onSearchChange} />
        </SearchInputContainer>
        <ButtonContainer>
          <Button onClick={toggleButton === 'Add New Grocery Item' ? modalButtonClick : handleSubmit}>
            {
              toggleButton === 'Add New Grocery Item' 
                ? <ButtonIcon src={PlusIcon} />
                : <ButtonIcon src={SearchWhiteIcon} />
            }
            {toggleButton}
          </Button>
        </ButtonContainer>
      </div>

      <Categories>
        <span style={{paddingLeft: '12px'}}><Checkbox color="success" shape="curve" animation="smooth" value='Select-All' {...checkbox} bigger></Checkbox></span>
        <span>Grocery Item</span>
        <span>Quantity</span>
        <span>Purchase Date</span>
        <span></span>
      </Categories>

      <GroceriesContainer className='scrollable'>
          {filteredGroceries && filteredGroceries.map(grocery => {
            return (
              <GroceryItem key={grocery.name + grocery.expiration} style={groceryIndex++ % 2 === 0 ? whiteBackground : grayBackground}>
                <div style={{paddingLeft: '12px'}}>
                  <label>
                    <Checkbox color="success" shape="curve" animation="smooth" value={grocery.name} {...checkbox}></Checkbox>
                  </label>
                  <GroceryLabel style={{paddingLeft: '13%'}}>{grocery.name} </GroceryLabel>
                  <GroceryLabelMobileHeading>{grocery.name}</GroceryLabelMobileHeading>
                  <GroceryLabelMobile style={{paddingLeft: '34px'}}>Quantity: {grocery.quantity}</GroceryLabelMobile>
                </div>
                
                <GroceryLabel>{grocery.quantity}</GroceryLabel>
                <GroceryLabel>{shortenGroceryDate(grocery.expiration || grocery.date)}</GroceryLabel>
                {/* <span>
                  <img src={trashIcon} height='15px' alt='delete' />
                </span> */}
                <GroceryLabelMobile></GroceryLabelMobile>
                <GroceryLabelMobile>Purchase Date: {shortenGroceryDate(grocery.expiration || grocery.date)}</GroceryLabelMobile>
              </GroceryItem>
            )
          })}
      </GroceriesContainer>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
 
  @media ${device.mobileS} {
    padding: 25px;
  }

  @media ${device.tablet} {
    padding: 40px;
  }
`

const SearchInputContainer = styled.div`
  display: inline-block;

  @media ${device.mobileS} {
    width: 86%;
  }

  @media ${device.tablet} {
    width: 40%;
  }
`

const SearchInput = styled.input`
  width: 100%;
  padding: 8px 20px 8px 35px;
  border-radius: 10px;
  border: 1px solid #D6D6D6;
  outline: none;
  color: gray;

  ::placeholder {
    color: #AAAAAA;
    font-family: degular, Helvetica, Arial, sans-serif;
    font-size: 14px;
  }
`

const ButtonContainer = styled.div`
  @media ${device.mobileS} {
    position: absolute;
    right: 20px;
    bottom: 20px;
  }

  @media ${device.tablet} {
    position: relative;
    bottom: 0;
    display: inline-block;
    float: right;
  }
`

const Button = styled.button`
  border-radius: 10px;
  color: white;
  font-size: 15px;
  background-color: #39B54A;
  font-family: degular, Helvetica, Arial, sans-serif;
  font-weight: 600;
  padding: 7px 30px;
  border: 1px solid #39B54A;
  outline: none;

  &:hover {
    cursor: pointer;
  }
`

const ButtonIcon = styled.img`
  position: relative;
  top: 3px;
  left: -8px;
`

const Categories = styled.div`
  @media ${device.mobileS} {
    display: none;
  }

  @media ${device.tablet} {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 5fr 3fr 3fr 1fr;
    color: #6F6F6F;
    font-size: 14px;
    border-bottom: 1px solid #DBDBDB;
    padding-bottom: 10px;
    margin-top: 20px;
  }
`

const GroceriesContainer = styled.div`
  overflow: scroll;
  overflow-x: hidden;
  height: 60vh;

  @media ${device.mobileS} {
    margin-top: 20px;
  }

  @media ${device.tablet} {
    margin-top: 0;
  }
`

const GroceryItem = styled.div`
  width: 100%;
  display: grid;
  padding: 13px 0;

  @media ${device.mobileS} {
    grid-template-columns: 4fr 1.5fr 4fr;
  }

  @media ${device.tablet} {
    grid-template-columns: 6fr 3fr 3fr 1fr;
  }
`

const GroceryLabel = styled.label`
  font-weight: 500;
  @media ${device.mobileS} {
    display: none;
  }

  @media ${device.tablet} {
    display: inline-block;
  }
`

const GroceryLabelMobileHeading = styled.label`
  font-weight: 500;
  // padding-left: 20px;

  @media ${device.mobileS} {
    display: inline-block;
    font-size: 14px;
  }

  @media ${device.tablet} {
    display: none;
  }
`

const GroceryLabelMobile = styled.label`
  @media ${device.mobileS} {
    display: block;
    color: #929292;
    font-size: 12px;
  }

  @media ${device.tablet} {
    display: none;
  }
`

export default MyGroceries