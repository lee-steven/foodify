import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginFormContainer from './containers/LoginFormContainer'
import SignupFormContainer from './containers/SignupFormContainer'
import Home from './components/Home'
import RecipeDetails from './components/RecipeDetails'


const App = () => {
  return (
    <Router style={{height: '100%'}}>
      <Switch style={{height: '100%'}}>
        <Route path="/login" exact component={LoginFormContainer} />
        <Route path="/signup" exact component={SignupFormContainer} />
        <ProtectedRoute path="/" exact component={Home} />
        <ProtectedRoute path="/:id" component={RecipeDetails} />
      </Switch>
    </Router>
  )
}

export default App;
