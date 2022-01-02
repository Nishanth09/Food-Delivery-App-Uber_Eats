import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BodyContent from './BodyComponent';
import Navbar from './NavComponent';
import uber_eats_background from "../../images/uber_eats_background.png";
import { Redirect } from 'react-router';


class Landing extends React.Component {
    state = {
      flag: false
    };
    render() {
      let renderHome = null;
      if (localStorage.getItem("token")) {
        renderHome = <Redirect to = '/home'/>;
      }
      let renderContent = null; 
      if (!this.state.flag) {
        renderContent = <BodyContent />;
      }
      return (
      <div style={{backgroundImage:`url(${uber_eats_background})`, height:"608px", backgroundColor:"#ABEBC6"}}>
      {renderHome}
      <Navbar />
      {renderContent}
      </div>
      );
    }
}
  
export default Landing;
