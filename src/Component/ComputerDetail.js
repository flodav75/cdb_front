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
        return (
            <tr>
                <td>{computer.name}</td>
                <td>{computer.introduced}</td>
                <td>{computer.discontinued}</td>
                <td>{computer.companyname}</td>
                <td>
                    <Button color="danger" onClick={this.toggleDelete}>delete</Button>
                    {this.state.isDelete &&<DeletePopUp computer={this.state.computer}  toggleDelete={this.toggleDelete} delete={this.props.delete}/>}
                </td>
            </tr>

        );
    }
}

export default ComputerDetail;


