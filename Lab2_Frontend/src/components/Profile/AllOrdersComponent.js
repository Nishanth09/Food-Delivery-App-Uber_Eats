import React from 'react';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { getOrdersRedux, updateOrderRedux } from '../../redux/reduxActions/ordersAction';
import { getAllRestaurantsRedux } from '../../redux/reduxActions/restaurantAction';
import { getUserDetailsRedux } from '../../redux/reduxActions/userDetailsAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';

class AllCustomerOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpFlag : [],
            cancelFlag : false,
            restaurantname : null,
            orderDetails : []
        }
    }
 
    async componentDidMount() {
        await this.props.getUserDetailsRedux()
        console.log(this.props.userDetails)
        const data = {
            "location" : this.props.userDetails.city
        }
        await this.props.getAllRestaurantsRedux(data)
        await this.props.getOrdersRedux()
        if(this.props.restaurantDetails && this.props.orderDetails) {
            for(let restaurant of this.props.restaurantDetails) {
                if (restaurant._id == this.props.orderDetails[0].restid ) {
                    this.setState({restaurantname : restaurant.name})
                }
            }
            this.setState({orderDetails : this.props.orderDetails})
        }
        else {
            this.setState({orderDetails : []})
        }
    }

    handleReceipt = (index) => {
        let temp = this.state.popUpFlag;
        temp[index] = !temp[index];
        this.setState({popUpFlag : temp});  
    }

    handleCancel = async (orderid) => {
        this.setState({cancelFlag : !this.state.cancelFlag});
        const data = {
            orderid : orderid,
            order_status : "cancelled"
        };
        await this.props.updateOrderRedux(data)
    }

    handleToggle = () => {
        this.setState({cancelFlag : !this.state.cancelFlag});
    }

    render() {
        console.log("res name :", this.state.restaurantname)
        let displayOrders = null
        if (this.state.orderDetails.length !== 0) {
            displayOrders = this.state.orderDetails.map((order, index) =>
                <Row style={{marginTop:"30px"}}>
                    <Row style={{marginTop:"10px"}}>
                        <Label style={{fontWeight:"600", fontSize:"20px"}}>{this.state.restaurantname}
                        </Label>
                    </Row>
                    <Row>
                        <Col sm = {8}>
                        <p>order status :<strong>{order.order_status}</strong> order time : {order.order_time}&nbsp;&nbsp;
                         <a onClick={this.handleReceipt.bind(this, index)} 
                         style={{fontWeight:"600", color:"black", textDecoration:"underline"}}>
                             view receipt</a></p>
                        </Col>
                        <Col sm = {4} style={{marginBottom:"20px"}}>
                        <Button color="success" onClick={this.handleCancel.bind(this, order._id)}>Cancel Order</Button>
                        </Col>
                    </Row>
                    <hr />
                    {this.state.cancelFlag ? <Modal show={this.state.cancelFlag} onHide={this.handleToggle}>
                        <Modal.Header>
                        <Modal.Title style={{textAlign:"center"}}>Notification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Container>
                            Order cancelled successfully
                </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button style={{background:"black", width:"100%", border:"none"}} 
                onClick={this.handleToggle}>
                Close</Button>
                </Modal.Footer>
                </Modal> : null}
                    {this.state.popUpFlag[index] ? 
                    <Modal show={this.state.popUpFlag[index]} onHide={this.handleToggle.bind(this, index)}>
                        <Modal.Header>
                        <Modal.Title style={{textAlign:"center"}}>Receipt</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <Container>
                            <Row >
                            <Col sm={6}>
                                <h2>Total</h2>
                            </Col>
                            <Col sm={{size : 3, offset : 3}}>
                                <h2>${order.price}</h2>
                            </Col>
                            </Row>
                                {order.order_items.map(item =>
                            <Row style={{marginTop:"10px"}}>
                                <Col sm={6}>
                                    <Label style={{fontWeight:"600", fontSize:"20px"}}>{item.dishName}</Label>
                                </Col>
                                <Col sm={{size : 3, offset : 3}}>
                                    <Label style={{fontWeight:"600", fontSize:"20px"}}>{item.price}</Label>
                                </Col>
                                <Col>
                                    <Row>
                                        <Col sm = {6}>
                                            <Label>Quantity : {item.qty}</Label>
                                        </Col>
                                        <Col sm = {6}>
                                            <Label>Instructions : {item.instructions}</Label>
                                        </Col>
                                    </Row>
                                </Col>
                                <hr />
                            </Row>
                )}
                <Row>
                    <Label style={{fontWeight:500}}>Delivery Address : </Label>
                    <Label>{order.delivery_address}</Label> 
                </Row>
                </Container>
                </Modal.Body>
                <Modal.Footer>
                <Button style={{background:"black", width:"100%", border:"none"}} 
                onClick={this.handleReceipt.bind(this, index)}>
                Close</Button>
                </Modal.Footer>
                </Modal> : null}
                </Row>
                );
        } 
        return (
        <React.Fragment>
            <Container>
                {displayOrders}
                <Row>
                </Row>
            </Container>
        </React.Fragment>
        );
    }
}

AllCustomerOrders.propTypes = {
    orderDetails: PropTypes.array.isRequired,
    restaurantDetails : PropTypes.array.isRequired,
    userDetails: PropTypes.object.isRequired,
    getOrdersRedux: PropTypes.func.isRequired,
    getAllRestaurantsRedux: PropTypes.func.isRequired,
    getUserDetailsRedux : PropTypes.func.isRequired
  }
  
const mapStateToProps = state => {
    return({
        orderDetails: state.order.orderDetails,
        restaurantDetails : state.restaurant.restaurantDetails,
        userDetails : state.user.userDetails
    });
}
  
export default connect(mapStateToProps, { getUserDetailsRedux, getAllRestaurantsRedux, getOrdersRedux, updateOrderRedux })(AllCustomerOrders);
