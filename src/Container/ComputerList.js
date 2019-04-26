import React, { Component } from 'react';
import ComputerDetail from '../Component/ComputerDetail';
import ComputerForm from '../ComputerForm';
import {Table, Container, Row} from 'reactstrap';


import Search from "../Component/Search";
import Paging from "../Component/Paging";

import "./ComputerList.scss";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
        isSearch:false,
                page: {
                    limit: 15,
                    page: 1,

                },
            }

    componentDidMount() {
        this.getAll(this.state.page.page, this.state.page.limit);
        this.getCount();
    }

    sendBack = () => {
        this.setState({UpdateMode: !this.state.UpdateMode,
            FormMode: !this.state.FormMode})
    }

    getAll(page, limit) {
        fetch(address + 'page?limit=' + limit + '&page=' + page, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization': sessionStorage.getItem('token')
                }
            }
        ).then(result => {
            result.json().then(computers => {
                this.setState({ computers: computers })
            })
        })
            .catch(error => console.error(error))
    }

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
            .catch(error => console.error(error))
    };

    setPage = (newPage) => () =>{
        this.setState({page: { ...this.state.page, page: newPage}});
        if(this.state.isSort){
            this.sortComputer(newPage,this.state.sort,this.state.type,this.state.page.limit);
        }
        else if(this.state.isSearch){
            this.search(this.state.name, this.state.page.limit,newPage);
        }else{
            this.getAll(newPage, this.state.page.limit);
        }
    };

    setLimit = (event) => {
        this.setState({page: {...this.state.page, limit: event.target.value}})
        if(this.state.isSort){
            this.sortComputer(event.target.value,this.state.sort,this.state.type,this.state.page.limit);
        }
        else if(this.state.isSearch){
            this.search(this.state.name, event.target.value,this.state.page.page);
        }else{
            this.getAll(this.state.page.page, event.target.value);
        }
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
        ).then(()=>{
            this.getAll(this.state.page.page, this.state.page.limit)
        })
    }

    search = (name,limit,page) => {
        fetch(address + 'Search?name=' + name+'&limit='+limit+'&page='+page,
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

    toggleSearch=(name,limit,page)=>()=>{
        this.setState({isSearch:!this.state.isSearch, name: name});
        this.search(name,limit,page);
    }

    toggleSort=(page,sort,type)=>()=>{
        this.setState({isSort:!this.state.isSort,sort:sort,type:type});
        this.sortComputer(page,sort,type,this.state.page.limit);
    }

    sortComputer(page,sort,type,limit) {
        fetch(address+'Sort?page='+page+'&sort='+sort+'&type='+type+'&limit='+limit,
            {


                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Host': 'api.producthunt.com',
                    'Authorization':sessionStorage.getItem('token')
                }
            })
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
    };

    toggleAddFormAccess = () => {
        this.setState({
            UpdateMode: false,
            FormMode: !this.state.FormMode
        })
    }

    render() {
        let{page}=this.state
        return (
            <div>
            { this.state.FormMode ? <ComputerForm computer={this.state.computer} UpdateMode={this.state.UpdateMode} FormMode={this.state.FormMode} onSendBack={this.sendBack}/> :
                <Container>
                    <Row>
                        <Search onSearch={this.toggleSearch} page={page}/>
                        { !this.state.FormMode && <button className="btn btn-success float-right" onClick={this.toggleAddFormAccess} >add</button> }
                        <Table>
                            <thead>
                            <tr>
                                <th  className="name">
                                    name
                                    <FontAwesomeIcon class={'myButton'} onClick={this.toggleSort(page.page,'name','ASC')}  icon={faSortAlphaUp}/>
                                    <FontAwesomeIcon class={'myButton'} icon={faSortAlphaDown} onClick={this.toggleSort(page.page,'name','DESC',page.limit)}/>
                                </th>
                                <th  className="introduced">
                                    introduced
                                    <FontAwesomeIcon class={'myButton'} icon={faSortAmountUp} onClick={this.toggleSort(page.page,'introduced','ASC',page.limit)}/>
                                    <FontAwesomeIcon class={'myButton'} icon={faSortAmountDown}  onClick={this.toggleSort(page.page,'introduced','DESC')}/>
                                </th>
                                <th  className="discontinued">discontinued
                                    <FontAwesomeIcon class={'myButton'} icon={faSortAmountUp}  onClick={this.toggleSort(page.page,'discontinued','ASC',page.limit)} />
                                    <FontAwesomeIcon class={'myButton'} icon={faSortAmountDown} onClick={this.toggleSort(page.page,'discontinued','DESC',page.limit)}/>
                                </th>
                                <th  className="company">company
                                    <FontAwesomeIcon class={'myButton'} icon={faSortAlphaUp}  onClick={ this.toggleSort(page.page,'company','ASC',page.limit)}/>
                                    <FontAwesomeIcon class={'myButton'} icon={faSortAlphaDown}  onClick={ this.toggleSort(page.page,'company','DESC',page.limit)} />
                                </th>
                                <th  className="delete">delete</th>
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

