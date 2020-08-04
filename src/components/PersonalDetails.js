import React, { Component } from "react";
import { getUserDetails, } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { updateUser, updateCompany } from '../graphql/mutations';

class PersonalDetails extends Component {
    state = {
        userProfile: {},
        userCompany: {},
        full_name: "Luke J Sharples",
        first_name: "Luke",
        last_name: "Sharples",
        phone: "0123456789",
        company_name: "",
        company_number: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        region: "",
        years_trading: "",
        industry: "",
        user_name: ""
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ userProfile: userProfile.data["user"]})
        this.setState({
            user_name: userProfile.data["user"].user_name,
            full_name: userProfile.data["user"].full_name,
            first_name: userProfile.data["user"].first_name,
            last_name: userProfile.data["user"].last_name,
            phone: userProfile.data["user"].phone
        });
        this.setState({ userCompany: userProfile.data["getCompany"]})
        this.setState({
            company_name: userProfile.data["getCompany"].Data,
            address1: userProfile.data["getCompany"].address1,
            address2: userProfile.data["getCompany"].address2,
            city: userProfile.data["getCompany"].city,
            postcode: userProfile.data["getCompany"].postcode,
            region: userProfile.data["getCompany"].region,
            company_number: userProfile.data["getCompany"].company_number,
            years_trading: userProfile.data["getCompany"].years_trading,
            yearly_turnover: userProfile.data["getCompany"].yearly_turnover,
            num_employees: userProfile.data["getCompany"].num_employees
        });
        console.log(this.state);
    }

    handleChange = ({ target }) => {
        console.log(this.state);
        console.log(target);
        this.setState({ [target.name]: target.value });
        console.log(this.state);
     };

    async updateUser(){
        const data = {
            user_name: this.state.userProfile.data["user"].user_name,
            full_name: this.state.full_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone
        }
        console.log(data)
        try {
            const update = await API.graphql(graphqlOperation(updateUser, data));
            console.log(update);
            console.log("Success");
        } catch (err) {
            console.log("Error:")
            console.log(err);
        }
    }

    async updateUserProfile(){
        try{
             const r = await API.graphql(graphqlOperation(updateCompany, {
                 user_name: this.state.user_name,
                 address1: this.state.address1
            }));
             console.log("Success!");
             console.log(r);
        }catch(err){
            console.log(err);
             console.log("Error:");
             console.log(err);
        }
    }
            /*region: this.state.region,
            company_number: this.state.company_number,
            years_trading: this.state.years_trading,
            yearly_turnover: this.state.yearly_turnover,
            num_employees: this.state.num_employees*/
       

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
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="first_name" name="first_name" type="text" value={this.state.first_name} onChange={this.handleChange} />
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Last Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="last_name" name="last_name" type="text" value={this.state.last_name} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Your Email
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="user_name" name="user_name" type="text"  value={this.state.user_name} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Your Mobile Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="phone" name="phone" type="text"  value={this.state.phone}  onChange={this.handleChange}/>
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
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="company_name" name="company_name" type="text" value={this.state.company_name} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Company Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="company_number" name="company_number" type="text" value={this.state.company_number} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                Address1
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="address1" name="address1" type="text"  value={this.state.address1} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                            Address2
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="address2" name="address2" type="text"  value={this.state.address2} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                City
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="city" name="city" type="text"  value={this.state.city} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                            Region
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="region" name="region" type="text"  value={this.state.region} onChange={this.handleChange}/>
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
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="years_trading"  name="years_trading" type="text" value={this.state.years_trading} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            What is your estimated yearly turn-over?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="yearly_turnover" name="yearly_turnover" type="text" value={this.state.yearly_turnover} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            How many employees do you have?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="num_employees" type="text"  value={this.state.num_employees} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
                            Which industry does your business form part of?
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="industry" name="industry" type="text"  value={this.state.industry} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.updateUserProfile}>
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