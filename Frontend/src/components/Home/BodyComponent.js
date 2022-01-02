import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRestaurantsRedux, getRestaurantRedux, favRedux } from '../../redux/reduxActions/restaurantAction';
import { getUserDetailsRedux } from '../../redux/reduxActions/userDetailsAction';
class HomeBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantDetails : [],
            flag : false,
            restaurantId : null,
            favPopUp : [],
            homeFlag : false
        };
    }
     
    async componentDidMount() {
        await this.props.getUserDetailsRedux()
        const data = {
            "location" : this.props.location
        }
        console.log("get all",data)
        await this.props.getAllRestaurantsRedux(data)
    }

    handleFavorites = async (name, index) => {
        // let f_name = null
        // f_name = this.props.userDetails.fav_restaurant + ',' + name;
        // console.log("---,,,", f_name) 
        const data = {
            fav_restaurant : name
        }
        await this.props.favRedux(data);
        let temp = this.state.favPopUp;
        temp[index] = !temp[index];
        this.setState({favPopUp : temp});
    }

    handleToggle = (index) => {
        let temp = this.state.favPopUp;
        temp[index] = !temp[index];
        this.setState({favPopUp : temp});
    }

    handleRestaurantPage = async (_id) => {
        this.setState({restaurantId : _id, flag : true});
    }

    handleClose = (index) => {
        let temp = this.state.favPopUp;
        temp[index] = !temp[index];
        this.setState({favPopUp : temp, homeFlag : true})
    }

    render() {
        let redirectRestaurantPage = null; 
        let details = null;
        let redirectHome = null;
        let redirectVar = null;
        if(!localStorage.getItem('token')){
            redirectVar = <Redirect to= "/login"/>
        }
        if (this.state.homeFlag) {
            redirectHome = <Redirect to='/home'/>
        }
        if (this.state.flag) {
            redirectRestaurantPage = <Redirect to={{
                pathname: '/restaurantpage',
                state: { id: this.state.restaurantId }
            }}/>
        }
        if (this.props.restaurantDetails) {
            details = this.props.restaurantDetails.map((restaurant,index) => {
                return (
                <div className="col-sm-3" style={{marginTop:"30px"}} key={index}>
                <div className="container" style={{position:"relative"  , height:"175px"}}>
                <button style={{border:"solid black 2px"}} onClick={() => this.handleRestaurantPage(restaurant._id)}>
                    <img src={"/"+restaurant.resimg} alt="nothing" width={140} height={150} 
                    style={{display:"block"}}></img></button>
                <a onClick={this.handleFavorites.bind(this, restaurant.name, index)}><i className="far fa-heart" 
                style={{position:"absolute", top:"0", left:"4", marginLeft:"130px", 
                color:"black", marginTop:"5px"}}></i></a>
                {this.state.favPopUp[index] ? <Modal isOpen={this.state.favPopUp[index]} toggle={this.handleToggle.bind(this, index)}>
                                                <ModalHeader toggle={this.handleToggle.bind(this, index)}>Favorites</ModalHeader>
                                                <ModalBody>
                                                Restaurant added to your favorites
                                                </ModalBody>
                                                <ModalFooter>
                                                <Button style={{backgroundColor:"black", color:"white"}} onClick={this.handleClose.bind(this, index)}>Okay</Button>
                                                </ModalFooter>
                                            </Modal> : null}
                <label style={{width:"160px"}}><strong>{restaurant.name}</strong></label>
              </div>
                </div>
                )
            })
        }
        return (
            <div className="col-sm-9">
                {redirectVar}
                {redirectHome}
                {redirectRestaurantPage}
                <link href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" 
                rel="stylesheet"/>
            <div className="row">
              <h2><strong>Restaurants near you</strong></h2>
              </div>
              <div className="row" style={{marginTop:"10px"}}>
                  {details}
              </div>
            </div>
        );
    }
}

HomeBody.propTypes = {
    getUserDetailsRedux : PropTypes.func.isRequired,
    getRestaurantRedux : PropTypes.func.isRequired,
    favRedux : PropTypes.func.isRequired,
    userDetails: PropTypes.object.isRequired,
    getAllRestaurantsRedux: PropTypes.func.isRequired,
    restaurantDetails: PropTypes.array.isRequired,
    location: PropTypes.string.isRequired,
    selectedRestaurantDetails : PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
        restaurantDetails : state.restaurant.restaurantDetails,
        location : state.restaurant.location,
        selectedRestaurantDetails : state.restaurant.selectedRestaurantDetails,
        userDetails : state.user.userDetails
    });
}
 
export default connect(mapStateToProps, { getUserDetailsRedux, getAllRestaurantsRedux, getRestaurantRedux, favRedux })(HomeBody);
