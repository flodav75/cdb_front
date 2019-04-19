import React, { Component } from 'react';

import ComputerList from './Container/ComputerList';
import NavBar from "./Component/NavBar";
import CompanyList from './Container/CompanyList';

class App extends Component {
  state = {
    pageMode: true
  }

  togglePageMode = () => {
    this.setState({ 
      pageMode: !this.state.pageMode 
    })
}


  render() {
    return (

        <div>
              <NavBar onToggle = {this.togglePageMode} pageMode = {this.state.pageMode}/>
              { this.state.pageMode ? <ComputerList/> : <CompanyList/> }
        </div>


    );
  }
}

export default App;
