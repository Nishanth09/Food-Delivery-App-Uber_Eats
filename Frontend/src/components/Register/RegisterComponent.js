import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Container, FormGroup, Label, Input } from "reactstrap";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerRedux} from '../../redux/reduxActions/registerAction';
import login_logo from '../../images/login_logo.png';
import { Link } from 'react-router-dom';

class Register extends Component {
  constructor(props) {
    super(props);
      this.state = {
          name: "",
          email: "",
          password: ""
      };
  }

  onHandleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    await this.props.registerRedux(data);
  }

  render() {
    return (
      <Container>
         <Row style={{textAlign:'center', marginTop:'10px'}}>
              <img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginLeft:'250px', marginTop:'80px'}}></img>
              <h4 style={{textAlign:'left', marginTop:"30px"}}>Let's get started</h4>
              </Row>
              <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="mobile">Enter your phone number (required)</Label>
                <Input type="text" name="contact" id="contact" 
                placeholder="Mobile number" 
                onChange={(e) => {this.setState({ name: e.target.value })}} />
                </FormGroup>
            </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Email"
                onChange={(e) => this.setState({ email: e.target.value })} />
                </FormGroup>
            </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" 
                  id="examplePassword" placeholder="Enter password"
                  onChange={(e) => this.setState({ password: e.target.value })} />
            </FormGroup>
            </Row>
            <Row style={{ marginTop:'20px'}}>
              <Button onClick={this.onHandleSubmit} style={{height:'40px', 
              backgroundColor:'#27AE60'}}>Sign up</Button>
            </Row>
            <Row style={{display:'inline-block', marginLeft:'300px', marginTop:'20px'}}>
              <span>Already use Uber?</span>
              <Link to='/login'>Sign in</Link>
              </Row>
          </Container>
    );
}
}

Register.propTypes = {
  registerRedux : PropTypes.func.isRequired,
  details : PropTypes.string.isRequired
}

const mapStateToProps = state => {
  console.log("state mapstatetoprops in signup",state);
    return({
        details: state.register.details
    });
}

export default connect(mapStateToProps, {registerRedux})(Register);
