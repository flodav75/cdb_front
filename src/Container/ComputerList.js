import React, { Component } from 'react';
import ComputerDetail from '../Component/ComputerDetail';
import ComputerForm from '../ComputerForm';
import {Table, Container, Row} from 'reactstrap';


import Search from "../Component/Search";
import Paging from "../Component/Paging";

import "./ComputerList.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAd} from "@fortawesome/free-solid-svg-icons";
import {faSortUp} from "@fortawesome/free-solid-svg-icons/faSortUp";
import {faSortDown} from "@fortawesome/free-solid-svg-icons/faSortDown";
import {faSortAlphaDown} from "@fortawesome/free-solid-svg-icons/faSortAlphaDown";
import {faSortAlphaUp} from "@fortawesome/free-solid-svg-icons/faSortAlphaUp";
import {faSortAmountUp} from "@fortawesome/free-solid-svg-icons/faSortAmountUp";
import {faSortAmountDown} from "@fortawesome/free-solid-svg-icons/faSortAmountDown";

const address = 'http://10.0.1.70:8080/webapp/api/computers/'


class ComputerList extends Component {

    state = { computers: [],
            companies: [],
              computer: null,
                FormMode: false,
                UpdateMode: false,
                isSort: false,
                page: {
                    limit: 15,
                    page: 1,

                },
            }

    componentDidMount() {
        this.getAll(this.state.page.page, this.state.page.limit);
        this.getCount();
       // this.getAllCompanies();
    };

    getAll(page, limit) {
        fetch(address+'page?limit='+limit+'&page='+page)
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
        this.setState({page: { ...this.state.page, page: newPage}});
        if(this.state.isSort){
            this.sortComputer(newPage,this.state.sort,this.state.type);
            console.log('sort');
        }else{
            this.getAll(newPage, this.state.page.limit);
            console.log('getall');
        }

        // this.state.isSort ?this.sortComputer(newPage,this.state.sort,this.state.type) console.log('getall')
        // :this.getAll(newPage, this.state.page.limit);

    };

    setLimit = (event) => {
        this.setState({page: {...this.state.page, limit: event.target.value}})
        this.getAll(this.state.page.page, event.target.value);
    };

    delete = (id)  => {
        fetch(address+`${id}`,
            {
                method: "delete",
            }
        ).then(()=>{this.getAll(this.state.page.page, this.state.page.limit)})
    }

    search = (name) => () => {
        fetch(address + 'Search?name=' + `${name}`)
            .then(result => {
                result.json().then(computers => {
                    this.setState({ computers: computers })
                })
            })
            .catch(error => console.error(error))
    };

    toggleSort=(page,sort,type)=>()=>{
        this.setState({isSort:!this.state.isSort,sort:sort,type:type});
        this.sortComputer(page,sort,type);
    }

    sortComputer(page,sort,type) {
        console.log('   sssss')
        fetch(address+'Sort?page='+`${page}`+'&sort='+`${sort}`+'&type='+`${type}`)
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
            FormMode: !this.state.FormMode
        })
    }

    render() {
        return (
            <div>
                { !this.state.UpdateMode && <button className="btn btn-success" onClick={this.toggleAddFormAccess}>add</button> }
            { this.state.FormMode ? <ComputerForm computer={this.state.computer} UpdateMode={this.state.UpdateMode} FormMode={this.state.FormMode}/> :
                <Container>
                    <Row>
                        <Search onSearch={this.search} />
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>name

                                        <button className="btn-info" onClick={this.toggleSort(this.state.page.page,'name','ASC')} ><FontAwesomeIcon icon={faSortAlphaUp}/></button>
                                        <button className="btn-info" onClick={this.toggleSort(this.state.page.page,'name','DESC')}><FontAwesomeIcon icon={faSortAlphaDown}/></button>
                                    </th>
                                    <th>introduced
                                        <button className="btn-info" onClick={this.toggleSort(this.state.page.page,'introduced','ASC')}><FontAwesomeIcon icon={faSortAmountUp}/></button>
                                        <button className="btn-info" onClick={this.toggleSort(this.state.page.page,'introduced','DESC')}><FontAwesomeIcon icon={faSortAmountDown}/></button>
                                    </th>
                                    <th>discontinued
                                        <button className="btn-info" onClick={this.toggleSort(this.state.page.page,'discontinued','ASC')}><FontAwesomeIcon icon={faSortAmountUp}/></button>
                                        <button className="btn-info" onClick={this.toggleSort(this.state.page.page,'discontinued','DESC')}><FontAwesomeIcon icon={faSortAmountDown}/></button>

                                    </th>
                                    <th>company
                                        <button className="btn-info" onClick={ this.toggleSort(this.state.page.page,'company','ASC')}><FontAwesomeIcon icon={faSortAlphaUp}/></button>
                                        <button className="btn-info" onClick={this.toggleSort(this.state.page.page,'company','DESC')}><FontAwesomeIcon icon={faSortAlphaDown}/></button>
                                    </th>
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

