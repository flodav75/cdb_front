import React, { Component } from 'react';

import './App.scss';

import {faPen, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Card,  CardBody, Col, Input} from 'reactstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Select from 'react-select'
const addressCompany = 'http://10.0.1.70:8080/webapp/api/companies/'

class ComputerForm extends Component {

    state = {
        computer: this.props.computer,    
        UpdateMode: this.props.UpdateMode,
        computers: this.props.computers,
        FormMode: this.props.FormMode,
        companies: [],
        key: this.props.key,
    };

    componentDidMount(){
        this.getAllCompanies();
      if (this.state.UpdateMode){
        this.getComputerById(this.state.key);
        console.log(this.state.computer)
      }
    }

    getAllCompanies(){
        fetch(addressCompany)
            .then(result => {
                result.json().then(companies => {
                    this.setState({ companies: companies })
                })
            })
            .catch(error => console.log(error))
    }

    getComputerById(id) {
      fetch('http://10.0.1.70:8080/webapp/api/computers/'+{id})
      .then(result => {
          result.json()
          .then(computer => {
              this.setState({computer : computer})
          })
      })
      .catch(error => console.log(error))
    }

    update = (computer) => () => {
    this.setState({id: this.state.computer.id})
    console.log(computer)
    fetch('http://10.0.1.70:8080/webapp/api/computers/'+`${this.state.computer.id}`,
    {
    method: "PUT",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(computer)
    }).catch(error => console.log(error))
    console.log("request ok")
    this.setState({FormMode: !this.props.FormMode})
    }


    add = (computer) => {
    this.setState({FormMode: !this.props.FormMode})
    this.addComputer(computer) }

    addComputer = (computer) => {
    fetch('http://10.0.1.70:8080/webapp/api/computers/',
    {
    method: "POST",
    headers : {"Content-Type" : "application/json"},
    body : JSON.stringify(computer)
    }).catch(error => console.log(error))
    console.log('request OK');
    }



    onChangeName = (event) => {
      this.setState({computer: {...this.state.computer, name: event.target.value}})
    };

    onChangeIntroduced = (event) => {
      this.setState({computer: {...this.state.computer, introduced: event.target.value}})
    };

    onChangeDiscontinued = (event) => {
      this.setState({computer: {...this.state.computer, discontinued: event.target.value}})
    };

    onChangeCompany = (selected) => {
      this.setState({computer: {...this.state.computer, companyname: selected.label, companyId: selected.value}});
    }


    render() {
      let { computer } = this.state;
      let dropdown = this.state.companies && this.state.companies.map(company => {let test = {label: company.name, value: company.id};return test})

      return (
        <Col md={3}>
        <Card>
        {this.state.UpdateMode ? <h1>Edit a computer</h1> : <h1>Add a computer</h1>}
        <CardBody>
        <Input placeholer="Computer name" value={computer && computer.name} onChange={this.onChangeName}/>
        <Input placeholer="Introduced Date" value={computer && computer.introduced} onChange={this.onChangeIntroduced}/>
        <Input placeholer="Discontinued Date" value={computer && computer.discontinued} onChange={this.onChangeDiscontinued}/>
        <Select options={dropdown} onChange={this.onChangeCompany}/>
        {this.state.UpdateMode
        ? <FontAwesomeIcon icon={faPen} onClick={this.update(this.state.computer)}/>
        : <FontAwesomeIcon icon={faCheck} onClick={()=>this.add(this.state.computer)}/>
        }
        <FontAwesomeIcon icon={faTimes} onClick={()=>this.props.onCancel()}/>
        </CardBody>
        </Card>
        </Col>
        );
      }
    }

export default ComputerForm;
