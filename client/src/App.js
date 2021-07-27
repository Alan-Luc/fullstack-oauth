import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from "./components/login";
import Profile from "./components/profile";


const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/me" component={Profile}/>
    </Switch>
  )
}

export default App;