import React from 'react';
import { Redirect } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
     Container, Row, Col } from 'reactstrap';
import { checkoutRedux } from '../../redux/reduxActions/restaurantAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
class CartPopUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            checkoutFlag : false
        }
    }
    handleCheckout = () => {
        let priceList = []
        let qtyList = []
        for (let item of this.props.cart) {
            priceList.push(item.price)
            qtyList.push(item.qty)
        }
        const data = {
            price : priceList,
            qty : qtyList
        }
        console.log("daat", data)
        this.props.checkoutRedux(data)
        this.setState({checkoutFlag : true});
    }
    render() {
        let rname = null;
        if (this.props.selectedRestaurantDetails[0]) {
            rname = this.props.selectedRestaurantDetails[0].name
        }
        let totalAmount = 0
        for (let i = 0; i < (this.props.cart).length; i++) {
            totalAmount += (parseFloat(this.props.cart[i].price.split('$')[1]) * parseFloat(this.props.cart[i].qty))
        }
        console.log("amt = ",totalAmount)
        let checkoutRedirect = null;
        if (this.state.checkoutFlag) {
            checkoutRedirect = <Redirect to='/checkout'/>
        }
        let checkoutItems = null
        checkoutItems = this.props.cart.map(item => 
                <Row style={{marginTop:"10px"}}>
                    <Col sm={4}>
                        {item.name}
                    </Col>
                    <Col sm={4}>
                        {item.qty}
                    </Col>
                    <Col sm={4}>
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
                    <Col sm={4}>
                        <label style={{fontWeight:"700"}}>Quantity</label>
                    </Col>
                    <Col sm={4}>
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
    checkoutRedux: PropTypes.func.isRequired
  }
  
const mapStateToProps = state =>{
    return({
        cart: state.restaurant.cartItems,
        selectedRestaurantDetails: state.restaurant.selectedRestaurantDetails
    });
}
  
export default connect(mapStateToProps, {checkoutRedux})(CartPopUp);