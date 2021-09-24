import React from "react";
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
  };

  validateForm = () => {
    var error = {};
    return error;
  };

  handleFileUpload = (event) => {
    event.preventDefault();
  };

  render() {
    let redirectVar = null;
    redirectVar = <Redirect to="/profile" />
    let picture = "";
    if (this.state.userinfo.profilePic !== "") {
      picture = this.state.userinfo.UserProfilePic;
    } else {
      picture = "./userIcon.jpg";
    }
    return (
      <div>
        {redirectVar}
        <div className="container" style={{ marginLeft: "350px", marginTop: "50px" }}>
            <div className="row">
                <h2>Hello, Nishanth</h2>
                <div className="col col-sm-3">
                <label>Update your profile picture</label>
                <img src={picture} alt="nothing" width={100} height={100}></img>
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
<button type="submit" className="btn btn-success" style={{marginLeft:"30px"}}>Update</button>
<br />
</div>
  </div>
</div>
      </div>
    );
  }
}
export default Profile; 
