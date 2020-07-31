import React, { Component } from "react";
import { getUserDetails, } from "../graphql/queries";
import { updateUser, updateCompany } from "../graphql/mutations"
import { Auth, API, graphqlOperation } from "aws-amplify";

class PersonalDetails extends Component {
    state = {
        userProfile: {},
        userCompany: {},
        full_name: "",
        first_name: "",
        last_name: "",
        phone: ""
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
    }

    async updateDetailsProfile(){
        const data = {
            user_name: this.state.userProfile.user_name,
            full_name: this.state.full_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone
        }
        const userUpdate = await API.graphql(graphqlOperation(updateUser, data));
        console.log(userUpdate);
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: this.state.userProfile.user_name}));
        this.setState({ userProfile: userProfile.data["user"]})
        console.log(this.state.userProfile)
    }

    updateDetailsCompany(){

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
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" value={this.state.userProfile.first_name} onChange={value => this.onChangeText('first_name', value)}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                                Last Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={this.state.userProfile.last_name} onChange={value => this.onChangeText('last_name', value)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                Your Email
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text"  value={this.state.userProfile.user_name} onChange={value => this.onChangeText('user_name', value)}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                                Your Mobile Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text"  value={this.state.userProfile.phone}  onChange={value => this.onChangeText('phone', value)}/>
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
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                Company Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" value={this.state.userCompany.user_name}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                                Company Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={this.state.userCompany.company_number}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                Address1
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text"  value={this.state.userCompany.address1}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
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
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                            How many years have you been trading?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" value={this.state.userCompany.user_name}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                            What is your estimated yearly turn-over?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" value={this.state.userCompany.company_number}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                            How many employees do you have?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text"  value={this.state.userCompany.address1}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                            Which industry does your business form part of?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text"  value={this.state.userCompany.address2}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <button type="submit" onClick={this.updateDetailsProfile()}>Update Details</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default PersonalDetails;