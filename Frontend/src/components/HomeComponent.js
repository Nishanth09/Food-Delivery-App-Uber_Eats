import React from 'react';
import {Link} from 'react-router-dom';
import cookie from "react-cookies";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from 'react-router';
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
//import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
class Home extends React.Component {
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
      let visitPage = null;
      //visitPage = <Redirect to = "/landingpage"/>
      visitPage = (
        <button type = "button" className="btn btn-dark">
                <Badge badgeContent={0} color="secondary">
        <ShoppingCartIcon />Cart
      </Badge>
        </button>      );
      console.log("----------",cookie.load("cookie"));
      let name = "nishanth";
      let headerSection = null;
      let flag = true;
      if (flag) {
        headerSection = (<div className="col order-last">
        <div>
            <Link to="/login">
              <button className="btn btn-login">Sign in</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-login">Sign up</button>
            </Link>
          </div>
        </div>);
      }
      else {
        headerSection = (<div style={{marginTop:"5px"}}>{visitPage}</div>);
      } 
        return (
          <div class="container">
  <div class="row">
    <div class="col-sm-1">
    <div className="col order-first">
    <IconButton onClick={this.onHandleClick} size="small" sx={{ ml: 2 }}>
    <img
          src={"./dehaze_icon.webp"}
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
    <div class="col-sm-3">
            <Link to="/landingpage">
          <button className="btn btn-login">
         <img src = {"./title_logo.png"} alt="Nothing"></img>
            </button>
             </Link>
    </div>
    <div class="col-md-3 offset-5">
      {headerSection}
    </div>
  </div>
</div>
        );
    }
}
 
export default Home;