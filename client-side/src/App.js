import './App.css';
import Home from './components/Home.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Login from './components/Login.js';
import UserProfile from './components/UserProfile.js';
import Signup from './components/Signup.js';
import NavBar from './components/NavBar';
import { useState } from 'react';
import {connect} from 'react-redux';
import JourneyList from './components/JourneyList';
import AddBus from './components/AddBus';
import AddJourney from './components/AddJourney';

function App({isLoggedIn}) {
  if (!isLoggedIn) {
    return <Login/>
  }
  return (
    <div className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/userProfile">
            <UserProfile/>
          </Route>
          <Route path="/journeyList"> 
            <JourneyList/>
          </Route>
          <Route path="/addBus"> 
            <AddBus/>
          </Route>
          <Route path="/addJourney"> 
            <AddJourney/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = state =>{
  return{
    isLoggedIn: state.isLoggedIn
  }
}

export default connect(mapStateToProps)(App);
