import React, { Component } from 'react';

import CompanyDetail from '../Component/CompanyDetail';
import { Table, Container, Row } from 'reactstrap';

import { MOCK } from "../Mock";

import "../App.css";

const address = `http://10.0.1.70:8080/api/companies/`

class CompanyList extends Component {

  state = { companies: [] }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    this.setState({ companies: MOCK })
  }

  render() {
    return (
      <div >
        <Container>
          <Row>
            <Table className="table">
              <thead>
                <tr>
                  <th>id</th>
                  <th>name</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.companies.map(company => {
                    return <CompanyDetail key={company.id} company={company} />
                  })
                }
              </tbody>
            </Table>
          </Row>
        </Container>
      </div>

    );
  }
}

export default CompanyList;

