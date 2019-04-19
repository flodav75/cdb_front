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
        let { computer } = this.state;
        return (
            <tr>
                <td>{computer.name}</td>
                <td>{computer.introduced}</td>
                <td>{computer.discontinued}</td>
                <td>{computer.companyname}</td>
                <td><Button onClick={this.onDelete}>

                </Button></td>
            </tr>

        );
    }
}

export default ComputerDetail;


