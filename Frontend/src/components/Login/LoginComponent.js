import React from 'react';
import {Input, Label, Col, Form, FormGroup, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Redirect } from 'react-router';
import {loginRedux} from '../../redux/reduxActions/loginAction'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

    formSubmit = (e) => {
      e.preventDefault();
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.loginRedux(data);
      //action to be called
    }
    render() { 
      let re = null;
      if (this.state.flag) {
        re = <Redirect to = "/landingpage"/>;
      }
        return (
        <div className="container-fluid form-cont">
        <div className="flex-container">
          <div className="row">
            {re}
            <div className="col col-sm-6 offset-sm-3">
              <br />
              <h4>Welcome back</h4>
              <Form className="form-stacked">
                <FormGroup>
                  <Label htmlFor="email" className="Lable-align">
                    Email address
                  </Label>
                  <Input
                    data-testid="email-input-box"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={this.onHandleEmail}
                  ></Input>
                </FormGroup>
                <br />
                <FormGroup>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.onHandlePassword}
                  ></Input>
                </FormGroup>
                <hr />
                <FormGroup row>
                  <Col>
                    <Button
                      data-testid="btn-submit"
                      type="submit"
                      className="btn btn-Normal"
                      color="btn btn-success"
                      onClick={this.formSubmit}
                    >
                      Login
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
        );
    }
}

Login.propTypes = {
  loginRedux: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


const mapStateToProps = state =>{
  console.log("state mapstatetoprops in login",state);
  return({
      user: state.login.user
  });
}

export default connect(mapStateToProps, {loginRedux})(Login);
 