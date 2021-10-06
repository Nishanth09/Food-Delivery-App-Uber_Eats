import React from 'react';
import { Redirect } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
     Container, Row, Col } from 'reactstrap';

class CartPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkoutFlag : false
        }
    }
    handleCheckout = () => {
        this.setState({checkoutFlag : true});
    }
    render() { 
        let checkoutRedirect = null;
        if (this.state.checkoutFlag) {
            checkoutRedirect = <Redirect to='/checkout'/>
        }
        return (
            <div>
                {checkoutRedirect}
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>Restaurant Title</ModalHeader>
                <ModalBody>
                <Container>
                    <Row>
                        <Col sm={6}>
                        Chicken Biryani
                        </Col>
                        <Col sm={6}>
                            $13.99
                        </Col>
                        </Row>
                    </Container>
                </ModalBody>
                <ModalFooter>
                <Button onClick={this.handleCheckout} style={{backgroundColor:"black", width:"100%"}}>Go to check out</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}
 
export default CartPopUp;