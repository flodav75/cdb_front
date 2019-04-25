import React, { Component } from 'react';
import ComputerList from './Container/ComputerList';
import NavBar from "./Component/NavBar";
import CompanyList from './Container/CompanyList';
import ComputerUser from "./Component/ComputerUser";

const  loginAddress= `http://10.0.1.70:8080/webapp/api/users/`

class App extends Component {
    state={
        formUser : true,
        pageMode: true

    }

    componentWillMount() {
        if (sessionStorage.getItem('token')===null) {

            //this.props.history.push('/');
        } else {
           this.setState({formUser: false})
        }
    }

    togglePageMode = () => {
        this.setState({
            pageMode: !this.state.pageMode
        })
    }


    toggleUser = () => {

        this.setState({
            formUser: !this.state.formUser
        });
    }

    logout=()=>{
        sessionStorage.clear();
        this.setState({
            formUser: true
        });



    }

    login =(user)=>{

        let data = JSON.stringify( user )
        fetch(loginAddress+"login",
            {
                method: "post",
                headers: {"Content-Type" : "application/json"},
                body: data
            }).then(res => {
            res.json().then(token =>{
                //console.log("value originale"+token.token);

                sessionStorage.clear();
                localStorage.clear();
                sessionStorage.setItem('token', token.token );
               // console.log("value storage1"+sessionStorage.getItem('token'));

                    if (res.status===200) {
                        this.toggleUser();
                        //this.props.history.push('/');
                    } else {
                        const error = new Error(res.error);
                        throw error;
                    } }

                ).catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });

        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });

    };


    register =(user)=>{

        console.log(user)
        let data = JSON.stringify( user )
        fetch(loginAddress+"register",
            {
                method: "post",
                headers: {"Content-Type" : "application/json"},
                body: data
            })
            .then((res) => {
                console.log(res);
            });

    };




    render() {
        return (

            <div>
                <NavBar onCreateUser={this.toggleUser} onLogout={this.logout} onToggle={this.togglePageMode} pageMode={this.state.pageMode} />
                {this.state.formUser ? <ComputerUser onLogin={this.login}  onRegister={this.register}/> : this.state.pageMode ? <ComputerList /> : <CompanyList />}
            </div>


        );
    }
}

export default App;
