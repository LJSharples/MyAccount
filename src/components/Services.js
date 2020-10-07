import React, { Component } from "react";
import { getServices, getUserDetails } from "../graphql/queries";
import { addService, removeService } from "../graphql/mutations";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { MDBBtn } from 'mdbreact';
import ServiceModal from "./ServiceModal";
import DeleteModal from "./DeleteModal";
import DataTable from "react-data-table-component";
import Footer from "./Footer";

class Services extends Component {
    state = {
        data: {},
        column: [],
        column2: [],
        rowsCurrent: [],
        rowsActive: [],
        rowsEnded: [],
        userProfile: {},
        userCompany: {},
        affiliateId: '',
        isOpen2: false ,
        isOpen3: false ,
        serviceName: '',
        provider: '',
        contractDate: '',
        contractLength: '',
        callback_time: '',
        cost_year: '',
        cost_month: '',
        currentSupplier: '',
        user_name: '',
        selectedKey: '',
        uploaded_documents: [],
        permission: false,
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
        const currentUserInfo = await Auth.currentUserInfo();
        const userProfile = await API.graphql(graphqlOperation(getUserDetails, { user_name: user.username}));
        this.setState({ affiliateId: currentUserInfo.attributes['custom:affiliate_id'] });
        this.setState({ userProfile: userProfile.data["user"]});
        this.setState({ userCompany: userProfile.data["getCompany"]});

        //user services
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: user.username}));
        const columnsArray = [
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
                hide: 'sm',
            },
            {
                name: 'Cost per year (£)',
                selector: 'cost_year',
                sortable: true,
                center: true,
                hide: 'sm',
            },
            {
                name: 'Attachments',
                selector: 'attachments',
                sortable: true,
                responsive: true,
                center: true,
                grow: 3,
                hide: 'md',
            },
            {
                name: 'Actions',
                selector: 'handle',
                sortable: true,
                center: true,
                hide: 'md',
            },
        ];
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
                hide: 'sm',
            },
            {
                name: 'Cost per year (£)',
                selector: 'cost_year',
                sortable: true,
                center: true,
                hide: 'sm',
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
                center: true,
                hide: 'sm',
            },
            {
                name: 'Attachments',
                selector: 'attachments',
                sortable: true,
                responsive: true,
                center: true,
                grow: 3,
                hide: 'md',
            },
        ];
        const currentArray = [];
        const activeArray = [];
        const endedArray = [];
        var dateCurrent = new Date();
        var t = dateCurrent.toLocaleString();

        userServices.data["getServices"].items.map(lead => {
            if(lead.status === "CUSTOMER DELETED"){

            } else {
                let bills = []
                if(lead.uploaded_documents && lead.uploaded_documents.length > 0){
                    let str = lead.uploaded_documents.slice(1,-1)
                    bills = str.split(',')
                }
                var date = new Date(lead.contract_end);
                var dateString = date.toLocaleString();
                const newValue2 = {
                    service_name: lead.service_name,
                    provider: lead.current_supplier,
                    contract_end: dateString.substring(0, 10),
                    cost_year: lead.cost_year,
                    attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
                    handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>
    
                }
                if(dateString < t){
                    endedArray.push(newValue2)
                } else if(lead.status === "CURRENT" || lead.status === "LIVE"){
                    activeArray.push(newValue2)
                }else if(lead.status !== "CURRENT" || lead.status !== "LIVE"){
                    const newValue = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: lead.cost_year,
                        status: lead.status,
                        attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),        
                    }
                    currentArray.push(newValue)
                }
            }
        })
        this.onChangeText('rowsCurrent', currentArray);
        this.onChangeText('rowsActive', activeArray);
        this.onChangeText('rowsEnded', endedArray);
        this.onChangeText('column', columnsArray);
        this.onChangeText('column2', columnsArray2);
    }

    onChangeText = (key, value) => {
        this.setState({ [key]: value})
    };

    onInput = (key, event) => {
        console.log(key);
        console.log(this.state);
        this.setState({ [key]: event.target.value})
    };

    onActivate = () => {
        console.log(this.state.permission)
        this.setState(prevState => ({
            permission: !prevState.permission
        }));
        console.log(this.state.permission)
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

    toggleModal2 = (key) => {
        this.setState({
          isOpen3: !this.state.isOpen3,
          selectedKey: key
        });
    }

    submitService = async () => {
        const data = {
            user_name: this.state.userProfile.user_name,
            status: "CURRENT",
            service_name: this.state.serviceName,
            callback_time: this.state.callback_time,
            contract_end: this.state.contractDate,
            contract_length: this.state.contractLength,
            current_supplier: this.state.currentSupplier,
            cost_year: this.state.cost_year,
            cost_month: this.state.cost_month,
            uploaded_documents: this.state.uploaded_documents,
            permission: this.state.permission,
            affiliate_id: this.state.affiliateId
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
        const currentArray = [];
        const activeArray = [];
        const endedArray = [];
        var dateCurrent = new Date();
        var t = dateCurrent.toLocaleString();
        userServices.data["getServices"].items.map(lead => {
            if(lead.status === "CUSTOMER DELETED"){

            } else {
                let bills = []
                if(lead.uploaded_documents && lead.uploaded_documents.length > 0){
                    let str = lead.uploaded_documents.slice(1,-1)
                    bills = str.split(',')
                }
                var date = new Date(lead.contract_end);
                var dateString = date.toLocaleString();
                const newValue2 = {
                    service_name: lead.service_name,
                    provider: lead.current_supplier,
                    contract_end: dateString.substring(0, 10),
                    cost_year: lead.cost_year,
                    attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
                    handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>

                }
                if(dateString < t){
                    endedArray.push(newValue2)
                } else if(lead.status === "CURRENT" || lead.status === "LIVE"){
                    activeArray.push(newValue2)
                }else if(lead.status !== "CURRENT" || lead.status !== "LIVE"){
                    const newValue = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: lead.cost_year,
                        status: lead.status,
                        attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
                        handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>
        
                    }
                    currentArray.push(newValue)
                }
            }
        })
        this.onChangeText('rowsCurrent', currentArray);
        this.onChangeText('rowsActive', activeArray);
        this.onChangeText('rowsEnded', endedArray);
    }

    deleteService = async () => {
        const id = this.state.selectedKey
        const data = {
            user_name: this.state.userProfile.user_name,
            id: id.substr(8),
            status: 'CUSTOMER DELETED'
        }
        console.log(data)
        try {
            await API.graphql(graphqlOperation(removeService, data));
            this.setState({ isOpen3: !this.state.isOpen3 })
        } catch (err) {
            console.log("Error:")
            console.log(err);
        }
        const userServices = await API.graphql(graphqlOperation(getServices, { user_name: this.state.userProfile.user_name}));
        console.log(userServices.data["getServices"].items);
        const currentArray = [];
        const activeArray = [];
        const endedArray = [];
        var dateCurrent = new Date();
        var t = dateCurrent.toLocaleString();
        userServices.data["getServices"].items.map(lead => {
            if(lead.status === "CUSTOMER DELETED"){

            } else {
                let bills = []
                if(lead.uploaded_documents && lead.uploaded_documents.length > 0){
                    let str = lead.uploaded_documents.slice(1,-1)
                    bills = str.split(',')
                }
                var date = new Date(lead.contract_end);
                var dateString = date.toLocaleString();
                const newValue2 = {
                    service_name: lead.service_name,
                    provider: lead.current_supplier,
                    contract_end: dateString.substring(0, 10),
                    cost_year: lead.cost_year,
                    attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),
                    handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>

                }
                if(dateString < t){
                    endedArray.push(newValue2)
                } else if(lead.status === "CURRENT" || lead.status === "LIVE"){
                    activeArray.push(newValue2)
                }else if(lead.status !== "CURRENT" || lead.status !== "LIVE"){
                    const newValue = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: lead.cost_year,
                        status: lead.status,
                        attachments: bills.map(e => <MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn>),        
                    }
                    currentArray.push(newValue)
                }
            }
        })
        this.onChangeText('rowsCurrent', currentArray);
        this.onChangeText('rowsActive', activeArray);
        this.onChangeText('rowsEnded', endedArray);
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

        const Tabs = ({ color,  }) => {
            const [openTab, setOpenTab] = React.useState(1);
            return (
              <>
                <div className="flex flex-wrap">
                  <div className="w-full">
                    <ul
                      className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                      role="tablist"
                    >
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 1
                              ? "text-white bg-" + color + "-600"
                              : "text-" + color + "-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(1);
                          }}
                          data-toggle="tab"
                          href="#link1"
                          role="tablist"
                        >
                          Live Contracts
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 2
                              ? "text-white bg-" + color + "-600"
                              : "text-" + color + "-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(2);
                          }}
                          data-toggle="tab"
                          href="#link2"
                          role="tablist"
                        >
                           In Progress
                        </a>
                      </li>
                      <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                        <a
                          className={
                            "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                            (openTab === 3
                              ? "text-white bg-" + color + "-600"
                              : "text-" + color + "-600 bg-white")
                          }
                          onClick={e => {
                            e.preventDefault();
                            setOpenTab(3);
                          }}
                          data-toggle="tab"
                          href="#link3"
                          role="tablist"
                        >
                           Ended Contracts
                        </a>
                      </li>
                    </ul>
                    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                      <div className="px-4 py-5 flex-auto">
                        <div className="tab-content tab-space">
                          <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                            <DataTable
                                columns={this.state.column}
                                data={this.state.rowsActive}
                                pagination="true"
                                responsive
                                customStyles={this.state.customStyle}/>
                          </div>
                          <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                            <DataTable
                                columns={this.state.column2}
                                data={this.state.rowsCurrent}
                                pagination="true"
                                responsive
                                customStyles={this.state.customStyle}/>
                          </div>
                          <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                            <DataTable
                                columns={this.state.column}
                                data={this.state.rowsEnded}
                                pagination="true"
                                responsive
                                customStyles={this.state.customStyle}/>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
        };          
                
        return (
            <>
                <div className="container my-12 mx-auto px-4 md:px-12">
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
                        <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
                            <article className="overflow-hidden rounded-lg">
                                <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                        Services 
                                    </h1>
                                </header>
                                <footer className="flex items-center p-2 md:p-4">
                                </footer>
                            </article>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    Manage all of your service in one place.
                                    </h2>
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    Add existing services, track services in progress and view your ended deals.
                                    </h2>
                                </div>
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold text-lg px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={this.toggleModal}
                                    >
                                        Add Service
                                    </button>
                                    <ServiceModal show={this.state.isOpen2} onClose={this.toggleModal} onInput={this.onInput} submitLead={this.submitService} fileUploadKey={this.fileUploadKey} onActivate={this.onActivate}>
                                    </ServiceModal>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
                        <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
                            <article className="overflow-hidden rounded-lg">
                                <>
                                    <Tabs color="blue" />
                                </>
                            </article>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
                        <div className="text-gray-700 text-center px-4 py-2 m-2 rounded-lg">
                        </div>
                        <div className="flex-1 items-center justify-between leading-tight text-center px-20 py-10 m-10 rounded-lg">
                            <DeleteModal show={this.state.isOpen3} onClose={this.toggleModal2} deleteService={this.deleteService}/>
                        </div>
                        <div className="text-gray-700 text-center px-4 py-2 m-2 rounded-lg ">
                        </div>
                    </div>
                    <Footer/>
                </div>	
            </>
        )
    }
}

export default Services;