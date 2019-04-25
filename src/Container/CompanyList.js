import React, { Component } from 'react';

import CompanyDetail from '../Component/CompanyDetail';
import { Table, Container, Row } from 'reactstrap';

const address = 'http://10.0.1.70:8080/webapp/api/companies/'

class CompanyList extends Component {

    state = { companies: [] }

    componentDidMount() {
        this.getAll();
    }

    getAll(){
        fetch(address,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization':sessionStorage.getItem('token')
                }})
            .then(result => {
                result.json().then(companies => {
                    this.setState({ companies: companies })
                })
            })
            .catch(error => console.log(error))
    }

    delete = (id) => () => {
        fetch(address + `${id}`,
            {
                method: "delete",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization':sessionStorage.getItem('token')
                }
            },


        ).then(() => { this.getAll() })
    };

    render() {
        return (
            <div >
                <Container>
                    <Row>
                        <Table>
                            <thead>
                            <tr>
                                <th>id</th>
                                <th>name</th>
                                <th>delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.companies.map(company => {
                                    return <CompanyDetail key={company.id} company={company} delete={this.delete}/>
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

export default CompanyList;

