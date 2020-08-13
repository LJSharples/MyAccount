import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTable } from 'mdbreact';
import { getServices } from "../graphql/queries";
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
        console.log(userServices.data["getServices"].items);
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
            if (lead.service_name === "Gas" && lead.cost_month) {
                gas.push(parseFloat(lead.cost_month));
            } else if(lead.service_name === "Electric" && lead.cost_month) {
                elec.push(parseFloat(lead.cost_month));
            } else if(lead.cost_month) {
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
                    backgroundColor: 'rgba(100,255,108)',
                    borderColor: 'rgba(100,255,108)',
                    data: this.state.gasValues
                },
                {
                    label: "Electric",
                    backgroundColor: 'rgba(255, 206, 86)',
                    borderColor: 'rgba(255, 206, 86)',
                    data: this.state.elecValues
                },
                {
                    label: "Water",
                    backgroundColor: 'rgba(46,122,255)',
                    borderColor: 'rgba(46,122,255)',
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
        const years = [];
        userServices.data["getServices"].items.map(lead => {
            if (lead.service_name === "Gas" && lead.cost_year) {
                gasYear.push(parseFloat(lead.cost_year));
            } else if(lead.service_name === "Electric" && lead.cost_year) {
                elecYear.push(parseFloat(lead.cost_year));
            } else if(lead.cost_year){
                waterYear.push(parseFloat(lead.cost_year));
            }
            years.push(parseInt(lead.contract_end.substring(0,4)))
        });
        const yearList = years.filter((val,id,array) => array.indexOf(val) === id);
        console.log(yearList)
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
            labels: yearList.sort(),
            datasets: [
                {
                    label: "Gas",
                    backgroundColor: 'rgba(100,255,108)',
                    borderColor: 'rgba(100,255,108)',
                    data: this.state.gasYearValues
                },
                {
                    label: "Electric",
                    backgroundColor: 'rgba(255, 206, 86)',
                    borderColor: 'rgba(255, 206, 86)',
                    data: this.state.elecYearValues
                },
                {
                    label: "Water",
                    backgroundColor: 'rgba(46,122,255)',
                    borderColor: 'rgba(46,122,255)',
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
            },
            {
                label: "Service Name",
                field: 'service_name',
            },
            {
                label: "Contract Length",
                field: 'contract_length',
            },
            {
                label: "Contract End",
                field: 'contract_end',
            },
            {
                label: "Cost Per Year",
                field: 'cost_year',
            },
            {
                label: "Cost Per Month",
                field: 'cost_month',
            },
        ];
        const valuesArray2 = [];
        
        userServices.data["getServices"].items.map(lead => {
            const newValue2 = {
                id: lead.id,
                service_name: lead.service_name,
                contract_length: lead.contract_length,
                contract_end: lead.contract_end,
                cost_year: lead.cost_year,
                cost_month: lead.cost_month,
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
                                <div className="flex items-center no-underline text-blue-700">
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <p className=" flex items-center no-underline text-blue-700 ml-2 text-sm">
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
                                <div className="flex items-center no-underline  text-white" >
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        {this.state.monthlyCost}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <div className="flex items-center no-underline text-white">
                                    <p className="ml-2 text-sm">
                                    </p>
                                </div>
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
                                <div className="flex items-center no-underline text-white">
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        {this.state.annualCost}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <div className="flex items-center no-underline text-white">
                                    <p className="ml-2 text-sm">
                                    </p>
                                </div>
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
                        <article className="overflow-hidden rounded-lg shadow-lg bg-blue-500 mt-24">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-white text-2xl text-center">
                                    Monthly Expenses
                                </h1>
                            </header>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <HorizontalBar data={this.state.data1} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-pink-700 bg-opacity-85 mt-24">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-white text-2xl">
                                    Annual Expenses
                                </h1>
                            </header>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <HorizontalBar data={this.state.data2} />
                    </div>
                </div>
                <MDBDataTable btn hover striped bordered small responsive data={this.state.data3}/>
            </div>	
        )
    }
}

export default Expenses;