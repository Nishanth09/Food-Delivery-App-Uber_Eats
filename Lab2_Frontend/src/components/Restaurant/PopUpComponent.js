import React from 'react';
import {Modal, Container, Row, Col, Button, Form} from 'react-bootstrap';
import { connect } from 'react-redux';
import { cartRedux, minusCartRedux, plusCartRedux } from '../../redux/reduxActions/restaurantAction';
import PropTypes from 'prop-types';
import { Label } from 'reactstrap';

class PopUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty : 1,
            instructions : null
        }
    }
    componentDidMount() {
        if (this.props.cart){
            for (let item of this.props.cart) {
                if (item.name === this.props.dishinfo.name) {
                    this.setState({qty : item.qty})
                }
            } 
        }
        console.log("props",this.props)
    }
    handleCart = async (dishinfo) => {
        console.log("inst ", this.state.instructions)
        const data = {
            dishDetails : {...dishinfo, instructions: this.state.instructions},
            qty : this.state.qty,
        }
        console.log(data,"------===")
        await this.props.cartRedux(data);
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
                      <img src={'/api/static/images/'+this.props.dishinfo.dishimage} alt="nothing"></img>
                    </Row>
                    <hr />
                <Row>
                    <h2>{this.props.dishinfo.name}</h2>
                </Row>
                <Row style={{marginTop:"20px", background:"#C8C6C6"}}>
                    <h5>Special Instructions</h5>
                </Row>
                <Row>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label >Add a note (extra sauce, no onions, etc.)</Form.Label>
                    <Form.Control as="textarea" rows={3} onChange={(e) => {this.setState({instructions : e.target.value})}} />
                </Form.Group>
                    </Row>
                    <hr />
                    <Row>
                        <Col sm={4}>
                            <Row>
                                <Col sm={4}>
                                <Button onClick={this.handleMinus.bind(this, this.props.dishinfo)} 
                                style={{background:"grey", borderRadius:"100%", color:"black", 
                                border: "none", width:"40px"}}>-</Button>
                                </Col>
                                <Col sm={4}>
                                    <Label style={{paddingTop:"10px", paddingLeft:"10px", fontSize:"20px"}}>{this.state.qty}</Label>
                                </Col>
                                <Col sm={4}>
                                <Button onClick={this.handlePlus.bind(this, this.props.dishinfo)} 
                                style={{background:"grey", borderRadius:"100%", color:"black", 
                                border: "none", width:"40px"}}>+</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col sm={8}>
                        <Button onClick={this.handleCart.bind(this, this.props.dishinfo)} 
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
    cart: PropTypes.array.isRequired,
}

const mapStateToProps = state =>{
    return({
        cart: state.restaurant.cartItems
    });
}
  
export default connect(mapStateToProps, {cartRedux, plusCartRedux, minusCartRedux})(PopUp);
