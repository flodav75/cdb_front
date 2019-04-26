import React, {Component} from 'react';
import PropTypes from 'prop-types';

import "../App.scss";

class ComputerUser extends Component {
    static propTypes = {
        onLogin: PropTypes.func
    };
    state={
        RegisterMode: false,

        Sing: false,
        user: {
            firstname : "",
            lastname :"",
            email: "",
            login: "" ,
            password: "",
            role:"1"

        }

    }

    toggleRegister = () =>{

        this.setState({
            RegisterMode: !this.state.RegisterMode
        });
    }



    onChangeFristName = (event) =>{
        this.setState({user:{...this.state.user, firstname: event.target.value}})

    }

    onChangeLastName = (event) =>{
        this.setState({user:{...this.state.user, lastname: event.target.value}})

    }
    onChangeEmail = (event) =>{
        this.setState({user:{...this.state.user, email: event.target.value}})

    }

    onChangeLogin = (event) =>{
        this.setState({user:{...this.state.user, login: event.target.value}})
    }

    onChangePass = (event) =>{
        this.setState({user:{...this.state.user, password: event.target.value}})

    }



    onLogin=()=>{
        let correct=true;
        let incorrect;


        if (this.state.user.login===""){
            incorrect="\n login "
            correct=false;
        }
        if (this.state.user.password===""){
            incorrect=incorrect+"\n password "
            correct=false;
        }

        if(correct===true) {
            this.props.onLogin(this.state.user);

        }else{
            alert("Le ou les champs: " + incorrect + "\nsont vides ou incorrects")
        }


    }

    onRegister=()=>{
        //var regex ="/^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;"
        let correct=true;
        let incorrect;

        if (this.state.user.email===""){
            incorrect="\n email "
            correct=false;
        }
        if (this.state.user.login===""){
            incorrect=incorrect+"\n login "
            correct=false;
        }
        if (this.state.user.password===""){
            incorrect=incorrect+"\n password "
            correct=false;
        }
        if (this.state.user.firstname===""){
            incorrect=incorrect+"\n firstname "
            correct=false;
        }
        if (this.state.user.lastname===""){
            incorrect=incorrect+"\n lastname"
            correct=false;
        }

        if(correct===true) {
            this.props.onRegister(this.state.user);
            this.setState({
                RegisterMode: !this.state.RegisterMode
            });
        }else{
            alert("Le ou les champs: " + incorrect + "\nsont vides ou incorrects")
        }


    }


    render(){
        let { user } = this.state;
        return (
            <div>

                <div className='bold-line'></div>
                <div className = 'container-Momo'>
                    <div className = 'window'>
                        <div className = 'overlay'> </div>
                            <div className='content'>
                                <div className='welcome'>Hello There!</div>
                                    <div className='subtitle'>Welcome to Computer Database  </div>
                                        <div className='input-fields'>
                                            {this.state.RegisterMode &&
                                            <div>
                                                <input type='text' placeholder='First name' className='input-line full-width' value={user && user.firstName} onChange={this.onChangeFristName}></input>
                                                <input type='text' placeholder='Last name' className='input-line full-width' value={user && user.lastName} onChange={this.onChangeLastName}></input>
                                                <input type='email' placeholder='Email' className='input-line full-width' value={user && user.email} onChange={this.onChangeEmail}></input>
                                            </div>
                                            }
                                            <input type='Login' placeholder='Login' className='input-line full-width' value={user && user.login} onChange={this.onChangeLogin} required></input>
                                            <input type='password' placeholder='Password' className='input-line full-width' value={user && user.password} onChange={this.onChangePass} required></input>

                                        </div>

                                    <div className='divUser'>
                                        <button className='ghost-round full-width' onClick={this.state.RegisterMode? this.onRegister:this.onLogin}>{this.state.RegisterMode?"Create Account":"Login"}</button>
                                        <button className='ghost-round full-width' onClick={this.toggleRegister}> {this.state.RegisterMode ? "Login":"Create Account"}</button>
                                    </div>
                            </div>

                            </div>
                </div>
            </div>



        );
    }
}


export default ComputerUser;
