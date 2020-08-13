import React, { Component } from "react";
import { Auth } from "aws-amplify";
import NavBar from "./NavBar";

export class InternalApp extends Component {

    signOut = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    render(){
        if(this.props.authState === "signedIn"){
            return (
                <NavBar signOut={this.signOut}/>
            )
        } else {
            return null;
        }
    }
}