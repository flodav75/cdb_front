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
        this.toggle = this.toggle.bind(this);
    }


    onDelete =() =>{
        this.props.delete(this.props.computer.id);
    }

    toggle() {
        this.props.toggleDelete();

        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        return (
            <div>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Do you really want delete ?</ModalHeader>
                        <ModalBody>
                            {this.state.computer.name}
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.onDelete}>Delete</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
            </div>
        );
    }
}
export default DeletePopUp;
