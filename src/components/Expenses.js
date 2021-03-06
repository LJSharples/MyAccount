import React, { Component } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { getServices } from "../graphql/queries";
import { Pie } from "react-chartjs-2";
import DataTable from "react-data-table-component";
import Footer from "./Footer";
import Tooltip from '@material-ui/core/Tooltip';
import {
    createMuiTheme,
    MuiThemeProvider
  } from "@material-ui/core/styles";

class Expenses extends Component {
    state = {
        data1: {},
        data2: {},
        columns: [],
        rows: [],
        annualCost: 0,
        monthlyCost: 0,
        moneySaved: 0,
        savings: 0,
        toolTipText: "The expense amounts are estimates if your service costs are variable and subject to change each month",
        toolTipText2: "Some services are variable, therefore these savings are estimated based on figures provided by you or the suppliers.",
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
        var userServices = []
        try{
            userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));
            //summary expenses
            console.log(userServices)
            let sum = userServices.data["getServices"].items.reduce(function(prev, current) {
                if(current.status === "CURRENT" || current.status === "LIVE" || current.status === "Live" || current.status === "Live Contract"){
                return prev + +parseFloat(current.cost_year) 
                }
                return prev
            }, 0);
            this.setState({annualCost: sum.toFixed(2)})


            let sum2 = userServices.data["getServices"].items.reduce(function(prev, current) {
                if(current.status === "CURRENT" || current.status === "LIVE" || current.status === "Live" || current.status === "Live Contract"){
                return prev + +parseFloat(current.cost_month) 
                }
                return prev
            }, 0);

            let sum3 = userServices.data["getServices"].items.reduce(function(prev, current) {
                if(current.status === "CURRENT" || current.status === "LIVE" || current.status === "Live" || current.status === "Live Contract"){
                    if(!isNaN(parseFloat(current.savings))){
                        console.log(parseFloat(current.savings));
                        return prev + +parseFloat(current.savings) 
                    }
                }
                return prev
            }, 0);
            this.setState({monthlyCost: parseFloat(sum2).toFixed(2)})
            this.setState({moneySaved: parseFloat(sum3).toFixed(2)})

            //costs per month
            const water = [];
            const gas = [];
            const elec = [];
            const oil = [];
            const energyReduction = [];
            const wasteManagement = [];
            const businessRatesReview = [];
            const fuelCards = [];
            const telecommsBroadband = [];
            const cyberSecurity = [];
            const printers = [];
            const merchantServices = [];
            const insolvency = [];
            //cost per year
            const waterYear = [];
            const gasYear = [];
            const elecYear = [];
            const oilYear = [];
            const energyReductionYear = [];
            const wasteManagementYear = [];
            const businessRatesReviewYear = [];
            const fuelCardsYear = [];
            const telecommsBroadbandYear = [];
            const cyberSecurityYear = [];
            const printersYear = [];
            const merchantServicesYear = [];
            const insolvencyYear = [];
            userServices.data["getServices"].items.map(lead => {
                if(lead.status === "CURRENT" || lead.status === "Live" || lead.status === "LIVE"){
                    if (lead.service_name === "Gas" && lead.cost_month) {
                        gas.push(parseFloat(lead.cost_month));
                        gasYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Electric" && lead.cost_month) {
                        elec.push(parseFloat(lead.cost_month));
                        elecYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Water" && lead.cost_month) {
                        water.push(parseFloat(lead.cost_month));
                        waterYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Oil" && lead.cost_month) {
                        oil.push(parseFloat(lead.cost_month));
                        oilYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Energy Reduction" && lead.cost_month) {
                        energyReduction.push(parseFloat(lead.cost_month));
                        energyReductionYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Waste Management" && lead.cost_month) {
                        wasteManagement.push(parseFloat(lead.cost_month));
                        wasteManagementYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Business Rates Review" && lead.cost_month) {
                        businessRatesReview.push(parseFloat(lead.cost_month));
                        businessRatesReviewYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Fuel Cards" && lead.cost_month) {
                        fuelCards.push(parseFloat(lead.cost_month));
                        fuelCardsYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Telecomms & Broadband" && lead.cost_month) {
                        telecommsBroadband.push(parseFloat(lead.cost_month));
                        telecommsBroadbandYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Cyber Security" && lead.cost_month) {
                        cyberSecurity.push(parseFloat(lead.cost_month));
                        cyberSecurityYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Printers" && lead.cost_month) {
                        printers.push(parseFloat(lead.cost_month));
                        printersYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Merchant Services" && lead.cost_month) {
                        merchantServices.push(parseFloat(lead.cost_month));
                        merchantServicesYear.push(parseFloat(lead.cost_year));
                    } else if(lead.service_name === "Insolvency" && lead.cost_month) {
                        insolvency.push(parseFloat(lead.cost_month));
                        insolvencyYear.push(parseFloat(lead.cost_year));
                    }
                }
            });
            //do summary 
            const gasTotal = gas.reduce((result, number) => result+number, 0);        
            const elecTotal = elec.reduce((result, number) => result+number, 0);
            const waterTotal = water.reduce((result, number) => result+number, 0);
            const oilTotal = oil.reduce((result, number) => result+number, 0);
            const energyReductionTotal = energyReduction.reduce((result, number) => result+number, 0);
            const wasteManagementTotal = wasteManagement.reduce((result, number) => result+number, 0);
            const businessRatesTotal = businessRatesReview.reduce((result, number) => result+number, 0);
            const fuelCardsTotal = fuelCards.reduce((result, number) => result+number, 0);
            const telecommsTotal = telecommsBroadband.reduce((result, number) => result+number, 0);
            const cyberSecurityTotal = cyberSecurity.reduce((result, number) => result+number, 0);
            const printersTotal = printers.reduce((result, number) => result+number, 0);
            const merchantServicesTotal = merchantServices.reduce((result, number) => result+number, 0);
            const insolvencyTotal = insolvency.reduce((result, number) => result+number, 0);
            const monthTotals = [
                gasTotal, 
                elecTotal, 
                waterTotal,
                oilTotal, 
                energyReductionTotal,
                wasteManagementTotal,
                businessRatesTotal,
                fuelCardsTotal,
                telecommsTotal,
                cyberSecurityTotal,
                printersTotal,
                merchantServicesTotal,
                insolvencyTotal
            ];

