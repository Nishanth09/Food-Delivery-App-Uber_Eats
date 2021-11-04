import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Landing/NavComponent'; 
import { Container } from 'react-bootstrap';
import Filters from './FilterComponent';
class Home extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar showFlag="open"/>
        <Container>
          <Filters />
          </Container>
      </React.Fragment>
    );
  }
}
 
export default Home;
