import React, { Component } from 'react';

import './App.css';
import NavBar from './Component/NavBar';

import {faPen, faCheck, faTimes, faBacon} from '@fortawesome/free-solid-svg-icons';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Col, Container, Row, Button, Input} from 'reactstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class ComputerForm extends Component {

    state = {
        computer: this.props.computer,    
        //addMode: false,
        //editMode: false,
        UpdateMode: this.props.UpdateMode,
        computers: this.props.computers,
        user: {login: "Admin", password: "Admin"}
    };

    componentDidMount(){
        //this.getComputerById();
    }

    //change 12 to id
    getComputerById() {
      console.log(this.state.computer.id);
        fetch('http://10.0.1.70:8080/webapp/api/computers/12')
        .then(result => {
            result.json()
            .then(computer => {
                this.setState({computer : computer})
            })
        })
        .catch(error => console.log(error))
    }

    //change 1 to id
    update = (computer) => () => {
        fetch('http://10.0.1.70:8080/webapp/api/computers/1',
        {   
            method: "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(computer)
        }).then(() => {this.getComputerById()
        }).catch(error => console.log(error))
        console.log(computer)
        console.log("request ok")
    }


    add = (computer)  => {
      console.log(computer);
      //let newComputers = this.state.computers;
      //newComputers.push(computer);
      //this.setState({computers: newComputers, addMode: false})
      this.addComputer(computer)  }
  
    addComputer = (computer)  => {
      fetch('http://10.0.1.70:8080/webapp/api/computers/',
          {   
              method: "POST",
              headers : {"Content-Type" : "application/json"},
              body : JSON.stringify(computer)
          }).catch(error => console.log(error))
          console.log('request OK');
    }


    addUser = (user)  => {
      console.log(user);
      //let newComputers = this.state.computers;
      //newComputers.push(computer);
      //this.setState({computers: newComputers, addMode: false})
      this.addComputerUser(user)  }
  
    addComputerUser = (user)  => {
      fetch('http://10.0.1.70:8080/webapp/api/users/login',
          {   
              method: "POST",
              headers : {"Content-Type" : "application/json"},
              body : JSON.stringify(user)
          }).catch(error => console.log(error))
          console.log('request OK');
    }

    //addUserComp = (user)  => {
      //console.log(user);
      //let newComputers = this.state.computers;
      //newComputers.push(computer);
      //this.setState({computers: newComputers, addMode: false})
      //this.addUser(user)  }

    //addUser= (user)  => {
    //  fetch('http://10.0.1.70:8080/webapp/api/users/login',
    //      {   
    //          method: "POST",
    //          headers : {"Content-Type" : "application/json"},
    //          body : JSON.stringify(user)
    //      }).catch(error => console.log(error))
    //      console.log('request OK');
    //}

    onCancel = () => {
      this.setState({UpdateMode: !this.state.UpdateMode,
                    editMode: !this.state.editMode})
      console.log(this.state.UpdateMode)
      console.log(this.state.editMode)
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

    onChangeCompanyId = (event) => {
      this.setState({computer: {...this.state.computer, companyId: event.target.value}})
    };

    onChangeCompanyName = (event) => {
      this.setState({computer: {...this.state.computer, companyname: event.target.value}})
    };


  render() {
    let { computer } = this.state;
    return (
      <Col md={3}>
      <Card>
        {this.state.UpdateMode ? <h1>Edit a computer</h1> : <h1>Add a computer</h1>}
        <CardBody>
          <Input value={computer && computer.name} onChange={this.onChangeName}/>
          <Input value={computer && computer.introduced} onChange={this.onChangeIntroduced}/>
          <Input value={computer && computer.discontinued} onChange={this.onChangeDiscontinued}/>
          <Input value={computer && computer.companyname} onChange={this.onChangeCompanyName}/>
            {this.state.UpdateMode 
            ? <FontAwesomeIcon icon={faPen} onClick={()=>this.update(this.state.computer)}/> 
            : <FontAwesomeIcon icon={faCheck} onClick={()=>this.add(this.state.computer)}/> 
            }
            <FontAwesomeIcon icon={faTimes} onClick={()=>this.onCancel()}/>
            <FontAwesomeIcon icon={faBacon} onClick={()=>this.addUser(this.state.user)}/>  
        </CardBody>
      </Card>
    </Col>

    );
  }
}

export default ComputerForm;