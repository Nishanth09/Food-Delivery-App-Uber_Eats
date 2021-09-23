import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '../Landing/NavComponent'; 
import { Container } from 'react-bootstrap';
import Filters from '../Filter/FilterComponent';
class Home extends React.Component {
  render() { 
    let check = this.props.location.state;
    let renderNav = null;
    if (check) {
      renderNav = <Navbar showFlag="open"/>;
    }
    return (
      <React.Fragment>
        {renderNav}
        <Container>
          <Filters />
          </Container>
      </React.Fragment>
    );
  }
}
 
export default Home;
