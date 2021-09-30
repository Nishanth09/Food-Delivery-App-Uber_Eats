import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';
import title_logo from '../../images/title_logo.png';
import AfterLoginNavbar from './AfterNavComponent';
import { connect } from 'react-redux';

class Navbar extends React.Component {
    render() { 
        let navbarDisplay = null;
        if (this.props.showFlag === "open") {
            navbarDisplay = <AfterLoginNavbar />;
        } else {
            navbarDisplay = <BeforeLoginNavbar />;
        }
        console.log("======",this.props);
        return (
        <div>
            {navbarDisplay}
            </div>
      );
    }
}

function BeforeLoginNavbar() {
    return (
        <React.Fragment>
        <Container>
          <Row >
            <Col sm={8} style = {{marginTop: "10px"}}>
            <Link to="/"><img alt="" style={{height:'100',width:'100'}} src={title_logo}/>
            </Link>
            </Col>
            <Col sm={2}>
              <Link className="btn btn-light" 
              style={{ textDecoration:'None', marginRight: '30px', marginTop:'10px' , 
              backgroundColor:'#CACFD2', borderColor:'grey', 
              borderRadius: '20px 20px 20px 20px', color:'black'}}
               to="/restaurantLogin">Restaurant Sign in</Link>
            </Col>
            <Col sm={2}>
              <Link className="btn btn-light" 
              style={{ textDecoration:'None', marginRight: '30px', marginTop:'10px' , 
              backgroundColor:'#CACFD2', borderColor:'grey', 
              borderRadius: '20px 20px 20px 20px', color:'black'}}
               to="/login">Customer Sign In</Link>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
}

const mapStateToProps = state =>{
  console.log("state mapstatetoprops in navbar",state);
  return({
      cart: state.restaurant.cartItems
  });
}

export default connect(mapStateToProps)(Navbar);
