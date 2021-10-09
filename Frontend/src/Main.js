import React from 'react';
import { Route } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
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
import Orders from './components/Dashboard/orders/OrdersComponent';
import NewOrder from './components/Dashboard/orders/NewOrdersComponent';
import DeliveredOrders from './components/Dashboard/orders/DeliveredOrdersComponent';
import AllOrders from './components/Dashboard/orders/AllOrdersComponent';
import CancelledOrers from './components/Dashboard/orders/CancelledOrdersComponent';
import Checkout from './components/Checkout/CheckoutComponent';
import ManageRestaurant from './components/Dashboard/ManageComponent';
import CustomerOrders from './components/Profile/OrdersComponent';

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
            <Route path = "/orders" component = {CustomerOrders}/>
            <Route path = "/restaurantpage" component = {Restaurant}/>
            <Route path = "/home" component = {Home}/>
            <Route path = "/checkout" component = {Checkout}/>
            <Row>
            <Col sm={3}>
              <Route path="/dashboard" component={SideBar}></Route>
            </Col>
            <Col sm={9}>
              <Route path="/dashboard/profile" component={ManagerProfile} />
              <Route path="/dashboard/manage" component={ManageRestaurant} />
              {/* <Route path="/dashboard/menu" component={Menu} /> */}
              <Route path="/dashboard/orders" component={Orders} />
              <Route path="/dashboard/orders/all" component={AllOrders} />
              <Route path="/dashboard/orders/new" component={NewOrder} />
              <Route path="/dashboard/orders/delivered" component={DeliveredOrders} />
              <Route path="/dashboard/orders/cancelled" component={CancelledOrers} />
            </Col>
          </Row>
            </React.Fragment>
            );
    }
}
 
export default Main;