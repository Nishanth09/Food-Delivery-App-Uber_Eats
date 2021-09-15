import React, { Component } from 'react';
import { Route, Link } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';

class Main extends React.Component {
    render() { 
        return (
            <div id = "container">
            <Route path = "/" component = {Home}/>
            <Route path = "/login" component = {Login}/>
        </div>);
    }
}
 
export default Main;