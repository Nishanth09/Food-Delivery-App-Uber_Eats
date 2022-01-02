import React from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import "../../App.css";
import title_logo from '../../images/title_logo.png';
import { connect } from 'react-redux';
import { modeRedux } from '../../redux/reduxActions/restaurantAction';
import PropTypes from 'prop-types';
import CartPopUp from './CartPopUpComponent';
import { getAllRestaurantsRedux, locationRedux } from '../../redux/reduxActions/restaurantAction';
import dehaze_icon from "../../images/dehaze_icon.webp";

class AfterLoginNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuFlag : null,
      cartFlag : 0,
      searchItem : null,
      cart : null
    }
  }

  async componentDidUpdate (prevProps,prevState) {
    if (this.state.searchItem !== prevState.searchItem) {
      const data = {
        "location" : this.state.searchItem
      }
      await this.props.getAllRestaurantsRedux(data)
    }
}

  onHandleClick = (e) => {
    this.setState({menuFlag : e.currentTarget});
  }

  handleCart = () => {
    this.setState({cartFlag: !this.state.cartFlag});
  }

  onHandleClose = (e) => {
    this.setState({menuFlag : null});
  }

  handleDelivery = (e) => {
    const data = {
      "mode": "delivery"
    }
    this.props.modeRedux(data);
  }

  handlePickup = (e) => {
    const data = {
      "mode": "pick up"
    }
    this.props.modeRedux(data);
    }

  handleSearch = async () => {
    const data = {
      "location": this.state.searchItem
    }
    await this.props.locationRedux(data)
  }

  render() {
    let cartLen = 0
    if (this.props.cart) {
      cartLen = this.props.cart.length
    }
        return (
        <div className="container">
          <div className="row">
            <div className="col-sm-1">
            <div className="col order-first" style={{marginTop:"10px"}}>
            <IconButton onClick={this.onHandleClick} size="small" sx={{ ml: 2 }}>
            <img
                  src={dehaze_icon}
                  alt="nothing"
                  width={30}
                  height={30}
                  className="rounded-circle"
                ></img>
                  </IconButton>
                  <Menu
                anchorEl={this.state.menuFlag}
                open = {Boolean(this.state.menuFlag)}
                onClose={this.onHandleClose}
                onClick={this.onHandleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link to = "/profile" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem>
                  <Avatar /> View Account
                </MenuItem>
                </Link>
                <Link to = "/orders/all" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem>
                  Orders
                </MenuItem>
                </Link>
                <Link to = "/favorites" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem>
                  Favorites
                </MenuItem>
                <Divider />
                </Link>
                {/* <Link to = "/logout" style={{ textDecoration: "none", color: "black" }}>
                <MenuItem>
                  Sign out
                </MenuItem>
                </Link> */}
              </Menu>
              </div>
            </div>
            <div className="col-sm-2">
                  <Link to="/">
                  <button className="btn btn-login">
                 <img src = {title_logo} width={120} height={20} alt="Nothing" style={{marginRight:"20px", paddingRight:"20px"}}></img>
                    </button>
                  </Link>
            </div>
            <div className="col-sm-3" style={{ marginTop:"5px"}}>
            <button onClick={this.handleDelivery} className="btn btn-light" style={{ outline:"None", width:"100px", borderRadius: '20px 20px 20px 20px', backgroundColor:"#D0CACA"}}>Delivery</button>
             <button onClick={this.handlePickup} className="btn btn-light" style={{ outline:"None", width:"100px", borderRadius: '20px 20px 20px 20px'}}>Pick up</button>
              </div>
            <div className="col-md-4" style={{marginTop:"10px"}}>
                  <div className="input-group rounded">
                <input type="search" className="form-control rounded"
                 onChange={(e) => {this.setState({searchItem : e.target.value})}} placeholder="Enter location to search" aria-label="Search"
                  aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fas fa-search" onClick={this.handleSearch}></i>
                </span>
              </div>
            </div>
            <div className="col-md-2" style={{marginTop:"10px"}}>
            <button type = "button" onClick={this.handleCart} className="btn btn-dark" style={{marginLeft:"-15px"}}>
                <Badge badgeContent={0} color="secondary">
        <ShoppingCartIcon />Cart {cartLen}
        </Badge>
        </button> 
                {this.state.cartFlag ? <CartPopUp isOpen = {this.state.cartFlag} toggle = {this.handleCart}/> : null}
            </div>
          </div>
        </div> 
            );
    }
}

AfterLoginNavbar.propTypes = {
  modeRedux: PropTypes.func.isRequired,
  getAllRestaurantsRedux: PropTypes.func.isRequired,
  locationRedux: PropTypes.func.isRequired,
  restaurantDetails: PropTypes.array.isRequired,
}

const mapStateToProps = state =>{
  return({
      cart: state.restaurant.cartItems,
      restaurantDetails : state.restaurant.restaurantDetails
  });
}

export default connect(mapStateToProps, { modeRedux, getAllRestaurantsRedux, locationRedux })(AfterLoginNavbar);