            const labelsData = [
                'Gas',
                'Electricity',
                'Water',
                'Oil',
                'Energy reduction',
                'Waste Management',
                'Business Rates',
                'Fuel Cards',
                'Telecoms & Broadband',
                'Cyber Security',
                'Printers',
                'Merchant Services',
                'Insolvency'
            ]
            const newLabels = []
            const NewMonthTotal = monthTotals.filter(function(e, index){
                if(e > 0){
                    //get index and value from existing labels and add to new 
                    let newLabel = labelsData[index];
                    newLabels.push(newLabel);
                    return e
                }
            });
            this.setState({ data1: {
                    labels: newLabels,
                    datasets: [{
                        data: NewMonthTotal,
                        backgroundColor: [
                        '#fc8181',
                        '#fcc981',
                        '#90cdf4',
                        '#d490f4',
                        '#fbd38d',
                        '#dafb8d',
                        '#9ffb8d',
                        '#fb8dea',
                        '#8dcffb',
                        '#8dfbac',
                        '#fb8dd1',
                        '#ffb8e8',
                        '#97e8bb'
                        ],
                        hoverBackgroundColor: [
                        '#fc8181',
                        '#fcc981',
                        '#90cdf4',
                        '#d490f4',
                        '#fbd38d',
                        '#dafb8d',
                        '#9ffb8d',
                        '#fb8dea',
                        '#8dcffb',
                        '#8dfbac',
                        '#fb8dd1',
                        '#ffb8e8',
                        '#97e8bb'
                        ]
                    }]
                }
            })
            //do summary 
            const gasYearTotal = gasYear.reduce((result, number) => result+number, 0);
            const elecYearTotal = elecYear.reduce((result, number) => result+number, 0);
            const waterYearTotal = waterYear.reduce((result, number) => result+number, 0);
            const oilYearTotal = oilYear.reduce((result, number) => result+number, 0);
            const energyReductionYearTotal = energyReductionYear.reduce((result, number) => result+number, 0);
            const wasteManagementYearTotal = wasteManagementYear.reduce((result, number) => result+number, 0);
            const businessRatesYearTotal = businessRatesReviewYear.reduce((result, number) => result+number, 0);
            const fuelCardsYearTotal = fuelCardsYear.reduce((result, number) => result+number, 0);
            const telecommsYearTotal = telecommsBroadbandYear.reduce((result, number) => result+number, 0);
            const cyberSecurityYearTotal = cyberSecurityYear.reduce((result, number) => result+number, 0);
            const printersYearTotal = printersYear.reduce((result, number) => result+number, 0);
            const merchantServicesYearTotal = merchantServicesYear.reduce((result, number) => result+number, 0);
            const insolvencyYearTotal = insolvencyYear.reduce((result, number) => result+number, 0);
            const yearTotals = [
                gasYearTotal, 
                elecYearTotal, 
                waterYearTotal,
                oilYearTotal, 
                energyReductionYearTotal,
                wasteManagementYearTotal,
                businessRatesYearTotal,
                fuelCardsYearTotal,
                telecommsYearTotal,
                cyberSecurityYearTotal,
                printersYearTotal,
                merchantServicesYearTotal,
                insolvencyYearTotal
            ];
            const NewYearTotal = yearTotals.filter(function(e, index){
                if(e > 0){
                    return e
                }
            });

