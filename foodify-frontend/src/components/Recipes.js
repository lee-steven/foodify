import React from 'react'
import { Link } from 'react-router-dom'

// CSS
const heading = {
  padding: '20px 0 30px 0',
  margin: '0',
  fontSize: '40px',
  color: '#292929',
}
const container = {
  padding: '0 30px 0px 30px',
  height: '100%',
  overflow: 'scroll',
  borderBottom: '1px solid #E0E0E0',
}


const Recipes = ({recipes}) => {
    return (
        <div style={container} >
          <h2 style={heading}>Recipes</h2>
              {recipes.map(recipe => {
              return (
                <div key={recipe.id} style={{width: '80%', height: '230px', paddingBottom: '15px'}} >
                  <Link                
                    to={{
                      pathname:`/home/${recipe.id}`,
                      missedIngredientCount:recipe.missedIngredientCount,
                      missedIngredients:recipe.missedIngredients
                    }}
                  >
                    <img src={recipe.image} alt={recipe.title}  id={recipe.id} style={{maxWidth: '306px',  filter: 'brightness(70%)', borderRadius: '10px'}}/>
                  </Link>
                  <h4 style={{width: '80%', overflowWrap: 'break-word', position: 'relative', top: '-80px', left: '10px', color: 'white', fontSize: '20px'}}>{recipe.title}</h4>
                </div>
              )
            })}
      </div>
    )
}

export default Recipes