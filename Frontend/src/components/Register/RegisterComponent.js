import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Container, FormGroup, Label, Input } from "reactstrap";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerRedux} from '../../redux/reduxActions/registerAction';
import Navbar from '../Landing/NavComponent';
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
        <Navbar />
        <Row style={{textAlign:'center', marginTop:'10px'}}>
              <h2>Let's get started</h2>
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
              <Button onClick={this.onHandleSubmit} style={{height:'40px', backgroundColor:'#1AB821'}}>Sign up</Button>
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
