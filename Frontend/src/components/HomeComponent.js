import React from 'react';
import {Link} from 'react-router-dom';
import cookie from "react-cookies";
import 'bootstrap/dist/css/bootstrap.min.css'
import { Redirect } from 'react-router';


class Home extends React.Component {
    render() {
      let visitPage = null;
      visitPage = <Redirect to = "/landingpage"/>
      console.log("----------",cookie.load("cookie"));
      let name = "nishanth";
      let headerSection = null;
      let flag = true;
      if (flag) {
        headerSection = (<div className="col col-sm-3 offset-sm-4">
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
        headerSection = (<div className="col col-sm-3 offset-sm-4">
      <div>
            <button className="btn btn-login">{name}</button>
        </div>
      </div>);
      } 
        return (
            <div
        className="container-fluid form-cont"
        style={{ marginBottom: 10 }}>
        <div className="row">
          <div className="col col-sm-2">
          <div className="row " style={{ flexWrap: "nowrap", textAlign: "center" }} >
            <div className="col col-sm-3 offset-sm-2">
            <Link to="/">
          <button className="btn btn-login">
            <img src = {"./title_logo.png"} alt="Nothing"></img>
            </button>
              </Link>
            </div>
            </div>
          </div>
          <div className="col col-sm-3">
          </div>
          {headerSection}
        </div>
        <div className= "row">
        {visitPage}
        </div>
      </div>
        );
    }
}
 
export default Home;