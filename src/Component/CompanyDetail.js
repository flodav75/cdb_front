import React, { Component } from 'react';

import {Button} from "reactstrap";

class CompanyDetail extends Component {
  state = {
    company: this.props.company
  }

    render() {
        let { company } = this.state;
        return (
            <tr>
                <td>{company.id}</td>
                <td>{company.name}</td>
                <td><Button onClick={this.props.delete(company.id)}></Button></td>
            </tr>
      );
    }
  }
  
  export default CompanyDetail;
