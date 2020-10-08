import React, { Component } from "react";
import { Auth } from "aws-amplify";
import NavBar from "./NavBar";

export class InternalApp extends Component {

    state = {
        url: 'http://login.managedbills.com/?logout'
    }

    signOut = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    url = async () => {
        let user = await Auth.currentUserInfo();
        const url = "http://login.managedbills.com/?logout"
        //&r=begbies add if user attribute is set
        if(user.attributes['custom:affiliation'] !== undefined){
            url = "http://login.managedbills.com/?logout&r=" + user.attributes['custom:affiliation']
        }
        this.setState({url: url});
    }

    render(){
        if(this.props.authState === "signedIn"){
            return (
                <NavBar signOut={this.signOut} url={this.state.url}/>

            )
        } else {
            return null;
        }
    }
}