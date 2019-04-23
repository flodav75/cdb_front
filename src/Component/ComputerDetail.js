import React, { Component } from 'react';


import SelectComputer from "./SelectComputer";
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
                    <SelectComputer computer={this.state.computer} removeToDelete={this.props.removeToDelete}  addToDelete={this.props.addToDelete}/>
                </td>
            </tr>

        );
    }
}

export default ComputerDetail;


