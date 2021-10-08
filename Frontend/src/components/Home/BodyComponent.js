import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllRestaurantsRedux, getRestaurantRedux } from '../../redux/reduxActions/restaurantAction';
import { getUserDetailsRedux } from '../../redux/reduxActions/userDetailsAction';
class HomeBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantDetails : [],
            flag : false
        };
    }
     
    async componentDidMount() {
        await this.props.getUserDetailsRedux()
        console.log(this.props.userDetails)
        const data = {
            "state" : this.props.userDetails.state
        } 
        await this.props.getAllRestaurantsRedux(data)
    }
    handleRestaurantPage = (restid) => {
        console.log("clcikds", restid)
        const data = {
            "restid" : restid
        }
        this.props.getRestaurantRedux(data);
        //this.setState({flag : true});
    }

    render() { 
        //console.log(this.props.restaurantDetails);
        let redirectRestaurantPage = null; 
        let details = null;
        if (this.state.flag) {
            redirectRestaurantPage = <Redirect to='/restaurantpage'/>
        }
        if (this.props.restaurantDetails) {
            details = this.props.restaurantDetails.map((restaurant,index) => {
                return (
                <div className="col-sm-3" style={{marginTop:"30px"}} key={index}>
                <div className="container" style={{position:"relative"  , height:"175px"}}>
                <button style={{border:"solid black 2px"}} onClick={() => this.handleRestaurantPage(restaurant.restid)}>
                    <img src={'/api/static/images/'+restaurant.resimg} alt="nothing" width={140} height={150} 
                    style={{display:"block"}}></img></button>
                <a href="/profile"><i className="far fa-heart" 
                style={{position:"absolute", top:"0", left:"4", marginLeft:"130px", 
                color:"black", marginTop:"5px"}}></i></a>
                <label style={{width:"160px"}}><strong>{restaurant.name}</strong></label>
              </div>
                </div>
                )
            })
        }
        return (
            <div className="col-sm-9">
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
    userDetails: PropTypes.object.isRequired,
    getAllRestaurantsRedux: PropTypes.func.isRequired,
    restaurantDetails: PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
        restaurantDetails : state.restaurant.restaurantDetails,
        userDetails : state.user.userDetails
    });
}
 
export default connect(mapStateToProps, { getUserDetailsRedux, getAllRestaurantsRedux, getRestaurantRedux })(HomeBody);
