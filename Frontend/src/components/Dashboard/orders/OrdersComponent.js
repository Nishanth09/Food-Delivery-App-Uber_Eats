import React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

class Orders extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            all : false,
            new : false,
            delivered : false,
            cancelled : false
        }
    }
    
    render() { 
        return (
            <Container>
                <Row style={{marginTop:"30px"}}>
                    <Col>
                    <div onClick={() => {this.setState({all : true})}} style={{borderRadius:"30px", 
                    backgroundColor:"grey", height:"50px", textAlign:"center", color:"black"}}>
                    <Link style={{ textDecoration:'none', border:'none', color:'black'}}
                        to="/dashboard/orders/all">All Orders</Link>
                        </div>
                    </Col>
                    <Col>
                    <div onClick={() => {this.setState({new : true})}} style={{borderRadius:"30px", 
                    backgroundColor:"grey", height:"50px", textAlign:"center", color:"black"}}>
                    <Link style={{ textDecoration:'none', border:'none', color:'black'}}
                        to="/dashboard/orders/new">New Orders</Link>
                        </div>
                    </Col>
                    <Col>
                    <div onClick={() => {this.setState({delivered : true})}} style={{borderRadius:"30px", backgroundColor:"grey", 
                    height:"50px", textAlign:"center", color:"black"}}>
                        <Link style={{ textDecoration:'none', border:'none', color:'black'}}
                        to="/dashboard/orders/delivered">Delivered Orders</Link>
                        </div>
                    </Col>
                    <Col>
                    <div onClick={() => {this.setState({cancelled : true})}} style={{borderRadius:"30px", backgroundColor:"grey", 
                    height:"50px", textAlign:"center", color:"black"}}>
                    <Link style={{ textDecoration:'none', border:'none', color:'black'}}
                        to="/dashboard/orders/cancelled">Cancelled Orders</Link>
                        </div>
                    </Col>
                </Row>
                </Container>
        );
    }
}

export default Orders;
