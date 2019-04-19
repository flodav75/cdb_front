import React, { Component } from 'react';

import ComputerDetail from '../Component/ComputerDetail';
import { Table, Container, Row } from 'reactstrap';

import Search from "../Component/Search";

import "../App.css";

const address = 'http://10.0.1.70:8080/webapp/api/computers/'

class ComputerList extends Component {

    state={computers:[]}

    componentDidMount() {
        this.getAll();
    }

    getAll(){
        fetch(address)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.log(error))
    }

    delete = (id)  => {
        fetch(address+`${id}`,
            {
                method: "delete",
            }
        ).then(()=>{this.getAll()})
    }


    //Cross origin problem
    search = (name) => () => {
        fetch(address+'Search?name='+`${name}`)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.log(error))
    };

    render() {

        return (
            <div >
                <Container>

                    <Row>
                        <Search onSearch={this.search} />

                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>introduced</th>
                                    <th>discontinued</th>
                                    <th>company</th>
                                    <th> delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.computers.map(computer => {
                                        return <ComputerDetail key={computer.id} computer={computer} />
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
  
  export default ComputerList;

