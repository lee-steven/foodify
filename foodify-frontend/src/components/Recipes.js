import React from 'react'
import { Link } from 'react-router-dom'

const Recipes = ({recipes}) => {

    return (
        <div style={{cursor: 'pointer'}} >
        {recipes.map(recipe => {
          return (
            <div key={recipe.id} >
              <Link                
                to={{
                  pathname:`/home/${recipe.id}`,
                  missedIngredientCount:recipe.missedIngredientCount,
                  missedIngredients:recipe.missedIngredients
                }}
              >
                <img src={recipe.image} alt={recipe.title}  id={recipe.id}/>
              </Link>
              <h4>{recipe.title}</h4>
            </div>
          )
        })}
      </div>
    )
}

export default Recipes