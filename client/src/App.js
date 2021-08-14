import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from "./components/landing";
import Login from "./components/login";
import Profile from "./components/profile";
import ViewAll from "./components/viewAll";
import Join from "./chat/join";
import Chat from "./chat/chat";


const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/me" component={Profile}/>
      <Route exact path="/all" component={ViewAll}/>
      <Route exact path="/join" component={Join} />
      <Route path ="/chat" component={Chat}/>
    </Switch>
  )
}

export default App;