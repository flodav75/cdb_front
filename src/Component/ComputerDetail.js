import React, { Component } from 'react';

import {Button} from "reactstrap";


class ComputerDetail extends Component {
    state={
    computer:this.props.computer,
    computers: this.props.computers
    }

    onDelete =() =>{
      this.props.delete(this.props.computer.id)
    }

    render(){
        let { computer } = this.state;
      return (
          <tr>
              <td onClick={this.props.onToggle(this.state.computer)}>
                {this.state.computer.name}
              </td>
              <td>{computer.introduced}</td>
              <td>{this.state.computer.discontinued}</td>
              <td>{this.state.computer.companyname}</td>
              <td><Button onClick={this.onDelete}></Button></td>
          </tr>
      );

    }
}

export default ComputerDetail;


