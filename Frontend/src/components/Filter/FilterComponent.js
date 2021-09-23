import React from 'react';
import {Link} from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import { Redirect } from 'react-router';

class Filters extends React.Component {
    state = {
        sortDropDownFlag : false,
        priceDropDownFlag : false,
        deliveryDropDownFlag : false,
        dietaryDropDownFlag : false,
        flag : false
     }; 
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
     handleRestaurantPage = (e) => {
       this.setState({flag : true});
       console.log("-----", this.state.flag);
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
                 <button className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px"}}>Vegetarian</button>
                   </div>
                   <div className="col-sm-5 offset-sm-2">
                   <button className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px"}}>Vegan</button>
                   </div>
                 </div>
                 <div className="row" style={{marginTop:"10px"}}>
                 <div className="col-sm-5">
                 <button className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px"}}>Halal</button>
                   </div>
                   <div className="col-sm-6 offset-sm-1">
                   <button className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px", whiteSpace:"nowrap"}}>Gluten-free</button>
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
                   <img src={"./filters/deals.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Deals</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/grocery.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"5px"}}>Grocery</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/convenience.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginRight:"15px"}}>Convenience</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/alcohol.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"20px"}}>Alcohol</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/pharmacy.jpg"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginRight:"10px", marginLeft:"5px"}}>Pharmacy</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/flowers.jpg"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Flowers</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/top_eats.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"25px"}}>Top eats</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/pizza.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"20px"}}>Pizza</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/chinese.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Chinese</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/sushi.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"20px"}}>Sushi</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/burger.png"} width={75} height={75}></img>
                 </Link>
                 <label style={{marginLeft:"15px"}}>Burgers</label>
                 </div>
                 <div className="col-sm-1">
                 <Link to ="/landingpage">
                 <img src={"./filters/indian.png"} width={75} height={75}></img>
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
                     <div className="col-sm-9">
                       <div className="row">
                         <h2><strong>Restaurants near you</strong></h2>
                         </div>
                       <div className="row" style={{marginTop:"10px"}}>
                         <div className="col-sm-3">
                         <link href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" rel="stylesheet"/>
   
                         <div className="container" style={{position:"relative"}}>
                           <button style={{border:"solid black 2px"}}><img src="./restaurants/mcdonalds.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>McDonald's Milpitas</strong></label>
                         </div>
                 
                           </div>
                           <div className="col-sm-3">
                           <div className="container" style={{position:"relative"}}>
                           <button style={{border:"solid black 2px"}}><img src="./restaurants/jack_in_the_box.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>Jack in the box</strong></label>
                         </div>              
                           </div>
                           <div className="col-sm-3">
                           <div className="container" style={{position:"relative"}}>
                           <button style={{border:"solid black 2px"}}><img src="./restaurants/tacobell.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>Taco Bell</strong></label>
                         </div>
                           </div>
                           <div className="col-sm-3">
                           <div className="container" style={{position:"relative"}}>
                           <button style={{border:"solid black 2px"}}><img src="./restaurants/guilin_noodles.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>Classic Guilin Rice Noodles</strong></label>
                         </div>
                           </div>
                         </div>
   
                         <div className="row" style={{marginTop:"10px"}}>
                         <div className="col-sm-3">
   
                         <div className="container" style={{position:"relative"}}>
                         <button onClick={this.handleRestaurantPage} style={{border:"solid black 2px"}}><img src="./restaurants/tirupathi_bhimas.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>Tirupathi Bhimas</strong></label>
                         </div>
                 
                           </div>
                           <div className="col-sm-3">
                           <div className="container" style={{position:"relative"}}>
                           <button style={{border:"solid black 2px"}}><img src="./restaurants/tender_greens.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>Tender Greens</strong></label>
                         </div>              
                           </div>
                           <div className="col-sm-3">
                           <div className="container" style={{position:"relative"}}>
                           <button style={{border:"solid black 2px"}}><img src="./restaurants/fire_biryani.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>Fire Biryani</strong></label>
                         </div>
                           </div>
                           <div className="col-sm-3">
                           <div className="container" style={{position:"relative"}}>
                           <button style={{border:"solid black 2px"}}><img src="./restaurants/starbird_chicken.jpeg" width={160} height={150} style={{display:"block"}}></img></button>
                           <a href="/profile"><i className="far fa-heart" style={{position:"absolute", top:"0", left:"4", marginLeft:"140px", color:"black", marginTop:"5px"}}></i></a>
                           <label style={{width:"160px"}}><strong>Starbird Chicken</strong></label>
                         </div>
                           </div>
                         </div>
   
   
                       </div>
                   </div>
               </div>
             </div>
           );
       }
}
 
export default Filters;