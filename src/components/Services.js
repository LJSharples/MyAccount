import React, { Component } from "react";
import { getServices, getUserDetails } from "../graphql/queries";
import { addService, removeService } from "../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import ServiceModal from "./ServiceModal";

class Services extends Component {
    state = {
        data: {},
        data2: {},
        column2: {},
        userProfile: {},
        userCompany: {},
        isOpen2: false ,
        serviceName: '',
        provider: '',
        contractDate: '',
        contractLength: '',
        billUpload: '',
        callback_time: '',
        callback_date: '',
        cost_year: '',
        cost_month: '',
        currentSupplier: '',
        user_name: '',
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ userProfile: userProfile.data["user"]});
        this.setState({ userCompany: userProfile.data["getCompany"]});

        //user services
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));

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
                label: "Service Provider",
                field: 'provider',
            },
            {
                label: "Contract End Date",
                field: 'contract_end',
            },
            {
                label: "Cost per year",
                field: 'cost_year',
            },
            {
                label: "Attachments",
                field: 'attachments',
            },
            {
                label: "Actions",
                field: 'handle',
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
                handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.deleteService(lead.PK)}>Delete</MDBBtn>

            }
            valuesArray2.push(newValue2);
        })

        const data2 = {
            columns: columnsArray2,
            rows: valuesArray2
        };
        this.onChangeText('column2', columnsArray2);
        this.onChangeText('data2', data2);
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value})
    };

    onInput = (key, event) => {
        this.setState({ [key]: event.target.value})
    };

    toggleModal = () => {
        this.setState({
          isOpen2: !this.state.isOpen2
        });
    }

    submitService = async () => {
        const data = {
            user_name: this.state.userProfile.user_name,
            status: "FROMMVP",
            service_name: this.state.serviceName,
            callback_time: this.state.callback_time,
            contract_end: this.state.contractDate,
            contract_length: this.state.contractLength,
            current_supplier: this.state.currentSupplier,
            cost_year: this.state.cost_year,
            cost_month: this.state.cost_month
        }
        try {
            await API.graphql(graphqlOperation(addService, data));
        } catch (err) {
            console.log("Error:")
            console.log(err);
        }   
        this.setState({
          isOpen2: !this.state.isOpen2
        });
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: this.state.userProfile.user_name}));

        const valuesArray2 = [];
        
        userServices.data["getServices"].items.map(lead => {
            const newValue2 = {
                id: lead.id,
                service_name: lead.service_name,
                provider: lead.current_supplier,
                contract_end: lead.contract_end,
                cost_year: lead.cost_year,
                attachments: lead.callback_time,
                handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.deleteService(lead.PK)}>Delete</MDBBtn>

            }
            valuesArray2.push(newValue2);
        })

        const data2 = {
            columns: this.state.column2,
            rows: valuesArray2
        };
        this.onChangeText('data2', data2);
        //window.location.reload(false);
    }

    deleteService = async (created) => {
        const data = {
            user_name: this.state.userProfile.user_name,
            id: created.substr(8)
        }
        try {
            await API.graphql(graphqlOperation(removeService, data));
        } catch (err) {
            console.log("Error:")
            console.log(err);
        }
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: this.state.userProfile.user_name}));

        const valuesArray2 = [];
        
        userServices.data["getServices"].items.map(lead => {
            const newValue2 = {
                id: lead.id,
                service_name: lead.service_name,
                provider: lead.current_supplier,
                contract_end: lead.contract_end,
                cost_year: lead.cost_year,
                attachments: lead.callback_time,
                handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.deleteService(lead.PK)}>Delete</MDBBtn>

            }
            valuesArray2.push(newValue2);
        })

        const data2 = {
            columns: this.state.column2,
            rows: valuesArray2
        };
        this.onChangeText('data2', data2);
    }
    
    render(){
        return (
            <>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-black text-2xl text-lg text-blue-600">
                                        Services 
                                    </h1>
                                </header>
                                <footer className="flex items-center p-2 md:p-4">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                        Manage all of your service in one place. Add existing services, track services in progress and view your ended deals.
                                    </h2>
                                </footer>
                            </article>
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <button
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                            onClick={this.toggleModal}
                                        >
                                            Add Service
                                        </button>
                                        <ServiceModal show={this.state.isOpen2} onClose={this.toggleModal} onInput={this.onInput} submitLead={this.submitService}>
                                        </ServiceModal>
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <MDBDataTableV5 btn autoWidth hover striped responsive entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} pagingTop searchTop searchBottom={false} data={this.state.data2}/>
                                </header>
                            </article>
                        </div>
                    </div>
                </div>	
            </>
        )
    }
}

export default Services;