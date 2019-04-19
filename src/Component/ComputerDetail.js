import React, { Component } from 'react';
import {Button} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash} from "@fortawesome/free-solid-svg-icons";

class ComputerDetail extends Component {

    state={
    computer:this.props.computer
}

    onDelete =() =>{
        this.props.delete(this.props.computer.id)
}

    render(){
      return (
          <tr>
              <td>{this.state.computer.id}</td>
              <td>{this.state.computer.introduced}</td>
              <td>{this.state.computer.discontinued}</td>
              <td>{this.state.computer.companyname}</td>
              <td><Button onClick={this.onDelete}>

              </Button></td>
          </tr>
      );
    }
  }
  
  export default ComputerDetail;
