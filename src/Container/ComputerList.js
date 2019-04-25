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
        computer: null,
        FormMode: false,
        UpdateMode: false,
        page: {
            limit: 15,
            page: 1,

        },
    }

    componentDidMount() {
        this.getAll(this.state.page.page, this.state.page.limit);
        this.getCount();
    };

    onCancel = () => {
        this.setState({UpdateMode: !this.state.UpdateMode,
          FormMode: !this.state.FormMode})
      }

    getAll(page, limit) {

        fetch(address+'page?limit='+limit+'&page='+page, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization':sessionStorage.getItem('token')
                }}

        )

            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.log(error))
    };

    getCount() {
        fetch(address+'count'

            , {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization':sessionStorage.getItem('token')
                }})
            .then(result => {
                result.json().then(count => {
                    this.setState({ count: count })
                })
            })
            .catch(error => console.log(error))
    };

    setPage = (newPage) => () =>{
        this.setState({page: { ...this.state.page, page: newPage}})
        this.getAll(newPage, this.state.page.limit);

    };

    setLimit = (event) => {
        this.setState({page: {...this.state.page, limit: event.target.value}})
        this.getAll(this.state.page.page, event.target.value);
    };


    delete = (id)  => {
        fetch(address+`${id}`,
            {
                method: "delete",

                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization':sessionStorage.getItem('token')
                }
            }
        ).then(() => { this.getAll(this.state.page.page, this.state.page.limit) })
    };

    search = (name) => () => {
        fetch(address + 'Search?name=' + name,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization':sessionStorage.getItem('token')
                }})
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.error(error))
    };

    toggleFormAccess = (computer) => () =>  {
        this.setState(prevState => ({
            computer: computer,
            FormMode: !prevState.FormMode,
            UpdateMode: !prevState.UpdateMode,
        }));
        console.log(this.state.computer)
    };

    toggleAddFormAccess = () => {
        this.setState({
            UpdateMode: false,
            FormMode: !this.state.FormMode
        })
    }

    render() {

        return (
            <div>
                { !this.state.UpdateMode && <button className="btn btn-success" onClick={this.toggleAddFormAccess}>add</button> }
            { this.state.FormMode ? <ComputerForm computer={this.state.computer} UpdateMode={this.state.UpdateMode} FormMode={this.state.FormMode} onCancel={this.onCancel} /> :
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
                                        return <ComputerDetail key={computer.id} computer={computer} onToggle={this.toggleFormAccess} delete={this.delete}/>
                                    })
                                }

                                <tr>
                                    <td colSpan="5"><Paging page={this.state.page} count={this.state.count} onSetPage={this.setPage} change={this.setLimit}/></td>
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

