import React from 'react';
import { Redirect } from "react-router-dom";
import { Container, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutRestaurantRedux} from '../../redux/reduxActions/logoutAction';
class ManagerProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag : false
        }
    }

    handleLogout = async (e) => {
        e.preventDefault();
        const data = {
        };
        await this.props.logoutRestaurantRedux();
        this.setState({flag : true});
    };

    render() { 
    let redirectHome = null;
    if (this.state.flag) {
      redirectHome = <Redirect to="/" />
    }
        return (
            <Container>
                {redirectHome}
                <Row>
                    <Col sm={3}>
                    <h2>Your Profile</h2>
                    </Col>
                    <Col sm={{size: 3, offset:6}} style={{marginTop:"10px"}}>
                    <Button onClick={this.handleLogout} className="btn btn-secondary" style={{width:"100px"}}>logout</Button>
                    </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <h4>Restaurant picture</h4>
                        <img src= "../../userIcon.jpg" alt="nothing" style={{width:"100px", height:"100px"}}></img>
                        <input
                        className="btn"
                        style={{
                            marginLeft: "-10px",
                            width: 250,
                            textAlign: "left",
                        }}
                        type="file"
                        name="image"
                        alt="nothing"
                        onChange={this.handleFileUpload}
                        />
                        </Col>
                    </Row>
                    <Row>
                    <FormGroup>
                        <Label for="rname">Restaurant Name</Label>
                        <Input type="text" name="rname" id="ranme" 
                        placeholder="Enter restaurant name" />
                    </FormGroup>
                    </Row>
                    <Row style={{marginTop:"10px"}}>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" name="location" id="location" 
                        placeholder="Enter location" />
                    </FormGroup>
                    </Row>
                    <Row style={{marginTop:"10px"}}>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" 
                        placeholder="Enter description" />
                    </FormGroup>
                    </Row>
                    <Row style={{marginTop:"10px"}}>
                    <FormGroup>
                        <Label for="contact">Description</Label>
                        <Input type="text" name="contact" id="contact" 
                        placeholder="Enter your contact" />
                    </FormGroup>
                    </Row>
                    <Row style={{marginTop:"30px"}}>
                    <Button
                    style={{height:'40px', backgroundColor:'#27AE60'}}>Save</Button>
                    </Row>
                    <Row style={{marginTop:"20px"}}></Row>
                </Container>
        );
    }
}

ManagerProfile.propTypes = {
    logoutRestaurantRedux: PropTypes.func.isRequired,
    user: PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
        user: state.login.userDetails
    });
}
    
export default connect(mapStateToProps, {logoutRestaurantRedux})(ManagerProfile);