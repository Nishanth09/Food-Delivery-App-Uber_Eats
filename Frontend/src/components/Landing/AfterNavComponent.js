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

class AfterLoginNavbar extends React.Component {
    state = {
        menuFlag : null
      }
      onHandleClick = (e) => {
        console.log(e.currentTarget,"-------");
        this.setState({menuFlag : e.currentTarget});
      }
      onHandleClose = (e) => {
        this.setState({menuFlag : null});
      }
    render() { 
        return (
        <div className="container">
          <div className="row">
            <div className="col-sm-1">
            <div className="col order-first" style={{marginTop:"10px"}}>
            <IconButton onClick={this.onHandleClick} size="small" sx={{ ml: 2 }}>
            <img
                  src={"./dehaze_icon.webp"}
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
                <MenuItem>
                  Orders
                </MenuItem>
                <MenuItem>
                  Favorites
                </MenuItem>
                <MenuItem>
                  Wallet
                </MenuItem>
                <MenuItem>
                  Sign out
                </MenuItem>
                <Divider />
              </Menu>
              </div>
            </div>
            <div className="col-sm-2">
                    <Link to="/landingpage">
                  <button className="btn btn-login">
                 <img src = {title_logo} width={120} height={20} alt="Nothing" style={{marginRight:"20px", paddingRight:"20px"}}></img>
                    </button>
                     </Link>
            </div>
            <div className="col-sm-3" style={{ marginTop:"5px"}}>
            <button className="btn btn-light" style={{ outline:"None", width:"100px", borderRadius: '20px 20px 20px 20px', backgroundColor:"#D0CACA"}}>Delivery</button>
             <button className="btn btn-light" style={{ outline:"None", width:"100px", borderRadius: '20px 20px 20px 20px'}}>Pick up</button>
              </div>
              <div className="col-md-2" style={{marginTop:"10px"}}>
              <button className="btn btn-light btn-outline-secondary" style={{borderRadius:"20px"}}>Location</button>
            </div>
            <div className="col-md-3" style={{marginTop:"10px"}}>
            <link href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" rel="stylesheet"/>
                  <div className="input-group rounded">
                <input type="search" className="form-control rounded" placeholder="What are you craving?" aria-label="Search"
                  aria-describedby="search-addon" />
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fas fa-search"></i>
                </span>
              </div>
            </div>
            <div className="col-md-1">
            <div style={{marginTop:"10px"}}><button type = "button" className="btn btn-dark">
                <Badge badgeContent={0} color="secondary">
        <ShoppingCartIcon />Cart
        </Badge>
        </button> </div>
            </div>
          </div>
        </div>
            );
    }
}
 
export default AfterLoginNavbar;