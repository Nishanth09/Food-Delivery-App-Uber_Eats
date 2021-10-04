import React, { Component } from 'react';
import { Col, Container, Row, Button } from 'reactstrap';

class Checkout extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() { 
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
                        <Row style={{marginTop:"20px"}}>
                            <Col sm={8}>
                                <label>Chicken Biryani</label>
                            </Col>
                            <Col sm={4}>
                                <label>$23.90</label>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col sm={8}>
                                <label>Panner rice</label>
                            </Col>
                            <Col sm={4}>
                                <label>$23.90</label>
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col sm={8}>
                                <label>Chocolate ice cream</label>
                            </Col>
                            <Col sm={4}>
                                <label>$23.90</label>
                            </Col>
                        </Row>
                        <hr />
                    </Col>
                    <Col sm={5} style={{backgroundColor:"#E5E7E9"}}>
                    <Button style={{backgroundColor:"#1E8449", width:"100%", marginTop:"40px"}}>Place your order</Button>
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
                            $5.84
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
                                $18.90
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
 
export default Checkout;