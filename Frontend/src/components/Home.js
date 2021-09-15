import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'


class Home extends React.Component {
    render() { 
        return (
            <div
        className="container-flex custom-header shadow"
        style={{ marginBottom: 10 }}>
        <div className="row">
          <div className="col col-sm-2">
          <div className="row " style={{ flexWrap: "nowrap" }, { textAlign: "center" }} >
          <Link to="/">
          <h3 className="label-custom customMargin">Uber Eats</h3>
              </Link>
            </div>
          </div>
          <div className="col col-sm-3">
          </div>
          <div className="col col-sm-3 offset-sm-4">
          <div>
              <Link to="/login">
                <button className="btn btn-login">Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
        );
    }
}
 
export default Home;