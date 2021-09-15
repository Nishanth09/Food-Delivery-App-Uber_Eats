import React, { Component } from 'react';
import {Input, Label, Col, Form, FormGroup, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        email : "",
        password : "",
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
      axios.post('http://localhost:3001/login', {"email": data.email, "password": data.password})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    }
    render() { 
        return (
        <div className="container-fluid form-cont">
        <div className="flex-container">
          <div className="row">
            <div className="col col-sm-6 offset-sm-3">
              <h3>Uber Eats</h3>
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
                <hr />
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
                      color="btn btn-primary"
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
 
export default Login;