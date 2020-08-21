import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Header'
import ReactHtmlParser from 'react-html-parser'
import { trackPromise } from 'react-promise-tracker'
import LoadingIndicator from './LoadingIndicator';

// CSS
const container = {
    display: 'grid',
    gridTemplateColumns: '5fr 8fr',
    height: '92%',
}
const diet = {
    fontSize: '13px',
    color: '#525252',
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '8px 18px',
    marginRight: '20px',
}
const styleButton = {
    fontSize: '14px', 
    fontWeight: 600, 
    color: 'white', 
    border: '1px solid #48AB5F', 
    borderRadius:'15px', 
    backgroundColor: '#48AB5F', 
    width: '180px', 
    height: '40px', 
    outline: 'none', 
    cursor: 'pointer', 
    margin: '0 0 0 15px',
    position: 'absolute',
    bottom: '6%',
    right: '7%',
}

const RecipeDetails = (props) => {
    const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY
    const [ recipeInfo, setRecipeInfo ] = useState([])

    // const missedIngredientCount = props.location.missedIngredientCount
    const missedIngredients = props.location.missedIngredients

    useEffect(() => {
        trackPromise(
            axios.get(`https://api.spoonacular.com/recipes/${props.match.params.id}/information?apiKey=${API_KEY}`)
            .then(response => {
            console.log(response.data)
            setRecipeInfo(response.data)
            })  
        )
    }, [API_KEY, props.match.params.id])

    const handleRecipeRedirect = () => {
        window.open(recipeInfo.sourceUrl) //opens new window to website of recipe
    }

    const dairyFree = () => (recipeInfo.dairyFree)
    const glutenFree = () => (recipeInfo.glutenFree)
    const vegan = () => (recipeInfo.vegan)
    const vegetarian = () => (recipeInfo.vegetarian)

    return (
        <div style={{height: '100%'}}>
            <Header />
            <div style={container}>
                <div style={{textAlign: 'center'}}>
                    <LoadingIndicator />
                    <img src={recipeInfo.image} alt={recipeInfo.title} style={{ width: '80%', borderRadius: '10px', marginTop: '32%' }}/> <br/>
                </div>

                <div style={{ backgroundColor: '#F4F4F4', padding: '100px 10%' }}>
                    <div style={{marginBottom: '15px'}}>
                        {dairyFree() && <span style={diet}>dairy free</span>}
                        {glutenFree() && <span style={diet}>gluten free</span>}
                        {vegan() && <span style={diet}>vegan</span>}
                        {vegetarian() && <span style={diet}>vegetarian</span>}
                    </div>

                    <h1 style={{fontSize: '40px', margin: '0', padding: '10px 0'}}>{recipeInfo.title}</h1>
                    <h5 style={{fontWeight: '600', padding: '0', margin: '0', color: '#363636'}}>by {recipeInfo.sourceName}</h5>
                    <p style={{fontSize: '15px'}}>{ReactHtmlParser(recipeInfo.summary)}</p>

                    <h3>Ingredients</h3>
                    <ul>
                        {recipeInfo.extendedIngredients && recipeInfo.extendedIngredients.map(ingredient => {
                            return <li key={ingredient.id}>{ingredient.name}</li>
                        })}
                    </ul>
                    <button onClick={handleRecipeRedirect} style={styleButton}>Go to the recipe</button>
                </div>
            
            </div>
        </div>
    )
}

export default RecipeDetails