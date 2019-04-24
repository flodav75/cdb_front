import React, { Component } from 'react';

import { Table, Container, Row } from 'reactstrap';

import Search from "../Component/Search";
import Paging from "../Component/Paging";
import ComputerDetail from '../Component/ComputerDetail';

import "./ComputerList.scss";

const address = 'http://10.0.1.70:8080/webapp/api/computers/'

class ComputerList extends Component {

    state = {
        computers: [],
        page: {
            limit: 15,
            page: 1,            
        }
    }

    componentDidMount() {
        this.getAll(this.state.page.page, this.state.page.limit);
        this.getCount();
    };

    getAll(page, limit) {
        fetch(address+'page?limit='+limit+'&page='+page)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers }
                    )
                })
            })
            .catch(error => console.error(error))
    };

    getCount() {
        fetch(address+'count')
            .then(result => {
                result.json().then(count => {
                    this.setState({ count: count })
                })
            })
            .catch(error => console.error(error))
    };

    setPage = (newPage) => () =>{   
        this.setState({page: { ...this.state.page, page: newPage}})
        this.getAll(newPage, this.state.page.limit);
            
    };

    setLimit = (event) => {
        this.setState({page: {...this.state.page, limit: event.target.value}})
        this.getAll(this.state.page.page, event.target.value);
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
            .catch(error => console.error(error))
    };

    render() {
        return (
            <div >
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
                                        return <ComputerDetail key={computer.id} computer={computer} delete={this.delete} />
                                    })
                                }

                                <tr>
                                    <td colSpan="5"><Paging page={this.state.page} count={this.state.count} onSetPage={this.setPage} change={this.setLimit}/></td>
                                </tr>

                            </tbody>
                        </Table>
                    </Row>
                </Container>
            </div>



        );
    }
}

export default ComputerList;

