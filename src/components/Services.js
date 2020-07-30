import React, { Component } from "react";
import { getLeads, getServices } from "../graphql/queries";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { MDBDataTable } from 'mdbreact';

class Services extends Component {
    state = {
        data: {},
        data2: {}
    }

    async componentDidMount(){
        let user = await Auth.currentAuthenticatedUser();

        //user leads
        const userLeads = await API.graphql(graphqlOperation(getLeads, { user_name: user.username}));
        this.setState({ userLeads: userLeads.data['getLeads']});
        
        const columnsArray = [];
        const valuesArray = [];
        
        for (const [key, value] of Object.entries(this.state.userLeads[0])) {
            let newColumn = {
              label: key,
              field: key,
              width: 200,
            }
            columnsArray.push(newColumn);
        }
        this.state.userLeads.map(lead => {
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
        const data = {
            columns: columnsArray,
            rows: valuesArray
        };
        this.setState({ data: data});

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
        this.setState({ data2: {
            columns: columnsArray2,
            rows: valuesArray2
        }});
    }

    render(){
        return (
            <>
                <div class="container my-12 mx-auto px-4 md:px-12">
                    <div class="flex flex-wrap -mx-1 lg:-mx-4">
                        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article class="overflow-hidden rounded-lg">
                                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 class="text-lg">
                                        <a class="no-underline hover:underline text-black" href="#">
                                            Leads 
                                        </a>
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-1 lg:-mx-4">
                    <MDBDataTable
                        striped
                        bordered
                        hover
                        data={this.state.data}
                        />
                    </div>	
                </div>
                <div class="container my-12 mx-auto px-4 md:px-12">
                    <div class="flex flex-wrap -mx-1 lg:-mx-4">
                        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article class="overflow-hidden rounded-lg">
                                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 class="text-lg">
                                        <a class="no-underline hover:underline text-black" href="#">
                                            Services 
                                        </a>
                                    </h1>
                                </header>
                            </article>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-1 lg:-mx-4">
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