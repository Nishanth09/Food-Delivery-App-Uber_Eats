import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Container, FormGroup, Label, Input } from "reactstrap";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerCustomerRedux} from '../../redux/reduxActions/registerAction';
import login_logo from '../../images/login_logo.png';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class Register extends Component {
  constructor(props) {
    super(props);
      this.state = {
          username: "",
          email: "",
          password: "",
          dob: "",
          flag : false
      };
  }

onHandleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      dob: this.state.dob
    };
    await this.props.registerCustomerRedux(data);
    this.setState({flag:true});
}

  render() {
    let redirectLogin = null;
    if (this.state.flag) {
      redirectLogin = <Redirect to='/login'/>
    }
    return (
      <Container>
        {redirectLogin}
         <Row style={{textAlign:'center', marginTop:'10px'}}>
              <Link to='/'><img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginTop:'80px'}}></img></Link>
              <label style={{marginTop:"10px", fontFamily:"sans-serif", fontWeight:"200", fontStyle:"italic"}}>For Customers</label>
              <label style={{textAlign:'left', marginTop:"30px", fontWeight:"600", fontSize:"24px"}}>Let's get started</label>
              </Row>
              <Row style={{ marginTop:'30px'}}>
            <FormGroup>
                <Label for="mobile">Enter the username</Label>
                <Input type="text" name="contact" id="contact" 
                placeholder="Username" 
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
                <Label for="dob">Date of birth</Label>
                <Input type="text" name="dob" id="dob" placeholder="yyyy-mm-dd"
                onChange={(e) => this.setState({ dob: e.target.value })} />
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
            <Row style={{ marginTop:'30px'}}>
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
  registerCustomerRedux : PropTypes.func.isRequired,
  details : PropTypes.string.isRequired
}

const mapStateToProps = state => {
    return({
        details: state.register.response
    });
}

export default connect(mapStateToProps, {registerCustomerRedux})(Register);
