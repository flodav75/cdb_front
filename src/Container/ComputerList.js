import React, { Component } from 'react';
import ComputerDetail from '../Component/ComputerDetail';
import {Table, Container, Row, Button} from 'reactstrap';

import Search from "../Component/Search";
import "../App.css";
import Paging from "../Component/Paging";
import "./ComputerList.scss";

const address = 'http://10.0.1.70:8080/webapp/api/computers/'

class ComputerList extends Component {

    state = {
        computers: [],
        //computersDelete:[],
       // isDelete: false,
        page: {
            limit: 15,
            page: 1,
        }
    }

     componentDidMount() {
        this.getAll();
        this.getCount();
     };

    // addComputerToDelete =()=> (computer)=> {
    //     console.log("add"+computer.id);
    //     //this.setState({computersDelete:[...this.state.computersDelete, computer]});
    // }

    // removeComputerToDelete = (computer)=>()=>{
    //     console("remove"+computer.id);
    //     var filtered = this.state.computersDelete.filter(function(value){
    //         return value =! computer;
    //     });
    //   //  this.setState({computersDelete:filtered});
    // }

    getAll() {
        fetch(address+'page?limit='+this.state.page.limit+'&page='+this.state.page.page)
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

    // clear=()=>{
    //     this.setState({computersDelete:[]});
    // }

    // deleteComputers=()=>{
    //     this.state.computersDelete.map(computer=>{
    //         return this.delete(computer.id);
    //     })
    //     this.clear();
    //     this.getAll();
    // }

    delete = (id)  => {
        console.log("dans la methode delete");
        fetch(address+`${id}`,
            {
                method: "delete",
            }
        ).then(
            console.log("dans le then"),
        this.getAll()
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
                        {/*{this.state.computersDelete.length>0 && <Button color={"danger"} onClick={this.deleteComputers} >delete</Button>}*/}
                        {/*{this.state.computersDelete.length>0 && <Button variant="outline-warning" onClick={this.clear} >clear</Button>}*/}
                        <Table className="table">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>introduced</th>
                                    <th>discontinued</th>
                                    <th>company</th>
                                    <th>
                                       delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.computers.map(computer => {
                                        return <ComputerDetail key={computer.id} computer={computer}  delete={this.delete}/>
                                    })
                                }
                                <tr>
                                    <td colSpan="5"><Paging page={this.state.page} count={this.state.count} onSetPage={this.setPage} change={this.handleChange}/></td>
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

