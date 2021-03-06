import React, { Component } from "react";
import { getUserDetails } from "../graphql/queries";
import { addService, removeService } from "../graphql/mutations";
import { Auth, API, graphqlOperation, Storage } from "aws-amplify";
import GetQuote from "./GetQuote";
import DeleteModal from "./DeleteModal";
import Footer from "./Footer";
import { Alert, AlertTitle } from '@material-ui/lab';
import { Collapse, IconButton } from '@material-ui/core';

class Quote extends Component {
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
        s_contractDate: '',
        contractDate: '',
        contractLength: '',
        s_callback_date: '',
        callback_date: '',
        callback_time: '',
        cost_year: '',
        cost_month: '',
        currentSupplier: '',
        user_name: '',
        email: '',
        selectedKey: '',
        uploaded_documents: [],
        permission: true,
        success: false,
        errors: {},
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
        this.setState({ email: user.email });
        this.setState({ affiliateId: currentUserInfo.attributes['custom:affiliate_id'] });
        this.setState({ userProfile: userProfile.data["user"]});
        this.setState({ userCompany: userProfile.data["getCompany"]});
    }

    onChangeText = (key, value) => {
        console.log(key)
        console.log(value)
        if(key === "contractDate"){
            this.setState({ s_contractDate: value})
            let month = value.getMonth() + 1
            let date = value.getFullYear() + "-" + month + "-" + value.getDate();
            this.setState({ contractDate : date})
        } else if(key === "callback_date"){
            let time = value.toLocaleString();
            console.log(value.toLocaleDateString())
            console.log(time.substr(12, 8))
            this.setState({ s_callback_date: value})
            this.setState({ callback_date : value.toLocaleDateString()})
            this.setState({ callback_time : time.substr(12, 8)})
        } else {
            this.setState({ [key]: value})
        }
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
        if(Object.keys(errors).length === 0){
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
            var time = this.state.callback_time;
            var date = this.state.callback_date;
            const data = {
                user_name: this.state.userProfile.user_name,
                email: this.state.email,
                status: "LEAD",
                service_name: this.state.serviceName,
                callback_time: date + 'T' + time,
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
                this.setState({ success: true})
                window.scrollTo(0, 0)
            } catch (err) {
                console.log("Error:")
                console.log(err);
            }   
            this.setState({
            isOpen2: !this.state.isOpen2
            });

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
                                    <h1 className="no-underline text-blue-600 text-3xl font-bold ">
                                        Get Quote 
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
                                            ??
                                            </span>
                                        </IconButton>
                                    }
                                >
                                    <AlertTitle>Success</AlertTitle>
                                    Thank You ??? <strong>Your request has been sent!</strong>
                                </Alert>
                            </Collapse>
                            <div className="flex flex-wrap -mx-1 lg:-mx-4">
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg">
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    Let our team of experts help you with your business services.
                                    </h2>
                                    <br></br>
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    Just click <strong>'Get Quote'</strong> to get started or
                                    </h2>
                                    <h2 className="no-underline text-black text-2xl text-lg text-blue-600">
                                    call our Team <strong>'01244 391 500'</strong>.
                                    </h2>
                                </div>
                                <div className="flex-1 text-center px-8 py-4 m-4 rounded-lg shadow-lg bg-green-200 bg-opacity-75">
                                    <h1 className="no-underline text-purple-300 text-opacity-0 font-semibold text-xs p-4">
                                        Get Quote
                                    </h1>
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold text-2xl px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={this.toggleModal}
                                    >
                                        Get Quote
                                    </button>
                                    <GetQuote show={this.state.isOpen2} onClose={this.toggleModal} date={this.state.s_contractDate} callback={this.state.s_callback_date} onChangeText={this.onChangeText} onInput={this.onInput} submitLead={this.submitService} fileUploadKey={this.fileUploadKey} onActivate={this.onActivate} errors={this.state.errors}>
                                    </GetQuote>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-1 lg:-mx-2">
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

export default Quote;