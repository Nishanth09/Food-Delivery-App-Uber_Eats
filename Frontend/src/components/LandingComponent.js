import React from 'react';

class Landing extends React.Component {
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
  <div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Enter delivery address" aria-label="Recipient's username" aria-describedby="basic-addon2" />
</div>
  </div>
  <div className="col-md">
  <button type="button" class="btn btn-dark">Find Food</button>
  </div>
</div>
</div>
        );
    }
}
 
export default Landing;