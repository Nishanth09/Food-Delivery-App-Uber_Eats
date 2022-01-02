import React from 'react';
import { Container, Row, Col, Label } from 'reactstrap';
import { getOrdersRedux } from '../../redux/reduxActions/ordersAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Modal, Button} from 'react-bootstrap';


class CustomerDelivered extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpFlag : [],
            restaurantname : [],
            orderDetails : []
        }
    }

    async componentDidMount() {
        const pageData = {
            "page": 1,
            "limit": 20
        };
        await this.props.getOrdersRedux(pageData)
        if(this.props.restaurantDetails && this.props.orderDetails) {
            let resList = []
            for (let order of this.props.orderDetails) {
                for (let restaurant of this.props.restaurantDetails) {
                    if (restaurant._id == order.restid ) {
                        resList.push(restaurant.name)
                    }
                }
            }
            let temp = []
            for (let order of this.props.orderDetails) {
                if (order.order_status === "delivered") {
                    temp.push(order)
                }
            }
            this.setState({orderDetails : temp, restaurantname : resList})
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
                        <Label style={{fontWeight:"600", fontSize:"20px"}}>{this.state.restaurantname[index]}
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
                                <h2>{order.price}</h2>
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

CustomerDelivered.propTypes = {
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
  
export default connect(mapStateToProps, { getOrdersRedux })(CustomerDelivered);