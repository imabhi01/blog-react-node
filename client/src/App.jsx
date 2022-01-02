import React from 'react'
import Topbar from './components/TopBar/TopBar'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Settings from './Pages/Settings/Settings';
import Home from './Pages/Home/Home'
import Single from './components/Single/Single';
import Write from './Pages/Write/Write';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from './context/Context';
import {useContext} from 'react'

export default function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Topbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            {user ? <Home/> : <Login />}
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/settings">
            {user ? <Settings /> : <Home/>}
          </Route>
          <Route path="/posts/:postId">
            <Single />
          </Route>
          <Route path="/write-post">
            { user ? <Write /> : <Home />}
          </Route>
        </Switch>
    </Router>
  );
}



