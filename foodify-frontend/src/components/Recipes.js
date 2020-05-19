import React from 'react'

const Recipes = ({handleRecipeClick, recipes}) => {

    return (
        <div style={{cursor: 'pointer'}} >
        {recipes.map(recipe => {
          return (
            <div key={recipe.id} >
              <img src={recipe.image} alt={recipe.title}  id={recipe.id} onClick={handleRecipeClick}/>
              <h4>{recipe.title}</h4>
            </div>
          )
        })}
      </div>
    )
}

export default Recipes