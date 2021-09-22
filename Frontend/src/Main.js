import React from 'react';
import { Route } from "react-router-dom";
import Home from './components/Home/HomeComponent';
import Landing from './components/Home/LandingComponent';
import Login from './components/Login/LoginComponent';
import Profile from './components/Profile/ProfileComponent';
import Register from './components/Register/RegisterComponent';
import Restaurant from './components/Restaurant/RestaurantComponent';

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
            <Route path = "/restaurantpage" component = {Restaurant}/>
        </div>);
    }
}
 
export default Main;