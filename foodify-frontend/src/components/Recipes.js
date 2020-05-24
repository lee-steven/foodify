import React from 'react'
import { Link } from 'react-router-dom'

// CSS
const heading = {
  margin: '20px 0 10px 0',
  padding: '0',
  fontSize: '30px',
}
const container = {
  margin: '0 30px 0px 30px',
  height: '100%',
}
const recipesContainer = {
  height: '70vh',
  width: '100%',
  padding: '20px 0 20px 0',
  border: '1px solid #dbdbdb',
  borderRadius: '7px',
  overflow: 'scroll',
}

const Recipes = ({recipes}) => {
    return (
        <div style={container} >
          <h2 style={heading}>Recipes</h2>
            <div style={recipesContainer}>
              {recipes.map(recipe => {
              return (
                <div key={recipe.id} style={{ margin: 'auto', width: '80%', height: '230px', paddingBottom: '15px'}} >
                  <Link                
                    to={{
                      pathname:`/home/${recipe.id}`,
                      missedIngredientCount:recipe.missedIngredientCount,
                      missedIngredients:recipe.missedIngredients
                    }}
                  >
                    <img src={recipe.image} alt={recipe.title}  id={recipe.id} style={{maxWidth: '306px', filter: 'brightness(70%)'}}/>
                  </Link>
                  <h4 style={{width: '80%', overflowWrap: 'break-word', position: 'relative', top: '-80px', left: '10px', color: 'white', fontSize: '20px'}}>{recipe.title}</h4>
                </div>
              )
            })}
          </div>
      </div>
    )
}

export default Recipes