import React, { Component } from "react";
import { getLeads, getServices, getUserDetails } from "../graphql/queries";
import { addLead, addService } from "../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTableV5 } from 'mdbreact';
import ServiceModal from "./ServiceModal";
import LeadModal from "./LeadModal";
import Modal from "react-modal";

class Services extends Component {
    state = {
        data: {},
        data2: {},
        userProfile: {},
        userCompany: {},
        isOpen: false ,
        isOpen2: false ,
        serviceName: '',
        provider: '',
        contractDate: '',
        contractLength: '',
        billUpload: '',
        requestCall: '',
        serviceCosts: '',
        currentSupplier: '',
        user_name: 'luke.sharples@powersolutionsuk.com',
        full_name: '',
        first_name: '',
        last_name: '',
        phone: ''
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ userProfile: userProfile.data["user"]})
        this.setState({ userCompany: userProfile.data["getCompany"]})

        //user leads
        const userLeads = await API.graphql(graphqlOperation(getLeads, { user_name: user.username}));
        
        const columnsArray = [];
        const valuesArray = [];
        
        for (const [key, value] of Object.entries(userLeads.data['getLeads'][0])) {
            let newColumn = {
              label: key,
              field: key,
              width: 450,
            }
            columnsArray.push(newColumn);
        }
        userLeads.data['getLeads'].map(lead => {
            const newValue = {
                first_name: lead.first_name,
                last_name: lead.last_name,
                phone: lead.phone,
                full_name: lead.full_name,
            }
            valuesArray.push(newValue);
        })
        const data1 = {
            columns: columnsArray,
            rows: valuesArray
        };
        this.onChangeText('data', data1);

        //user services
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));
        console.log(userServices.data["getServices"].items);

        const columnsArray2 = [];
        const valuesArray2 = [];
        
        for (const [key, value] of Object.entries(userServices.data["getServices"].items[0])) {
            let newColumn2 = {
              label: key,
              field: key,
              width: 250,
            }
            columnsArray2.push(newColumn2);
        }
        userServices.data["getServices"].items.map(lead => {
            const newValue2 = {
                status: lead.status,
                user_name: lead.user_name,
                service_name: lead.service_name
            }
            valuesArray2.push(newValue2);
        })

        this.onChangeText('data2', {
            columns: columnsArray2,
            rows: valuesArray2
        });
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value})
    };

    onInput = (key, event) => {
        console.log(key);
        console.log(event.target.value);
        this.setState({ [key]: event.target.value})
        console.log(this.state);
    };

    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    toggleModal2 = () => {
        this.setState({
          isOpen2: !this.state.isOpen2
        });
    }

    submitLead = async () => {
        const data = {
            user_name: this.state.user_name,
            full_name: this.state.full_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone
        }
        try {
            await API.graphql(graphqlOperation(addLead, data));
            console.log("Success");
            this.setState({
                isOpen: !this.state.isOpen
            });
        } catch (err) {
            console.log(err);
        }
    }

    submitService = async () => {
        const data = {
            user_name: this.state.user_name,
            status: "FROMMVP",
            service_name: this.state.serviceName,
            callback_time: this.state.requestCall,
            contract_end: this.state.contractDate,
            contract_length: this.state.contractLength,
            current_supplier: this.state.currentSupplier
        }
        try {
            const newService = await API.graphql(graphqlOperation(addService, data));
            console.log(newService);
            console.log("Success");
        } catch (err) {
            console.log("Error:")
            console.log(data);
            console.log(err);
        }
    }
    
    render(){
        return (
            <>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/2">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-black text-2xl text-lg text-blue-600">
                                        Leads 
                                    </h1>
                                </header>
                                <footer className="flex items-center p-2 md:p-4">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                        These are the leads you added to Managed Bills
                                    </h2>
                                </footer>
                            </article>
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <button
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                            onClick={this.toggleModal}
                                        >
                                            Add Lead
                                        </button>
                                        <Modal isOpen={this.state.isOpen} className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div >
                                                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                    {/*content*/}
                                                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                                        <h3 className="text-3xl font-semibold">
                                                        Add Lead
                                                        </h3>
                                                        <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={this.toggleModal}
                                                        >
                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                        </span>
                                                        </button>
                                                    </div>
                                                    {/*body*/}
                                                        <div className="relative p-6 flex-auto">
                                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                                        First Name
                                                                    </label>
                                                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="first_name" name="first_name" type="text" onChange={event => this.onInput('first_name', event)} type="text"/>
                                                                </div>
                                                                <div className="w-full md:w-1/2 px-3">
                                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                                        Last Name
                                                                    </label>
                                                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="last_name" name="last_name" type="text" onChange={event => this.onInput('last_name', event)} type="text"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                                        Phone
                                                                    </label>
                                                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="phone" name="phone" type="text" onChange={event => this.onInput('phone', event)} type="text"/>
                                                                </div>
                                                                <div className="w-full md:w-1/2 px-3">
                                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                                                        Full Name
                                                                    </label>
                                                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                                    id="full_name" name="full_name" type="text" onChange={event => this.onInput('full_name', event)} type="text"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                            type="button"
                                                            style={{ transition: "all .15s ease" }}
                                                            onClick={this.toggleModal}
                                                        >
                                                        Close
                                                        </button>
                                                        <button
                                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                                            type="button"
                                                            style={{ transition: "all .15s ease" }}
                                                            onClick={this.submitLead}
                                                        >
                                                            Add Lead
                                                        </button>
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div>
                    <MDBDataTableV5
                        hover
                        entriesOptions={[5, 20, 25]}
                        entries={5}
                        pagesAmount={4}
                        pagingTop
                        searchTop
                        searchBottom={false}
                        data={this.state.data}
                        />
                    </div>	
                </div>
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
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                            onClick={this.toggleModal2}
                                        >
                                            Add Service
                                        </button>
                                        <ServiceModal show={this.state.isOpen2} onClose={this.toggleModal2} onInput={this.onInput} submitLead={this.submitService}>
                                        </ServiceModal>
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div>
                    <MDBDataTableV5
                        hover
                        entriesOptions={[5, 20, 25]}
                        entries={5}
                        pagesAmount={4}
                        pagingTop
                        searchTop
                        searchBottom={false}
                        data={this.state.data2}
                    />
                    </div>	
                </div>	
            </>
        )
    }
}

export default Services;