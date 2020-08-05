import React, { Component } from 'react';
import { getUserDetails } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";

class Dashboard extends Component {
    state = {
        userProfile: {},
        userCompany: {}
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ userProfile: userProfile.data["user"]})
        this.setState({ userCompany: userProfile.data["getCompany"]})
        console.log(this.state.userProfile)
        console.log(this.state.userCompany)
    }
    render(){
        return(
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <article className="overflow-hidden rounded-lg">
                            <header className="flex items-center justify-between leading-tight p-4 md:p-6">
                                <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                    Welcome back { this.state.userProfile.full_name},
                                </h1>
                            </header>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-blue-500">
                        <h1 className="no-underline text-white text-2xl text-lg p-4">
                            Your Services
                        </h1>
                        <button className="no-underline text-white text-2xl text-lg border-2 p-5 mb-8">
                            Add Services
                        </button><br/>
                        <button className="no-underline text-white text-2xl text-lg border-2 p-4">
                            View Services
                        </button>
                    </div>
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-pink-700 bg-opacity-85">
                        <h1 className="no-underline text-white text-2xl text-lg p-4">
                            Annual Expenses
                        </h1>
                        <h1 className="no-underline text-white text-2xl text-lg p-5">
                            £
                        </h1>
                        <h1 className="no-underline text-white text-2xl text-lg">
                            View Details
                        </h1>
                    </div>
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-green-400 bg-opacity-95">
                        <h1 className="no-underline text-white text-2xl text-lg p-4">
                            You've Saved
                        </h1>
                        <h1 className="no-underline text-white text-2xl text-lg p-5">
                            £
                        </h1>
                        <h1 className="no-underline text-white text-2xl text-lg">
                            View Details
                        </h1>
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
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-gray-200">
                        <h1 className="no-underline text-black text-2xl text-lg p-4">
                            Reduce your Waste Management costs
                        </h1>
                        <h1 className="no-underline text-black ml-2 text-sm p-5">
                            See if you can reduce your waste manageemnt costs with a free quote from our partners.
                        </h1>
                    </div>
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-gray-200">
                        <h1 className="no-underline text-black text-2xl text-lg p-4">
                            Merchant services savings
                        </h1>
                        <h1 className="no-underline text-black ml-2 text-sm p-5">
                            Save money on every transaction you make with low merchant service transaction costs. Find out more.
                        </h1>
                    </div>
                    <div class="flex-1 text-gray-700 text-center bg-gray-400 px-8 py-4 m-4 rounded-lg shadow-lg bg-gray-200">
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