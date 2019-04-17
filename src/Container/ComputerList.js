import React, { Component } from 'react';

import ComputerDetail from '../Component/ComputerDetail';
import NavBar from '../Component/NavBar';
import Search from '../Component/Search';

const address = `http://10.0.1.70:8080/api/computers/`

class ComputerList extends Component {
  state = {
    computers: []
  }

  //Cross origin problem
  search = (name) => () => {
    fetch(address+'Search?name='+`${name}`)
        .then(result => {
            result.json().then(computers => {
                this.setState({ computers: computers })
            })
        })
        .catch(error => console.log(error))
  };

  render() {
    return (
      <div>
        <NavBar/>

        <Search onSearch={this.search}/>

        <ComputerDetail />
      </div>

    );
  }
}

export default ComputerList;
