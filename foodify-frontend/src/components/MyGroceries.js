import React from 'react'

// CSS
const heading = {
  margin: '20px 0 5px 0',
  padding: '0',
  fontSize: '30px',
}
const container = {
  margin: '0 30px 0px 30px',
  height: '100%',
}

const groceriesContainer = {
  height: '70vh',
  border: '1px solid #dbdbdb',
  borderRadius: '7px',
  padding: '20px'
}

const MyGroceries = ({groceries, handleSubmit}) => {
  return (
    <div style={container}>
      <h2 style={heading}>My Groceries</h2>
      <div style={groceriesContainer}>
        <form onSubmit={handleSubmit}>
          {groceries.map(grocery => {
            return (
              <div key={grocery.name}>
                <input type="checkbox" value={grocery.name} className="grocery" />
                <label>{grocery.name} {grocery.quantity}</label>
              </div>
            )
          })}
          <input type="submit" value="Search Recipes" />
        </form>
      </div>
    </div>
  )
}

export default MyGroceries