import React, { Component } from 'react';
import { Col, Container, Row, Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { placeOrderRedux } from '../../redux/reduxActions/ordersAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeFlag : false,
            addressFlag : false,
            address : null,
            toggleFlag : false
        }
    }
    handleOrder = () => {        
        let today = new Date(), 
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let t = new Date(),
        time = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
        console.log(date, time)
        let timestamp = date + ' ' + time
        if (this.props.selectedRestaurantDetails[0]) {
            const addData = this.props.userDetails.street + ' ' + this.props.userDetails.city + ' ' + this.props.userDetails.country + ' ' + this.props.userDetails.state + ' ' + this.props.userDetails.zip
            const data = {
                restid : this.props.selectedRestaurantDetails[0]._id,
                order_status : "placed",
                order_items : this.props.cart,
                price : this.props.amount,
                order_time : timestamp,
                delivery_address : addData
            }
            console.log(data,"place order")
            this.props.placeOrderRedux(data)
            this.setState({toggleFlag : true})
        }
        this.setState({toggleFlag : true})
    }

    handleToggle = () => {
        this.setState({toggleFlag : !this.state.toggleFlag})
    }

    handleAddress = () => {
        this.setState({addressFlag : true})
    }

    handleSave = () => {
        this.setState({address : this.state.address})
    }

    handleDeliveryAddress = () => {
        let addData = null;
        addData = this.props.userDetails.street + ' ' + this.props.userDetails.city + ' ' + this.props.userDetails.country + ' ' + this.props.userDetails.state + ' ' + this.props.userDetails.zip
        this.setState({address : addData})
    }

    render() {
        let finalItems = null
        let redirectHome = null
        let addressDisplay = null
        if (this.state.addressFlag) {
            addressDisplay = <Row>
                                <FormGroup>
                                    <Label for="exampleAddress">Address</Label>
                                    <Input type="text" onChange={(e) => this.setState({address : e.target.value})} name="address" id="exampleAddress" placeholder="123 St"/>
                                </FormGroup>
                                <Button onClick={this.handleSave} style={{marginTop:"20px", backgroundColor:"#1E8449"}}>Save</Button>
                            </Row>
        }
        if (this.state.homeFlag) {
            redirectHome = <Redirect to='/home'/>
        }
        finalItems = this.props.cart.map(item => 
                <Row style={{marginTop:"10px"}}>
                    <Row style={{marginTop:"20px"}}>
                            <Col sm={8}>
                                <label>{item.name}</label>
                            </Col>
                            <Col sm={4}>
                                <label>{'$'+ (parseFloat(item.price.split('$')[1])*parseFloat(item.qty)).toFixed(2)}</label>
                            </Col>
                        </Row>
                        <hr />
                </Row>
        )
        return (
            <React.Fragment>
                {redirectHome}
            <Container>
                <Row>
                    <Col sm={7} style={{marginTop:"40px"}}>
                        <div onClick={this.handleDeliveryAddress}>
                           <label style={{fontWeight:"600", fontFamily:"Verdana"}}>{this.props.userDetails.street}</label>
                           <p>{ this.props.userDetails.city + ' ' + this.props.userDetails.country + ' ' + this.props.userDetails.state + ' ' + this.props.userDetails.zip }</p>
                        </div>
                        <hr />
                        {addressDisplay}
                        <Button onClick={this.handleAddress} style={{backgroundColor:"black", width:"100%", marginTop:"20px"}}>Add a delivery address</Button>
                        <label style={{fontWeight:"500", marginTop:"20px"}}>Your items</label>
                        {finalItems}
                    </Col>
                    <Col sm={5} style={{backgroundColor:"#E5E7E9"}}>
                    <Button onClick={this.handleOrder} style={{backgroundColor:"#1E8449", width:"100%", marginTop:"40px"}}>Place your order</Button>
                    {this.state.toggleFlag ? <Modal isOpen={this.state.toggleFlag} toggle={this.handleToggle}>
                                                <ModalHeader toggle={this.handleToggle}>Order Status</ModalHeader>
                                                <ModalBody>
                                                Your order is placed successfully
                                                </ModalBody>
                                                <ModalFooter>
                                                <Button style={{backgroundColor:"black", color:"white"}} onClick={() => this.setState({homeFlag : true})}>Okay</Button>
                                                </ModalFooter>
                                            </Modal> : null}
                    <p style={{fontSize:"14px", marginTop:"10px"}}>If you’re not around when the delivery person arrives, they’ll leave your order at the door. By placing your order, you agree to take full responsibility for it once it’s delivered.</p>
                    <hr />
                    <Row style={{marginTop:"20px", fontFamily:"arial"}}>
                        <Col sm={8}>
                            Subtotal
                            <br />
                            <br />
                            Taxes & Fees
                            <br />
                            <br />
                            Delivery Fee
                        </Col>
                        <Col sm={4}>
                            {'$'+this.props.amount}
                            <br />
                            <br />
                            $2.81
                            <br />
                            <br />
                            $2.84
                            <br />
                        </Col>
                        </Row>
                        <hr />
                        <Row style={{marginTop:"20px", fontFamily:"arial", fontWeight:"bold"}}>
                            <Col sm={8}>
                                Total
                            </Col>
                            <Col sm={4}>
                                {'$'+ (parseFloat(this.props.amount) + 2.81 + 2.84).toFixed(2)}
                            </Col>
                            </Row>
                            <Row style={{marginTop:"220px"}}>
                        
                        </Row>
                    </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

Checkout.propTypes = {
    cart: PropTypes.array.isRequired,
    amount: PropTypes.string.isRequired,
    selectedRestaurantDetails: PropTypes.array.isRequired,
    placeOrderRedux: PropTypes.func.isRequired
  }
  
const mapStateToProps = state =>{
    return({
        cart: state.restaurant.cartItems,
        amount : state.restaurant.totalAmount,
        selectedRestaurantDetails: state.restaurant.selectedRestaurantDetails,
        userDetails : state.user.userDetails
    });
}
  
export default connect(mapStateToProps, {placeOrderRedux})(Checkout);
