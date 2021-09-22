import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
} from "reactstrap";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {registerRedux} from '../../redux/reduxActions/registerAction';

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
      <>
        <div className="container-fluid form-cont">
        <div className="flex-container">
          <div className="row">
            <div className="col col-sm-6 offset-sm-3">
              <br />
              <h4>Welcome to Uber Eats</h4>
              <Form className="form-stacked">
                <FormGroup>
                  <Label htmlFor="name" className="Lable-align">
                    Username
                  </Label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter a username"
                    onChange={(e) => this.setState({name : e.target.value})}
                  ></Input>
                </FormGroup>
                <br />
                <FormGroup>
                  <Label htmlFor="email" className="Lable-align">
                    Username
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter the email"
                    onChange={(e) => this.setState({email : e.target.value})}
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
                    onChange={(e) => this.setState({password : e.target.value})}
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
                      onClick={this.onHandleSubmit}
                    >
                    Sign up
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </div>
        </div>
      </div>
      </>
    );
}
}

Register.propTypes = {
  registerRedux : PropTypes.func.isRequired,
  details : PropTypes.object.isRequired
}

const mapStateToProps = state => {
  console.log("state mapstatetoprops in signup",state);
    return({
        details: state.register.details
    });
}

export default connect(mapStateToProps, {registerRedux})(Register);
