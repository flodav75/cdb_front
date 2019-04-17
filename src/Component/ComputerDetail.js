import React, { Component } from 'react';

class ComputerDetail extends Component {

    state={
    computer:this.props.computer
}

    render(){
      return (
          <tr>
              <td>{this.state.computer.name}</td>
              <td>{this.state.computer.introduced}</td>
              <td>{this.state.computer.discontinued}</td>
              <td>{this.state.computer.companyname}</td>
          </tr>
      );
    }
  }
  
  export default ComputerDetail;
