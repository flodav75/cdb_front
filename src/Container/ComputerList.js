import React, { Component } from 'react';

import { Table, Container, Row } from 'reactstrap';

import Search from "../Component/Search";
import Paging from "../Component/Paging";
import ComputerDetail from '../Component/ComputerDetail';

import "../App.css";

const address = 'http://10.0.1.70:8080/webapp/api/computers/'

class ComputerList extends Component {

    state = {
        computers: [],
        page: {
            limit: 20,
            page: 2,
            
        },
        count: 0

    }

    componentDidMount() {
        this.getAll();
        this.getCount();
    }

    getAll() {
        fetch(address+'page?limit='+this.state.page.limit+'&page='+this.state.page.page)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.log(error))
    }

    getCount() {
        fetch(address+'count')
            .then(result => {
                result.json().then(count => {
                    this.setState({ count: count })
                })
            })
            .catch(error => console.log(error))
    }

    setPage = () => (newPage) => () =>{
        this.setState({page: { ...this.state.page, page: newPage}});
        this.getAll();
    }


    delete = (id) => {
        fetch(address + `${id}`,
            {
                method: "delete",
            }
        ).then(() => { this.getAll() })
    }

    search = (name) => () => {
        fetch(address + 'Search?name=' + `${name}`)
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
                                    <td colSpan="5"><Paging page={this.state.page} count={this.state.count} onSetPage={this.setPage()}/></td>
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

