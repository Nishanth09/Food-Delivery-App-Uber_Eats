import React from 'react';
import Navbar from '../Landing/NavComponent';
import { Container, Row, Col, Label } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { getFavRedux } from '../../redux/reduxActions/restaurantAction'

class Favorites extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            favFlag : false,
            favRestaurants : [],
            restaurantId : null
        }
    }

    async componentDidMount() {
        if (this.props.userDetails.fav_restaurant.length !== 0 && this.props.restaurantDetails) {
            // const fav_res = this.props.userDetails.fav_restaurant.split(',')
            // const fav_restaurants = []
            // for (let restaurant of this.props.restaurantDetails) {
            //     for (let f_res of fav_res) {
            //         if (restaurant.name === f_res) {
            //             fav_restaurants.push(restaurant)
            //         }
            //     }
            // }
            await this.props.getFavRedux()
            console.log("fav res : ",this.props.favRes.fav_restaurant)
            this.setState({favRestaurants : this.props.favRes.fav_restaurant})
        }
    }

    handleRestaurantPage = async (restid) => {
        this.setState({restaurantId : restid, favFlag : true});
    }

    render() {
        let redirectRestaurantPage = null;
        if (this.state.favFlag) {
            redirectRestaurantPage = <Redirect to={{
                pathname: '/restaurantpage',
                state: { id: this.state.restaurantId }
            }}/>
        }
        let details = null;
        details = this.state.favRestaurants.map((restaurant,index) => {
            return (
            <div className="col-sm-3" style={{marginTop:"30px"}} key={index}>
            <div className="container" style={{position:"relative"  , height:"175px"}}>
            <button style={{border:"solid black 2px"}} onClick={() => this.handleRestaurantPage(restaurant._id)}>
                <img src={'/api/static/images/'+restaurant.resimg} alt="nothing" width={140} height={150} 
                style={{display:"block"}}></img></button>
            <label style={{width:"160px"}}><strong>{restaurant.name}</strong></label>
          </div>
            </div>
            )
        })
        return (
            <React.Fragment>
                {redirectRestaurantPage}
                <Navbar showFlag="open"/>
                <Container>
                    <Row style={{marginTop:"30px"}}>
                        <h2>Favorite Restaurants</h2>
                    </Row>
                    <div className="row" style={{marginTop:"10px"}}>
                        {details}
                    </div>
                    <Row>
                    </Row>
                </Container>
            </React.Fragment>
        );
    }
}

Favorites.propTypes = {
    getRestaurantRedux : PropTypes.func.isRequired,
    userDetails: PropTypes.object.isRequired,
    getFavRedux: PropTypes.func.isRequired,
    restaurantDetails: PropTypes.array.isRequired,
    favRes : PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
        restaurantDetails : state.restaurant.restaurantDetails,
        favRes : state.restaurant.favRes,
        selectedRestaurantDetails : state.restaurant.selectedRestaurantDetails,
        userDetails : state.user.userDetails
    });
}
 
export default connect(mapStateToProps, { getFavRedux })(Favorites);
