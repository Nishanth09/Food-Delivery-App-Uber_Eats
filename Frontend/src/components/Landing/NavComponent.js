import React from 'react';
import {Link} from 'react-router-dom';
import {Col, Container, Row} from 'react-bootstrap';
import title_logo from '../../images/title_logo.png';
import AfterLoginNavbar from './AfterNavComponent';

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
            <Col style = {{marginTop: "10px"}}>
            <Link to="/"><img alt="" style={{height:'100',width:'100'}} src={title_logo}/>
            </Link>
            </Col>
            <Col style={{textAlign:'right'}}>
              <Link className="btn btn-light" 
              style={{ textDecoration:'None', marginRight: '30px', marginTop:'10px' , 
              backgroundColor:'white', borderColor:'grey', 
              borderRadius: '20px 20px 20px 20px', color:'black'}}
               to="/login">Sign In</Link>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
}

export default Navbar;
