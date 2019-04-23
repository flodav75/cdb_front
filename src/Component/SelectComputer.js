import React, { Component } from 'react';
import {Input, Label} from "reactstrap";

class SelectComputer extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         isChecked: true,
    //     };
    // }
    // toggleChange = () => {
    //     this.setState({
    //         isChecked: !this.state.isChecked,
    //     });
    // }
    // render() {
    //     return (
    //         <label>
    //             <input type="checkbox"
    //                    checked={this.state.isChecked}
    //                    onChange={this.toggleChange}
    //             />
    //             Check Me!
    //         </label>
    //     );
    // }

    state ={
        isChecked: false,
        computer: this.props.computer
    }

    // componentDidUpdate() {
    //     this.addOrRemove();
    // }


    addOrRemove(){

        if(this.state.isChecked){
            console.log("bonjour")
             this.props.addToDelete(this.state.computer);
        }else{
            console.log("aurevoir")
            this.props.removeToDelete(this.state.computer);
        }

    }

    toggleChange=()=>{
        this.props.addToDelete(this.state.computer);

      ///  this.setState({isChecked:!this.state.isChecked})
    }


    render(){
        return(
            <div>
                <Label check>

                    <Input type="checkbox"  onClick={this.toggleChange}  />{' '}

                </Label>
            </div>
        );
    }
}

export default SelectComputer;
