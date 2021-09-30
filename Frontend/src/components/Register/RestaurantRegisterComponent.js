import React from 'react';
import { Button, Row, Container, FormGroup, Label, Input } from "reactstrap";
import { Link } from 'react-router-dom';
import login_logo from '../../images/login_logo.png';

class RestaurantRegister extends React.Component {
    render() { 
        return (
            <Container>
         <Row style={{textAlign:'center', marginTop:'10px'}}>
              <img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginLeft:'250px', marginTop:'80px'}}></img>
              <h4 style={{textAlign:'left', marginTop:"30px"}}>Let's get started</h4>
              </Row>
              <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="name">Enter the restaurant name</Label>
                <Input type="text" name="rname" id="rname" 
                placeholder="Restaurant name" 
                onChange={(e) => {this.setState({ name: e.target.value })}} />
                </FormGroup>
            </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="Email"
                onChange={(e) => this.setState({ email: e.target.value })} />
                </FormGroup>
            </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                  <Label for="examplePassword">Password</Label>
                  <Input type="password" name="password" 
                  id="examplePassword" placeholder="Enter password"
                  onChange={(e) => this.setState({ password: e.target.value })} />
            </FormGroup>
            </Row>
            <Row style={{ marginTop:'10px'}}>
            <FormGroup>
                  <Label for="location">Location</Label>
                  <Input type="text" name="location" 
                  id="location" placeholder="Enter location"
                  onChange={(e) => this.setState({ location: e.target.value })} />
            </FormGroup>
            </Row>
            <Row style={{ marginTop:'20px'}}>
              <Button onClick={this.onHandleSubmit} style={{height:'40px', 
              backgroundColor:'#27AE60'}}>Sign up</Button>
            </Row>
            <Row style={{display:'inline-block', marginLeft:'300px', marginTop:'20px'}}>
              <span>Already use Uber?</span>
              <Link to='/login'>Sign in</Link>
              </Row>
              <Row style={{marginTop:"20px"}}>
                  </Row>
          </Container>
        );
    }
}
 
export default RestaurantRegister;