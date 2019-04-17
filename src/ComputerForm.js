import React, { Component } from 'react';

import './App.css';
import NavBar from './Component/NavBar';

import {faPen, faCheck} from '@fortawesome/free-solid-svg-icons';
import {Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Col, Container, Row, Button, Input} from 'reactstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class ComputerForm extends Component {

    state = {
        computer: this.props.computer,    
        addMode: false
    };

    componentDidMount(){
        this.getComputerById();
    }

    //change 1 to id
    getComputerById() {
        fetch('http://10.0.1.70:8080/webapp/api/computers/1')
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
    }


  render() {
    let { computer } = this.state;
    return (
      <Col md={3}>
      <Card>
        <CardBody>
          {this.state.editMode ? <Input value={computer && computer.name} onChange={this.onChangeName}/> : <CardTitle>{computer.name}</CardTitle>}
          {this.state.editMode ? <Input value={computer && computer.description} onChange={this.onChangeDescription}/> : <CardText>{computer.description}</CardText>}
            {this.state.editMode 
            ? <FontAwesomeIcon icon={faPen} onClick={this.toggleEditMode}/> 
            : <FontAwesomeIcon icon={faCheck} onClick={()=>this.toggleAdd(this.state.recipe)}/> 
            }
        </CardBody>
      </Card>
    </Col>

    );
  }
}

export default ComputerForm;