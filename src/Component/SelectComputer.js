import React, { Component } from 'react';
import {Input, Label} from "reactstrap";

class SelectComputer extends Component{

    state ={
        isChecked: true,
        computer: this.props.computer
    }

     componentWillUpdate() {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        // this.addOrRemove();
     }

    addOrRemove=()=>{
      //  console.log(this.state.isChecked)

        this.setState(prevState => ({
            isChecked: !prevState.isChecked
        }));
      //  console.log(this.state.isChecked)
       // if(this.state.isChecked == true){
          //  console.log("aaaatrue");
             this.props.addToDelete(this.state.computer);
       // }else{
       //     console.log("aaaafalse");
       //     this.props.removeToDelete(this.state.computer);
      //  }
    }

    render(){
        return(
            <div>
                <Label check>
                    <Input type="checkbox"  onClick={this.addOrRemove}  />{' '}
                </Label>
            </div>
        );
    }
}

export default SelectComputer;
