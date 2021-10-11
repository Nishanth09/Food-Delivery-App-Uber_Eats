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
            <Col sm={10} style = {{marginTop: "10px"}}>
            <Link to="/"><img alt="" style={{height:'100',width:'100'}} src={title_logo}/>
            </Link>
            </Col>
            <Col sm={2}>
              <Link className="btn btn-light" 
              style={{ textDecoration:'None', marginRight: '30px', marginTop:'10px', paddingTop:"11px", 
              backgroundColor:'#E5E7E9', borderColor:'grey', 
              borderRadius: '30px', width:"100px", border:'none', color:'black', fontWeight:"500"}}
               to="/login">Sign In</Link>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
}

const mapStateToProps = state =>{
  return({
      cart: state.restaurant.cartItems
  });
}

export default connect(mapStateToProps)(Navbar);
