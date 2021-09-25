import React from 'react';
import Navbar from '../Landing/NavComponent';
import axios from 'axios';
import { Redirect } from 'react-router';
import '@trendmicro/react-modal/dist/react-modal.css';
import Modal from '@trendmicro/react-modal';
class Restaurant extends React.Component {
    state = {
        dishesDetails : [],
        flag : false,
        open : false
    }
    componentDidMount() {
        axios.get('http://localhost:3001/getDishes')
        .then(response => {
            this.setState({
                dishesDetails : this.state.dishesDetails.concat(response.data) 
            });
            console.log(this.state.dishesDetails[0].dishName,"--");
        })
        .catch(error => {
            console.log(error);
        })
    }

    handleDish = (e) => {
        this.setState({flag : true});
    }

    onOpenModal = () => {
        this.setState({ open: true });
      };
    
    onCloseModal = () => {
        this.setState({ open: false });
      };

    render() {
        const { open } = this.state;
        let details = null; 
        let redirectDish = null;
        if (this.state.flag) {
            redirectDish = <Redirect to='/home'/>;
        } 
        if (this.state.dishesDetails.length !== 0) {
            details = this.state.dishesDetails.map(dish => {
                return (
                    <div className="col-sm-4" style={{marginTop:"30px"}}>
                        <div className="row">
                        <div className="col-sm-9" style={{border:"solid #D0CACA 1px"}}>
                        <button onClick={this.onOpenModal} style={{background:"none", border:"none"}}><label><strong>{dish.dishName}</strong></label>
                        <label style={{fontSize:"12px"}}>{dish.description}</label>
                        <label>{dish.price}</label></button>
                        <Modal open={open} onClose={this.onCloseModal}>
                            <h2>Simple centered modal</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                                pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                                hendrerit risus, sed porttitor quam.
                            </p>
                        </Modal>
                        </div>
                        <div className="col-sm-3">
                        <img src={dish.dishImage} alt="nothing" width={70} height={100} style={{display:"block", marginLeft:"-20px"}}></img>
                        </div>
                        </div>
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