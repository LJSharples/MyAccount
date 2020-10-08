import React from "react";
import { Link } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';

export default function Footer( props ) {
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    return (
        <>
                <div>
                    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-100 mb-3">
                        <div className="container px-4 mx-auto flex flex-wrap items-center justify-center">
                            <div className="w-full relative flex justify-center lg:w-auto lg:static lg:block lg:justify-center ">

                            </div>
                            <div
                                className={
                                "lg:flex items-center" +
                                (navbarOpen ? " flex" : " hidden")
                                }
                                id="example-navbar-danger"
                            >
                                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto lg:justify-center">
                                    <li className="nav-item">
                                        <Link to={'/help'} className="px-3 py-2 flex items-center text-lg leading-snug text-gray hover:opacity-75">Help</Link>
                                    </li>
                                    <li className="nav-item">
                                        <MessengerCustomerChat
                                            pageId="106405290806656"
                                            appId="2442776855982911"
                                        />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
        </>
    );
}
