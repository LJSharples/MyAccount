import React, { Component } from "react";
import { getLeads, getServices } from "../graphql/queries";
import { addLead } from "../graphql/mutations";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTable } from 'mdbreact';
import ServiceModal from "./ServiceModal"

class Services extends Component {
    state = {
        data: {},
        data2: {},
        isOpen: false ,
        serviceName: '',
        provider: '',
        contractDate: '',
        billUpload: '',
        requestCall: '',
        serviceCosts: '',
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();

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
                created_at: lead.created_at,
                updated_at: lead.updated_at,
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
                Data: lead.Data,
                created_at: lead.created_at,
                status: lead.status,
                updated_at: lead.updated_at,
                user_name: lead.user_name,
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
            full_name: this.state.full_name,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone
        }
        console.log(data);
        const newLead = await API.graphql(graphqlOperation(addLead, data));
        console.log(newLead);
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
                                        <a className="no-underline hover:underline text-black" href="#">
                                            Leads 
                                        </a>
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
                                            onClick={this.toggleModal}
                                        >
                                            Add Lead
                                        </button>
                                        <ServiceModal show={this.state.isOpen} onClose={this.toggleModal} handleChange={this.onChangeText} submitLead={this.submitLead}>
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
                                        <a className="no-underline hover:underline text-black" href="#">
                                            Services 
                                        </a>
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