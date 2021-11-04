import React from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { getOrdersRedux } from '../../redux/reduxActions/ordersAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';

class CustomerPreparing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpFlag : [],
            restaurantname : null,
            orderDetails : []
        }
    }

    async componentDidMount() {
        await this.props.getOrdersRedux()
        if(this.props.restaurantDetails && this.props.orderDetails) {
            for(let restaurant of this.props.restaurantDetails) {
                if (restaurant.restid == this.props.orderDetails[0].restid ) {
                    this.setState({restaurantname : restaurant.name})
                }
            }
            let temp = []
            for (let order of this.props.orderDetails) {
                if (order.order_status === "preparing") {
                    temp.push(order)
                }
            }
            this.setState({orderDetails : temp})
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

    render() {
        let displayOrders = null
        if (this.state.orderDetails.length !== 0) {
            displayOrders = this.state.orderDetails.map((order, index) =>
                <Row style={{marginTop:"30px"}}>
                    <Row style={{marginTop:"10px"}}>
                        <Label style={{fontWeight:"600", fontSize:"20px"}}>{this.state.restaurantname}
                        </Label>
                    </Row>
                    <Row>
                        <p>order status :<strong>{order.order_status}</strong> order time : {order.order_time}&nbsp;&nbsp;
                         <a onClick={this.handleReceipt.bind(this, index)} 
                         style={{fontWeight:"600", color:"black", textDecoration:"underline"}}>
                             view receipt</a></p>
                    </Row>
                    <hr />
                    {this.state.popUpFlag[index] ? 
                    <Modal show={this.state.popUpFlag[index]} onHide={this.handleReceipt.bind(this, index)}>
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
                                <h2>{'$'+ order.price.toFixed(2)}</h2>
                            </Col>
                            </Row>
                                {order.order_items.map(item =>
                            <Row style={{marginTop:"10px"}}>
                                <Col sm={6}>
                                    <Label style={{fontWeight:"600", fontSize:"20px"}}>{item.name}</Label>
                                </Col>
                                <Col sm={{size : 3, offset : 3}}>
                                    <Label style={{fontWeight:"600", fontSize:"20px"}}>{item.price}</Label>
                                </Col>
                                <Col>
                                    <Row>
                                        <Label>Quantity : {item.qty}</Label>
                                    </Row>
                                    <Row>
                                        <Label>Category : {item.category}</Label>
                                    </Row>
                                    <Row>
                                        <Label>Description : {item.description}</Label>
                                    </Row>
                                    <Row>
                                        <Label>Ingredients : {item.ingredients}</Label>
                                    </Row>
                                </Col>
                                <hr />
                            </Row>
                )}
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

CustomerPreparing.propTypes = {
    orderDetails: PropTypes.array.isRequired,
    restaurantDetails : PropTypes.array.isRequired,
    getOrdersRedux: PropTypes.func.isRequired
  }
  
const mapStateToProps = state =>{
    return({
        orderDetails: state.order.orderDetails,
        restaurantDetails : state.restaurant.restaurantDetails,
    });
}
  
export default connect(mapStateToProps, { getOrdersRedux })(CustomerPreparing);