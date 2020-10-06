import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import Services from './Services';
import Expenses from './Expenses';
import PersonalDetails from './PersonalDetails';
import MyAccount from "../MyAccount.png"

export default function Navbar( props ) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
            <Router>
                <div>
                    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-blue-400 mb-3">
                        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                            <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                                
                                <div className="flex items-center flex-shrink-0 text-white mr-6">
                                    <img className="fill-current h-8 w-8 mr-2" width="54" height="54" src={MyAccount} alt="ManagedBills"/>
                                    <span className="font-semibold text-xl tracking-tight"><Link to={'/'} className="text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap text-white">My Account</Link></span>
                                </div>

                                <button
                                    className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-teal-400 hover:text-white border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                                    type="button"
                                    onClick={() => setNavbarOpen(!navbarOpen)}>
                                    <i className="fas fa-bars">
                                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                                    </i>
                                </button>
                            </div>
                            <div
                                className={
                                "lg:flex flex-grow items-center" +
                                (navbarOpen ? " flex" : " hidden")
                                }
                                id="example-navbar-danger"
                            >
                                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                                    <li className="nav-item">
                                        <Link to={'/'} className="px-3 py-2 flex items-center text-lg font-bold leading-snug text-white hover:opacity-75">Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/services'} className="px-3 py-2 flex items-center text-lg font-bold leading-snug text-white hover:opacity-75">Services</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/expenses'} className="px-3 py-2 flex items-center text-lg font-bold leading-snug text-white hover:opacity-75">Expenses</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/my-details'} className="px-3 py-2 flex items-center text-lg font-bold leading-snug text-white hover:opacity-75">My Details</Link>
                                    </li>
                                    <li className="nav-item">   
                                        <a className="inline-block text-lg px-4 py-2 ml-12 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                                        href={props.url}>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={Dashboard} />
                        <Route path='/services' component={Services} />
                        <Route path='/expenses' component={Expenses} />
                        <Route path='/my-details' component={PersonalDetails} />
                    </Switch>
                </div>
            </Router>
        </>
    );
}
