import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTableV5 } from 'mdbreact';
import {  getServices } from "../graphql/queries";
import { HorizontalBar } from "react-chartjs-2"

class Expenses extends Component {
    state = {
        monthData: [],
        yearData: [],
        datasetsMonth: [],
        services: [],
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        //user services
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));

        //costs
        const serviceArray = []; //get service names
        const serviceArray2 = [];
        userServices.data['getServices'].items.map(lead => {
            serviceArray.push(lead.service_name);
        })
        const serviceNames = serviceArray.filter((val,id,array) => array.indexOf(val) == id);
        this.setState({ services: serviceNames});

        //map data to service
        userServices.data['getServices'].items.map(lead => {
            serviceArray2.push({key: lead.service_name, value: lead.cost_month});
        })
        this.setState({monthData: serviceArray2});
        console.log(serviceArray2);

        //convert to dataset
        const arrayDatasets = []
        this.state.monthData.map(month => {
            const monthValue = [];
            for (let i = 0; i < 12; i++) {
                monthValue.push(month.value);
            }
            const dataset = {
                label: month.key,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                stack: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: monthValue
            }
            arrayDatasets.push(dataset)
        });
        this.setState({ datasetsMonth: arrayDatasets});
        console.log(this.state);

        
        
        var monthData = {
            labels: ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"],
            datasets: this.state.datasetsMonth
        };
        console.log(monthData)
        this.setState({ data1: monthData});
    }

    render(){
        return (
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className=" no-underline hover:underline text-black text-lg">
                                            Expenses Today
                                    </h1>
                                </header>
                            </article>
                        </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-blue-200">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-blue-700 text-2xl">
                                    Savings To Date
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline text-blue-700" href="#">
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <p className=" flex items-center no-underline text-blue-700 ml-2 text-sm">
                                    View Details
                                </p>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-blue-500">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline  text-white text-2xl">
                                    Monthly Expenses
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline  text-white" href="#">
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline text-white" href="#">
                                    <p className="ml-2 text-sm">
                                        View Details
                                    </p>
                                </a>
                            </div>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-pink-700 bg-opacity-85">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-white text-2xl">
                                    Annual Expenses
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline text-white" href="#">
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline text-white" href="#">
                                    <p className="ml-2 text-sm">
                                        View Details
                                    </p>
                                </a>
                            </div>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-green-400 bg-opacity-95">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-white text-2xl">
                                    Expenses Breakdown
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <h1 className="no-underline  text-white text-2xl">
                                    View Details
                                </h1>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                            </div>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-blue-500">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-white text-2xl">
                                    Monthly Expenses
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <h1 className="no-underline  text-white text-2xl">
                                    View Details
                                </h1>
                            </div>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <HorizontalBar data={this.state.data1} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-pink-700 bg-opacity-85">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-white text-2xl">
                                    Annual Expenses
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <h1 className="no-underline  text-white text-2xl">
                                    View Details
                                </h1>
                            </div>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <HorizontalBar data={this.state.dataset} />
                    </div>
                </div>
                <MDBDataTableV5
                    hover
                    autoWidth
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    pagingTop
                    searchTop
                    searchBottom={false}
                    data={this.state.data}
                />
            </div>	
        )
    }
}

export default Expenses;