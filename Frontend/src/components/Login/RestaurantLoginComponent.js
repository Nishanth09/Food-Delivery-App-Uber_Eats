import React from 'react';
import {Input, Label, FormGroup, Button, Container, Row} from 'reactstrap';
import login_logo from '../../images/login_logo.png'
import { Link } from 'react-router-dom';
import {loginRestaurantRedux} from '../../redux/reduxActions/loginAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class RestaurantLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : null,
            password : null,
            flag : false
        }
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
        await this.props.loginRestaurantRedux(data);
        this.setState({flag : true});
        //action to be called 
      }
    render() {
        let redirectDashboard = null; 
        if (this.state.flag) {
            redirectDashboard = <Redirect to='/dashboard' />;
        }
        return (
            <div>
                {redirectDashboard}
          <Container>
            <Row style={{textAlign:'center', marginTop:'10px'}}>
              <img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginLeft:'250px', marginTop:'80px'}}></img>
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
              style={{height:'40px', backgroundColor:'#27AE60'}}>Login</Button>
            </Row>
            <Row style={{display:'inline-block', marginLeft:'300px', marginTop:'20px'}}>
              <span>New to Uber?</span>
              <Link to='/restaurantSignup'>Create an account</Link>
              </Row>
          </Container>
          </div>
        );
    }
}

RestaurantLogin.propTypes = {
    loginRestaurantRedux: PropTypes.func.isRequired,
    user: PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
        user: state.login.userDetails
    });
}
    
export default connect(mapStateToProps, {loginRestaurantRedux})(RestaurantLogin);