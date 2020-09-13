import React from 'react'
import { Link } from 'react-router-dom'

import LoadingIndicator from './LoadingIndicator'

// CSS
const heading = {
  padding: '20px 0 30px 0',
  margin: '0',
  fontSize: '40px',
  color: '#292929',
}
const container = {
  padding: '0 30px 0px 30px',
  marginRight: '10px',
  maxHeight: '100%',
  overflow: 'scroll',
}


const Recipes = ({recipes}) => {
    return (
        <div style={container}   className='scrollable'>
          <h2 style={heading}>Recipe Ideas</h2>
              <LoadingIndicator />
              {recipes.map(recipe => {
              return (
                <div key={recipe.id} style={{display: 'inline-block', maxHeight: '305px', paddingBottom: '5px', marginRight: '27px', paddingBottom: '25px'}} >
                  <div>
                    <Link                
                      to={{
                        pathname:`/${recipe.id}`,
                        missedIngredientCount:recipe.missedIngredientCount,
                        missedIngredients:recipe.missedIngredients
                      }}
                    >
                      <img src={recipe.image} alt={recipe.title}  id={recipe.id} style={{width: '120%', maxWidth: '306px', minWidth: '300px', filter: 'brightness(70%)', borderRadius: '10px'}}/>
                    </Link> <br/>
                    <label style={{display: 'block', fontSize: '14px', width: '300px'}}>{recipe.title}</label>
                  </div>
                </div>
              )
            })}
      </div>
    )
}

export default Recipes