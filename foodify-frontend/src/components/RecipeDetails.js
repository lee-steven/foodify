import React, { useEffect, useState } from 'react'
import axios from 'axios'

const RecipeDetails = (props) => {
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY
    const [ recipeInfo, setRecipeInfo ] = useState([])

    const missedIngredientCount = props.location.missedIngredientCount
    const missedIngredients = props.location.missedIngredients

    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/${props.match.params.id}/information?apiKey=${API_KEY}`)
        .then(response => {
          console.log(response.data)
          setRecipeInfo(response.data)
          // window.open(response.data.sourceUrl) //opens new window to website of recipe
        })    
    }, [API_KEY, props.match.params.id])

    return (
        <div>
            <h1>Details</h1>
            <h3>{`${missedIngredientCount} Missing Ingredients`}</h3>
            <ul>
                {missedIngredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li> )}
            </ul>
            <div>
                <h2>{recipeInfo.title}</h2>
                <img src={recipeInfo.image} alt={recipeInfo.title} /> <br/>
                <a href={recipeInfo.sourceUrl} target="_blank" rel="noopener noreferrer">Go to the recipe!</a>
            </div>
        </div>
    )
}

export default RecipeDetails