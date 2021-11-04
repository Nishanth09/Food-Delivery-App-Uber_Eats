import React from 'react';
import { Button, Col, Container, Row, FormGroup, Label, 
    Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen : false,
            categoryDish : "Appetizer"
        }
    }
    handleToggle = () => {
        this.setState({dropdownOpen : !this.state.dropdownOpen});
    }
    render() { 
        return (
            <Container>
                <Row style={{marginTop:"50px"}}>
                    <Col sm={6}>
                        <Button style={{height:'40px', backgroundColor:'#27AE60'}}>Add Dishes</Button>
                    </Col>
                    <Col sm={6}>
                    <Button style={{height:'40px', backgroundColor:'#27AE60'}}>Edit Dishes</Button>
                    </Col>
                </Row>
                <Row style={{marginTop:"30px"}}>
                    <FormGroup row>
                        <Label for="dname" sm={2}>Dish Name</Label>
                        <Col sm={10}>
                            <Input type="text" name="dname" id="dname" 
                            placeholder="Enter the dish name" />
                        </Col>
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"10px"}}>
                    <FormGroup row>
                        <Label for="ingredients" sm={2}>Main ingredients</Label>
                        <Col sm={10}>
                            <Input type="text" name="ingredients" id="ingredients" 
                            placeholder="Enter the main ingredients" />
                        </Col>
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"10px"}}>
                    <FormGroup row>
                        <Label for="dishImage" sm={2}>Dish Image</Label>
                        <Col sm={10}>
                            <Row>
                                <img src= "../../userIcon.jpg" alt="nothing" style={{width:"100px", height:"100px"}}></img>
                            </Row>
                            <Row style={{marginTop:"10px"}}>
                                <Input type="file" name="dishImage" id="dishImage" 
                                placeholder="Enter the main ingredients" />
                            </Row>
                        </Col>
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"10px"}}>
                    <FormGroup row>
                        <Label for="dishPrice" sm={2}>Dish Price</Label>
                        <Col sm={10}>
                            <Input type="text" name="dishPrice" id="dishPrice" 
                            placeholder="Enter the dish price" />
                        </Col>
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"10px"}}>
                    <FormGroup row>
                        <Label for="dishDescription" sm={2}>Dish Description</Label>
                        <Col sm={10}>
                            <Input type="text" name="dishDescription" id="dishDescription" 
                            placeholder="Enter the dish description" />
                        </Col>
                    </FormGroup>
                </Row>
                <Row style={{marginTop:"10px"}}>
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
                <Row style={{marginTop:"50px"}}>
                <Button
                    style={{height:'40px', backgroundColor:'#27AE60'}}>Save</Button>
                </Row>
                <Row style={{marginTop:"50px"}}></Row>
            </Container>
        );
    }
}
 
export default Menu;