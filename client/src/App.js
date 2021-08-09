import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from "./components/login";
import Profile from "./components/profile";
import ViewAll from "./components/viewAll";


const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login}/>
      <Route exact path="/me" component={Profile}/>
      <Route exact path="/all" component={ViewAll}/>
    </Switch>
  )
}

export default App;