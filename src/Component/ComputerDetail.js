import React, { Component } from 'react';
import ComputerForm from "../ComputerForm"

class ComputerDetail extends Component {

    state={
    computer:this.props.computer,
    computerFormAccess: false
    }

    toggleFormAccess = () => {
      console.log(this.state.computerFormAccess)
      this.setState({
        computerFormAccess: !this.state.computerFormAccess})
      console.log(this.state.computerFormAccess)
  };

    render(){
        let { computer } = this.state;
      return (
          <tr>
              <td onClick={this.toggleFormAccess}>
                { this.state.computerFormAccess ? <ComputerForm computer={this.state.computer}/>
                :
                this.state.computer.name
              }
              </td>
              <td>{this.state.computer.introduced}</td>
              <td>{this.state.computer.discontinued}</td>
              <td>{this.state.computer.companyname}</td>
          </tr>
      );
    }
  }
  
  export default ComputerDetail;
