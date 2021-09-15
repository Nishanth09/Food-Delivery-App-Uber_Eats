import React, { Component } from 'react';
import {Input, Label, Col, Form, FormGroup, Button} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Login extends React.Component {
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