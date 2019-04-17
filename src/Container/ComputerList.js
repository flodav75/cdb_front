import React, { Component } from 'react';
import ComputerDetail from '../Component/ComputerDetail';
import {MOCK} from "../Mock";

class ComputerList extends Component {

    state={computers:MOCK}

    componentDidMount() {
        this.getAll();
    }

    getAll(){
        this.setState({recipes:MOCK})
    }
    render() {

      return (
          <div >
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
