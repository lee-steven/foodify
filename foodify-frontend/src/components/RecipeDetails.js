import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from './Header'
import ReactHtmlParser from 'react-html-parser'
import { trackPromise } from 'react-promise-tracker'
import LoadingIndicator from './LoadingIndicator'
import styled from 'styled-components'
import { device } from '../constants/styled'

const RecipeDetails = (props) => {
    // Change API key on deploy
    const API_KEY = '8d92da901d394c2b81d2846d41a5675c'
    // const API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY
    const [ recipeInfo, setRecipeInfo ] = useState([])

    const missedIngredients = props.location.missedIngredients

    useEffect(() => {
        trackPromise(
            axios.get(`https://api.spoonacular.com/recipes/${props.match.params.id}/information?apiKey=${API_KEY}`)
            .then(response => {
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
        <OuterContainer>
            <Header />
            <Container>
                <ImageContainer>
                    <LoadingIndicator />
                    <RecipeImage src={recipeInfo.image} alt={recipeInfo.title}/>
                </ImageContainer>

                <ContentContainer>
                    <div style={{marginBottom: '15px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        {dairyFree() && <DietaryTag>dairy free</DietaryTag>}
                        {glutenFree() && <DietaryTag>gluten free</DietaryTag>}
                        {vegan() && <DietaryTag>vegan</DietaryTag>}
                        {vegetarian() && <DietaryTag>vegetarian</DietaryTag>}
                    </div>

                    <h1 style={{fontSize: '40px', margin: '0', padding: '10px 0'}}>{recipeInfo.title}</h1>
                    <RecipeImageMobile src={recipeInfo.image} alt={recipeInfo.title} />
                    <h5 style={{fontWeight: '600', padding: '0', margin: '0', color: '#363636'}}>by {recipeInfo.sourceName}</h5>
                    <p style={{fontSize: '15px'}}>{ReactHtmlParser(recipeInfo.summary)}</p>

                    <h3>Ingredients</h3>
                    <IngredientsList style={{}}>
                        {recipeInfo.extendedIngredients && recipeInfo.extendedIngredients.map(ingredient => {
                            return <li key={ingredient.id}>{ingredient.name}</li>
                        })}
                    </IngredientsList>
                    <RecipeButton onClick={handleRecipeRedirect}>Go to the recipe</RecipeButton>
                </ContentContainer>
            </Container>
        </OuterContainer>
    )
}

const OuterContainer = styled.div`
    height: 100%;
    @media ${device.mobileS} {
        overflow: scroll;
    }

    @media ${device.tablet} {
        overflow: hidden;
    }
`

const Container = styled.div`
  @media ${device.mobileS} {
    display: block;
    height: 100%;
  }

  @media ${device.tablet} {
    display: grid;
    grid-template-columns: 5fr 8fr;
    height: 92%;
  }
`

const RecipeImage = styled.img`
    @media ${device.mobileS} {
        display: none;
    }

    @media ${device.tablet} {
        display: block;
        border-radius: 10px;
        width: 80%;
        margin: 32% auto;
    }
`
const RecipeImageMobile = styled.img`
    @media ${device.mobileS} {
        display: block;
        border-radius: 10px;
        width: 100%;
        margin: 20px auto;
    }

    @media ${device.tablet} {
        display: none;
    }
`

const ImageContainer = styled.div`
    text-align: center;

    @media ${device.mobileS} {
        display: none;
    }
    
    @media ${device.tablet} {
        display: block;
    }
`

const ContentContainer = styled.div`
    background-color: #F4F4F4;

    @media ${device.mobileS} {
        padding: 20px 10%;
    }
    
    @media ${device.tablet} {
        padding: 100px 10%;
    }
`

const DietaryTag = styled.span`
    font-size: 13px;
    color: #525252;
    background-color: white;
    border-radius: 10px;

    @media ${device.mobileS} {
        margin: 5px;
        padding: 7px 15px;
    }
    
    @media ${device.tablet} {
        margin-right: 20px;
        padding: 8px 18px;
    }
`

const IngredientsList = styled.ul`
    @media ${device.mobileS} {
        height: auto;
        overflow: visible;
    }

    @media ${device.tablet} {
        height: 120px;
        overflow: scroll;
        overflow-x: hidden;
    } 
`

const RecipeButton = styled.button`
    font-size: 14px;
    font-weight: 600;
    color: white;
    border: 1px solid #39B54A;
    border-radius: 15px;
    background-color: #39B54A;
    height: 40px;
    outline: none;
    cursor: pointer;
    
    @media ${device.mobileS} {
        width: 100%; 
        height: 50px;
        margin-top: 30px;
    }

    @media ${device.tablet} {
        width: 180px;
        position: absolute; 
        bottom: 6%;
        right: 7%;
        margin: 0 0 0 15px;
        height: 40px;
    }
`

export default RecipeDetails