import React, { Component } from 'react';

import './App.scss';

import {faPen, faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Card, CardBody, Col, Input, Container, Row} from 'reactstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
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

componentDidMount(){
  this.getAllCompanies();
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
this.props.onSendBack();
}


add = (computer) => {
  this.props.onSendBack();
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


onValidate=()=>{
  var regex= "^(([1-9])|(0[1-9])|(1[0-2]))-(([0-9])|([0-2][0-9])|(3[0-1]))-(([0-9][0-9])|([1-2][0,9][0-9][0-9]))$";
  let correct=true;
  let incorrect;


  if (this.state.computer.name===""){
      incorrect="\n name "
      correct=false;
  }
  if (!regex.match(this.state.computer.introduced)){
      incorrect=incorrect+"\n introduced date "
      correct=false;
  }

  if (!regex.match(this.state.computer.introduced)){
    incorrect=incorrect+"\n discontinued date "
    correct=false;
}

  if(correct===true) {
    this.state.UpdateMode
      ? this.update(this.state.computer)
      : this.add(this.state.computer)
  }else{
      alert("Le ou les champs: " + incorrect + "\nsont vides ou incorrects")
  }


}


render() {
    //console.log('update',this.state.UpdateMode)
    //console.log('form',this.props.FormMode)
  let { computer } = this.state;
  let dropdown = this.state.companies && this.state.companies.map(company => {let test = {label: company.name, value: company.id};return test})

  return (
    <Container>
      <Row>
        <Col md={{size: 20}} >
    <Card>
    {this.state.UpdateMode ? <h1>Edit a computer</h1> : <h1>Add a computer</h1>}
    <CardBody>
    <Input placeholer="Computer name" value={computer && computer.name} onChange={this.onChangeName}/>
    Introduced Date: <input type="date"
          onChange={this.onChangeIntroduced}
          value={computer && computer.introduced}
        />
    <Input placeholer="Introduced Date" value={computer && computer.introduced} onChange={this.onChangeIntroduced}/>
    Discontinued Date: <input type="date"
        onChange={this.onChangeDiscontinued}
        value={computer && computer.discontinued}
      />
    <Input placeholer="Discontinued Date" value={computer && computer.discontinued} onChange={this.onChangeDiscontinued}/>
    <Select options={dropdown} onChange={this.onChangeCompany}/>
    {this.state.UpdateMode
    ? <FontAwesomeIcon icon={faPen} onClick={this.update(this.state.computer)}/>
    : <FontAwesomeIcon icon={faCheck} onClick={()=>this.add(this.state.computer)}/>
    }
    <FontAwesomeIcon icon={faTimes} onClick={()=>this.props.onSendBack()}/>
    </CardBody>
    </Card>
    </Col>
    </Row>
    </Container>

  );
}
}

export default ComputerForm;
