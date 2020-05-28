import React from 'react'
import trashIcon from '../images/trash.png'
import searchIcon from '../images/searchIcon.png'

// CSS
const heading = {
  color: '#292929',
  padding: '0 0 25px 50px',
  fontSize: '40px',
  borderBottom: '1px solid #E0E0E0',
  margin: '30px 0 2px 0',
}
const container = {
  height: '100%',
  borderRight: '1px solid #E0E0E0',
  borderBottom: '1px solid #E0E0E0',
}
const groceriesContainer = {
  overflow: 'scroll',
  height: '80%',
  maxHeight: '80%',
}
const groceryItem = {
  borderBottom: '1px solid #E0E0E0',
  padding: '18px 50px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr 1fr',
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
const modalButton = {
  position: 'absolute', 
  top: '102px',
  left: '58%',
  border: '1px solid #48AB5F', 
  borderRadius: '17px', 
  width: '200px', 
  height: '40px', 
  backgroundColor: '#48AB5F', 
  padding: '5px 0 5px 0', 
  outline: 'none', 
  cursor: 'pointer',
  zIndex: 1,
}

const MyGroceries = ({groceries, handleSubmit, modalButtonClick}) => {
  return (
    <div style={container}>
      <div>
        <h2 style={heading}>My Groceries</h2>
      </div>
      <div style={groceriesContainer}>
          {groceries.map(grocery => {
            return (
              <div key={grocery.name} style={groceryItem}>
                <div>
                  <input type="checkbox" value={grocery.name} className="grocery" />
                  <label style={{paddingLeft: '25%'}}>{grocery.name} </label>
                </div>
                <label style={{textAlign: 'center'}}>{grocery.quantity}</label>
                <label style={{textAlign: 'center'}}>Expires in 1 day</label>
                <span style={{textAlign: 'right'}}>
                  <img src={trashIcon} height='15px' alt='delete' />
                </span>
              </div>
            )
          })}
      </div>

      <button onClick={handleSubmit} style={handleSubmitButton}>
          <img src={searchIcon} height='15px' alt="" style={{paddingRight: '10px', position: 'relative', bottom: '-2px'}}/>
        Search Recipes
      </button>
      <button onClick={modalButtonClick} style={modalButton}>
        <label style={{fontSize: '14px', fontWeight: 600, color: 'white', zIndex: -1, cursor: 'pointer'}}>+ Add New Grocery</label>
      </button>
    </div>
  )
}

export default MyGroceries