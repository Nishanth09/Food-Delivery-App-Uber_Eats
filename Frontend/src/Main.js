import React from 'react';
import { Route } from "react-router-dom";
import Home from './components/Home/HomeComponent';
import Landing from './components/Landing/LandingComponent';
import Login from './components/Login/LoginComponent';
import Profile from './components/Profile/ProfileComponent';
import Register from './components/Register/RegisterComponent';
import Restaurant from './components/Restaurant/RestaurantComponent';

class Main extends React.Component {
    render() { 
        //style={{backgroundImage : "url(./uber_eats_logo.png)"}}
        return (
            <React.Fragment>
            <Route exact path = "/" component = {Landing}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/signup" component = {Register}/>
            <Route path = "/home" component = {Home}/>
            <Route path = "/profile" component = {Profile}/>
            <Route path = "/restaurantpage" component = {Restaurant}/>
            </React.Fragment>
            );
    }
}
 
export default Main;