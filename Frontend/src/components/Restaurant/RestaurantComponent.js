import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

class Restaurant extends React.Component {

    render() { 
        return (
        <div className="container">
            <div className="row" style={{marginTop:"20px"}}>
            <img src="./restaurants/tirupathi_bhimas_cover.jpeg" style={{display:"block", maxHeight:"200px", overflow:"hidden"}}></img>
                </div>
                <div className="row" style={{marginTop:"20px"}}>
                <p>Of the 107 things on the menu at this midday go-to, the bisibelabath is one of the most ordered and the non-spicy bhimas thali and the spicy bhimas thali are two of the items most commonly ordered together. • $ • Indian • Vegetarian • Asian • Healthy</p>
                <p>1208 S Abel St, Milpitas, CA 95035 • More</p>
                    </div>
                    <div className="row" style={{marginTop:"10px"}}>
                        <h5>Menu</h5>
                        <hr />
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                            <div className="col-sm-8">
                            <p>Spicy Bhimas Thali*
                                                Sweet, Chappathi(1 Pcs), Poriyal, Kootu, Veg. Curry, Sambhar, Rasam, Special Kozhambu, Yogurt, White Rice, Papad
                                                $13.99</p>
                                </div>
                                <div className="col-sm-4">
                                <img src="./restaurants/dish1.webp" width={100} height={100} style={{display:"block", marginLeft:"250px"}}></img>
                                </div>
                        </div>
                            </div>
                        <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-2">
                            <p>Spicy Bhimas Thali*
                                                Sweet, Chappathi(1 Pcs), Poriyal, Kootu, Veg. Curry, Sambhar, Rasam, Special Kozhambu, Yogurt, White Rice, Papad
                                                $13.99</p>
                                </div>
                                <div className="col-sm-2">
                                <img src="./restaurants/dish1.webp" width={100} height={100} style={{display:"block", marginLeft:"250px"}}></img>
                                </div>
                        </div>
                            </div>
                        <div className="col-sm-4">
                        <div className="row">
                            <div className="col-sm-8">
                            <p>Spicy Bhimas Thali*
                                                Sweet, Chappathi(1 Pcs), Poriyal, Kootu, Veg. Curry, Sambhar, Rasam, Special Kozhambu, Yogurt, White Rice, Papad
                                                $13.99</p>
                                </div>
                                <div className="col-sm-4">
                                <img src="./restaurants/dish1.webp" width={100} height={100} style={{display:"block", marginLeft:"250px"}}></img>
                                </div>
                        </div>
                            </div>
                    </div>
        </div>
        );
    }
}
 
export default Restaurant;