import React, { Component } from 'react';

import ComputerDetail from '../Component/ComputerDetail';

import {MOCK} from "../Mock";
import Search from "../Component/Search";
const address = `http://10.0.1.70:8080/api/computers/`
class ComputerList extends Component {

    state={computers:MOCK}

    componentDidMount() {
        this.getAll();
    }

    getAll(){
        this.setState({recipes:MOCK})
    }

    //Cross origin problem
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


              <Search onSearch={this.search}/>

              <table class="App">
                  <tr>
                      <th>name</th>
                      <th>introduced</th>
                      <th>discontinued</th>
                      <th>company</th>
                  </tr>

                      {
                          this.state.computers.map(computer =>{
                              return <ComputerDetail computer={computer}/>
                          })
                      }

              </table>

          </div>


  
      );
    }
  }
  
  export default ComputerList;

