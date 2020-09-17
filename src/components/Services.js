import React, { Component } from "react";
import { getServices, getUserDetails } from "../graphql/queries";
import { addService, removeService } from "../graphql/mutations";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { MDBBtn } from 'mdbreact';
import ServiceModal from "./ServiceModal";
import DataTable from "react-data-table-component";

class Services extends Component {
    state = {
        data: {},
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
        uploaded_documents: [],
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
                hoverColor:"#718096",
                paddingLeft: '0 8px',
              },
            },
        }
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
                name: 'Service Name',
                selector: 'service_name',
                sortable: true,
                center: true
            },
            {
                name: 'Service Provider',
                selector: 'provider',
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
                name: 'Attachments',
                selector: 'attachments',
                sortable: true,
                responsive: true,
                center: true,
                grow: 3,
            },
            {
                name: 'Actions',
                selector: 'handle',
                sortable: true,
                center: true,
            },
        ];
        const valuesArray2 = [];
        
        userServices.data["getServices"].items.map(lead => {
            let bills = []
            if(lead.uploaded_documents && lead.uploaded_documents.length > 0){
                let str = lead.uploaded_documents.slice(1,-1)
                bills = str.split(',')
            }
            var date = new Date(lead.contract_end);
            const newValue2 = {
                service_name: lead.service_name,
                provider: lead.current_supplier,
                contract_end: date.toLocaleString(),
                cost_year: lead.cost_year,
                attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
                handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.deleteService(lead.PK)}>Delete</MDBBtn>

            }
            valuesArray2.push(newValue2);
        })
        this.onChangeText('rows2', valuesArray2);
        this.onChangeText('column2', columnsArray2);
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
        this.onChangeText('rows2', valuesArray2);
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

        this.onChangeText('rows2', valuesArray2);
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
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
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
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
                        <div className="text-gray-700 text-center px-4 py-2 m-2 rounded-lg">
                        </div>
                        <div className="flex-1 items-center justify-between leading-tight text-center px-20 py-10 m-10 rounded-lg">
                            <DataTable
                                columns={this.state.column2}
                                data={this.state.rows2}
                                pagination="true"
                                responsive
                                customStyles={this.state.customStyle}/>
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