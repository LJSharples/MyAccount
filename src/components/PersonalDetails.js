import React, { Component } from "react";
import { getUserDetails, } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { updateUser} from '../graphql/mutations';

class PersonalDetails extends Component {
    state = {
        userProfile: {},
        userCompany: {},
        full_name: "Luke J Sharples",
        first_name: "Luke",
        last_name: "Sharples",
        phone: "0123456789"
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ userProfile: userProfile.data["user"]})
        this.setState({ userCompany: userProfile.data["getCompany"]})
        console.log(this.state.userProfile)
        console.log(this.state.userCompany)
    }

    onChangeText(key, value) {
        this.setState({
          [key]: value
        })
        console.log(this.state);
    }

    async updateUser(){
        const data = {
            user_name: 'luke.sharples@powersolutionsuk.com',
            full_name: 'Luke Sharples',
            first_name: 'Luke',
            last_name: 'Sharples',
            phone: '1234567890'
        }
        try {
            const newService = await API.graphql(graphqlOperation(updateUser, data));
            console.log(newService);
            console.log("Success");
        } catch (err) {
            console.log("Error:")
            console.log(data);
            console.log(err);
        }
    }

    render(){
        return (
            <form>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg no-underline hover:underline text-black text-2xl">
                                        My Details
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" value={this.state.userProfile.first_name}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Last Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={this.state.userProfile.last_name} onChange={e => this.onChangeText('last_name', e.target.value)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Your Email
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text"  value={this.state.userProfile.user_name} onChange={e => this.onChangeText('user_name', e.target.value)}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Your Mobile Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text"  value={this.state.userProfile.phone}  onChange={e => this.onChangeText('phone', e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg no-underline hover:underline text-black text-2xl">
                                        About your company
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Company Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" value={this.state.userCompany.user_name}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Company Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={this.state.userCompany.company_number}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Address1
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text"  value={this.state.userCompany.address1}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                            Address2
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text"  value={this.state.userCompany.address2}/>
                        </div>
                    </div>
                </div>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg no-underline hover:underline text-black text-2xl">
                                        Additional information
                                    </h1>
                                </header>
                            </article>
                        </div>
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <p className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"> 
                                    Additional information relating to your company can help our team with more bespoke recommendations.
                                    </p>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                            How many years have you been trading?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" value={this.state.userCompany.user_name}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            What is your estimated yearly turn-over?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={this.state.userCompany.company_number}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            How many employees do you have?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text"  value={this.state.userCompany.address1}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Which industry does your business form part of?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text"  value={this.state.userCompany.address2}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.updateUser}>
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default PersonalDetails;