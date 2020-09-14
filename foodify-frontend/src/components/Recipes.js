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
  maxHeight: '100%',
  overflow: 'scroll',
  margin: '0 auto',
}


const Recipes = ({recipes}) => {
    return (
        <div style={container}>
          <h2 style={heading}>Recipe Ideas</h2>
              <LoadingIndicator />
              {recipes.map(recipe => {
              return (
                <div key={recipe.id} style={{display: 'inline-block', marginRight: '27px', paddingBottom: '25px'}} >
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
                    <label style={{display: 'inline-block', color: 'white', fontSize: '17px', fontWeight: '700', width: '280px', height: '20px', overflow: 'hidden', position: 'relative', top: '-40px', left: '15px'}}>{recipe.title}</label>
                  </div>
                </div>
              )
            })}
      </div>
    )
}

export default Recipes