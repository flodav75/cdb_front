import React, { Component } from 'react';

class ComputerDetail extends Component {

    state={
    computer:this.props.computer
}

    render(){
        let { computer } = this.state;
      return (
          <tr>
              <td>{computer.name}</td>
              <td>{computer.introduced}</td>
              <td>{computer.discontinued}</td>
              <td>{computer.companyname}</td>
          </tr>
      );
    }
  }
  
  export default ComputerDetail;
