import React, { Component } from 'react';

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
            </tr>
  
      );
    }
  }
  
  export default CompanyDetail;