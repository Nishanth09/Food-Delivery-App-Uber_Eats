import React from 'react';
import {Link} from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { Redirect } from 'react-router';
import HomeBody from '../Home/BodyComponent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deitaryRedux } from '../../redux/reduxActions/restaurantAction';

import deals from "../../images/deals.png";
import grocery from "../../images/grocery.png";
import convenience from "../../images/convenience.png";
import alcohol from "../../images/alcohol.png";
import pharmacy from "../../images/pharmacy.jpg";
import flowers from "../../images/flowers.jpg";
import top_eats from "../../images/grocery.png";
import pizza from "../../images/pizza.png";
import chinese from "../../images/chinese.png";
import sushi from "../../images/sushi.png";
import burger from "../../images/burger.png";
import indian from "../../images/indian.png";
class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sortDropDownFlag : false,
      priceDropDownFlag : false,
      deliveryDropDownFlag : false,
      dietaryDropDownFlag : false     
    };
  };

  handleVegetarian = () => {
    const data = {
      "dietary": "veg"
    }
    this.props.deitaryRedux(data);
  }

  handleVegan = () => {
    const data = {
      "dietary": "vegan"
    }
    this.props.deitaryRedux(data);
  }

  handleNonVeg = () => {
    const data = {
      "dietary": "non veg"
    }
    this.props.deitaryRedux(data);
  }
     
  toggleSortDropDown = (e) => {
    this.setState((prev) => ({sortDropDownFlag : !prev.sortDropDownFlag}))
  }
  togglePriceDropDown = (e) => {
    this.setState((prev) => ({priceDropDownFlag : !prev.priceDropDownFlag}))
  }
  toggleDeliveryDropDown = (e) => {
    this.setState((prev) => ({deliveryDropDownFlag : !prev.deliveryDropDownFlag}))
  }
  toggleDietaryDropDown = (e) => {
    this.setState((prev) => ({dietaryDropDownFlag : !prev.dietaryDropDownFlag}))
  }

  render() {

         let sortDropDownResult = null;
         let priceDropDownResult = null;
         let deliveryDropDownResult = null;
         let dietaryDropDownResult = null;
         let redirectPage = null;
         if (this.state.flag) {
           redirectPage = <Redirect to="/restaurantpage" />
         }
         if (this.state.sortDropDownFlag) {
           sortDropDownResult = (
             <div>
               <FormControl component="fieldset">
               <RadioGroup
                 defaultValue="picked"
                 name="radio-buttons-group">
                 <FormControlLabel value="picked" control={<Radio size="small" />} label="Picked for you(default)" />
                 <FormControlLabel value="popular" control={<Radio size="small" />} label="Most popular" />
                 <FormControlLabel value="rating" control={<Radio size="small" />} label="Rating" />
                 <FormControlLabel value="delivery" control={<Radio size="small" />} label="Delivery time" />
                 </RadioGroup>
                 </FormControl>
               </div>);
         }
   
         if (this.state.priceDropDownFlag) {
           priceDropDownResult = (
             <div style={{marginTop : "10px"}}>
               <button className="btn btn-light btn-outline-secondary">$</button>{' '}
               <button className="btn btn-light btn-outline-secondary">$$</button>{' '}
               <button className="btn btn-light btn-outline-secondary">$$$</button>{' '}
               <button className="btn btn-light btn-outline-secondary">$$$$</button>{' '}
               </div>);
         }
   
         if (this.state.deliveryDropDownFlag) {
           deliveryDropDownResult = (
             <div> 
               <input type="range" min="0" max="8" step="2" id="feerange" list="prices" />
               <datalist id="prices">
               <option value="0"></option>
               <option value="2"></option>
               <option value="4"></option>
               <option value="6"></option>
               <option value="8"></option>
     </datalist>
               </div>);
         }
   
         if (this.state.dietaryDropDownFlag) {
           dietaryDropDownResult = (
             <div style={{marginTop : "10px"}}>
               <div className="row">
                 <div className="col-sm-5">
                 <button onClick={this.handleVegetarian} className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px"}}>Vegetarian</button>
                   </div>
                   <div className="col-sm-5 offset-sm-2">
                   <button onClick={this.handleVegan} className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px"}}>Vegan</button>
                   </div>
                 </div>
                 <div className="row" style={{marginTop:"10px"}}>
                 <div className="col-sm-5">
                 <button onClick={this.handleNonVeg} className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px"}}>Non Vegetarian</button>
                   </div>
                 </div>
               </div>);
         }
         return (
             <div>
               <div className="container">
                 {redirectPage}
               <div className="row" style={{marginTop : "50px"}}>
               <div className="col-sm-1">
                 <Link to ="/landingpage">
                   <img src={deals} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Deals</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={grocery} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"5px"}}>Grocery</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={convenience} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginRight:"15px"}}>Convenience</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={alcohol} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"20px"}}>Alcohol</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={pharmacy} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginRight:"10px", marginLeft:"5px"}}>Pharmacy</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={flowers} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Flowers</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={top_eats} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"25px"}}>Top eats</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={pizza} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"20px"}}>Pizza</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={chinese} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Chinese</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={sushi} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"20px"}}>Sushi</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={burger} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Burgers</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={indian} alt="nothing" width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Indian</label>
                 </div>
                 <hr />
                 </div>
                 <div className="row">
                   <div className="col-sm-3">
                     <h4><strong>All Stores</strong></h4>
                     <div className="row">
                     <button className="btn dropdown-toggle" style={{backgroundColor:"transparent", textAlign : "left"}} onClick={this.toggleSortDropDown}>
                       Sort
                      </button>
                      {sortDropDownResult}
                       </div>
                       <div className="row">
                      <button className="btn dropdown-toggle" style={{backgroundColor:"transparent", textAlign : "left"}} onClick={this.togglePriceDropDown}>
                       Price range
                      </button>
                      {priceDropDownResult}
                       </div>
                       <div className="row">
                       <button className="btn dropdown-toggle" style={{backgroundColor:"transparent", textAlign : "left"}} onClick={this.toggleDeliveryDropDown}>
                      Max delivery fee
                      </button>
                      {deliveryDropDownResult}
                       </div>
                       <div className="row">
                       <button className="btn dropdown-toggle" style={{backgroundColor:"transparent", textAlign : "left"}} onClick={this.toggleDietaryDropDown}>
                       Dietary
                      </button>
                      {dietaryDropDownResult}
                       </div>
                     </div>
                    <HomeBody />
                   </div>
               </div>
             </div>
           );
       }
}

Filters.propTypes = {
  deitaryRedux: PropTypes.func.isRequired,
  restaurantDetails: PropTypes.array.isRequired,
}

const mapStateToProps = state =>{
  return({
      restaurantDetails : state.restaurant.restaurantDetails
  });
}

export default connect(mapStateToProps, {deitaryRedux})(Filters);