import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Welcome from './components/Welcome'
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import RecipeDetails from './components/RecipeDetails'

import './App.css';



const App = () => {
  return (
    <Router style={{height: '100%'}}>
      <Switch style={{height: '100%'}}>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <ProtectedRoute path="/home" exact component={Home} />
        <ProtectedRoute path="/home/:id" component={RecipeDetails} />
      </Switch>
    </Router>
  )
}

export default App;
