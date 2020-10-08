import React, { Component } from "react";
import Footer from "./Footer";

class Help extends Component {
    
    render(){       
        return (
            <>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
                        <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                        Help 
                                    </h1>
                                </header>
                                <footer className="flex items-center p-2 md:p-4">
                                </footer>
                            </article>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                        Are my documents stored safely?
                                    </h2>
                                    <p>
                                    Yes! your documents are safe, they securely backed up to Amazon web services.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    How do I add a service?
                                    </h2>
                                    <p>
                                    Adding a service is easy, select “Services” at the top of the screen when you’re in My Account. Next, click the “Add Services” button and enter the details as appropriate. When you have completed all the details, simply click the blue “Add service” button and the service will be added to your account. You can then view them in your “Services” section.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    How do I verify that my bill/bills have been submitted?
                                    </h2>
                                    <p>
                                    You will be able to see any bills you have uploaded onto the website by clicking on the “View Services” on your dashboard.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    Where can I find my annual Savings?

                                    </h2>
                                    <p>
                                    The simplest way is by clicking on “View Savings” on your Dashboard.
Alternatively, click on “Expense” Tab at the top of the page, and you’ll see “Savings to Date”.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    How do I change or update my personal/company details?
                                    </h2>
                                    <p>
                                    You can easily change your personal or company details by clicking “My Details” tab at the top of the screen.
Edit your details by typing in the fields and then scroll to the bottom of the screen and click “Update My Details” or “Update Company Details”.
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    How do I change my password?
                                    </h2>
                                    <p>
                                    Forgotten on need to change your password? Simply go to the Log In screen and select “Help”. You’ll be asked to enter your email address. When you’ve submitted this, you’ll receive and Identification code for you to enter on the next screen along with your new password.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>	
            </>
        )
    }
}

export default Help;