import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Welcome from './components/Welcome'
import Home from './components/Home'
import RecipeDetails from './components/RecipeDetails'

import './App.css';

const App = () => {

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Welcome} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/:id" component={RecipeDetails} />
      </Switch>
    </Router>
  )
}

export default App;
