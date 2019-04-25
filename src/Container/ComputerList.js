import React, { Component } from 'react';

import ComputerDetail from '../Component/ComputerDetail';
import ComputerForm from '../ComputerForm';
import { Table, Container, Row } from 'reactstrap';


import Search from "../Component/Search";
import Paging from "../Component/Paging";

import "./ComputerList.scss";

const address = 'http://10.0.1.70:8080/webapp/api/computers/'

class ComputerList extends Component {

    state = { computers: [],
                FormMode: false,
                UpdateMode: false,
                page: {
                    limit: 15,
                    page: 1,
                    
                },
            }



    componentDidMount() {
        this.getAll();
        this.getCount();
    };

    /*componentDidUpdate(){
        this.getAll();
    }*/

    getAll() {
        fetch(address/*+'page?limit='+this.state.page.limit+'&page='+this.state.page.page*/)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.log(error))
    };

    getCount() {
        fetch(address+'count')
            .then(result => {
                result.json().then(count => {
                    this.setState({ count: count })
                })
            })
            .catch(error => console.log(error))
    };

    setPage = (newPage) => () =>{   
        this.setState({
            page: { ...this.state.page, page: newPage}
        })
    };

    handleChange = (event) => {
        this.setState({
            page: {...this.state.page, limit: event.target.value}
        });
    };


    delete = (id) => {
        fetch(address + `${id}`,
            {
                method: "delete",
            }
        ).then(() => { this.getAll() })
    };

    search = (name) => () => {
        fetch(address + 'Search?name=' + `${name}`)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.log(error))
    };

    toggleFormAccess = (computer) => () =>  {
        this.setState(prevState => ({
          //computerFormAccess: !this.state.computerFormAccess,
          computer: computer,
          FormMode: !prevState.FormMode,
          UpdateMode: !prevState.UpdateMode,
        }));
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
                { !this.state.UpdateMode && <button className="btn btn-success" onClick={this.toggleAddFormAccess}>add</button> }
            { this.state.FormMode ? <ComputerForm computer={this.state.computer} FormMode={this.state.FormMode} UpdateMode={this.state.UpdateMode} FormMode={this.state.FormMode}/> :
                <Container>

                    <Row>
                        <Search onSearch={this.search} />

                        <Table>
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>introduced</th>
                                    <th>discontinued</th>
                                    <th>company</th>
                                    <th>delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.computers.map(computer => {
                                        return <ComputerDetail key={computer.id} computer={computer} onToggle={this.toggleFormAccess} delete={this.delete}/>
                                    })
                                }

                                <tr>
                                    <td colSpan="5"><Paging page={this.state.page} count={this.state.count} onSetPage={this.setPage} change={this.handleChange}/></td>
                                </tr>

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

