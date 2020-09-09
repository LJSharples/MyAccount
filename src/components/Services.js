import React, { Component } from "react";
import { getServices, getUserDetails } from "../graphql/queries";
import { addService, removeService } from "../graphql/mutations";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { MDBDataTableV5, MDBBtn } from 'mdbreact';
import ServiceModal from "./ServiceModal";

class Services extends Component {
    state = {
        data: {},
        data2: {},
        column2: [],
        rows2: [],
        userProfile: {},
        userCompany: {},
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
        uploaded_documents: []
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ userProfile: userProfile.data["user"]});
        this.setState({ userCompany: userProfile.data["getCompany"]});

        //user services
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));
        console.log(userServices)
        const columnsArray2 = [
            {
                label: "Service Name",
                field: 'service_name',
                attributes: {
                  'aria-controls': 'DataTable',
                  'aria-label': 'service_name',
                },
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
            let bills = []
            if(lead.uploaded_documents && lead.uploaded_documents.length > 0){
                let str = lead.uploaded_documents.slice(1,-1)
                bills = str.split(',')
            }
            const newValue2 = {
                service_name: lead.service_name,
                provider: lead.current_supplier,
                contract_end: lead.contract_end,
                cost_year: lead.cost_year,
                attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
                handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.deleteService(lead.PK)}>Delete</MDBBtn>

            }
            valuesArray2.push(newValue2);
        })

        const data2 = {
            columns: columnsArray2,
            rows: valuesArray2
        };
        this.onChangeText('rows2', valuesArray2);
        this.onChangeText('column2', columnsArray2);
        console.log(data2)
        this.onChangeText('data2', data2);
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value})
    };

    onInput = (key, event) => {
        this.setState({ [key]: event.target.value})
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
            status: "FROMMVP",
            service_name: this.state.serviceName,
            callback_time: this.state.callback_time,
            contract_end: this.state.contractDate,
            contract_length: this.state.contractLength,
            current_supplier: this.state.currentSupplier,
            cost_year: this.state.cost_year,
            cost_month: this.state.cost_month,
            uploaded_documents: this.state.uploaded_documents
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
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: this.state.userProfile.user_name}));

        const valuesArray2 = [];
        
        userServices.data["getServices"].items.map(lead => {
            let bills = []
            if(lead.uploaded_documents && lead.uploaded_documents.length > 0){
                let str = lead.uploaded_documents.slice(1,-1)
                bills = str.split(',')
            }
            const newValue2 = {
                service_name: lead.service_name,
                provider: lead.current_supplier,
                contract_end: lead.contract_end,
                cost_year: lead.cost_year,
                attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
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
            let bills = []
            if(lead.uploaded_documents && lead.uploaded_documents.length > 0){
                let str = lead.uploaded_documents.slice(1,-1)
                bills = str.split(',')
            }
            const newValue2 = {
                service_name: lead.service_name,
                provider: lead.current_supplier,
                contract_end: lead.contract_end,
                cost_year: lead.cost_year,
                attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
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
                                        <ServiceModal show={this.state.isOpen2} onClose={this.toggleModal} onInput={this.onInput} submitLead={this.submitService} fileUploadKey={this.fileUploadKey}>
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
                                    <MDBDataTableV5 
                                        hover 
                                        autoWidth
                                        entriesOptions={[5, 20, 25]} 
                                        entries={5} 
                                        pagesAmount={4} 
                                        theadColor="blue"
                                        data={this.state.data2}/>;
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-8">
                        <div className="text-gray-700 text-center px-4 py-2 m-2 rounded-lg">
                        </div>
                        <div className="flex-1 items-center justify-between leading-tight text-center px-20 py-10 m-10 rounded-lg">
                            <table className="table-auto">
                                <thead className="bg-blue-400">
                                    <tr>
                                        {this.state.column2.map(header => {
                                            return <th className="px-4 py-2" key={header.label}>{header.label}</th>
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                        {this.state.rows2.map(row => {
                                            return( 
                                            <tr>
                                                <td className="border px-4 py-2">{row.service_name}</td>
                                                <td className="border px-4 py-2">{row.provider}</td>
                                                <td className="border px-4 py-2">{row.contract_end}</td>
                                                <td className="border px-4 py-2">{row.cost_year}</td>
                                                <td className="border px-4 py-2">{row.attachments}</td>
                                                <td class="border px-4 py-2">{row.handle}</td>
                                            </tr>)
                                        })}
                                </tbody>
                            </table>
                        </div>
                        <div className="text-gray-700 text-center px-4 py-2 m-2 rounded-lg ">
                        </div>
                    </div>
                </div>	
            </>
        )
    }
}

export default Services;