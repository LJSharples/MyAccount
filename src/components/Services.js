import React, { Component } from "react";
import { getLeads, getServices, getUserDetails } from "../graphql/queries";
import { addLead, addService, updateCompany } from "../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTable } from 'mdbreact';
import ServiceModal from "./ServiceModal";
import LeadModal from "./LeadModal";

class Services extends Component {
    state = {
        data: {},
        data2: {},
        userProfile: {},
        userCompany: {},
        isOpen: false ,
        serviceName: '',
        provider: '',
        contractDate: '',
        contractLength: '',
        billUpload: '',
        requestCall: '',
        serviceCosts: '',
        currentSupplier: ''
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
              width: 200,
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
              width: 200,
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

    onChangeText(key, value) {
        this.setState({
            [key]: value
        })
        console.log(value);
        console.log(this.state);
    }

    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    async submitLead(){
        const data = {
            user_name: this.state.userProfile.user_name,
            full_name: this.state.userProfile.full_name,
            first_name: this.state.userProfile.first_name,
            last_name: this.state.userProfile.last_name,
            phone: this.state.userProfile.phone
        }
        try {
            await API.graphql(graphqlOperation(addLead, data));
            console.log("Success");
        } catch (err) {
            console.log(err);
        }
    }

    async submitService(){
        const data = {
            user_name: this.state.userProfile.user_name,
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

    async test(){
        const data = {
            user_name: 'luke.sharples@powersolutionsuk.com',
            address1:  'One City Place',
            address2:  "Queen's Road",
            city:  'Chester',
            postcode:  'CH1 2TX'
        }
        try {
            const newService = await API.graphql(graphqlOperation(updateCompany, data));
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
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <h1 className="no-underline hover:underline text-black" href="#">
                                            Leads 
                                        </h1>
                                    </h1>
                                </header>
                            </article>
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <button
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                            onClick={this.submitLead}
                                        >
                                            Add Lead
                                        </button>
                                        <LeadModal show={this.state.isOpen} onClose={this.toggleModal} onChangeText={this.onChangeText} submitLead={this.submitLead}>
                                            `Here's some content for the modal`
                                        </LeadModal>

                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.data}
                        />
                    </div>	
                </div>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                        <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <h1 className="no-underline hover:underline text-black" href="#">
                                            Services 
                                        </h1>
                                    </h1>
                                </header>
                            </article>
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="text-lg">
                                        <button
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            style={{ transition: "all .15s ease" }}
                                            onClick={this.submitService}
                                        >
                                            Add Service
                                        </button>
                                        <ServiceModal show={this.state.isOpen} onClose={this.toggleModal} onChangeText={this.onChangeText} submitLead={this.submitService}>
                                            `Here's some content for the modal`
                                        </ServiceModal>

                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.data2}
                        />
                    </div>	
                </div>	
            </>
        )
    }
}

export default Services;