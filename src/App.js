import React, { Component } from 'react';

import ComputerList from './Container/ComputerList';
import NavBar from "./Component/NavBar";
import CompanyList from './Container/CompanyList';

class App extends Component {
  state = {
    PageMode: true
  }

  togglePageMode = () => {
    this.setState({ 
      PageMode: !this.state.PageMode 
    })
}


  render() {
    return (

        <div>
              <NavBar onToggle = {this.togglePageMode}/>
              { this.state.PageMode ? <ComputerList/> : <CompanyList/> }
        </div>


    );
  }
}

export default App;
