import React, { Component } from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import CompanyDetail from "./CompanyDetail";


class DeletePopUp extends Component{

    constructor(props) {
        super(props);
        this.state = {
            computer:this.props.computer,
            modal: true

        };
        this.toggleDelete = this.toggleDelete.bind(this);
    }

    onDelete =() =>{
        console.log("va delete");
        this.props.delete(this.props.computer.id);
       // this.toggleDelete();
    }


    toggleDelete() {
        this.props.toggleDelete();
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggleDelete} className={this.props.className}>
                    <ModalHeader toggle={this.toggleDelete}>Do you really want to delete this computer ?</ModalHeader>
                    <ModalBody>
                        {this.state.computer.name}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onDelete}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleDelete}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default DeletePopUp;

