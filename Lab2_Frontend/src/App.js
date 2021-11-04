import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import Main from './Main';

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
          <Main />
      </Router>
      </Provider>
    );
  }
}
 
export default App;