import React, { Component } from 'react';

import DeletePopUp from "./DeletePopUp";
import {Button} from "reactstrap";


class ComputerDetail extends Component {

    state={
        computer:this.props.computer,
        isDelete:!this.props.computer || false
    }

    toggleDelete= ()=>{
        this.setState({isDelete:!this.state.isDelete});
    }

    render(){
      let { computer } = this.state;
      let{onToggle} = this.props;
      return (
          <tr>
              <td onClick={onToggle(computer)}>
                {computer.name}
              </td>
              <td onClick={onToggle(computer)}>{computer.introduced}</td>
              <td onClick={onToggle(computer)}>{computer.discontinued}</td>
              <td onClick={onToggle(computer)}>{computer.companyname}</td>
              <td onClick={onToggle(computer)}>
                  <Button color="danger" onClick={this.toggleDelete}>delete</Button>
                  {this.state.isDelete &&<DeletePopUp computer={computer}  toggleDelete={this.toggleDelete} delete={this.props.delete}/>}
              </td>
          </tr>
      );

    }
}

export default ComputerDetail;


