import React from 'react';
import './PopUp.css'
import {Modal, Container, Row, Col, Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { cartRedux } from '../../redux/reduxActions/cartAction';
import PropTypes from 'prop-types';

class PopUp extends React.Component {
    // handleClose = () => {
    //     this.props.cartRedux()
    //     this.props.onHide();
    // }
    handleCart = () => {
        this.props.cartRedux();
        this.props.cart.push(1);
    }
    render() { 
        console.log(this.props);
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
              <Container>
                  <Row>
                      <img src={this.props.dishInfo.dishImage} alt="nothing"></img>
                    </Row>
                    <hr />
                <Row>
                    <h2>{this.props.dishInfo.dishName}</h2>
                </Row>
                <Row style={{marginTop:"20px", background:"#C8C6C6"}}>
                    <h5>Choose your sides</h5>
                    <label>Required. Choose 2</label>
                </Row>
                <Row style={{marginTop:"10px"}}>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Rice" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Marconi Salad" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Steam Veggie" />
                </Form.Group>
                </Row>
                <Row style={{marginTop:"20px", background:"#C8C6C6"}}>
                    <h5>Special Instructions</h5>
                </Row>
                <Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Add a note (extra sauce, no onions, etc.)</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={4}>
                        <Button style={{background:"grey", borderRadius:"100%", color:"black", border: "none", width:"40px"}}>-</Button>
                        <Button style={{background:"grey", borderRadius:"100%", color:"black", border: "none", marginLeft:"40px", width:"40px"}}>+</Button>
                        </Col>
                        <Col sm={8}>
                        <Button onClick={this.handleCart} style={{background:"black", width:"100%", border:"none"}}>Add to Cart</Button>
                        </Col>
                        </Row>
              </Container>
            </Modal.Body>
          </Modal>
        );
    }
}

PopUp.propTypes = {
    cartRedux: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired
}

const mapStateToProps = state =>{
    console.log("state mapstatetoprops in popup",state);
    return({
        cart: state.cart.cartItems
    });
}
  
export default connect(mapStateToProps, {cartRedux})(PopUp);
