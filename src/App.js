import React, { Component } from 'react';

import './App.css';
import ComputerList from './Container/ComputerList';
import NavBar from './Component/NavBar';

class App extends Component {
  render() {
    return (
        <div>
              <NavBar/>
              <ComputerList/>
        </div>

    );
  }
}

export default App;
