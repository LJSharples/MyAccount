import React, { Component } from 'react';
import { getUserDetails, getServices } from "../graphql/queries";
import { addService } from "../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { Link, Redirect } from 'react-router-dom';
import Footer from "./Footer";
import GetQuote from "./GetQuote";
import Tooltip from '@material-ui/core/Tooltip';
import {
    createMuiTheme,
    MuiThemeProvider
  } from "@material-ui/core/styles";

class Dashboard extends Component {
    state = {
        userProfile: {},
        userCompany: {},
        toolTipText: "The expense amounts are estimates if your service costs are variable and subject to change each month.",
        toolTipText2: "Some services are variable, therefore these savings are estimated based on figures provided by you or the suppliers.",
        first_name: '',
        services: 0,
        annualCost: 0,
        annualSave: 0,
        redirect: false,
        isOpen2: false ,
        serviceName: '',
        provider: '',
        contractDate: '',
        contractLength: '',
        callback_time: '',
        cost_year: '',
        cost_month: '',
        currentSupplier: '',
        user_name: '',
        selectedKey: '',
        uploaded_documents: [],
        permission: true,
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        if(userProfile.data["user"] && userProfile.data["user"].user_name){
            this.setState({ userProfile: userProfile.data["user"]})
            this.setState({ userCompany: userProfile.data["getCompany"]})
            if(userProfile.data["user"].first_name){
                this.setState({ first_name: userProfile.data["user"].first_name });
            }

            //get total services
            const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));
            let serviceSum = userServices.data["getServices"].items.reduce(function(prev, current) {
                if(current.status === "CURRENT" || current.status === "LIVE"){
                    return prev + +1 
                 }
                 return prev
            }, 0);
            this.setState({services: serviceSum});

            let sum = userServices.data["getServices"].items.reduce(function(prev, current) {
                if(current.status === "CURRENT" || current.status === "LIVE"){
                    return prev + +current.cost_year 
                 }
                 return prev
            }, 0);
            this.setState({annualCost: sum})

