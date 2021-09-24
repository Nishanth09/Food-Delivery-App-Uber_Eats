import React from 'react';
import Navbar from '../Landing/NavComponent'
class Restaurant extends React.Component {

    render() { 
        return (
            <React.Fragment>
                <Navbar showFlag="open"/>
        <div className="container">
            <div className="row" style={{marginTop:"20px"}}>
            <img src="./restaurants/tirupathi_bhimas_cover.jpeg" alt="nothing" style={{display:"block", maxHeight:"200px", overflow:"hidden"}}></img>
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
                            <div className="col-sm-9" >
                            <label><strong>Chowmein Veg</strong></label>
                            <label style={{fontSize:"12px"}}>Noodles with vegetables dfdf fdf asf sdf afdffsdf fsdfsd fdsf</label>
                            <label>$20.99</label>
                            </div>
                            <div className="col-sm-3">
                            <img src="./restaurants/dish1.webp" alt="nothing" width={70} height={100} style={{display:"block", marginLeft:"-10px"}}></img>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                            <div className="col-sm-9" >
                            <label><strong>Chowmein Veg</strong></label>
                            <label style={{fontSize:"12px"}}>Noodles with vegetables dfdf fdf asf sdf afdffsdf fsdfsd fdsf</label>
                            <label>$20.99</label>
                            </div>
                            <div className="col-sm-3">
                            <img src="./restaurants/dish1.webp" alt="nothing" width={70} height={100} style={{display:"block", marginLeft:"-10px"}}></img>
                            </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                            <div className="col-sm-9" >
                            <label><strong>Chowmein Veg</strong></label>
                            <label style={{fontSize:"12px"}}>Noodles with vegetables dfdf fdf asf sdf afdffsdf fsdfsd fdsf</label>
                            <label>$20.99</label>
                            </div>
                            <div className="col-sm-3">
                            <img src="./restaurants/dish1.webp" alt="nothing" width={70} height={100} style={{display:"block", marginLeft:"-10px"}}></img>
                            </div>
                            </div>
                        </div>
                    </div>
                    -
        </div>
        </React.Fragment>
        );
    }
}
 
export default Restaurant;