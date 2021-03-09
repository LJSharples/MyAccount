import React, { Component } from "react";
import { getUserDetails, } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { updateUser, updateCompany, addProfile, addCompany } from '../graphql/mutations';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';
import Footer from "./Footer";
import TagManager from 'react-gtm-module'

class PersonalDetails extends Component {
    state = {
        userProfile: {},
        userCompany: {},
        errors: {},
        full_name: "",
        first_name: "",
        last_name: "",
        phone: "",
        company_name: "",
        company_number: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        region: "",
        num_employees: "",
        years_trading: "",
        yearly_turnover: "",
        industry: "",
        user_name: "",
        success: false,
        check: false,
        createUser: false,
        createCompany: false
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        this.setState({ user_name: user.username })
        var userProfile = {} 
        try{
            userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
            if(userProfile.data["user"] && userProfile.data["user"].full_name){
                this.setState({ userProfile: userProfile.data["user"]})
                this.setState({
                    user_name: user.username,
                    full_name: userProfile.data["user"].full_name,
                    first_name: userProfile.data["user"].first_name,
                    last_name: userProfile.data["user"].last_name,
                    phone: userProfile.data["user"].phone
                });
            } else{
                this.setState({ createUser: true});
                this.setState({ check: true});
            }
            if(userProfile.data["getCompany"] && userProfile.data["getCompany"].address1){
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
                    num_employees: userProfile.data["getCompany"].num_employees,
                    industry: userProfile.data["getCompany"].industry
                });
            } else{
                this.setState({ createCompany: true});
                this.setState({ check: true});
            }
        } catch(e){
            console.log(e)
        }
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value})
    };

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value });
    };

    setOpen = () => {
         this.setState({ success: false});
    }

    setOpen2 = () => {
         this.setState({ check: false});
    }

    checkValidation = () => {
        let errors = {}
        var text = "yes";
        if(this.state.company_name === ''){
            errors["company_name"] = "Cannot be Empty"
        }
        console.log(errors);
        this.onChangeText('errors', errors);
        if(Object.keys(errors).length === 0){
            console.log("Passed")
            text = "Passed";
            return text;
        } else {
            return text;
        }
    }

    updateUserProfile = async () => {
        const data = {
            user_name: this.state.user_name,
            full_name: this.state.first_name + " " + this.state.last_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone
        }
        if(this.state.createUser){
            console.log(data);
            try {
                await API.graphql(graphqlOperation(addProfile, data));
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'addProfile',
                        user_name: this.state.userProfile.user_name
                    }
                })
                this.setState({ success: true})
                window.scrollTo(0, 0)
                this.setOpen2()
            } catch (err) {
                console.log("Error:")
                console.log(err);
            }
        } else {
            try {
                await API.graphql(graphqlOperation(updateUser, data));
                TagManager.dataLayer({
                    dataLayer: {
                        event: 'updateProfile',
                        user_name: this.state.userProfile.user_name
                    }
                })
                this.setState({ success: true})
                window.scrollTo(0, 0)
            } catch (err) {
                console.log("Error:")
                console.log(err);
            }
        }
        setTimeout(function() { //Start the timer
             this.setState({success: false}) //After 1 second, set render to true
         }.bind(this), 3000)
    }

    updateUserCompany = async () => {
        let result = this.checkValidation();
        console.log(result)
        if(result === "Passed"){
            const data = {
                user_name: this.state.user_name,
                company_name: this.state.company_name,
                company_number: this.state.company_number,
                address1: this.state.address1,
                address2: this.state.address2,
                city: this.state.city,
                postcode: this.state.postcode,
                region: this.state.region,
                years_trading: this.state.years_trading,
                num_employees: this.state.num_employees,
                yearly_turnover: this.state.yearly_turnover,
                industry: this.state.industry
            }
            if(this.state.createCompany){
                try{
                    await API.graphql(graphqlOperation(addCompany, data));
                    TagManager.dataLayer({
                        dataLayer: {
                            event: 'addCompany',
                            user_name: this.state.userProfile.user_name
                        }
                    })
                    this.setState({ success: true})
                    this.setOpen2()
                    window.scrollTo(0, 0)
                }catch(err){
                    console.log("Error:");
                    console.log(err);
                }
            } else {
                try{
                    await API.graphql(graphqlOperation(updateCompany, data));
                    TagManager.dataLayer({
                        dataLayer: {
                            event: 'updateCompany',
                            user_name: this.state.userProfile.user_name
                        }
                    })
                    this.setState({ success: true})
                    window.scrollTo(0, 0)
                }catch(err){
                        console.log("Error:");
                        console.log(err);
                }
            }
            setTimeout(function() { //Start the timer
                this.setState({success: false}) //After 1 second, set render to true
            }.bind(this), 3000)
        } else {
            return;
        }
    }

    render(){
        return (
            <form>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                        My Details
                                    </h1>
                                </header>
                            </article>
                        </div>
                        <Collapse in={this.state.success} timeout="auto" unmountOnExit>
                            <Alert severity="success" action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setOpen();
                                    }}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </IconButton>
                                }
                            >
                                <AlertTitle>Success</AlertTitle>
                                Your update was successful — <strong>Your details have been updated!</strong>
                            </Alert>
                        </Collapse>
                        <Collapse in={this.state.check} timeout="auto" unmountOnExit>
                            <Alert severity="success" action={
                                    <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        this.setOpen2();
                                    }}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                        </span>
                                    </IconButton>
                                }
                            >
                                <AlertTitle>Welcome</AlertTitle>
                                Please complete your profile — <strong>Fill in the following sections!</strong>
                            </Alert>
                        </Collapse>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                First Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="first_name" name="first_name" type="text" value={this.state.first_name} onChange={this.handleChange} />
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                Last Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="last_name" name="last_name" type="text" value={this.state.last_name} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                Your Mobile Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="phone" name="phone" type="text"  value={this.state.phone}  onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                        </div>
                        <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg ">
                            <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.updateUserProfile}>
                                    Update My Details
                            </button>
                        </div>
                        <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                        </div>
                    </div>
                </div>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-blue-600 text-2xl font-bold">
                                        About your company
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                Company Name
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="company_name" name="company_name" type="text" value={this.state.company_name} onChange={this.handleChange}/>
                            <span style={{color: "red"}}>{this.state.errors["company_name"]}</span>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                Company Number
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="company_number" name="company_number" type="text" value={this.state.company_number} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                Address1
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="address1" name="address1" type="text"  value={this.state.address1} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                            Address2
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="address2" name="address2" type="text"  value={this.state.address2} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                City
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="city" name="city" type="text"  value={this.state.city} onChange={this.handleChange}/>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                            Region
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" 
                            id="region" name="region" type="text"  value={this.state.region} onChange={this.handleChange}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                                Post Code
                            </label>
                            <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" 
                            id="postcode" name="postcode" type="text"  value={this.state.postcode} onChange={this.handleChange}/>
                        </div>
                    </div>
                </div>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-blue-600 text-2xl font-bold">
                                        Additional information
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        
                        <div className="md:w-1/6 px-3">
                        </div>
                        <div className="md:w-4/6 px-3 mb-6 md:mb-0">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <p className="block tracking-wide text-grey-darker text-lg text-blue-600 mb-2"> 
                                    Additional information can help our team with more bespoke recommendations.
                                    </p>
                                </header>
                            </article>
                        </div>
                        <div className="md:w-1/6 px-3">
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2" >
                            How many years have you been trading?
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="years_trading" name="years_trading" type="text" onChange={this.handleChange}>
                                <option selected="selected">{this.state.years_trading || "Select"}</option>
                                <option>0 - 1 Years</option>
                                <option>2 - 5 Years</option>
                                <option>5 - 10 Years</option>
                                <option>10 Years +</option>
                            </select>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2">
                            What is your estimated yearly turn-over?
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="yearly_turnover" name="yearly_turnover" type="text" onChange={this.handleChange}>
                                <option selected="selected">{this.state.yearly_turnover || "Select"}</option>
                                <option>£0 - £50,000</option>
                                <option>£50,000 - £100,000</option>
                                <option>£100,000 - £500,000</option>
                                <option>£500,000 - £2M</option>
                                <option>£2M +</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4 mt-10">
                        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2">
                            How many employees do you have?
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="num_employees" name="num_employees" type="text" onChange={this.handleChange}>
                                <option selected="selected">{this.state.num_employees || "Select"} </option>
                                <option>1 - 10</option>
                                <option>10 - 50</option>
                                <option>50 - 200</option>
                                <option>200 - 500</option>
                                <option>500 +</option>
                            </select>
                        </div>
                        <div className="md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-grey-darker text-gray-700 text-xs font-bold mb-2">
                            Which industry does your business form part of?
                            </label>
                            <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="industry" name="industry" type="text" onChange={this.handleChange}>
                                <option selected="selected">{this.state.industry || "Select"}</option>
                                <option value='Aerospace and Defence' >Aerospace and Defence</option>
                                <option value='Alternative Investment Funds' >Alternative Investment Funds</option>
                                <option value='Asset and Wealth Management' >Asset and Wealth Management</option>
                                <option value='Automotive' >Automotive</option>
                                <option value='Banking and Capital Markets' >Banking and Capital Markets</option>
                                <option value='Business Services' >Business Services</option>
                                <option value='Capital Projects and Infrastructure' >Capital Projects and Infrastructure</option>
                                <option value='Charities' >Charities</option>
                                <option value='Chemicals' >Chemicals</option>
                                <option value='Education' >Education</option>
                                <option value='Engineering and Construction' >Engineering and Construction</option>
                                <option value='Financial Services' >Financial Services</option>
                                <option value='Forest, Paper and Packaging' >Forest, Paper and Packaging</option>
                                <option value='Government and Public Services' >Government and Public Services</option>
                                <option value='Healthcare' >Healthcare</option>
                                <option value='Hospitality and Leisure' >Hospitality and Leisure</option>
                                <option value='Insurance' >Insurance</option>
                                <option value='Manufacturing' >Manufacturing</option>
                                <option value='Media and Entertainment' >Media and Entertainment</option>
                                <option value='Mining and Metals' >Mining and Metals</option>
                                <option value='Oil and Gas' >Oil and Gas</option>
                                <option value='Pharmaceutical and Life Sciences' >Pharmaceutical and Life Sciences</option>
                                <option value='Power and Utilities'>Power and Utilities</option>
                                <option value='Private Equity' >Private Equity</option>
                                <option value='Real Estate' >Real Estate</option>
                                <option value='Retail and Consumer' >Retail and Consumer</option>
                                <option value='Sovereign Investment Funds' >Sovereign Investment Funds</option>
                                <option value='Technology' >Technology</option>
                                <option value='Telecommunications' >Telecommunications</option>
                                <option value='Transport and Logistics' >Transport and Logistics</option>
                                <option value='Other / Not listed' >Other / Not listed</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                        </div>
                        <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg ">
                        <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.updateUserCompany}>
                                Update Company Details
                            </button>
                        </div>
                        <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                        </div>
                    </div><Footer/>
                </div>
            </form>
             
        )
    }
}

export default PersonalDetails;