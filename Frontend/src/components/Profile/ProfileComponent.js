import React from "react";
import { Redirect } from "react-router-dom";
import login_logo from '../../images/login_logo.png';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutCustomerRedux} from '../../redux/reduxActions/logoutAction';
import {getUserDetailsRedux, postUserDetailsRedux} from '../../redux/reduxActions/userDetailsAction';
import { Button } from "reactstrap";
import { CountryDropdown } from 'react-country-region-selector';
import { Link } from 'react-router-dom';
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userinfo: {
        name: "",
        nickname: "",
        email: "",
        mobile: "",
        fav_restaurant: "",
        dob: "",
        city: "",
        street: "",
        zip: ""
      },
      flag: false,
      country : "",
      currentState : "",
      updateFlag : false
    }
  }

  selectCountry (val) {
      this.setState({ country: val });
  }
  
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
    console.log("logout clicked")
    window.localStorage.clear();
    await this.props.logoutCustomerRedux();
    this.setState({flag : true});
  };

  handleState = (e) => {
    this.setState({currentState : e.target.value})
  }

  handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      userid : this.props.userDetails.userid,
      nickname : this.state.userinfo.nickname,
      mobile : this.state.userinfo.mobile,
      fav_restaurant : this.state.userinfo.fav_restaurant,
      city : this.state.userinfo.city,
      state : this.state.currentState, 
      street : this.state.userinfo.street,
      zip : this.state.userinfo.zip,
      country : this.state.country
    }
    await this.props.postUserDetailsRedux(data);
    this.setState({updateFlag : true});
  }

  render() {
    console.log(this.props.msg);
    const { country } = this.state;
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
        {this.state.updateFlag && <Redirect to='/home' />}
        {redirectHome}
        <div className="container" style={{ marginTop: "20px"}}>
          <div className="row">
          <div className="col-sm-2">
          <Link to='/'><img src={login_logo} alt="login_logo" style={{height:'30px',width:'400px', marginLeft:'100px'}}></img></Link>
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
                    <label>Name</label>
                    <input onChange={this.handleChange} value={this.props.userDetails.username} name="name" type="text" className="form-control" id="name" />
                    </div>

                    <div className="col col-sm-3">
                    <label>Nick name</label>
                    <input onChange={this.handleChange} name="nickname" type="text" className="form-control" id="nickname" />
                    </div>
                </div>
                <div className="row"> 
                <div className="col col-sm-3">
                        <label>Email</label>
                        <input onChange={this.handleChange} value={this.props.userDetails.email} name="email" type="email" className="form-control" id="email" />
                        </div>

                    <div className="col col-sm-3">
                        <label>Contact</label>
                        <input onChange={this.handleChange} name="mobile" type="text" className="form-control" id="contact" placeholder="+1(123)4567890" />
                    </div>
                </div>
                <div className="row">
                        <div className="col col-sm-3">
                            <label>Favorites</label>
                            <input onChange={this.handleChange} name="fav_restaurant" type="text" className="form-control" id="favorites" />
                        </div>

                        <div className="col col-sm-3">
                            <label>Date of birth</label>
                            <input onChange={this.handleChange} value={this.props.userDetails.dob} name="dob" type="text" className="form-control" id="dob" placeholder="mm-dd-yyyy" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-sm-3">
                        <label>City</label>
                        <input onChange={this.handleChange} name="city" type="text" className="form-control" id="inputCity" />
                        </div>

                        <div className="col col-sm-3">
                        <label>State</label>
                        <select onChange={this.handleState} value={this.state.currentState} id="inputState" className="form-control">
                            <option>Alaska</option>
                            <option>Arizona</option>
                            <option>Arkansas</option>
                            <option>California</option>
                            <option>Colorado</option>
                            <option>Connecticut</option>
                            <option>Delaware</option>
                            <option>Florida</option>
                            <option>Georgia</option>
                            <option>Hawaii</option>
                            <option>Idaho</option>
                            <option>Illinois</option>
                            <option>Indiana</option>
                            <option>Iowa</option>
                            <option>Kansas</option>
                            <option>Kentucky</option>
                            <option>Louisiana</option>
                            <option>Maine</option>
                            <option>Maryland</option>
                            <option>Massachusetts</option>
                            <option>Michigan</option>
                            <option>Minnesota</option>
                            <option>Mississippi</option>
                            <option>Missouri</option>
                            <option>Montana</option>
                            <option>Nebraska</option>
                            <option>Nevada</option>
                            <option>New Hampshire</option>
                            <option>New Jersey</option>
                            <option>New Mexico</option>
                            <option>New York</option>
                            <option>North Carolina</option>
                            <option>North Dakota</option>
                            <option>Ohio</option>
                            <option>Oklahoma</option>
                            <option>Oregon</option>
                            <option>Pennsylvania</option>
                            <option>Rhode Island</option>
                            <option>South Carolina</option>
                            <option>South Dakota</option>
                            <option>Tennessee</option>
                            <option>Texas</option>
                            <option>Utah</option>
                            <option>Vermont</option>
                            <option>Virginia</option>
                            <option>Washington</option>
                            <option>West Virginia</option>
                            <option>Wisconsin</option>
                            <option>Wyoming</option>
                        </select>
                        </div>
                    </div>
                    <div className="row">
                    <div className="col col-sm-3">
                        <label>Address</label>
                        <input onChange={this.handleChange} name="street" type="text" className="form-control" id="address" />
                        </div>

                    <div className="col col-sm-3">
                        <label>Zip</label>
                        <input onChange={this.handleChange} name="zip" type="text" className="form-control" id="inputZip" />
                        </div>
                    </div>
                    <div className="row" style={{marginTop:"20px"}}>
                    <div className="col col-sm-6">
                    <CountryDropdown
                      value={country}
                      onChange={(val) => this.selectCountry(val)} />  
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
  postUserDetailsRedux: PropTypes.func.isRequired,
  //getUserDetailsRedux: PropTypes.func.isRequired,
  userDetails: PropTypes.object.isRequired,
  msg: PropTypes.string.isRequired
}

const mapStateToProps = state =>{
  return({
    userDetails: state.user.userDetails,
    msg: state.user.msg
  });
}
  
export default connect(mapStateToProps, {postUserDetailsRedux, logoutCustomerRedux})(Profile);