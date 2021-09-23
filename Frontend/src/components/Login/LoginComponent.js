import React from 'react';
import {Input, Label, Form, FormGroup, 
  Button, Container, Row, Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {loginRedux} from '../../redux/reduxActions/loginAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import login_logo from '../../images/login_logo.png'
import { Link } from 'react-router-dom';
import Navbar from '../Landing/NavComponent';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email : "",
        password : "",
        flag : false
      };
    }

    onHandleEmail = (e) => {
      this.setState({email : e.target.value});
    };

    onHandlePassword = (e) => {
      this.setState({password : e.target.value});
    }

    formSubmit = async (e) => {
      e.preventDefault();
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      await this.props.loginRedux(data);
      console.log("....",this.props);
      //action to be called
    }
    render() { 
      let re = null;
      if (this.props.user) {
        re = <Redirect to={{
          pathname: '/home',
          state: this.props.user
      }}/>;
      }
        return (
          <React.Fragment>
            {re}
          <Container>
            <Row style={{textAlign:'center', marginTop:'10px'}}>
              <img src={login_logo} alt="login_logo" style={{height:'40px',width:'500px', marginLeft:'330px', marginTop:'80px'}}></img>
              <br />
              <h4 style={{textAlign:'left'}}>Welcome back</h4>
              </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" 
                placeholder="Email or mobile number" onChange={this.onHandleEmail} />
                </FormGroup>
            </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" id="examplePassword" 
                  placeholder="Enter password" onChange={this.onHandlePassword} />
            </FormGroup>
            </Row>
            <Row style={{ marginTop:'20px'}}>
              <Button onClick={this.formSubmit} 
              style={{height:'40px', backgroundColor:'#1AB821'}}>Login</Button>
            </Row>
            <Row style={{display:'inline-block', marginLeft:'300px', marginTop:'20px'}}>
              <span>New to Uber?</span>
              <Link to='/signup'>Create an account</Link>
              </Row>
          </Container>
          </React.Fragment>
        );
    }
}

Login.propTypes = {
  loginRedux: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}


const mapStateToProps = state =>{
  console.log("state mapstatetoprops in login",state);
  return({
      user: state.login.user
  });
}

export default connect(mapStateToProps, {loginRedux})(Login);
 