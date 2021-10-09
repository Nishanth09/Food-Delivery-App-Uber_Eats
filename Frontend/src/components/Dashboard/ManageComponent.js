import React from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Button, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postRestaurantRedux, putRestaurantRedux, getRestaurantDetailsRedux } from '../../redux/reduxActions/manageRestaurantAction';
import axios from 'axios';

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rImage : null,
            rName : null,
            address : null,
            open_timings : null,
            close_timings : null,
            resDescription : null,
            dropdownOpen : false,
            dropdownDietary : false,
            category : null,
            image : null,
            name : null,
            description : null,
            ingredients : null,
            price : null,
            dishesList : [],
            index : null,
            isUpdate : false,
            mode : null,
            dietary : null,
            selectedState : null
        }
    }
    async componentDidMount() {
        await this.props.getRestaurantDetailsRedux()
        if (this.props.resDetails.items) {
            let temp = this.props.resDetails.items
            this.setState({dishesList : temp});
            this.setState({rImage : this.props.resDetails.resimg})
            this.setState({rName : this.props.resDetails.name})
            this.setState({address : this.props.resDetails.address})
            this.setState({selectedState : this.props.resDetails.state})
            this.setState({open_timings : this.props.resDetails.open_timings})
            this.setState({close_timings : this.props.resDetails.close_timings})
            this.setState({mode : this.props.resDetails.mode})
            this.setState({dietary : this.props.resDetails.dietary})
        }
    }
    handleToggle = () => {
        this.setState({dropdownOpen : !this.state.dropdownOpen});
    }
    handleDietary = () => {
        this.setState({dropdownDietary : !this.state.dropdownDietary});
    }
    handleAddDish = () => {
        console.log(this.state.dishesList);
        const dishData = {
                name : null,
                dishimage : null,
                description : null,
                ingredients : null,
                price : null,
                category : null
        }
        let temp = this.state.dishesList
        temp.push(dishData);
        this.setState({dishesList : temp});
    }
    handleDelete = (i) => {
        console.log("i = ", i);
        let temp = this.state.dishesList
        temp.splice(i, 1);
        console.log("tmp = ",temp)
        this.setState({dishesList : temp});
    }
    handleSave = async () => {
        const restaurantData = {
            restid: this.props.resDetails.restid,
            resimg : this.state.rImage,
            name : this.state.rName,
            address : this.state.address,
            state : this.state.selectedState,   
            open_timings : this.state.open_timings,
            close_timings : this.state.close_timings,
            description : this.state.resDescription,
            mode : this.state.mode,
            dietary : this.state.dietary,
            items : this.state.dishesList
        }
        console.log("res data", restaurantData);
        await this.props.postRestaurantRedux(restaurantData);
        console.log(this.props.msg);
    }

    handleUpdate = async () => {
        const restaurantData = {
            restid: this.props.resDetails.restid,
            resimg : this.state.rImage,
            name : this.state.rName,
            address : this.state.address,
            state : this.state.selectedState,   
            open_timings : this.state.open_timings,
            close_timings : this.state.close_timings,
            description : this.state.resDescription,
            mode : this.state.mode,
            dietary : this.state.dietary,
            items : this.state.dishesList
        }
        await this.props.putRestaurantRedux(restaurantData);
        console.log(this.props.msg);
    }
    
    editDish = (index, field, value) => {
        let temp = this.state.dishesList
        temp[index][field] = value
        console.log(temp)
        this.setState({dishesList: temp})
    }

    imageFormSubmit = (e, i) => {
        console.log("****************** Uploading file")
        e.preventDefault()
        const formData = new FormData();
        formData.append('file',e.target[0].files[0])
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post("/api/upload_image", formData, config).then((response) => {
            this.editDish(i, "dishimage", response.data.file_path)
        }).catch((error) => {
            console.log(error);
        })
    }
    resimageFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file',e.target[0].files[0])
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post("/api/upload_image", formData, config).then((response) => {
            this.setState({rImage : response.data.file_path})
        }).catch((error) => {
            console.log(error);
        })
    }
    render() {
        let displayDishes = null
        if (this.state.dishesList) {
            displayDishes = this.state.dishesList.map((dish, i) =>
            <div>
            <Row key={i} style={{marginTop:"10px"}}>
                <Col sm={4}>
                    <Label>Dish Image</Label>
                    <br />
                    <img src={'/api/static/images/'+this.state.dishesList[i].dishimage} alt="nothing"
                    width={100} height={100}></img>
                    <form onSubmit={(e) => {this.imageFormSubmit(e, i)}}>
                        <input type="file" name="dishImage" />
                        <input type='submit' value='Upload!' />
                    </form>
                </Col>
                <Col sm={4}>
                    <Label>Dish Name</Label>
                    <Input type="text" value={this.state.dishesList[i].name} onChange={(e) => {this.editDish(i, "name", e.target.value)}} name="dishname" id="dishname"/>
                </Col>
                <Col sm={4}>
                    <Label>Description</Label>
                    <Input type="text" value={this.state.dishesList[i].description} onChange={(e) => {this.editDish(i, "description", e.target.value)}} name="description" id="description" />
                </Col>
            </Row>
            <Row style={{marginTop:"10px"}}>
                <Col sm={4}>
                    <Label>Main Ingredients</Label>
                    <Input type="text" value={this.state.dishesList[i].ingredients} onChange={(e) => {this.editDish(i, "ingredients", e.target.value)}} name="ingredients" id="ingredients" />
                </Col>
                <Col sm={4}>
                    <Label>Price</Label>
                    <Input type="text" value={this.state.dishesList[i].price} onChange={(e) => {this.editDish(i, "price", e.target.value)}} name="price" id="price" />
                </Col>
                <Col sm={4}>
                    <Label>Category</Label>
                    <Input type="text" value={this.state.dishesList[i].category} onChange={(e) => {this.editDish(i, "category", e.target.value)}} name="category" id="category" />
                </Col>
                <Col sm={{size:4, offset:8}}>
                    <Button onClick={()=>this.handleDelete(i)} style={{backgroundColor:"#FC1704", border:"none", marginLeft:"50px", marginTop:"10px", width:"150px"}}>Delete</Button>
                </Col>
            <Row style={{marginTop:"10px"}}>
            </Row>
            </Row>
            <Row style={{marginTop:"10px"}}>
            </Row>
            <hr />
            </div>
        )
        }
        return (
            <Container>
                <Row style={{marginTop:"20px"}}>
                    <h1>Restaurant Management</h1>
                    <img src={'/api/static/images/'+this.state.rImage} alt="nothing"
                    style={{display:"block", height:"350px"}}></img>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                    <Label for="rimage">Restaurant Image</Label>
                    <form onSubmit={this.resimageFormSubmit}>
                        <input type="file" name="rImage" />
                        <input type='submit' value='Upload!' />
                    </form>
                        {/* <Label for="rimage">Restaurant Image</Label>
                        <Input type="text" onChange={(e) => {this.setState({rImage : e.target.value})}} name="rimage" id="rimage" 
                        placeholder="Enter restaurant image" /> */}
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="rname">Restaurant Name</Label>
                        <Input type="text" value={this.state.rName} onChange={(e) => {this.setState({rName : e.target.value})}} name="rname" id="ranme" 
                        placeholder="Enter restaurant name" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="address">Restaurant Address</Label>
                        <Input type="text" value={this.state.address} onChange={(e) => {this.setState({address : e.target.value})}} name="address" id="address" 
                        placeholder="Enter address" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="state">State</Label>
                        <Input type="text" value={this.state.selectedState} onChange={(e) => {this.setState({selectedState : e.target.value})}} name="state" id="state" 
                        placeholder="Enter State" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="opentimings">Opening timings</Label>
                        <Input type="text" value={this.state.open_timings} onChange={(e) => {this.setState({open_timings : e.target.value})}} name="opentimings" id="opentimings" 
                        placeholder="like 6:30am" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="closetimings">Closing timings</Label>
                        <Input type="text" value={this.state.close_timings} onChange={(e) => {this.setState({close_timings : e.target.value})}} name="closetimings" id="closetimings" 
                        placeholder="like 4:30pm" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="resDescription">Description</Label>
                        <Input type="text" value={this.state.description} onChange={(e) => {this.setState({resDescription : e.target.value})}} name="resDescription" id="resDescription" 
                        placeholder="Restaurant Description" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <Col sm={6}>
                        <Label for="mode">Mode</Label>
                        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                            <DropdownToggle caret style={{width:"100px"}}>
                                {this.state.mode}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.setState({mode : "delivery"})}} >Delivery</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({mode : "pick up"})}}>Pick up</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({mode : "both"})}}>Both</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                    <Col sm={6}>
                        <Label for="deitary">Dietary</Label>
                        <Dropdown isOpen={this.state.dropdownDietary} toggle={this.handleDietary}>
                            <DropdownToggle caret style={{width:"100px"}}>
                                {this.state.dietary}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {this.setState({dietary : "non veg"})}} >Non veg</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({dietary : "veg"})}}>Veg</DropdownItem>
                                <DropdownItem onClick={() => {this.setState({dietary : "vegan"})}}>Vegan</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </Col>
                </Row>
                <Label style={{marginTop:"10px", fontWeight:"500"}}>Add Dishes</Label>
                <Row style={{marginTop:"20px", backgroundColor:"#E5E7E9"}}>
                {displayDishes}
                </Row>
                <Row style={{marginTop:"30px"}}>
                    <Col sm={4}>
                    <Button onClick={this.handleSave} style={{backgroundColor:"black", width:"100px"}}>Save</Button>
                    </Col>
                    <Col sm={4}>
                    <Button onClick={this.handleAddDish} style={{backgroundColor:"#27AE60", width:"100px"}}>Add</Button>
                    </Col>
                    <Col sm={4}>
                    <Button onClick={this.handleUpdate} style={{backgroundColor:"#27AE60", width:"100px"}}>Update</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"30px"}}>
                </Row>
                </Container>
        );
    }
}
 
ManageRestaurant.propTypes = {
    postRestaurantRedux: PropTypes.func.isRequired,
    putRestaurantRedux: PropTypes.func.isRequired,
    getRestaurantDetailsRedux : PropTypes.func.isRequired,
    resDetails : PropTypes.object.isRequired
}
  
const mapStateToProps = state =>{
    return({
        resDetails: state.manageRestaurant.restaurantDetails
    });
}
    
export default connect(mapStateToProps, {postRestaurantRedux, putRestaurantRedux, getRestaurantDetailsRedux})(ManageRestaurant);
