import React from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Button, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { manageRestaurantRedux, getRestaurantDetailsRedux } from '../../redux/reduxActions/manageRestaurantAction';

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rImage : null,
            rName : null,
            address : null,
            open_timings : null,
            close_timings : null,
            dropdownOpen : false,
            category : null,
            image : null,
            name : null,
            description : null,
            price : null,
            dishesList : [],
            index : null,
            isUpdate : false
        }
    }
    async componentDidMount() {
        await this.props.getRestaurantDetailsRedux()
        // console.log(this.props.resDetails['items'])
        // if (this.props.resDetails['items'] === undefined) {
        //     this.setState({dishesList : []})
        // }
        //this.setState({dishesList : this.props.resDetails['items']})
    }
    handleToggle = () => {
        this.setState({dropdownOpen : !this.state.dropdownOpen});
    }
    handleAddDish = () => {
        console.log(this.state.dishesList);
        const dishData = {
                name : null,
                image : null,
                description : null,
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
            name : this.state.rName,
            address : this.state.address,
            open_timings : this.state.open_timings,
            close_timings : this.state.close_timings,
            items : this.state.dishesList
        }
        console.log("res data", restaurantData);
        await this.props.manageRestaurantRedux(restaurantData);
        console.log(this.props.msg);
    }
    
    editDish = (index, field, value) => {
        let temp = this.state.dishesList

        temp[index][field] = value
        this.setState({dishesList: temp})
    }

    render() {
        let displayDishes = null
        if (this.state.dishesList.length !== 0) {
            displayDishes = this.state.dishesList.map((dish, i) =>
            <div>
            <Row key={i} style={{marginTop:"10px"}}>
                <Col sm={4}>
                    ...{i}...
                    <Label for="dishimage">Dish Image</Label>
                    <Input type="text" value={this.state.dishesList[i].image} onChange={(e) => {this.editDish(i, "image", e.target.value)}} name="dishimage" id="dishimage"/>
                </Col>
                <Col sm={4}>
                    <Label for="dishname">Dish Name</Label>
                    <Input type="text" value={this.state.dishesList[i].name} onChange={(e) => {this.editDish(i, "name", e.target.value)}} name="dishname" id="dishname"/>
                </Col>
                <Col sm={4}>
                    <Label for="description">Description</Label>
                    <Input type="text" value={this.state.dishesList[i].description} onChange={(e) => {this.editDish(i, "description", e.target.value)}} name="description" id="description" />
                </Col>
            </Row>
            <Row style={{marginTop:"10px"}}>
                <Col sm={4}>
                    <Label for="price">Price</Label>
                    <Input type="text" value={this.state.dishesList[i].price} onChange={(e) => {this.editDish(i, "price", e.target.value)}} name="price" id="price" />
                </Col>
                <Col sm={4}>
                    <Label for="price">Category</Label>
                    <Input type="text" value={this.state.dishesList[i].category} onChange={(e) => {this.editDish(i, "category", e.target.value)}} name="category" id="category" />
                </Col>
                <Col sm={4}>
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
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="rimage">Restaurant Image</Label>
                        <Input type="text" onChange={(e) => {this.setState({rImage : e.target.value})}} name="rimage" id="rimage" 
                        placeholder="Enter restaurant image" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="rname">Restaurant Name</Label>
                        <Input type="text" onChange={(e) => {this.setState({rName : e.target.value})}} name="rname" id="ranme" 
                        placeholder="Enter restaurant name" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="address">Restaurant Address</Label>
                        <Input type="text" onChange={(e) => {this.setState({address : e.target.value})}} name="address" id="address" 
                        placeholder="Enter address" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="opentimings">Opening timings</Label>
                        <Input type="text" onChange={(e) => {this.setState({open_timings : e.target.value})}} name="opentimings" id="opentimings" 
                        placeholder="like 6:30am" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="closetimings">Closing timings</Label>
                        <Input type="text" onChange={(e) => {this.setState({close_timings : e.target.value})}} name="closetimings" id="closetimings" 
                        placeholder="like 4:30pm" />
                    </FormGroup>
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
                    <Button style={{backgroundColor:"#27AE60", width:"100px"}}>Update</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"30px"}}>
                </Row>
                </Container>
        );
    }
}
 
ManageRestaurant.propTypes = {
    manageRestaurantRedux: PropTypes.func.isRequired,
    getRestaurantDetailsRedux : PropTypes.func.isRequired,
    resDetails : PropTypes.array.isRequired
}
  
const mapStateToProps = state =>{
    return({
        resDetails: state.manageRestaurant.restaurantDetails
    });
}
    
export default connect(mapStateToProps, {manageRestaurantRedux, getRestaurantDetailsRedux})(ManageRestaurant);