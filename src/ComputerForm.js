import React, { Component } from 'react';

import './App.scss';

import { faPen, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Card, CardBody, Col, Input, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

import "./ComputerForm.scss";

const addressCompany = 'http://10.0.1.70:8080/webapp/api/companies/'

class ComputerForm extends Component {

  state = {
    computer: this.props.computer,
    UpdateMode: this.props.UpdateMode,
    computers: this.props.computers,
    companies: [],
    key: this.props.key,
    introDate: new Date()
  };

  componentDidMount() {
    this.getAllCompanies();
  }

  getAllCompanies() {
    fetch(addressCompany,{
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Host': 'api.producthunt.com',
          'Authorization':sessionStorage.getItem('token')
      }})
      .then(result => {
        result.json().then(companies => {
          this.setState({ companies: companies })
        })
      })
      .catch(error => console.error(error))
  }

  getComputerById(id) {
    fetch('http://10.0.1.70:8080/webapp/api/computers/' + { id })
      .then(result => {
        result.json()
          .then(computer => {
            this.setState({ computer: computer })
          })
      })
      .catch(error => console.error(error))
  }

  update = (computer) => () => {
    this.setState({ id: this.state.computer.id })
    fetch('http://10.0.1.70:8080/webapp/api/computers/' + computer.id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(computer)
      }).catch(error => console.error(error))
    this.props.onSendBack();
  }


  add = (computer) => {
    this.props.onSendBack();
    this.addComputer(computer)
  }

  addComputer = (computer) => {
    fetch('http://10.0.1.70:8080/webapp/api/computers/',
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(computer)
      }).catch(error => console.error(error))
  }



  onChangeName = (event) => {
    this.setState({ computer: { ...this.state.computer, name: event.target.value } })
  };

  onChangeIntroduced = (event) => {
    this.setState({ computer: { ...this.state.computer, introduced: event.target.value } })
  };

  onChangeIntroduced3 = introDate => {
    this.setState({ introDate },
      { computer: { ...this.state.computer, discontinued: introDate } })
  }

  onChangeIntroduced2 = (event) => {
    this.setState({ computer: { ...this.state.computer, discontinued: event.target.value } })
  }

  onChangeDiscontinued = (event) => {
    this.setState({ computer: { ...this.state.computer, discontinued: event.target.value } })
  };

  onChangeCompany = (selected) => {
    this.setState({ computer: { ...this.state.computer, companyname: selected.label, companyId: selected.value } });
  }


  render() {
    let { computer } = this.state;
    let dropdown = this.state.companies && this.state.companies.map(company => { let test = { label: company.name, value: company.id }; return test })

    return (
      <Container>
        <Row>
          <Col md={{ size: 6, offset: 3 }} >
            <Card>
              {this.state.UpdateMode ? <h1>Edit a computer</h1> : <h1>Add a computer</h1>}
              <CardBody>
                Computer Name
                <Input placeholer="Computer name" value={computer && computer.name} onChange={this.onChangeName} />
                Introduced Date <input type="date"
                  onChange={this.onChangeIntroduced}
                  value={computer && computer.introduced}
                />
                <Input placeholer="Introduced Date" value={computer && computer.introduced} onChange={this.onChangeIntroduced} />
                Discontinued Date <input type="date"
                  onChange={this.onChangeDiscontinued}
                  value={computer && computer.discontinued}
                />
                <Input placeholer="Discontinued Date" value={computer && computer.discontinued} onChange={this.onChangeDiscontinued} />
                Company
                <Select options={dropdown} onChange={this.onChangeCompany} />
                {this.state.UpdateMode
                  ? <FontAwesomeIcon icon={faPen} onClick={this.update(computer)} />
                  : <FontAwesomeIcon icon={faCheck} onClick={() => this.add(computer)} />
                }
                <FontAwesomeIcon icon={faTimes} onClick={() => this.props.onSendBack()} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default ComputerForm;
