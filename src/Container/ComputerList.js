import React, { Component } from 'react';
import ComputerDetail from '../Component/ComputerDetail';
import {Table, Container, Row, Button} from 'reactstrap';
import Search from "../Component/Search";
import "../App.css";

const address = 'http://10.0.1.70:8080/webapp/api/computers/'

class ComputerList extends Component {

    state={computers:[],
        isDelete: false,
        computersDelete:[]
    }

    componentDidMount() {
       this.getAll();
    }


    addComputerToDelete = (computer)=>{
        this.setState({computersDelete:[...this.state.computersDelete, computer]});
    }

    removeComputerToDelete = (computer)=>{
        var filtered = this.state.computersDelete.filter(function(value){
            return value =! computer;
        });
        this.setState({computersDelete:filtered});
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

    clear=()=>{
        this.setState({computersDelete:[]});
    }

    deleteComputers=()=>{
        this.state.computersDelete.map(computer=>{
            return this.delete(computer.id);
        })
        this.clear();
        this.getAll();
    }

    delete = (id)  => {
        fetch(address+`${id}`,
            {
                method: "delete",
            }
        )
    }

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
                        {this.state.computersDelete.length>0 && <Button variant="outline-warning" onClick={this.deleteComputers} >delete</Button>}
                        {this.state.computersDelete.length>0 && <Button variant="outline-warning" onClick={this.clear} >clear</Button>}
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>introduced</th>
                                    <th>discontinued</th>
                                    <th>company</th>
                                    <th>
                                        {<Button variant="outline-warning" >Edit</Button>}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.computers.map(computer => {
                                        return <ComputerDetail key={computer.id} computer={computer} removeToDelete={this.removeComputerToDelete} addToDelete={this.addComputerToDelete} delete={this.delete}/>
                                    })
                                }
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                    </Row>
                </Container>
            </div>
      );
    }
  }
  
  export default ComputerList;

