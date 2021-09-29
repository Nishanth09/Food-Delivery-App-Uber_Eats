import React from 'react';
import {Modal, Container, Row, Col, Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { cartRedux, minusCartRedux, plusCartRedux } from '../../redux/reduxActions/restaurantAction';
import PropTypes from 'prop-types';

class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty : 1
        }
    }
    handleCart = (dishinfo) => {
        this.props.cartRedux(dishinfo);
        this.props.onHide();
    }
    handleMinus = (dishinfo) => {
        this.setState((state, props) => {
            return {
              qty: state.qty - 1,
            };
          });
        this.props.minusCartRedux(dishinfo);
    }
    handlePlus = (dishinfo) => {
        this.setState((state, props) => {
            return {
              qty: state.qty + 1,
            };
          });
        this.props.plusCartRedux(dishinfo);
    }
    render() { 
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
                        <Button onClick={this.handleMinus.bind(this, this.props.dishInfo)} 
                        style={{background:"grey", borderRadius:"100%", color:"black", 
                        border: "none", width:"40px"}}>-</Button>
                        {this.state.qty}
                        <Button onClick={this.handlePlus.bind(this, this.props.dishInfo)} 
                        style={{background:"grey", borderRadius:"100%", color:"black", 
                        border: "none", marginLeft:"40px", width:"40px"}}>+</Button>
                        </Col>
                        <Col sm={8}>
                        <Button onClick={this.handleCart.bind(this, this.props.dishInfo)} 
                        style={{background:"black", width:"100%", border:"none"}}>
                            Add {this.state.qty} to Cart</Button>
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
    plusCartRedux: PropTypes.func.isRequired,
    minusCartRedux: PropTypes.func.isRequired,
    cart: PropTypes.array.isRequired
}

const mapStateToProps = state =>{
    console.log("state mapstatetoprops in popup",state);
    return({
        cart: state.restaurant.cartItems
    });
}
  
export default connect(mapStateToProps, {cartRedux, plusCartRedux, minusCartRedux})(PopUp);
