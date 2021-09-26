import React from 'react';
import Navbar from '../Landing/NavComponent';
import axios from 'axios';
import { Redirect } from 'react-router';
import PopUp from './PopUpComponent'
class Restaurant extends React.Component {
    state = {
        dishesDetails : [],
        flag : false,
        openPopUp : []
    }
    componentDidMount() {
        axios.get('http://localhost:3001/getDishes')
        .then(response => {
            this.setState({
                dishesDetails : this.state.dishesDetails.concat(response.data) 
            });
            for (let i of this.state.dishesDetails) this.state.openPopUp.push(false)
            console.log(this.state.dishesDetails[0].dishName,"--");
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleDish = (e) => {
        this.setState({flag : true});
    }

    handleCart = (index) => {
        let temp = this.state.openPopUp;
        temp[index] = !temp[index];
        this.setState({openPopUp : temp});
    }

    render() {
        let details = null; 
        let redirectDish = null;
        if (this.state.flag) {
            redirectDish = <Redirect to='/home'/>;
        } 
        if (this.state.dishesDetails.length !== 0) {
            details = this.state.dishesDetails.map((dish, index) => {
                return (
                    <div className="col-sm-4" style={{marginTop:"30px"}}>
                        <div className="row" onClick={this.handleCart.bind(this, index)}>
                        <div className="col-sm-9" style={{border:"solid #D0CACA 1px"}}>
                        <label><strong>{dish.dishName}</strong></label>
                        <label style={{fontSize:"12px"}}>{dish.description}</label>
                        <br />
                        <label>{dish.price}</label>
                        </div>
                        <div className="col-sm-3">
                        <img src={dish.dishImage} alt="nothing" width={70} height={100} style={{display:"block", marginLeft:"-20px"}}></img>
                        </div>
                        </div>
                        {this.state.openPopUp[index] ? <PopUp show={this.state.openPopUp[index]} onHide={this.handleCart.bind(this, index)} dishInfo={dish}/> : null}
                    </div>
                )
            })
        }
        return (
            <React.Fragment>
                {redirectDish}
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
                        {details}
                    </div>
                    -
        </div>
        </React.Fragment>
        );
    }
}
 
export default Restaurant;