import React from 'react';
import { Redirect } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
     Container, Row, Col } from 'reactstrap';
import { checkoutRedux, qtyRedux } from '../../redux/reduxActions/restaurantAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class CartPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkoutFlag : false,
            qty : [],
        }
    }

    componentDidMount() {
        let qtyList = []
        if (this.props.cart) {
            for (let item of this.props.cart) {
                qtyList.push(item.qty)
            }
        }
        this.setState({qty : qtyList})
    }

    handleCheckout = () => {
        let priceList = []
        for (let item of this.props.cart) {
            priceList.push(item.price)
        }
        const data = {
            price : priceList,
            qty : this.state.qty
        }
        console.log(this.state.qty)
        console.log("data", data)
        this.props.checkoutRedux(data)
        this.setState({checkoutFlag : true});
    }

    handleQty = (index, item, e) => {
        let temp = this.state.qty;
        temp[index] = parseInt(e.target.value);
        this.setState((state, props) => {
            return {
              qty: temp
            };
          });
        const data = {
            dishinfo : item,
            qty : this.state.qty[index]
        }
        console.log("data", data);
        this.props.qtyRedux(data);
        
    }

    render() {
        let rname = null;
        if (this.props.selectedRestaurantDetails[0]) {
            rname = this.props.selectedRestaurantDetails[0].name
        }
        let totalAmount = 0
        for (let i = 0; i < (this.props.cart).length; i++) {
            totalAmount += (parseFloat(this.props.cart[i].price.split('$')[1]) * parseFloat(this.state.qty[i]))
        }
        console.log("amt = ",totalAmount)
        let checkoutRedirect = null;
        if (this.state.checkoutFlag) {
            checkoutRedirect = <Redirect to='/checkout'/>
        }
        let checkoutItems = null
        checkoutItems = this.props.cart.map((item, index) => 
                <Row style={{marginTop:"10px"}}>
                    <Col sm={4}>
                        {item.dishName}
                    </Col>
                    <Col sm={6}>
                        <Row>
                        <Col sm={2}>
                        <select style={{marginTop:"10px"}} onChange={this.handleQty.bind(this, index, item)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        </select>
                        </Col>
                        <Col sm={8} style={{marginTop:"10px", marginLeft:"10px"}}>{this.state.qty[index]}</Col>
                        </Row>
                    </Col>
                    <Col sm={2}>
                        {item.price}
                    </Col>
                </Row>
        )
        return ( 
            <div>
                {checkoutRedirect}
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} >
                <ModalHeader toggle={this.props.toggle}>{rname}</ModalHeader>
                <ModalBody>
                <Container>
                <Row>
                    <Col sm={4}>
                        <label style={{fontWeight:"700"}}>Item Name</label>
                    </Col>
                    <Col sm={6}>
                        <label style={{fontWeight:"700"}}>Quantity</label>
                    </Col>
                    <Col sm={2}>
                        <label style={{fontWeight:"700"}}>Price</label>
                    </Col>
                </Row>
                <hr />
                    {checkoutItems}
                    </Container>
                </ModalBody>
                <ModalFooter>
                <Button onClick={this.handleCheckout} style={{backgroundColor:"black", width:"100%"}}>Go to check out. {'$'+totalAmount.toFixed(2)}</Button>
                </ModalFooter>
            </Modal>
            </div>
        );
    }
}

CartPopUp.propTypes = {
    cart: PropTypes.array.isRequired,
    selectedRestaurantDetails: PropTypes.array.isRequired,
    checkoutRedux: PropTypes.func.isRequired,
    qtyRedux: PropTypes.func.isRequired
  }
  
const mapStateToProps = state =>{
    return({
        cart: state.restaurant.cartItems,
        selectedRestaurantDetails: state.restaurant.selectedRestaurantDetails
    });
}
  
export default connect(mapStateToProps, { checkoutRedux, qtyRedux })(CartPopUp);