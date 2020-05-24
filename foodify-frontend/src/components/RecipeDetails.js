import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Navigation from './Navigation'

import ReactHtmlParser from 'react-html-parser'

const container = {
    display: 'grid',
    gridTemplateColumns: '5fr 8fr',
    height: '92%',
}

const RecipeDetails = (props) => {
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY
    const [ recipeInfo, setRecipeInfo ] = useState([])

    // const missedIngredientCount = props.location.missedIngredientCount
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
        <div style={{height: '100%'}}>
            <Navigation />
            <div style={container}>
                <div style={{textAlign: 'center', marginTop: '43%'}}>
                    <img src={recipeInfo.image} alt={recipeInfo.title} style={{ width: '80%', borderRadius: '10px' }}/> <br/>
                </div>

                <div style={{ backgroundColor: '#F4F4F4', padding: '80px 75px' }}>
                    <h1 style={{fontSize: '40px'}}>{recipeInfo.title}</h1>
                    <h5>by {recipeInfo.sourceName}</h5>
                    <p style={{fontSize: '15px'}}>{ReactHtmlParser(recipeInfo.summary)}</p>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipeInfo.extendedIngredients && recipeInfo.extendedIngredients.map(ingredient => {
                            return <li key={ingredient.id}>{ingredient.name}</li>
                        })}
                    </ul>
                    <div>
                        <a href={recipeInfo.sourceUrl} target="_blank" rel="noopener noreferrer">Go to the recipe!</a>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default RecipeDetails