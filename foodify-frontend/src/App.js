import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Welcome from './components/Welcome'
import Login from './components/Login'
import Home from './components/Home'
import RecipeDetails from './components/RecipeDetails'

import './App.css';



const App = () => {
  return (
    <Router style={{height: '100%'}}>
      <Switch style={{height: '100%'}}>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/:id" component={RecipeDetails} />
      </Switch>
    </Router>
  )
}

export default App;
