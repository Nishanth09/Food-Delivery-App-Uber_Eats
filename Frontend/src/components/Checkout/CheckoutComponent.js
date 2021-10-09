import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { placeOrderRedux } from '../../redux/reduxActions/ordersAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class Checkout extends React.Component {
    constructor(props) {
        super(props);
        
    }
    handleOrder = () => {        
        let today = new Date(), 
        date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let t = new Date(),
        time = t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds();
        console.log(date, time)
        let timestamp = date + ' ' + time
        console.log(timestamp, this.props.selectedRestaurantDetails[0]);
        const data = {
            restid : this.props.selectedRestaurantDetails[0].restid,
            order_status : "placed",
            order_items : this.props.cart,
            price : this.props.amount,
            order_time : timestamp
        }
        this.props.placeOrderRedux(data)
    }
    render() {
        let finalItems = null
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
            <Container>
                <Row>
                    <Col sm={7} style={{marginTop:"40px"}}>
                        <div>
                           <label style={{fontWeight:"600", fontFamily:"Verdana"}}> Starbird Apartments</label>
                           <p>123 apt, abc street, san jose, CA - 95134</p>
                        </div>
                        <hr />
                        <div>
                           <label style={{fontWeight:"600", fontFamily:"Verdana"}}> Parkway Apartments</label>
                           <p>123 apt, abc street, san jose, CA - 95134</p>
                        </div>
                        <hr />
                        <Button onClick={this.handleAddress} style={{backgroundColor:"black", width:"100%", marginTop:"20px"}}>Add a delivery address</Button>
                        <label style={{fontWeight:"500", marginTop:"20px"}}>Your items</label>
                        {finalItems}
                    </Col>
                    <Col sm={5} style={{backgroundColor:"#E5E7E9"}}>
                    <Button onClick={this.handleOrder} style={{backgroundColor:"#1E8449", width:"100%", marginTop:"40px"}}>Place your order</Button>
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
                                {'$'+ (parseFloat(this.props.amount) + 2.81 + 2.84)}
                            </Col>
                            </Row>
                            <Row style={{marginTop:"220px"}}>
                        
                        </Row>
                    </Col>
                    </Row>
                </Container>
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
        selectedRestaurantDetails: state.restaurant.selectedRestaurantDetails
    });
}
  
export default connect(mapStateToProps, {placeOrderRedux})(Checkout);