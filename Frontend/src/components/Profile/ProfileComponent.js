import React from "react";
import { Redirect } from "react-router-dom";
import login_logo from '../../images/login_logo.png';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutCustomerRedux} from '../../redux/reduxActions/logoutAction';
import {getUserDetailsRedux} from '../../redux/reduxActions/userDetailsAction';
import { Button } from "reactstrap";

class Profile extends React.Component {
    state = {
      userinfo: {
        name: "",
        nickname: "",
        email: "",
        dob: "",
        city: "",
        state: "",
        profilePic: "",
      },
      flag: false,
    };

  handleChange = (e) => {
    this.setState({
      userinfo: {
        ...this.state.userinfo,
        [e.target.name]: e.target.value,
      },
    });
  };

// async componentDidMount() {
//     await this.props.getUserDetailsRedux();
//     this.setState({
//       userinfo: this.state.userinfo
//     });
// }

  handleLogout = async (e) => {
    e.preventDefault();
    const data = {
      email: this.state.userinfo.email,
      nickname: this.state.userinfo.nickname,
    };
    await this.props.logoutCustomerRedux();
    this.setState({flag : true});
  };

  validateForm = () => {
    var error = {};
    return error;
  };

  handleFileUpload = (event) => {
    event.preventDefault();
  };

  render() {
    let redirectHome = null;
    if (this.state.flag) {
      redirectHome = <Redirect to="/" />
    }
    let picture = "";
    if (this.state.userinfo.profilePic !== "") {
      picture = this.state.userinfo.UserProfilePic;
    } else {
      picture = "../../userIcon.jpg";
    }
    return (
      <div>
        {redirectHome}
        <div className="container" style={{ marginTop: "20px"}}>
          <div className="row">
          <div className="col-sm-2">
          <img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginLeft:'100px'}}></img>
            </div>
          <div className="col-sm-2 offset-sm-8">
          <Button onClick={this.handleLogout} className="btn btn-secondary" style={{width:"100px"}}>logout</Button>
          </div>
            </div>
            <div className="row" style={{marginTop:"30px"}}>
              <div className="col-sm-4 offset-sm-4">
              <div className="row">
              <h2>Hello, Nishanth</h2>
                <label>Update your profile picture</label>
              </div>
              <div className="row">
              <img src={picture} alt="nothing" style={{width:"100px", height:"100px"}}></img>
                </div>
                <div className="row">
                <input
                  className="btn"
                  style={{
                    marginLeft: "-10px",
                    width: 250,
                    textAlign: "left",
                  }}
                  type="file"
                  name="image"
                  onChange={this.handleFileUpload}
                />
                </div>
                </div>
                
            </div>
            <div className="row">
              <div className="col-sm-8 offset-sm-4">
              <div className="row"> 
                    <div className="col col-sm-3">
                    <label for="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                    </div>

                    <div className="col col-sm-3">
                    <label for="nickname">Nick name</label>
                    <input type="text" className="form-control" id="nickname" placeholder="Nick name" />
                    </div>
                </div>
                <div className="row"> 
                <div className="col col-sm-3">
                        <label for="email">Email</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                        </div>

                    <div className="col col-sm-3">
                        <label for="contact">Contact</label>
                        <input type="text" className="form-control" id="contact" placeholder="+1(123)4567890" />
                    </div>
                </div>
                <div className="row">
                        <div className="col col-sm-3">
                            <label for="favorites">Favorites</label>
                            <input type="text" className="form-control" id="favorites" placeholder="Enter your favorite dishes" />
                        </div>

                        <div className="col col-sm-3">
                            <label for="dob">Date of birth</label>
                            <input type="text" className="form-control" id="dob" placeholder="mm-dd-yyyy" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-sm-3">
                        <label for="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity" />
                        </div>

                        <div className="col col-sm-3">
                        <label for="inputState">State</label>
                        <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col col-sm-3">
                        <label for="address">Address</label>
                        <input type="text" className="form-control" id="address" />
                        </div>

                    <div className="col col-sm-3">
                        <label for="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip" />
                        </div>
                    </div>
                </div>
                
                    <br />
  </div>
  <div className="row">
<div className="col-sm-3 offset-sm-5">
    <br />
<button type="submit" onClick={this.handleUpdate} className="btn btn-success" style={{marginLeft:"40px"}}>Update</button>
</div>
  </div>
  <div className="row" style={{marginTop:"30px"}}>
    </div>
</div>
      </div>
    );
  }
}

Profile.propTypes = {
  logoutCustomerRedux: PropTypes.func.isRequired,
  getUserDetailsRedux: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

const mapStateToProps = state =>{
  return({
      user: state.user.userDetails
  });
}
  
export default connect(mapStateToProps, {getUserDetailsRedux, logoutCustomerRedux})(Profile);