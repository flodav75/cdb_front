import React, { Component } from 'react';

import ComputerDetail from '../Component/ComputerDetail';
import ComputerForm from '../ComputerForm';
import { Table, Container, Row } from 'reactstrap';

import { MOCK } from "../Mock";
import Search from "../Component/Search";

import "../App.css";

class ComputerList extends Component {

    state = { computers: [],
                FormMode: false,
                UpdateMode: false
                 }

    componentDidMount() {
        this.getAll();
    }

    getAll() {
        this.setState({ computers: MOCK })
    }

    //Cross origin problem
    search = (name) => () => {
        console.log(name);
        fetch('http://10.0.1.70:8080/webapp/api/computers/Search?name='+`${name}`)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.log(error))
    };

    toggleFormAccess = () => (computer) =>  {
        this.setState(prevState => ({
          //computerFormAccess: !this.state.computerFormAccess,
          FormMode: !prevState.FormMode,
          UpdateMode: !prevState.UpdateMode,
          computer: computer
        }));
        console.log(computer)
    };

    toggleAddFormAccess = () => {
        this.setState({
            //UpdateMode: !this.state.UpdateMode,
            FormMode: !this.state.FormMode
        })
    }

    render() {

        return (
            <div>
                { !this.state.UpdateMode && <button class="btn btn-success" onClick={this.toggleAddFormAccess}>add</button> }
            { this.state.FormMode ? <ComputerForm computer={this.state.computer} UpdateMode={this.state.UpdateMode}/> :
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.computers.map(computer => {
                                        return <ComputerDetail key={computer.id} computer={computer} onToggle={this.toggleFormAccess} />
                                    })
                                }
                            </tbody>
                        </Table>
                    </Row>
                </Container>
            }
            </div>

        );
    }
}

export default ComputerList;

