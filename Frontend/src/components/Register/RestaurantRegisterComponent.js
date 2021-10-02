import React from 'react';
import { Redirect } from "react-router-dom";
import { Button, Row, Container, FormGroup, Label, Input } from "reactstrap";
import { Link } from 'react-router-dom';
import login_logo from '../../images/login_logo.png';
import {registerRestaurantRedux} from '../../redux/reduxActions/registerAction';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
class RestaurantRegister extends React.Component {
  constructor(props) {
    super(props)
      this.state = {
        username : null,
        email : null,
        password : null,
        city : null,
        flag : false
      }
    }
    onHandleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      city: this.state.city,
    };
    await this.props.registerRestaurantRedux(data);
    this.setState({flag:true});
    }
    render() {
      let redirectLogin = null; 
      if (this.state.flag) {
        redirectLogin = <Redirect to='/restaurantLogin'/>
      }
        return (
            <Container>
              {redirectLogin}
            <Row style={{textAlign:'center', marginTop:'10px'}}>
              <Link to='/'><img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginTop:'80px'}}></img></Link>
              <label style={{marginTop:"10px", fontFamily:"sans-serif", fontWeight:"200", fontStyle:"italic"}}>For Restaurants</label>
              <label style={{textAlign:'left', marginTop:"30px", fontWeight:"600", fontSize:"24px"}}>Let's get started</label>
              </Row>
              <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="username">Enter the restaurant name</Label>
                <Input type="text" username="rname" id="rname" 
                placeholder="Restaurant name" 
                onChange={(e) => {this.setState({ username: e.target.value })}} />
                </FormGroup>
            </Row>
            <Row style={{ marginTop:'20px'}}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Email"
                onChange={(e) => this.setState({ email: e.target.value })} />
                </FormGroup>
            </Row>
            <Row style={{ marginTop:'20px'}}>
            <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" 
                  id="examplePassword" placeholder="Enter password"
                  onChange={(e) => this.setState({ password: e.target.value })} />
            </FormGroup>
            </Row>
            <Row style={{ marginTop:'20px'}}>
            <FormGroup>
                  <Label for="city">Location</Label>
                  <Input type="text" name="city" 
                  id="city" placeholder="Enter city"
                  onChange={(e) => this.setState({ city: e.target.value })} />
            </FormGroup>
            </Row>
            <Row style={{ marginTop:'30px'}}>
              <Button onClick={this.onHandleSubmit} style={{height:'40px', 
              backgroundColor:'#27AE60'}}>Sign up</Button>
            </Row>
            <Row style={{display:'inline-block', marginLeft:'300px', marginTop:'20px'}}>
              <span>Already use Uber?</span>
              <Link to='/restaurantLogin'>Sign in</Link>
              </Row>
              <Row style={{marginTop:"20px"}}>
                  </Row>
          </Container>
        );
    }
}
RestaurantRegister.propTypes = {
  registerRestaurantRedux : PropTypes.func.isRequired,
  details : PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return({
        details: state.register.details
    });
}

export default connect(mapStateToProps, {registerRestaurantRedux})(RestaurantRegister);