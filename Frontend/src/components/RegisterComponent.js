import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import { isEmail } from "validator";

class Register extends Component {
  constructor(props) {
    super(props);
      this.state = {
        userInfo: {
          name: "",
          email: "",
          password: "",
        },
        error: {},
        loginError: "",
        auth: true,
      };
  }

  handleChange = (e) => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitForm = (e) => {
    //prevent page from refresh
    e.preventDefault();

    const { userInfo } = this.state;
    const data = {
      name: userInfo.name,
      email: userInfo.email,
    };
    const error = this.validateForm();
    if (Object.keys(error).length === 0) {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(`http://localhost:8000/signupUser`, userInfo)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 200) {
            this.setState({
              loginError: "",
              authFlag: true,
            });
            //this.props.RegisterUser({ data }); //reducer call
            this.SetLocalStorage(data);
            alert("Successfully Created! Please Continue to Login");
          } else {
            this.setState({
              loginError: "User is already registered",
              authFlag: false,
              error: {},
            });
          }
        })
        .catch(() => {
          this.setState({
            loginError: "User is already registered",
            error: {},
          });
        });
    } else {
      this.setState({ error });
    }
  };

  SetLocalStorage(userInfo) {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
      try {
        let data = {
          Name: userInfo.name,
          Email: userInfo.email,
          Currency: "$",
          Timezone: "America/Los_Angeles",
          Language: "English",
          ContactNo: "80XXXXXXXXX",
          UserProfilePic: "./assets/userIcon.jpg",
        };
        console.log(data);
        localStorage.setItem("userData", JSON.stringify(data));
      } catch (error) {
        console.log(error);
      }
    }
  }

  validateForm = () => {
    const { userInfo } = this.state;
    let error = {};
    if (userInfo.name === "") error.name = "First Name should not be blank";
    if (!isEmail(userInfo.email)) error.email = "Please enter valid mail";
    if (userInfo.email === "") error.email = "Email should not be blank";
    if (userInfo.password === "")
      error.password = "Password should not be blank";
    return error;
  };

  render() {
    let redirectVar = <Redirect to="/signup" />;
    return (
      <>
        <div className="container-fluid form-cont">
          {redirectVar}
          <div className="flex-container">
            <div className="row">
              <div className="col col-sm-6 offset-sm-3">
                <div
                  id="errorLogin"
                  hidden={this.state.loginError.length > 0 ? false : true}
                  className="alert alert-danger"
                  role="alert"
                >
                  {this.state.loginError}
                </div>
                <h3>Welcome to Uber Eats</h3>
                <Form onSubmit={this.handleSubmit} className="form-stacked">
                  <FormGroup>
                    <Label for="firstname" style={{ fontSize: "24px" }}>
                      Username
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Username"
                      invalid={this.state.error.name ? true : false}
                      onChange={this.handleChange}
                    ></Input>
                    <FormFeedback>{this.state.error.name}</FormFeedback>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Label htmlFor="email">
                      Email id
                    </Label>
                    <Input
                      data-testid="email-input-box"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      onChange={this.handleChange}
                      invalid={this.state.error.email ? true : false}
                    ></Input>
                    <FormFeedback>{this.state.error.email}</FormFeedback>
                  </FormGroup>
                  <br />
                  <FormGroup>
                    <Label htmlFor="password">
                      Enter the password
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      invalid={this.state.error.password ? true : false}
                    ></Input>
                    <FormFeedback>{this.state.error.password}</FormFeedback>
                  </FormGroup>
                  <hr />
                  <FormGroup row>
                    <Col>
                      <Button
                        type="submit"
                        onClick={this.submitForm}
                        color="btn btn-success"
                      >
                        Sign me up!
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
export default Register;
