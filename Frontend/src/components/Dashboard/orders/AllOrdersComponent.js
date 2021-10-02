import React from 'react';
import { Container, Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';
import { Link } from 'react-router-dom';

class AllOrders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deliveryDropdownOpen : [false, false, false],
            pickupDropdownOpen : [false, false, false],
            orderStatus : [null, null, null]
        }
    }
    handlePickupToggle = (index) => {
        let temp = this.state.pickupDropdownOpen;
        temp[index] = !temp[index];
        this.setState({pickupDropdownOpen : temp});
        //this.setState({pickupDropdownOpen : !this.state.pickupDropdownOpen});
    }
    handleDeliveryToggle = (index) => {
        let temp = this.state.deliveryDropdownOpen;
        temp[index] = !temp[index];
        this.setState({deliveryDropdownOpen : temp});
        //this.setState({pickupDropdownOpen : !this.state.pickupDropdownOpen});
    }
    handleOrderReceived = (index) => {
        let temp = this.state.pickupDropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "Order Received";
        temp[index] = !temp[index];
        this.setState({orderStatus:tempStatus, pickupDropdownOpen : temp});
    }
    handlePrepareOrder = (index) => {
        let temp = this.state.pickupDropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "Preparing order";
        temp[index] = !temp[index];
        this.setState({orderStatus :tempStatus, pickupDropdownOpen : temp});
    }
    handlePickupReady = (index) => {
        let temp = this.state.pickupDropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "Pick up ready";
        temp[index] = !temp[index];
        this.setState({orderStatus: tempStatus, pickupDropdownOpen : temp});
    }
    handlePicked = (index) => {
        let temp = this.state.pickupDropdownOpen;
        let tempStatus = this.state.orderStatus;
        tempStatus[index] = "Picked";
        temp[index] = !temp[index];
        this.setState({orderStatus: tempStatus, pickupDropdownOpen : temp});
    }
    render() { 
        let pickupDropDown = [null,null,null];
        let deliveryDropDown = [null,null,null];
        if (this.state.pickupDropdownOpen[0]) {
            pickupDropDown[0] = (
                <div>
                    <ButtonGroup vertical>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handleOrderReceived.bind(this, 0)}>Order Received</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handlePrepareOrder.bind(this, 0)}>Preparing Order</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handlePickupReady.bind(this, 0)}>Pick up ready</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handlePicked.bind(this, 0)}>Picked up</Button>
                    </ButtonGroup>
                </div>
            );
            deliveryDropDown[0] = (
                <div>
                    <ButtonGroup vertical>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"Order Received", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>Order Received</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"Preparing Order", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>Preparing Order</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"On the way", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>On the way</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"Delivered", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>Delivered</Button>
                    </ButtonGroup>
                </div>
            );
        }
        if (this.state.pickupDropdownOpen[1]) {
            pickupDropDown[1] = (
                <div>
                    <ButtonGroup vertical>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handleOrderReceived.bind(this, 1)}>Order Received</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handlePrepareOrder.bind(this, 1)}>Preparing Order</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handlePickupReady.bind(this, 1)}>Pick up ready</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={this.handlePicked.bind(this, 1)}>Picked up</Button>
                    </ButtonGroup>
                </div>
            );
            deliveryDropDown[0] = (
                <div>
                    <ButtonGroup vertical>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"Order Received", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>Order Received</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"Preparing Order", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>Preparing Order</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"On the way", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>On the way</Button>
                    <Button style={{border:"none", background:"grey"}}
                    onClick={() => {this.setState({orderStatus:"Delivered", pickupDropdownOpen : !this.state.pickupDropdownOpen})}}>Delivered</Button>
                    </ButtonGroup>
                </div>
            );
        }
        return (
            <Container style={{backgroundColor:"#F2F3F4"}}>
                <Row style={{marginTop:"50px", border:"solid grey 1px"}}>
                    <Row>
                    <Col sm={8} style={{ height:"80px"}}>
                        <p style={{marginTop:"20px", marginRight:"200px"}}>Pick Up Order is placed by <Link to='/dashboard/orders/all/orderstatus'><strong>Customer 1</strong></Link></p>
                    </Col>
                    <Col sm={4} style={{marginTop:"10px"}}>
                        <Button className="btn dropdown-toggle" onClick={this.handlePickupToggle.bind(this, 0)}>
                            Update Delivery Status
                        </Button>
                        {pickupDropDown[0]}
                    </Col>
                    </Row>
                    <Row style={{textAlign:"center"}}>
                        Current Status : {this.state.orderStatus[0]}
                    </Row>
                </Row>
                <Row style={{marginTop:"50px", border:"solid grey 1px"}}>
                    <Row>
                    <Col sm={8} style={{ height:"80px"}}>
                        <p style={{marginTop:"20px", marginRight:"200px"}}>Pick up Order is placed by <Link to='/dashboard/orders/all/orderstatus'><strong>Customer 2</strong></Link></p>
                    </Col>
                    <Col sm={4} style={{marginTop:"10px"}}>
                        <Button className="btn dropdown-toggle" onClick={this.handlePickupToggle.bind(this, 1)}>
                        Update Delivery Status
                        </Button>
                        {pickupDropDown[1]}
                    </Col>
                    </Row>
                    <Row style={{textAlign:"center"}}>
                        Current Status : {this.state.orderStatus[1]}
                    </Row>
                </Row>
                {/* <Row style={{marginTop:"50px", border:"solid grey 1px"}}>
                    <Row>
                    <Col sm={8} style={{ height:"80px"}}>
                        <p style={{marginTop:"20px", marginRight:"200px"}}>Delivery Order is placed by <Link to='/dashboard/orders/all/orderstatus'><strong>Customer 2</strong></Link></p>
                    </Col>
                    <Col sm={4} style={{marginTop:"10px"}}>
                        <Dropdown isOpen={this.state.pickupDropdownOpen} toggle={this.handleToggle}>
                            <DropdownToggle caret>
                                Delivery Status
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "Order Received"})}}>Order Received</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "Preparing Order"})}}>Preparing Order</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "On the Way"})}}>On the Way</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "Delivered"})}}>Delivered</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    </Row>
                    <Row style={{textAlign:"center"}}>
                        Current Status : {this.state.orderStatus}
                    </Row>
                </Row>
                <Row style={{marginTop:"50px", border:"solid grey 1px"}}>
                    <Row>
                    <Col sm={8} style={{ height:"80px"}}>
                        <p style={{marginTop:"20px", marginRight:"200px"}}>Delivery Order is placed by <Link to='/dashboard/orders/all/orderstatus'><strong>Customer 3</strong></Link></p>
                    </Col>
                    <Col sm={4} style={{marginTop:"10px"}}>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                            <DropdownToggle caret>
                                Delivery Status
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "Order Received"})}}>Order Received</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "Preparing Order"})}}>Preparing Order</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "On the Way"})}}>On the Way</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({orderStatus : "Delivered"})}}>Delivered</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    </Row>
                    <Row style={{textAlign:"center"}}>
                        Current Status : {this.state.orderStatus}
                    </Row>
                </Row> */}
                </Container>
        );
    }
}
 
export default AllOrders;