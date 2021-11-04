import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class BodyContent extends React.Component {
    render() { 
        return (
            <div className = "container">
      <br />
       <br />
       <br />
       <br />
       <div className="row">
           <div className="col-md-8">
           <h3><strong>Order food to your door</strong></h3>
           </div>
           </div>
           <br />
           <div className="row">
           <div className="col-md-6">
           <div className="input-group mb-3">
           <input type="text" className="form-control" placeholder="Enter delivery address" />
           </div>
           </div>
           <div className="col-md">
           <button type="button" className="btn btn-dark" style={{height:"40px"}}>Find Food</button>
           </div>
           </div>
       </div>
        );
    }
}
 
export default BodyContent;