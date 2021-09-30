import React from 'react';
import { Route } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Dashboard from './components/Dashboard/DashBoardComponent';
import ManagerProfile from './components/Dashboard/ManagerProfileComponent';
import Menu from './components/Dashboard/MenuComponent';
import SideBar from './components/Dashboard/SideBarComponent';
import Home from './components/Home/HomeComponent';
import Landing from './components/Landing/LandingComponent';
import Login from './components/Login/LoginComponent';
import RestaurantLogin from './components/Login/RestaurantLoginComponent';
import Profile from './components/Profile/ProfileComponent';
import Register from './components/Register/RegisterComponent';
import RestaurantRegister from './components/Register/RestaurantRegisterComponent';
import Restaurant from './components/Restaurant/RestaurantComponent';

class Main extends React.Component {
    render() { 
        return (
            <React.Fragment>
            <Route exact path = "/" component = {Landing}/>
            <Route path = "/login" component = {Login}/>
            <Route path = "/restaurantLogin" component = {RestaurantLogin}/>
            <Route path = "/signup" component = {Register}/>
            <Route path = "/restaurantSignup" component = {RestaurantRegister}/>
            <Route path = "/profile" component = {Profile}/>
            <Route path = "/restaurantpage" component = {Restaurant}/>
            <Route path = "/home" component = {Home}/>
            <Row>
            <Col sm={3}>
              <Route path="/dashboard" component={SideBar}></Route>
            </Col>
            <Col sm={9}>
              <Route path="/dashboard/profile" component={ManagerProfile} />
              <Route path="/dashboard/menu" component={Menu} />
            </Col>
          </Row>
            </React.Fragment>
            );
    }
}
 
export default Main;