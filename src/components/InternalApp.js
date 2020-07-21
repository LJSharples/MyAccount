import React, { Component } from "react";
import { Auth } from "aws-amplify";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Services from './Services';
import Expenses from './Expenses';
import PersonalDetails from './PersonalDetails';
import Settings from './Settings';

export class InternalApp extends Component {
    signOut = () => {
        Auth.signOut()
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    render(){
        if(this.props.authState === "signedIn"){
            return (
                <Router>
                    <div>
                        <nav class="flex items-center justify-between flex-wrap bg-blue-600 p-6">
                            <div class="flex items-center flex-shrink-0 text-white mr-6">
                                <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                                <span class="font-semibold text-xl tracking-tight">My Account</span>
                            </div>
                            <div class="block lg:hidden">
                                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                                <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                                </button>
                            </div>
                            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                                <div class="text-sm lg:flex-grow">
                                    <ul className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                                        <li><Link to={'/'} className="nav-link"> Dashboard </Link></li>
                                        <li><Link to={'/services'} className="nav-link">Services</Link></li>
                                        <li><Link to={'/expenses'} className="nav-link">Expenses</Link></li>
                                        <li><Link to={'/my-details'} className="nav-link">My Details</Link></li>
                                        <li><Link to={'/settings'} className="nav-link">Settings</Link></li>
                                    </ul>
                                </div>
                                <div>
                                    <a onClick={this.signOut} class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout</a>
                                </div>
                            </div>
                        </nav>
                        <hr />
                        <Switch>
                            <Route exact path='/' component={Dashboard} />
                            <Route path='/services' component={Services} />
                            <Route path='/expenses' component={Expenses} />
                            <Route path='/my-details' component={PersonalDetails} />
                            <Route path='/settings' component={Settings} />
                        </Switch>
                    </div>
                </Router>
            )
        } else {
            return null;
        }
    }
}