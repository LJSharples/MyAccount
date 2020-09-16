import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getServices } from "../graphql/queries";
import { Pie } from "react-chartjs-2";
import DataTable from "react-data-table-component";

class Expenses extends Component {
    state = {
        data1: {},
        data2: {},
        columns: [],
        rows: [],
        annualCost: 0,
        monthlyCost: 0,
        customStyle: {
            rows: {
              style: {
                minHeight: '72px', // override the row height
              }
            },
            headCells: {
                style: {
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    color: '#ffffff',
                    paddingLeft: '0 8px',
                    backgroundColor: '#63b3ed'
                },
            },
            cells: {
              style: {
                fontSize: '17px',
                color:"#718096",
                paddingLeft: '0 8px',
              },
            },
        }
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
            if (lead.service_name === "Gas" && lead.cost_month) {
                gas.push(parseFloat(lead.cost_month));
            } else if(lead.service_name === "Electric" && lead.cost_month) {
                elec.push(parseFloat(lead.cost_month));
            } else if(lead.cost_month) {
                water.push(parseFloat(lead.cost_month));
            }
        });
        //do summary 
        const gasTotal = gas.reduce((result, number) => result+number, 0);        
        const elecTotal = elec.reduce((result, number) => result+number, 0);
        const waterTotal = water.reduce((result, number) => result+number, 0);
        
        this.setState({ data1: {
            labels: [
                'Gas',
                'Electric',
                'Water'
            ],
            datasets: [{
                data: [gasTotal, elecTotal, waterTotal],
                backgroundColor: [
                '#fc8181',
                '#90cdf4',
                '#fbd38d'
                ],
                hoverBackgroundColor: [
                '#fc8181',
                '#90cdf4',
                '#fbd38d'
                ]
            }]
        }
    })

        //costs per Year
        const waterYear = [];
        const gasYear = [];
        const elecYear = [];
        userServices.data["getServices"].items.map(lead => {
            if (lead.service_name === "Gas" && lead.cost_year) {
                gasYear.push(parseFloat(lead.cost_year));
            } else if(lead.service_name === "Electric" && lead.cost_year) {
                elecYear.push(parseFloat(lead.cost_year));
            } else if(lead.cost_year){
                waterYear.push(parseFloat(lead.cost_year));
            }
        });
        //do summary 
        const gasYearTotal = gasYear.reduce((result, number) => result+number, 0);
        const elecYearTotal = elecYear.reduce((result, number) => result+number, 0);
        const waterYearTotal = waterYear.reduce((result, number) => result+number, 0);

        this.setState({ data2: {
                labels: [
                    'Gas',
                    'Electric',
                    'Water'
                ],
                datasets: [{
                    data: [gasYearTotal, elecYearTotal, waterYearTotal],
                    backgroundColor: [
                    '#fc8181',
                    '#90cdf4',
                    '#fbd38d'
                    ],
                    hoverBackgroundColor: [
                    '#fc8181',
                    '#90cdf4',
                    '#fbd38d'
                    ]
                }]
            }
        })

        
        const columnsArray2 = [
            {
                name: 'Service Name',
                selector: 'service_name',
                sortable: true,
                center: true
            },
            {
                name: 'Contract Length',
                selector: 'contract_length',
                sortable: true,
                center: true
            },
            {
                name: 'Contract End Date',
                selector: 'contract_end',
                sortable: true,
                center: true,
                grow: 2,
            },
            {
                name: 'Cost per year (£)',
                selector: 'cost_year',
                sortable: true,
                center: true
            },
            {
                name: 'Cost per Month (£)',
                selector: 'cost_month',
                sortable: true,
                center: true
            },
        ];
        const valuesArray2 = [];
        
        userServices.data["getServices"].items.map(lead => {
            var date = new Date(lead.contract_end);
            const newValue2 = {
                service_name: lead.service_name,
                contract_length: lead.contract_length,
                contract_end: date.toLocaleString(),
                cost_year: lead.cost_year,
                cost_month: lead.cost_month,
            }
            valuesArray2.push(newValue2);
        })
        this.setState({ columns: columnsArray2})
        this.setState({ rows: valuesArray2})
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
                        <article className="overflow-hidden rounded-lg shadow-lg bg-blue-300">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-blue-600 font-semibold  text-white text-2xl">
                                    Monthly Expenses
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <div className="flex items-center no-underline  text-white" >
                                    <p alt="Placeholder" className="block text-blue-600 font-semibold rounded-full">£</p>
                                    <p className="ml-2 text-blue-600 font-semibold text-sm">
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
                        <article className="overflow-hidden rounded-lg shadow-lg bg-orange-300">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-orange-600 font-semibold text-2xl">
                                    Annual Expenses
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <div className="flex items-center no-underline text-white">
                                    <p alt="Placeholder" className="block text-orange-600 font-medium rounded-full">£</p>
                                    <p className="ml-2 text-orange-600 font-medium text-sm">
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
                        <article className="overflow-hidden rounded-lg shadow-lg bg-purple-300 bg-opacity-75">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-purple-500 font-semibold text-2xl">
                                    Expenses Breakdown
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <div className="flex items-center no-underline text-white">
                                    <p alt="Placeholder" className="block text-purple-500 font-medium rounded-full">£</p>
                                    <p className="ml-2 text-purple-500 font-medium text-sm">
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
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-blue-300 mt-24">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-blue-600 font-semibold  text-2xl text-center">
                                    Monthly Expenses
                                </h1>
                            </header>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <Pie data={this.state.data1} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-orange-300 bg-opacity-85 mt-24">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-orange-600 font-semibold text-2xl">
                                    Annual Expenses
                                </h1>
                            </header>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                        <Pie data={this.state.data2}/>
                    </div>
                </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
                        <div className="text-gray-700 text-center px-4 py-2 m-2 rounded-lg">
                        </div>
                        <div className="flex-1 items-center justify-between leading-tight text-center px-20 py-10 m-10 rounded-lg">
                            <DataTable
                                columns={this.state.columns}
                                data={this.state.rows}
                                pagination="true"
                                customStyles={this.state.customStyle}/>
                        </div>
                        <div className="text-gray-700 text-center px-4 py-2 m-2 rounded-lg ">
                        </div>
                    </div>
            </div>	
        )
    }
}

export default Expenses;