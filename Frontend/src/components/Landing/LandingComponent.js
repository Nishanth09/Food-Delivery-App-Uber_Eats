import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import ubereats_image from '../../images/ubereats_image.svg';
import BodyContent from './BodyComponent';
import Navbar from './NavComponent';
import '../../App.css';

class Landing extends React.Component {
  state = {
    flag: false
  };
  render() {
    let renderContent = null; 
    if (!this.state.flag) {
      renderContent = <BodyContent />;
    }
    return (
    <React.Fragment>
    <Navbar />
    {renderContent}
    </React.Fragment>
    );
  }
}
 
export default Landing;
