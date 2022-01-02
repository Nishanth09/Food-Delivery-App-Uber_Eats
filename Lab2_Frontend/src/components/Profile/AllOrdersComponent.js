import React from 'react';
import { Container, Row, Col, Label, Button } from 'reactstrap';
import { getOrdersRedux, updateOrderRedux } from '../../redux/reduxActions/ordersAction';
import { getAllRestaurantsRedux } from '../../redux/reduxActions/restaurantAction';
import { getUserDetailsRedux } from '../../redux/reduxActions/userDetailsAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';


class AllCustomerOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            popUpFlag : [],
            cancelFlag : false,
            restaurantname : [],
            orderDetails : [],
            page : 1,
            limit : 10,
            ordersLength : 0
        }
    }
 
    async componentDidMount() {
        await this.props.getUserDetailsRedux()
        console.log(this.props.userDetails)
        const data = {
            "location" : ''
        }
        console.log("loc", data)
        await this.props.getAllRestaurantsRedux(data)
        const pD = {
            "page": 0,
            "limit": 0
        };
        await this.props.getOrdersRedux(pD)
        if(this.props.orderDetails) {
            this.setState({ordersLength : this.props.orderDetails.length})
        }
        const pageData = {
            "page": this.state.page,
            "limit": this.state.limit
        };
        console.log("page data", pageData);
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
            this.setState({orderDetails : this.props.orderDetails, restaurantname : resList})
        }
        else {
            this.setState({orderDetails : []})
        }
    }

    async componentDidUpdate (prevProps,prevState) {
        if (this.state.page !== prevState.page || this.state.limit !== prevState.limit) {
            const pageData = {
                "page": this.state.page,
                "limit": this.state.limit
            };
            console.log("page data", pageData);
            await this.props.getOrdersRedux(pageData)
            if(this.props.restaurantDetails && this.props.orderDetails) {
                let resList = []
                for (let order of this.props.orderDetails) {
                    for (let restaurant of this.props.restaurantDetails) {
                        if (restaurant._id === order.restid ) {
                            resList.push(restaurant.name)
                        }
                    }
                }
                console.log("res list:", resList)
                this.setState({orderDetails : this.props.orderDetails, restaurantname : resList})
            }
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

    handleLimit = (e) => {
        console.log(e.target.value)
        this.setState({limit: e.target.value})
    }

    handlePage = (e, value) => {
        this.setState({page: value});
    }

    render() {
        console.log(":o len", this.state.ordersLength)
        let boundary = Math.round(this.state.ordersLength/(this.state.limit));
        console.log("res name :", this.state.restaurantname)
        let displayOrders = null
        if (this.state.orderDetails.length !== 0) {
            displayOrders = this.state.orderDetails.map((order, index) =>
                <Row style={{marginTop:"30px"}}>
                    <Row style={{marginTop:"10px"}}>
                        <Label style={{fontWeight:"600", fontSize:"20px"}}>{this.state.restaurantname[index]}
                        </Label>
                    </Row>
                    <Row>
                        <Col sm = {8}>
                        <p>order status :<strong>{order.order_status}</strong> order time : {order.order_time.split('T')[0] + '  '}&nbsp;&nbsp;
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
                                           
                                        </Col>
                                        <Col sm = {6}>
                                            
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
                    <Col sm={3}>
                        <Label>Rows per page</Label>&nbsp;&nbsp;
                    <select onChange={this.handleLimit}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                    </Col>
                    <Col sm={9}>    
                        <Pagination count={boundary} page={this.state.page} onChange={this.handlePage} />
                    </Col>
                </Row>
                <Row style={{marginTop:"50px"}}>
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
