import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTableV5 } from 'mdbreact';
import {  getServices } from "../graphql/queries";
import { HorizontalBar } from "react-chartjs-2"

class Expenses extends Component {
    state = {
        data1: {},
        data2: {},
        data3: {},
        gasValues: [],
        elecValues: [],
        waterValues: [],
        gasYearValues: [],
        elecYearValues: [],
        waterYearValues: [],
        annualCost: 0,
        monthlyCost: 0
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        //user services
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));

        //summary expenses
        let sum = userServices.data["getServices"].items.reduce(function(prev, current) {
            return prev + +current.cost_year
        }, 0);
        this.setState({annualCost: sum})


        let sum2 = userServices.data["getServices"].items.reduce(function(prev, current) {
            return prev + +current.cost_month
        }, 0);
        this.setState({monthlyCost: sum2})

        //costs per month
        const water = [];
        const gas = [];
        const elec = [];
        userServices.data["getServices"].items.map(lead => {
            if (lead.service_name == "Gas") {
                gas.push(parseFloat(lead.cost_month));
            } else if(lead.service_name == "Electric") {
                elec.push(parseFloat(lead.cost_month));
            } else {
                water.push(parseFloat(lead.cost_month));
            }
        });
        //do summary 
        const gasTotal = gas.reduce((result, number) => result+number);
        const elecTotal = elec.reduce((result, number) => result+number);
        const waterTotal = water.reduce((result, number) => result+number);

        for (let i = 0; i < 12; i++) {
            var gas1 = this.state.gasValues.concat(gasTotal);
            this.setState({ gasValues: gas1 })
        }

        for (let i = 0; i < 12; i++) {
            var elec1 = this.state.elecValues.concat(elecTotal);
            this.setState({ elecValues: elec1 })
        }

        for (let i = 0; i < 12; i++) {
            var water1 = this.state.waterValues.concat(waterTotal);
            this.setState({ waterValues: water1 })
        }
        
        var monthData = {
            labels: ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: "Gas",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    data: this.state.gasValues
                },
                {
                    label: "Electric",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    data: this.state.elecValues
                },
                {
                    label: "Water",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    data: this.state.waterValues
                }
            ]
        };
        console.log(monthData)
        this.setState({ data1: monthData});

        //costs per Year
        const waterYear = [];
        const gasYear = [];
        const elecYear = [];
        userServices.data["getServices"].items.map(lead => {
            if (lead.service_name == "Gas") {
                gasYear.push(parseFloat(lead.cost_year));
            } else if(lead.service_name == "Electric") {
                elecYear.push(parseFloat(lead.cost_year));
            } else {
                waterYear.push(parseFloat(lead.cost_year));
            }
        });
        //do summary 
        const gasYearTotal = gasYear.reduce((result, number) => result+number);
        const elecYearTotal = elecYear.reduce((result, number) => result+number);
        const waterYearTotal = waterYear.reduce((result, number) => result+number);

        for (let i = 0; i < 12; i++) {
            var gas2 = this.state.gasYearValues.concat(gasYearTotal);
            this.setState({ gasYearValues: gas2 })
        }

        for (let i = 0; i < 12; i++) {
            var elec2 = this.state.elecYearValues.concat(elecYearTotal);
            this.setState({ elecYearValues: elec2 })
        }

        for (let i = 0; i < 12; i++) {
            var water2 = this.state.waterYearValues.concat(waterYearTotal);
            this.setState({ waterYearValues: water2 })
        }
        
        var YearData = {
            labels: ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"],
            datasets: [
                {
                    label: "Gas",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    data: this.state.gasYearValues
                },
                {
                    label: "Electric",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    data: this.state.elecYearValues
                },
                {
                    label: "Water",
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    data: this.state.waterYearValues
                }
            ]
        };
        console.log(YearData)
        this.setState({ data2: YearData});

        const columnsArray2 = [
            {
                label: "Ref",
                field: 'id',
                width: 250,
            },
            {
                label: "Service Name",
                field: 'service_name',
                width: 250,
            },
            {
                label: "Service Provider",
                field: 'provider',
                width: 250,
            },
            {
                label: "Contract End Date",
                field: 'contract_end',
                width: 250,
            },
            {
                label: "Cost per year",
                field: 'cost_year',
                width: 250,
            },
            {
                label: "Attachments",
                field: 'attachments',
                width: 250,
            }
        ];
        const valuesArray2 = [];
        
        userServices.data["getServices"].items.map(lead => {
            const newValue2 = {
                id: lead.id,
                service_name: lead.service_name,
                provider: lead.current_supplier,
                contract_end: lead.contract_end,
                cost_year: lead.cost_year,
                attachments: lead.callback_time,
            }
            valuesArray2.push(newValue2);
        })
        this.setState({ data3: {
            columns: columnsArray2,
            rows: valuesArray2
        }})
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
                                        {this.state.monthlyCost}
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
                                        {this.state.annualCost}
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
                        <HorizontalBar data={this.state.data2} />
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
                    data={this.state.data3}
                />
            </div>	
        )
    }
}

export default Expenses;