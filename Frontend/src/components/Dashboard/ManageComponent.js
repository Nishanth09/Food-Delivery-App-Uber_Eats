import React from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Button, 
    Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { manageRestaurantRedux } from '../../redux/reduxActions/restaurantAction'

class ManageRestaurant extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen : false,
            categoryDish : "Appetizer",
        }
    }
    handleToggle = () => {
        this.setState({dropdownOpen : !this.state.dropdownOpen});
    }
    // handleAddDish = () => {
    //     this.setState({addDishCount : this.state.addDishCount + 1});
    // }
    handleSave = async () => {
        await this.props.manageRestaurantRedux;
    }
    render() {
        return (
            <Container>
                <Row style={{marginTop:"20px"}}>
                    <h1>Restaurant Management</h1>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="rimage">Restaurant Image</Label>
                        <Input type="text" name="rimage" id="rimage" 
                        placeholder="Enter restaurant image" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="rname">Restaurant Name</Label>
                        <Input type="text" name="rname" id="ranme" 
                        placeholder="Enter restaurant name" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="address">Restaurant Address</Label>
                        <Input type="text" name="address" id="address" 
                        placeholder="Enter address" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="opentimings">Opening timings</Label>
                        <Input type="text" name="opentimings" id="opentimings" 
                        placeholder="like 6:30am" />
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"20px"}}>
                    <FormGroup>
                        <Label for="closetimings">Closing timings</Label>
                        <Input type="text" name="closetimings" id="closetimings" 
                        placeholder="like 4:30pm" />
                    </FormGroup>
                </Row>
                <Label style={{marginTop:"10px", fontWeight:"500"}}>Add Dishes</Label>
                <Row style={{marginTop:"20px", backgroundColor:"#E5E7E9"}}>
                <Row style={{marginTop:"10px"}}>
                    <Col sm={4}>
                        <Label for="dishimage">Dish Image</Label>
                        <Input type="text" name="dishimage" id="dishimage"/>
                    </Col>
                    <Col sm={4}>
                        <Label for="dishname">Dish Name</Label>
                        <Input type="text" name="dishname" id="dishname"/>
                    </Col>
                    <Col sm={4}>
                        <Label for="description">Description</Label>
                        <Input type="text" name="description" id="description" />
                    </Col>
                </Row>
                <Row style={{marginTop:"10px"}}>
                    <Col sm={4}>
                        <Label for="price">Price</Label>
                        <Input type="text" name="price" id="price" />
                    </Col>
                    <Col sm={6}>
                    <Row>
                        <FormGroup row>
                            <Label for="dishCategory" sm={2}>Dish Category</Label>
                            <Col sm={10}>
                            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.handleToggle}>
                                <DropdownToggle caret>
                                    {this.state.categoryDish}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => {this.setState({categoryDish : "Salads"})}}>Salads</DropdownItem>
                                    <DropdownItem onClick={() => {this.setState({categoryDish : "Main Course"})}}>Main Course</DropdownItem>
                                    <DropdownItem onClick={() => {this.setState({categoryDish : "Desserts"})}}>Desserts</DropdownItem>
                                    <DropdownItem onClick={() => {this.setState({categoryDish : "Beverages"})}}>Beverages</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            </Col>
                        </FormGroup>
                    </Row>
                    </Col>
                    <Col sm={2}>
                        <Button onClick={this.handleAddDish} style={{backgroundColor:"#27AE60"}}>Add Dish</Button>
                    </Col>
                <Row style={{marginTop:"10px"}}>
                </Row>
                </Row>
                </Row>
                <Row style={{marginTop:"30px"}}>
                    <Col sm={6}>
                    <Button onClick={this.handleSave} style={{backgroundColor:"black", width:"100px"}}>Save</Button>
                    </Col>
                    <Col sm={6}>
                    <Button style={{backgroundColor:"#27AE60", width:"100px"}}>Update</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"30px"}}>
                </Row>
                </Container>
        );
    }
}
 
export default ManageRestaurant;