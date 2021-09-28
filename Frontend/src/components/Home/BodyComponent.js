import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { restaurantRedux } from '../../redux/reduxActions/restaurantAction';
import restaurantReducer from '../../redux/reduxReducers/restaurantReducer';
class HomeBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantDetails : [],
            flag : false
        };
    }
     
    async componentDidMount() {
        await this.props.restaurantRedux()
    }

    handleRestaurantPage = (e) => {
        console.log("8787",this.state.restaurantDetails);
        this.setState({flag : true});
        console.log("-----", this.state.flag);
    }

    render() { 
        console.log(this.props);
        let redirectRestaurantPage = null; 
        let details = null;
        if (this.state.flag) {
            redirectRestaurantPage = <Redirect to='/restaurantpage'/>
        }
        if (this.props.restaurant.length !== 0) {
            details = this.props.restaurant.map((restaurant,index) => {
                return (
                <div className="col-sm-3" style={{marginTop:"30px"}} key={restaurant.id}>
                <div className="container" style={{position:"relative"}}>
                <button style={{border:"solid black 2px"}} onClick={this.handleRestaurantPage}>
                    <img src={restaurant.restaurantImage} alt="nothing" width={140} height={150} 
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
    restaurantRedux: PropTypes.func.isRequired,
    restaurant: PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    console.log("state mapstatetoprops in restaurant",state);
    return({
        restaurant: state.restaurant.restaurantDetails
    });
}
 
export default connect(mapStateToProps, { restaurantRedux })(HomeBody);
