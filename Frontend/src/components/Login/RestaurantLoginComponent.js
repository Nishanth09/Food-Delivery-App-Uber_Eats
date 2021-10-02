import React from 'react';
import {Input, Label, FormGroup, Button, Container, Row} from 'reactstrap';
import login_logo from '../../images/login_logo.png';
import { Link } from 'react-router-dom';
import {loginRestaurantRedux} from '../../redux/reduxActions/loginAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

class RestaurantLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username : null,
            password : null,
            flag : false
        }
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
        await this.props.loginRestaurantRedux(data);
        this.setState({flag : true});
      }
    render() {
        let redirectDashboard = null; 
        if (this.state.flag) {
            redirectDashboard = <Redirect to='/dashboard/profile' />;
        } 
        return (
            <div>
                {redirectDashboard}
          <Container>
            <Row style={{textAlign:'center', marginTop:'10px'}}>
              <Link to='/'><img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginTop:'80px'}}></img></Link>
              <br />
              <label style={{marginTop:"10px", fontFamily:"sans-serif", fontWeight:"200", fontStyle:"italic"}}>For Restaurants</label>
              <label style={{textAlign:'left', marginTop:"30px", fontWeight:"600", fontSize:"24px"}}>Welcome back</label>
              </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="exampleEmail">Username</Label>
                <Input type="text" name="username" id="exampleEmail" 
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