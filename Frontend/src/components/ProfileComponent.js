import React from "react";
import { Button, Form, FormGroup, Label, Input, Col } from "reactstrap";
import axios from "axios";
import { Redirect } from "react-router-dom";

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
      error: {},
      loginError: "",
      auth: false,
    };

  handleChange = (e) => {
    this.setState({
      userinfo: {
        ...this.state.userinfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  componentDidMount() {
        this.setState({
          userinfo: this.state.userinfo
        });
  }

  submitForm = (e) => {
    //prevent page from refresh
    e.preventDefault();
    const error = this.validateForm();
    if (Object.keys(error).length == 0) {
      //set the with credentials to true
      axios.defaults.withCredentials = true;
      //make a post request with the user data
      axios
        .post(
          `http://localhost:8000/updateProfile`,
          this.state.userinfo
        )
        .then((response) => {
          if (response.status === 200) {
            this.SetLocalStorage(JSON.stringify(this.state.userinfo));
            this.setState({
              authFlag: true,
            });
          } else {
            this.setState({
              loginError:
                "<p style={{color: red}}>User is already registered</p>",
              authFlag: false,
            });
          }
        })
        .catch(() => {
          this.setState({
            loginError: "User is already registered",
          });
        });
    } else {
      this.setState({ error });
    }
  };

  validateForm = () => {
    var error = {};
    return error;
  };

  handleFileUpload = (event) => {
    event.preventDefault();
    // let data = new FormData();
    // data.append("file", event.target.files[0]);
    // axios
    //   .post(`http://${config.ipAddress}:8000/upload`, data)
    //   .then((response) => {
    //     console.log(response);
    //     let userinfo = this.state.userinfo;
    //     userinfo.UserProfilePic =
    //       `http://${config.ipAddress}:8000/` + response.data;
    //     this.setState({
    //       userinfo,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log("error " + error);
    //     let userinfo = this.state.userinfo;
    //     userinfo.UserProfilePic = "./assets/userIcon.jpg";
    //     this.setState({
    //       userinfo,
    //     });
    //   });
  };

  render() {
    let redirectVar = null;
    // if (!cookie.load("cookie")) redirectVar = <Redirect to="/login" />;
    // else if (this.state.authFlag) {
    //   redirectVar = <Redirect to="/home" />;
    // } else redirectVar = <Redirect to="/updateProfile" />;
    redirectVar = <Redirect to="/profile" />
    let picture = "";
    if (this.state.userinfo.profilePic != "") {
      picture = this.state.userinfo.UserProfilePic;
    } else {
      picture = "./userIcon.jpg";
    }
    return (
      <div>
        {redirectVar}
        <div className="container" style={{ marginLeft: "250px", marginTop: "50px" }}>
            <div className="row">
                <h2>Hello, Nishanth</h2>
                <div className="col col-sm-3">
                <label>Update your profile picture</label>
                <img src={picture} alt="..." width={100} height={100}></img>
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
            <div className="row">
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
                    <br />

  </div>
  <div className="row">
<div className="col-3 offset-2">
    <br />
<button type="submit" className="btn btn-success">Update</button>
<br />
</div>
  </div>
  <div className="row">
      -
      <br />
<hr />
  </div>
</div>
      </div>
    );
  }
}
export default Profile; 
