import React, { Component } from 'react';
import ComputerForm from "../ComputerForm"

class ComputerDetail extends Component {

    state={
    computer:this.props.computer,
    computers: this.props.computers
    }



    render(){
        let { computer } = this.state;
      return (
          <tr>
              <td onClick={this.props.onToggle(this.state.computer)}>
                {this.state.computer.name}
              </td>
              <td>{this.state.computer.introduced}</td>
              <td>{this.state.computer.discontinued}</td>
              <td>{this.state.computer.companyname}</td>
          </tr>
      );
    }
  }
  
  export default ComputerDetail;