            userServices.data["getServices"].items.map(lead => {
                if(lead.new_cost_month && lead.new_cost_year){
                    this.generateMoneySaved(lead.cost_year, lead.new_cost_year)
                }
            });
        } else {
            this.setState({ redirect: true});
        }
    }

    generateMoneySaved = (oldYear, newYear) => {
        if(newYear > oldYear){
            var money = oldYear - newYear
            this.setState({ annualSave: this.state.annualSave + money})
        }
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value})
    };

    onInput = (key, event) => {
        console.log(key);
        console.log(this.state);
        this.setState({ [key]: event.target.value})
    };

    onActivate = () => {
        console.log(this.state.permission)
        this.setState(prevState => ({
            permission: !prevState.permission
        }));
        console.log(this.state.permission)
    };

    fileUploadKey = (key) => {
        this.setState(prevState => ({
            uploaded_documents: [...prevState.uploaded_documents, key]
        }))

    }

    toggleModal = () => {
        this.setState({
          isOpen2: !this.state.isOpen2
        });
    }

    submitService = async () => {
        const data = {
            user_name: this.state.userProfile.user_name,
            status: "LEAD",
            service_name: this.state.serviceName,
            callback_time: this.state.callback_time,
            contract_end: this.state.contractDate,
            contract_length: this.state.contractLength,
            current_supplier: this.state.currentSupplier,
            cost_year: this.state.cost_year,
            cost_month: this.state.cost_month,
            uploaded_documents: this.state.uploaded_documents,
            permission: this.state.permission,
            affiliate_id: this.state.affiliateId
        }
        console.log(data)
        try {
            const re = await API.graphql(graphqlOperation(addService, data));
            console.log(re);
        } catch (err) {
            console.log("Error:")
            console.log(err);
        }   
        this.setState({
          isOpen2: !this.state.isOpen2
        });
    }

    downloadFile = async (key) => {
        console.log(key)
        await Storage.get(key, { level: 'private'})
        .then(result => {
            console.log(result)
            window.open(result, "_blank")
        })
        .catch(err => console.log(err));
    }

    render(){

        const theme = createMuiTheme({
            overrides: {
              MuiTooltip: {
                tooltip: {
                  fontSize: "1em",
                }
              }
            }
        });

        if(this.state.redirect){
            return <Redirect to="/my-details"/>
        } else {
            return(
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-4 md:p-6">
                                    <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                        Welcome back { this.state.first_name },
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
                        <MuiThemeProvider theme={theme}>
                            <Tooltip title={this.state.toolTipText} arrow>
                                <div className="flex-1 text-gray-700 text-center bg-gray-100 px-8 py-4 m-4 rounded-lg shadow-lg bg-orange-300">
                                    
                                    <h1 className="no-underline text-orange-600 font-semibold text-2xl text-lg p-4">
                                        Annual Expenses
                                    </h1>
                                    <h1 className="no-underline text-orange-600 font-medium text-2xl text-lg p-5">
                                        £ {this.state.annualCost}
                                    </h1>
                                    <Link to="/expenses">
                                        <button className="no-underline text-orange-600 font-medium text-2xl text-lg border-2 p-4 border-orange-500 rounded hover:border-transparent hover:text-orange-600 hover:bg-white hover:border-orange-500">
                                            View Expenses  
                                        </button>
                                    </Link>
                                </div>
                            </Tooltip>
                        </MuiThemeProvider>
                        <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg shadow-lg bg-green-200 bg-opacity-75">
                            <h1 className="no-underline text-purple-300 text-opacity-0 font-semibold text-2xl text-lg p-4">
                                Get Quote
                            </h1>
                            <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold text-2xl text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.toggleModal}
                            >
                                Get Quote
                            </button>
                            <GetQuote show={this.state.isOpen2} onClose={this.toggleModal} onInput={this.onInput} submitLead={this.submitService} fileUploadKey={this.fileUploadKey} onActivate={this.onActivate}>
                            </GetQuote>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-2/3">
                            <Tooltip title={this.state.toolTipText2} arrow>
                                <article className="overflow-hidden rounded-lg shadow-lg bg-purple-300 bg-opacity-75">
                                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 className="no-underline text-purple-600 font-semibold text-2xl text-lg p-4">
                                            You've Saved - £ {this.state.annualSave}
                                        </h1>
                                        <Link to="/expenses">
                                            <button className="no-underline text-purple-600 font-medium text-2xl text-lg border-2 p-4 border-purple-400 rounded hover:border-transparent hover:text-purple-400 hover:bg-white hover:border-purple-400">
                                                View Savings  
                                            </button>
                                        </Link>
                                    </header>
                                </article>
                            </Tooltip>
                        </div>
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg shadow-lg">
                            </article>
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

                        <div className="flex-1 text-center px-8 py-4 m-4 bg-gray-400  rounded-lg shadow-lg bg-gray-200 bg-opacity-25">
                            <h1 className="no-underline text-gray-700 font-semibold text-2xl text-lg p-4">
                                Reduce your Waste Management costs
                            </h1>
                            <h1 className="no-underline text-gray-700 font-medium text-lg text-lg p-5">
                                See if you can reduce your waste management costs with a free quote from our trusted partners.
                            </h1>
                            <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold text-lg text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.toggleModal}
                            >
                                Get Quote
                            </button>
                        </div>
                        <div className="flex-1 text-center px-8 py-4 m-4 bg-gray-400  rounded-lg shadow-lg bg-gray-200 bg-opacity-25">
                            <h1 className="no-underline text-gray-700 font-semibold text-2xl text-lg p-4">
                                Merchant services savings
                            </h1>
                            <h1 className="no-underline text-gray-700 font-medium text-lg text-lg p-5">
                            Save money on every transaction you make with low merchant service transaction costs. Find out more.
                            </h1>
                            <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold text-lg text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.toggleModal}
                            >
                                Get Quote
                            </button>
                        </div>
                        <div className="flex-1 text-center px-8 py-4 m-4 bg-gray-400  rounded-lg shadow-lg bg-gray-200 bg-opacity-25">
                            <h1 className="no-underline text-gray-700 font-semibold text-2xl text-lg p-4">
                                New updated business rates
                            </h1>
                            <h1 className="no-underline text-gray-700 font-medium text-lg text-lg p-5">
                                Save money on every transaction you make with low merchant service transaction costs. Find out more.
                            </h1>
                            <button
                                className="bg-blue-500 text-white active:bg-blue-600 font-bold text-lg text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={this.toggleModal}
                            >
                                Get Quote
                            </button>
                        </div>
                    </div>
                    <Footer/>
                </div>                    
                                
            )
        }
    }
}
export default Dashboard;