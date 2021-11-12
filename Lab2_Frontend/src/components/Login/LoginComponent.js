import React from 'react';
import {Input, Label, FormGroup, 
  Button, Container, Row, Col} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Redirect } from 'react-router';
import {loginCustomerRedux} from '../../redux/reduxActions/loginAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import login_logo from '../../images/login_logo.png';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        username : "",
        password : "",
        flag : false
      };
    }

    onHandleEmail = (e) => {
      this.setState({username : e.target.value});
    };

    onHandlePassword = (e) => {
      this.setState({password : e.target.value});
    }

    formSubmit = async (e) => {
      e.preventDefault();
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      await this.props.loginCustomerRedux(data);
      this.setState({flag : true}); 
    }
    render() { 
      let renderHome = null;
      if (localStorage.getItem("token")) {
        renderHome = <Redirect to = '/home'/>;
      }
      let displayError = null;
      if (this.state.flag) {
        console.log(this.props.userDetails.username, this.props.userDetails.email, this.props.userDetails.account_type)
        if (this.props.userDetails.username && this.props.userDetails.email && this.props.userDetails.account_type === "C") {
          let decoded = jwt_decode(this.props.userDetails.JWT)
          console.log("decoded : ", decoded)
          let token = "JWT " + this.props.userDetails.JWT
          localStorage.setItem("username", decoded.username)
          localStorage.setItem("userid", decoded._id)
          localStorage.setItem("token", token)
          renderHome = <Redirect to = '/home'/>
        } else {
          displayError = "Couldn't find an account. Please enter valid credentials"
        }
      } 
        return (
          <div>
            {renderHome}
          <Container>
            <Row style={{textAlign:'center', marginTop:'10px'}}>
              <Link to='/'><img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginTop:'80px'}}></img></Link>
              <br />
              <label style={{marginTop:"10px", fontFamily:"sans-serif", fontWeight:"200", fontStyle:"italic"}}>For Customers</label>
            </Row>
            <Row style={{color:"red", marginTop:"10px", textAlign:"center"}}>
              <Col sm={{size : 6, offset : 3}}>
              {displayError}
              </Col>
            </Row>
            <label style={{textAlign:'left', marginTop:"30px", fontWeight:"600", fontSize:"24px"}}>Welcome back</label>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input type="username" name="email" id="exampleEmail" 
                placeholder="Username" onChange={this.onHandleEmail} />
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
              style={{height:'40px', backgroundColor:'#27AE60'}}>Login</Button>
            </Row>
            <Row style={{display:'inline-block', marginLeft:'300px', marginTop:'20px'}}>
              <span>New to Uber?</span>
              <Link to='/signup'>Create an account</Link>
              </Row>
              <br />
              <Row style={{display:'inline-block', marginLeft:'300px', marginTop:'20px'}}>
              <span>Restaurant user?</span>
              <Link to='/restaurantLogin'>Login here</Link>
              </Row>
          </Container>
          </div>
        );
    } 
}
  
Login.propTypes = {
  loginCustomerRedux: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired
}

const mapStateToProps = state =>{
  return({
    userDetails: state.login.userDetails
  });
}
  
export default connect(mapStateToProps, {loginCustomerRedux})(Login);
 