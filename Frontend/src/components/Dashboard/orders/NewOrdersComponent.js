import React from 'react';
import { Container, Row, Col, Label, Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { getCustomerOrdersRedux, updateOrderRedux } from '../../../redux/reduxActions/ordersAction';
import { Redirect } from 'react-router';

class NewOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen : [],
            orderStatus : [],
            orderDetails : [],
            popUp : [],
            redirectToAllOrders : false
        }
    }
 
    async componentDidMount() {
        await this.props.getCustomerOrdersRedux();
        if (this.props.orderDetails) {
            let orDetails = []
            for (let order of this.props.orderDetails) {
                if (order.order_status === "placed") {
                    orDetails.push(order)
                }
            }
            this.setState({orderDetails : orDetails})
        }
    }

    handleToggle = (index) => {
        let temp = this.state.dropdownOpen;
        temp[index] = !temp[index];
        this.setState({dropdownOpen : temp});
    }
    
    handleOrderReceived = async (index) => {
        let temp = this.state.dropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "received";
        temp[index] = !temp[index];
        this.setState({orderStatus:tempStatus, dropdownOpen : temp});
        const data = {
            orderid : this.state.orderDetails[index]._id,
            order_status : this.state.orderStatus[index]
        }
        await this.props.updateOrderRedux(data)
        this.setState({redirectToAllOrders : true})
    }

    handlePrepareOrder = async (index) => {
        let temp = this.state.dropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "preparing";
        temp[index] = !temp[index];
        this.setState({orderStatus :tempStatus, dropdownOpen : temp});
        const data = {
            orderid : this.state.orderDetails[index]._id,
            order_status : this.state.orderStatus[index]
        }
        await this.props.updateOrderRedux(data)
        this.setState({redirectToAllOrders : true})
    }

    handleReady = async (index) => {
        let temp = this.state.dropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "ready";
        temp[index] = !temp[index];
        this.setState({orderStatus: tempStatus, dropdownOpen : temp});
        const data = {
            orderid : this.state.orderDetails[index]._id,
            order_status : this.state.orderStatus[index]
        }
        console.log("data: ", data)
        await this.props.updateOrderRedux(data)
        this.setState({redirectToAllOrders : true})
    }

    handleDelivered = async (index) => {
        let temp = this.state.dropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "delivered";
        temp[index] = !temp[index];
        this.setState({orderStatus: tempStatus, dropdownOpen : temp});
        const data = {
            orderid : this.state.orderDetails[index]._id,
            order_status : this.state.orderStatus[index]
        }
        await this.props.updateOrderRedux(data)
        this.setState({redirectToAllOrders : true})
    }

    handleCancel = async (index) => {
        let temp = this.state.dropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "cancelled";
        temp[index] = !temp[index];
        this.setState({orderStatus: tempStatus, dropdownOpen : temp});
        const data = {
            orderid : this.state.orderDetails[index]._id,
            order_status : this.state.orderStatus[index]
        }
        await this.props.updateOrderRedux(data)
        this.setState({redirectToAllOrders : true})
    }

    handleCustomerProfile = (index) => {
        let temp = this.state.popUp
        temp[index] = !temp[index]
        this.setState({popUp : temp})
    }
    
    render() {
        let reAll = null
        if (this.state.redirectToAllOrders) {
            reAll = <Redirect to = '/dashboard/orders/all' />
        }
        let displayDropDown = []
        for (let i = 0; i < this.state.dropdownOpen.length; i++) {
            displayDropDown[i] = null
        }
        console.log(this.state.dropdownOpen,"=====")
        for (let i = 0; i < this.state.dropdownOpen.length; i++) {
            if (this.state.dropdownOpen[i]) {
                displayDropDown[i] = (
                    <div>
                        <ButtonGroup vertical>
                        <Button style={{border:"none", background:"grey"}}
                        onClick={this.handleOrderReceived.bind(this, i)}>Order Received</Button>
                        <Button style={{border:"none", background:"grey"}}
                        onClick={this.handlePrepareOrder.bind(this, i)}>Preparing Order</Button>
                        <Button style={{border:"none", background:"grey"}}
                        onClick={this.handleReady.bind(this, i)}>Order ready</Button>
                        <Button style={{border:"none", background:"grey"}}
                        onClick={this.handleDelivered.bind(this, i)}>Delivered</Button>
                        <Button style={{border:"none", background:"grey"}}
                        onClick={this.handleCancel.bind(this, i)}>Cancel</Button>
                        </ButtonGroup>
                    </div>
                );
            }
        }
        let displayOrders = null
        displayOrders = this.state.orderDetails.map((order, index) => 
            <Row style={{marginTop:"50px", border:"solid grey 1px", borderRadius:"20px", padding:"10px"}}>
                <Row>
                <Col sm={8} style={{ height:"80px"}}>
                    <p style={{marginTop:"20px", marginRight:"200px"}}>
                        Order is placed by&nbsp;
                        <a onClick={this.handleCustomerProfile.bind(this, index)}>
                            <strong style={{color:"black", textDecoration:"underline"}}>{order.userid.username}</strong></a></p>
                            {this.state.popUp[index] ? <Modal isOpen={this.state.popUp[index]} toggle={this.handleCustomerProfile.bind(this, index)}>
                                                <ModalHeader toggle={this.handleCustomerProfile.bind(this, index)}>Customer Profile</ModalHeader>
                                                <ModalBody>
                                                <Container>
                                                    <Row style={{marginTop:"20px"}}>
                                                        <Col sm={6}>
                                                        <Label style={{fontWeight:"600"}}>Customer Name</Label>
                                                        </Col>
                                                        <Col sm={6}>
                                                        <Label>{order.userid.username}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop:"20px"}}>
                                                    <Col sm={6}>
                                                        <Label style={{fontWeight:"600"}}>Customer Nickname</Label>
                                                        </Col>
                                                        <Col sm={6}>
                                                        <Label>{order.userid.nickname}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop:"20px"}}>
                                                    <Col sm={6}>
                                                        <Label style={{fontWeight:"600"}}>Customer Contact</Label>
                                                        </Col>
                                                        <Col sm={6}>
                                                        <Label>{order.userid.mobile}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop:"20px"}}>
                                                    <Col sm={6}>
                                                        <Label style={{fontWeight:"600"}}>Customer Email</Label>
                                                        </Col>
                                                        <Col sm={6}>
                                                        <Label>{order.userid.email}</Label>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{marginTop:"20px"}}>
                                                    <Col sm={6}>
                                                        <Label style={{fontWeight:"600"}}>Delivery Address</Label>
                                                        </Col>
                                                        <Col sm={6}>
                                                        <Label>{order.userid.delivery_address}</Label>
                                                        </Col>
                                                    </Row>
                                                </Container>
                                                </ModalBody>
                                                <ModalFooter>
                                                <Button style={{backgroundColor:"black", color:"white"}} onClick={this.handleCustomerProfile.bind(this, index)}>Okay</Button>
                                                </ModalFooter>
                                            </Modal> : null}
                </Col>
                <Col sm={4} style={{marginTop:"10px"}}>
                    <Button className="btn dropdown-toggle" onClick={this.handleToggle.bind(this, index)}>
                        Update Delivery Status
                    </Button>
                    {displayDropDown[index]}
                </Col>
                </Row>
                <hr />
                <Row style={{textAlign:"center"}}>
                    <Row>
                    <Col sm={6}>
                    <Label style={{fontWeight:"500"}}>Order items</Label>
                    </Col>
                    <Col sm={6}>
                    <Label style={{fontWeight:"500"}}>Price</Label>
                    </Col>      
                    </Row>
                    {order.order_items.map(item => 
                        <Row style={{marginTop:"10px"}}>
                            <Col sm={6}>
                            {item.dishName}
                            </Col>
                            <Col sm={6}>
                            {item.price}
                            </Col>
                        </Row>
                        )}
                        <hr />
                        <Row>
                    <Col sm={6}>
                    <Label style={{fontWeight:"500"}}>Total Price</Label>
                    </Col>
                    <Col sm={6}>
                    <Label style={{fontWeight:"500"}}>${order.price}</Label>
                    </Col>      
                    </Row>
                </Row>
            </Row>
        )
    
        return (
            <Container>
                {reAll}
                {displayOrders}
                <Row style={{marginTop:"40px"}}>
                </Row>
                </Container>
        );
    }
}

NewOrders.propTypes = {
    updateOrderRedux : PropTypes.func.isRequired,
    orderDetails: PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
      orderDetails: state.order.orderDetails
    });
}
    
export default connect(mapStateToProps, { getCustomerOrdersRedux, updateOrderRedux })(NewOrders);
