import React, { Component } from "react";
import { InternalApp } from "./InternalApp";
import { CustomSignIn} from "./CustomSignIn";
import {
    BrowserRouter as Router
} from "react-router-dom";

class AuthWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: ""
        };
        this.updateUsername = this.updateUsername.bind(this);
    }

    updateUsername(newUsername){
        this.setState({ username: newUsername});
    }

    render(){
        return (
            <div>
                <CustomSignIn
                authState={this.props.authState}
                updateUsername={this.updateUsername}
                onStateChange={this.props.onStateChange}
                />
                <Router>
                    <InternalApp authState={this.props.authState} onStateChange={this.props.onStateChange} userName={this.state.username}/>
                </Router>
            </div>
        );
    }
}

export default AuthWrapper;