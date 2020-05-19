import React from 'react'

const MyGroceries = ({groceries, handleSubmit}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {groceries.map(grocery => {
          return (
            <div key={grocery.name}>
              <input type="checkbox" value={grocery.name} className="grocery" />
              <label>{grocery.name} {grocery.quantity}</label>
            </div>
          )
        }
        )}
        <input type="submit" value="Search Recipes" />
      </form>
    </div>
  )
}

export default MyGroceries