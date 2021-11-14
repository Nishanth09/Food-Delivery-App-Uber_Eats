import React from 'react';
import Navbar from '../Landing/NavComponent';
import { Redirect } from 'react-router';
import PopUp from './PopUpComponent';
import {Modal, Button} from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRestaurantRedux, clearOrderRedux } from '../../redux/reduxActions/restaurantAction';
class Restaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dishesDetails : [],
            flag : false,
            openPopUp : [],
            redFlag : false,
            clearOrderStatus : false,
            restaurantSelected : []
        }
    }

    async componentDidMount() {
        if (this.props.location.state) {
            const data = {
                "restid" : this.props.location.state.id
            }
            console.log("_id",data)
            await this.props.getRestaurantRedux(data);
            let temp = this.props.selectedRestaurantDetails
            this.setState({restaurantSelected : temp})
        }
    } 
   
    handleDish = (e) => {
        this.setState({flag : true});
    }

    handleCart = (index) => {
        let temp = this.state.openPopUp;
        temp[index] = !temp[index];
        this.setState({openPopUp : temp});
        if (this.props.resIdList) {
            let resid = this.props.resIdList[0]
            for (let i = 1; i < this.props.resIdList.length; i++) {
                if (this.props.resIdList[i] !== resid) {
                    this.setState({redFlag : true})
                }
            }
        }
    }

    handleNewOrder = () => {
        this.setState({clearOrderStatus : true})
    }

    handleClose = async () => {
        await this.props.clearOrderRedux()
        this.setState({restaurantSelected : []})
        this.setState({clearOrderStatus : true})
        this.setState({redFlag : !this.state.redFlag})
    }

    render() {
        console.log(":----:", this.state.restaurantSelected)
        let details = null; 
        let redirectDish = null;
        let redirectHome = null;
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/login"/>
        }
        if (!this.props.location.state) {
            redirectHome = <Redirect to='/home' />
        }
        if (this.state.flag || this.state.clearOrderStatus) {
            redirectDish = <Redirect to='/home'/>;
        } 
        let restaurantImage, restaurantName, restaurantAddress, restaurantDescription = null;
        if (this.state.restaurantSelected.length !== 0) {
            restaurantImage = this.state.restaurantSelected[0].resimg
            restaurantName = this.state.restaurantSelected[0].name
            restaurantAddress = this.state.restaurantSelected[0].address
            restaurantDescription = this.state.restaurantSelected[0].description
            details = this.state.restaurantSelected[0].items.map((item, index) => {
                return (
                    <div className="col-sm-4" style={{marginTop:"30px"}} key={item.id}>
                        <div className="row" onClick={this.handleCart.bind(this, index)}>
                            <div className="col-sm-6" style={{border:"solid #D0CACA 1px"}}>
                                <div className="row">
                                <label><strong>{item.dishName}</strong></label>
                                </div>
                                <div className="row">
                                <label style={{fontSize:"12px"}}>{item.description}</label>
                                </div>
                            <label>{item.price}</label>
                            </div>
                            <div className="col-sm-3" style={{border:"solid #D0CACA 1px"}}>
                            <img src={'https://test-cmpe-273.s3.amazonaws.com/'+item.dishimage} alt="nothing" width={100} height={100} style={{display:"block", marginLeft:"-20px"}}></img>
                            </div>
                        </div>
                        {this.state.openPopUp[index] ? <PopUp show={this.state.openPopUp[index]} onHide={this.handleCart.bind(this, index)} dishinfo={item}/> : null}
                    </div>
                )
            })
        }
        return ( 
            <React.Fragment>
                {redirectVar}
                {this.state.redFlag ? <Modal show={this.state.redFlag} onHide={this.handleClose}>
                                            <Modal.Header closeButton>
                                            <Modal.Title>Create new order?</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>Your order contains items from another restaurant</Modal.Body>
                                            <Modal.Footer>
                                            <Button style={{background:"black", width:"100%", border:"none"}} onClick={this.handleClose}>
                                                New Order
                                            </Button>
                                            </Modal.Footer>
                                        </Modal> : null}
                {redirectHome}
                {redirectDish}
                <Navbar showFlag="open"/>
        <div className="container">
            <div className="row" style={{marginTop:"20px"}}>
            <img src={'https://test-cmpe-273.s3.amazonaws.com/'+restaurantImage} alt="nothing" style={{display:"block", height:"350px"}}></img>
                </div>
                <div className="row" style={{marginTop:"20px"}}>
                {restaurantName}
                {restaurantDescription}
                <br />
                {restaurantAddress}
                    </div>
                    <div className="row" style={{marginTop:"10px"}}>
                        <h5>Menu</h5>
                        <hr />
                    </div>
                    <div className="row">
                        {details}
                    </div>
                    <div className="row" style={{marginTop:"40px"}}>
                    </div>
        </div>
        </React.Fragment>
        );
    }
}

Restaurant.propTypes = {
    getRestaurantRedux : PropTypes.func.isRequired,
    restaurantDetails: PropTypes.array.isRequired,
    selectedRestaurantDetails : PropTypes.array.isRequired,
    resIdList: PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
        selectedRestaurantDetails: state.restaurant.selectedRestaurantDetails,
        restaurantDetails : state.restaurant.restaurantDetails,
        resIdList : state.restaurant.resIdList
    });
}
 
export default connect(mapStateToProps, { getRestaurantRedux, clearOrderRedux })(Restaurant);