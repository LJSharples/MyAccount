import React, { Component } from "react";
import { getServices, getUserDetails } from "../graphql/queries";
import { addService, removeService } from "../graphql/mutations";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import { MDBBtn } from 'mdbreact';
import ServiceModal from "./ServiceModal";
import DeleteModal from "./DeleteModal";
import DataTable from "react-data-table-component";
import Footer from "./Footer";
import GetQuote from "./GetQuote";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
        isOpen4: false ,
        statusList: false,
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
        errors: {},
        permission: false,
        success: false,
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
                    let str = lead.uploaded_documents.slice(1,-1).replace(/\s/g,'');
                    bills = str.split(',')
                }
                var date = new Date(lead.contract_end);
                var dateString = date.toLocaleString();
                if(dateString < t){
                    const newValue = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: lead.cost_year,
                        attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),
                        handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal3()}>Get Quote</MDBBtn>
        
                    }
                    endedArray.push(newValue)
                } else if(lead.status === "CURRENT" || lead.status === "LIVE"){
                    var money = '';
                    if(lead.status === "LIVE"){
                        money = lead.new_cost_year
                    } else {
                        money = lead.cost_year
                    }
                    const newValue2 = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: money,
                        attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),
                        handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>
        
                    }
                    activeArray.push(newValue2)
                }else if(lead.status !== "CURRENT" || lead.status !== "LIVE"){
                    const newValue = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: lead.cost_year,
                        status: lead.status,
                        attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),        
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
        console.log(key)
        this.setState(prevState => ({
            uploaded_documents: [...prevState.uploaded_documents, key]
        }))

    }

    toggleModal = () => {
        this.setState({
          isOpen2: !this.state.isOpen2,
          uploaded_documents: []
        });
    }

    toggleModal2 = (key) => {
        this.setState({
          isOpen3: !this.state.isOpen3,
          selectedKey: key
        });
    }
    toggleModal3 = () => {
        console.log("HERE")
        this.setState({
          isOpen4: !this.state.isOpen4,
        });
    }
    setOpen = () => {
         this.setState({ success: false});
    }

    checkValidation = () => {
        let errors = {}
        var text = "yes";
        if(this.state.serviceName === ''){
            errors["serviceName"] = "Cannot be Empty"
        }
        if(this.state.currentSupplier === ''){
            errors["currentSupplier"] = "Cannot be Empty"
        }
        if(this.state.contractDate === ''){
            errors["contractDate"] = "Cannot be Empty"
        }
        if(this.state.contractLength === ''){
            errors["contractLength"] = "Cannot be Empty"
        }
        if(this.state.callback_time === ''){
            errors["callback_time"] = "Cannot be Empty"
        }
        if(this.state.cost_year === ''){
            errors["cost_year"] = "Cannot be Empty"
        }
        if(this.state.cost_month === ''){
            errors["cost_month"] = "Cannot be Empty"
        }
        console.log(errors);
        this.onChangeText('errors', errors);
        if(Object.keys(errors).length == 0){
            console.log("Passed")
            text = "Passed";
            return text;
        } else {
            return text;
        }
    }

    submitService = async () => {
        let result = this.checkValidation();
        console.log(result)
        if(result === "Passed"){
            console.log("HERE");
        
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
                this.setState({ 
                    success: true,
                    uploaded_documents: []
                })
                window.scrollTo(0, 0)
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
                        let str = lead.uploaded_documents.slice(1,-1).replace(/\s/g,'');
                        bills = str.split(',')
                    }
                    var date = new Date(lead.contract_end);
                    var dateString = date.toLocaleString();
                    if(dateString < t){
                        const newValue = {
                            service_name: lead.service_name,
                            provider: lead.current_supplier,
                            contract_end: dateString.substring(0, 10),
                            cost_year: lead.cost_year,
                            attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),
                            handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal3()}>Get Quote</MDBBtn>
            
                        }
                        endedArray.push(newValue)
                    } else if(lead.status === "CURRENT" || lead.status === "LIVE"){

                        var money = '';
                        if(lead.status === "LIVE"){
                            money = lead.new_cost_year
                        } else {
                            money = lead.cost_year
                        }
                        const newValue2 = {
                            service_name: lead.service_name,
                            provider: lead.current_supplier,
                            contract_end: dateString.substring(0, 10),
                            cost_year: money,
                            attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),
                            handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>
            
                        }
                        activeArray.push(newValue2)
                    }else if(lead.status !== "CURRENT" || lead.status !== "LIVE"){
                        const newValue = {
                            service_name: lead.service_name,
                            provider: lead.current_supplier,
                            contract_end: dateString.substring(0, 10),
                            cost_year: lead.cost_year,
                            status: lead.status,
                            attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),
                            handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>
            
                        }
                        currentArray.push(newValue)
                    }
                }
            })
            this.onChangeText('rowsCurrent', currentArray);
            this.onChangeText('rowsActive', activeArray);
            this.onChangeText('rowsEnded', endedArray);
            this.setState({
                permission: false,
                serviceName: '',
                callback_time: '',
                contractDate: '',
                contractLength: '',
                currentSupplier: '',
                cost_year: '',
                cost_month: '',
            })

            setTimeout(function() { //Start the timer
                this.setState({success: false}) //After 1 second, set render to true
            }.bind(this), 3000)
        } else {
            return;
        }
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
                if(dateString < t){
                    const newValue = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: lead.cost_year,
                        attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),
                        handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal3()}>Get Quote</MDBBtn>
        
                    }
                    endedArray.push(newValue)
                } else if(lead.status === "CURRENT" || lead.status === "LIVE"){
                    var money = '';
                    if(lead.status === "LIVE"){
                        money = lead.new_cost_year
                    } else {
                        money = lead.cost_year
                    }
                    const newValue2 = {
                        service_name: lead.service_name,
                        provider: lead.current_supplier,
                        contract_end: dateString.substring(0, 10),
                        cost_year: money,
                        attachments: bills.map(e => <div><MDBBtn color="purple" outline size="sm" key={e} onClick={() => this.downloadFile(e)}>{e}</MDBBtn><br/></div>),
                        handle: <MDBBtn color="purple" outline size="sm" onClick={() => this.toggleModal2(lead.PK)}>Delete</MDBBtn>
        
                    }
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
                           Expired Contracts
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
                                <div className="flex flex-wrap -mx-1 lg:-mx-2">
                                    <div className="my-1 px-1 w-full lg:my-4 lg:px-4">
            
                                        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                            <h1 className="no-underline text-blue-600 text-2xl font-bold ">
                                                Statuses 
                                            </h1>
                                        </header>
                                        <article className="overflow-hidden rounded-lg">
                                            <>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel1a-content"
                                                        id="panel1a-header"
                                                    >
                                                        <Typography className="text-blue-600">Lead</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        This is a Service you’ve added and requested a quote.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography className="text-blue-600">Contacting Customer</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        You’re about to be contacted or you’re in discussions about your service already.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography className="text-blue-600">Back to Referrer</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        When the supplier has referred the account back to your referring contact.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography className="text-blue-600">Tendering</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        Your quote is being prepared.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography className="text-blue-600">Offered</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        You’ve been offered a quote and we’re awaiting your decision.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography className="text-blue-600">Unsuccessful</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        You decided the offer wasn’t for you.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography className="text-blue-600">Signed Contract</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        You decided the offer was for you and it’s waiting to go Live.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                                <Accordion>
                                                    <AccordionSummary
                                                        expandIcon={<ExpandMoreIcon />}
                                                        aria-controls="panel2a-content"
                                                        id="panel2a-header"
                                                    >
                                                        <Typography className="text-blue-600">Live</Typography>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography>
                                                        Your new contract is now Live.
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </>
                                        </article>
                                    </div>
                                </div>
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
                            <Collapse in={this.state.success} timeout="auto" unmountOnExit>
                                <Alert severity="success" action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {
                                            this.setOpen();
                                        }}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                            </span>
                                        </IconButton>
                                    }
                                >
                                    <AlertTitle>Success</AlertTitle>
                                    Congratualtions — <strong>Your Service has been added!</strong>
                                </Alert>
                            </Collapse>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    Manage all of your services in one place.
                                    </h2>
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    Add existing services, track services in progress and view your expired contracts.
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
                                    <ServiceModal show={this.state.isOpen2} onClose={this.toggleModal} onInput={this.onInput} submitLead={this.submitService} fileUploadKey={this.fileUploadKey} onActivate={this.onActivate} errors={this.state.errors}>
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
                            <DeleteModal show={this.state.isOpen3} onClose={this.toggleModal2} deleteService={this.deleteService}/>
                            <GetQuote show={this.state.isOpen4} onClose={this.toggleModal3} onInput={this.onInput} submitLead={this.submitService} fileUploadKey={this.fileUploadKey} onActivate={this.onActivate}/>
                    </div>
                    <Footer/>
                </div>	
            </>
        )
    }
}

export default Services;