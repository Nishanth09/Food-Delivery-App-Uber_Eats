import React from 'react';
import { Route } from "react-router-dom";
import Home from './components/HomeComponent';
import Landing from './components/LandingComponent';
import Login from './components/LoginComponent';
import Profile from './components/ProfileComponent';
import Register from './components/RegisterComponent';

class Main extends React.Component {
    render() { 
        //style={{backgroundImage : "url(./uber_eats_logo.png)"}}
        return (
            <div id = "container">
            <Route path = "/" component = {Home}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/signup" component = {Register}/>
            <Route path = "/landingpage" component = {Landing}/>
            <Route path = "/profile" component = {Profile}/>
        </div>);
    }
}
 
export default Main;