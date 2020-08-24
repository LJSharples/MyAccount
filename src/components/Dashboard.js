import React, { Component } from 'react';
import { getUserDetails, getServices } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import {Link } from 'react-router-dom';

class Dashboard extends Component {
    state = {
        userProfile: {},
        userCompany: {},
        full_name: '',
        services: 0,
        annualCost: 0,
        annualSave: 0,
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ userProfile: userProfile.data["user"]})
        this.setState({ userCompany: userProfile.data["getCompany"]})
        if(userProfile.data["user"].full_name){
            this.setState({ full_name: userProfile.data["user"].full_name });
        }
        console.log(userProfile)

        //get total services
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));
        this.setState({services: userServices.data['getServices'].items.length});

        let sum = userServices.data["getServices"].items.reduce(function(prev, current) {
            return prev + +current.cost_year
        }, 0);
        this.setState({annualCost: sum})
    }
    render(){
        return(
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
                        <article className="overflow-hidden rounded-lg">
                            <header className="flex items-center justify-between leading-tight p-4 md:p-6">
                                <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                    Welcome back { this.state.full_name },
                                </h1>
                            </header>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg shadow-lg bg-blue-300">
                        <h1 className="no-underline text-blue-600 font-semibold text-2xl text-lg p-4">
                            Your Services
                        </h1>
                        <h1 className="no-underline text-blue-600 font-medium text-2xl text-lg p-5">
                            Total Services: {this.state.services}
                        </h1>
                        <Link to="/services">
                            <button className="no-underline text-blue-600 font-medium text-2xl text-lg border-2 p-4 border-blue-500 rounded hover:border-transparent hover:text-blue-600 hover:bg-white hover:border-blue-500">
                                View Services  
                            </button>
                        </Link>
                    </div>
                    <div className="flex-1 text-gray-700 text-center bg-gray-100 px-8 py-4 m-4 rounded-lg shadow-lg bg-orange-300">
                        <h1 className="no-underline text-orange-600 font-semibold text-2xl text-lg p-4">
                            Annual Expenses
                        </h1>
                        <h1 className="no-underline text-orange-600 font-medium text-2xl text-lg p-5">
                            £ {this.state.annualCost}
                        </h1>
                        <Link to="/expenses">
                            <button className="no-underline text-orange-600 font-medium text-2xl text-lg border-2 p-4 border-orange-500 rounded hover:border-transparent hover:text-orange-600 hover:bg-white hover:border-orange-500">
                                View Details  
                            </button>
                        </Link>
                    </div>
                    <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg shadow-lg bg-purple-300 bg-opacity-75">
                        <h1 className="no-underline text-purple-600 font-semibold text-2xl text-lg p-4">
                            You've Saved
                        </h1>
                        <h1 className="no-underline text-purple-600 font-medium text-2xl text-lg p-5">
                            £ {this.state.annualSave}
                        </h1>
                        <Link to="/expenses">
                            <button className="no-underline text-purple-600 font-medium text-2xl text-lg border-2 p-4 border-purple-400 rounded hover:border-transparent hover:text-purple-400 hover:bg-white hover:border-purple-400">
                                View Details  
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                    Latest News 
                                </h1>
                            </header>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-gray-200 bg-opacity-25">
                        <h1 className="no-underline text-black text-2xl text-lg p-4">
                            Reduce your Waste Management costs
                        </h1>
                        <h1 className="no-underline text-black ml-2 text-sm p-5">
                            See if you can reduce your waste manageemnt costs with a free quote from our partners.
                        </h1>
                    </div>
                    <div className="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-gray-200 bg-opacity-25">
                        <h1 className="no-underline text-black text-2xl text-lg p-4">
                            Merchant services savings
                        </h1>
                        <h1 className="no-underline text-black ml-2 text-sm p-5">
                            Save money on every transaction you make with low merchant service transaction costs. Find out more.
                        </h1>
                    </div>
                    <div className="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-gray-200 bg-opacity-25">
                        <h1 className="no-underline text-black text-2xl text-lg p-4">
                        New updated business rates
                        </h1>
                        <h1 className="no-underline text-black ml-2 text-sm p-5">
                            Find out about the latest business rates
                        </h1>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;