            this.setState({ data2: {
                    labels: newLabels,
                    datasets: [{
                        data: NewYearTotal,
                        backgroundColor: [
                            '#fc8181',
                            '#fcc981',
                            '#90cdf4',
                            '#d490f4',
                            '#fbd38d',
                            '#dafb8d',
                            '#9ffb8d',
                            '#fb8dea',
                            '#8dcffb',
                            '#8dfbac',
                            '#fb8dd1',
                            '#ffb8e8',
                            '#97e8bb'
                            ],
                            hoverBackgroundColor: [
                            '#fc8181',
                            '#fcc981',
                            '#90cdf4',
                            '#d490f4',
                            '#fbd38d',
                            '#dafb8d',
                            '#9ffb8d',
                            '#fb8dea',
                            '#8dcffb',
                            '#8dfbac',
                            '#fb8dd1',
                            '#ffb8e8',
                            '#97e8bb'
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
                    hide: 'md',
                },
                {
                    name: 'Cost per year (??)',
                    selector: 'cost_year',
                    sortable: true,
                    center: true,
                    hide: 'sm',
                },
                {
                    name: 'Cost per Month (??)',
                    selector: 'cost_month',
                    sortable: true,
                    center: true,
                    hide: 'sm',
                },
            ];
            const valuesArray2 = [];
            
            userServices.data["getServices"].items.map(lead => {
                if(lead.status === "CURRENT" || lead.status === "LIVE" || lead.status === "Live" || lead.status === "Live Contract"){
                    var date = new Date(lead.contract_end);
                    var dateString = date.toLocaleString();
                    const newValue2 = {
                        service_name: lead.service_name,
                        contract_length: lead.contract_length,
                        contract_end: dateString.substring(0, 10),
                        cost_year: lead.cost_year,
                        cost_month: lead.cost_month,
                    }
                    valuesArray2.push(newValue2);
                }
            })
            this.setState({ columns: columnsArray2})
            this.setState({ rows: valuesArray2})
        } catch(e){
            console.log(e)
        }
    }

    scroll = () =>{
        window.scrollTo(0,1000)
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
          
        return (
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className=" no-underline text-blue-600 text-3xl font-bold ">
                                            Expenses
                                    </h1>
                                </header>
                            </article>
                        </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-purple-300 bg-opacity-75" onClick={this.scroll}>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <div className="flex items-center no-underline text-white">
                                    <p alt="Placeholder" className="block text-purple-500 font-semibold text-2xl"></p>
                                    <p className="ml-2 text-purple-500 font-semibold text-2xl">
                                    </p>
                                </div>
                            </div>
                            <header className="flex items-center text-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="no-underline text-center text-purple-500 font-semibold text-2xl">
                                    View Your Expenses Breakdown
                                </h1>
                            </header>
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
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <Tooltip title={this.state.toolTipText} arrow>
                            <article className="overflow-hidden rounded-lg shadow-lg bg-blue-300">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 className="no-underline text-blue-600 font-semibold  text-white text-2xl">
                                            Monthly Expenses
                                        </h1>
                                </header>
                                <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                    <div className="flex items-center no-underline  text-white" >
                                        <p alt="Placeholder" className="block text-blue-600 font-semibold text-2xl">??</p>
                                        <p className="ml-2 text-blue-600 font-semibold text-2xl">
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
                        </Tooltip>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <Tooltip title={this.state.toolTipText} arrow>
                            <article className="overflow-hidden rounded-lg shadow-lg bg-orange-300">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 className="no-underline text-orange-600 font-semibold text-2xl">
                                            Annual Expenses
                                        </h1>
                                </header>
                                <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                    <div className="flex items-center no-underline text-white">
                                        <p alt="Placeholder" className="block text-orange-600 font-semibold text-2xl">??</p>
                                        <p className="ml-2 text-orange-600 font-semibold text-2xl">
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
                        </Tooltip>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <MuiThemeProvider theme={theme}>
                            <Tooltip title={this.state.toolTipText2} arrow>
                                <article className="overflow-hidden rounded-lg shadow-lg bg-blue-200">
                                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                        <h1 className="no-underline  text-blue-600 font-semibold  text-white text-2xl">
                                            Savings To Date
                                        </h1>
                                    </header>
                                    <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                        <div className="flex items-center no-underline text-blue-700">
                                            <p alt="Placeholder" className="block text-blue-600 font-semibold text-2xl">??</p>
                                            <p className="block text-blue-600 font-semibold text-2xl">
                                                {this.state.moneySaved}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                        <p className=" flex items-center no-underline text-blue-700 ml-2 text-sm">
                                        </p>
                                    </div>
                                </article>
                            </Tooltip>
                        </MuiThemeProvider>
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
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-2/3">
                        <Pie data={this.state.data1} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-orange-300 bg-opacity-85">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-orange-600 font-semibold  text-white text-2xl">
                                        Annual Expenses
                                    </h1>
                            </header>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-2/3">
                        <Pie data={this.state.data2} />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-purple-300 bg-opacity-75">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-purple-500 font-semibold  text-white text-2xl">
                                        Expenses Breakdown
                                    </h1>
                            </header>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-2/3">
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <DataTable
                        columns={this.state.columns}
                        data={this.state.rows}
                        pagination="true"
                        customStyles={this.state.customStyle}/>
                </div>
                <Footer/>
            </div>	
        )
    }
}

export default Expenses;