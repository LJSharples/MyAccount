import React from "react";
import FileUpload from "./FileUpload";
import Upload from './Upload'

//class ValidationForm extends React.Component{
//    state = {
//       serviceError: "Please select a service"
//};


class Modal extends React.Component {
    render() {
        // Render nothing if the "show" prop is false
        if(!this.props.show) {
        return null;
        }

        return (
            <>



            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl max-h-screen">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                    <h3 className="text-3xl text-blue-600 font-semibold">
                    Add Service
                    </h3>
                    <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={this.props.onClose}
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
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2" >
                                    Service Name
                                </label>
                                <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="serviceName" name="serviceName" type="text" onChange={event => this.props.onInput('serviceName', event)}>
                                    <option value="DEFAULT">Please Select a service</option>
                                    <option value="Electric">Electricity</option>
                                    <option value="Gas">Gas</option>
                                    <option value="Oil">Oil</option>
                                    <option value="Water">Water</option>
                                    <option value="Energy Reduction">Energy Reduction</option>
                                    <option value="Waste Management">Waste Management</option>
                                    <option value="Business Rates Review">Business Rates Review</option>
                                    <option value="Fuel Cards">Fuel Cards</option>
                                    <option value="Telecomms & Broadband">Telecoms & Broadband</option>
                                    <option value="Cyber Security">Cyber Security</option>
                                    <option value="Printers">Printers</option>
                                    <option value="Merchant Services">Merchant Services</option>
                                    <option value="Insolvency">Insolvency</option>
                                </select>
                                <span style={{color: "red"}}>{this.props.errors["serviceName"]}</span>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Provider
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="currentSupplier" name="currentSupplier" required type="text" placeholder="Enter your current supplier" onChange={event => this.props.onInput('currentSupplier', event)}/>
                                <span style={{color: "red"}}>{this.props.errors["currentSupplier"]}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Contract End Date
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="contractDate" name="contractDate" onChange={event => this.props.onInput('contractDate', event)} type="date" placeholder="dd-mm-yyyy" />
                                <span style={{color: "red"}}>{this.props.errors["contractDate"]}</span>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Contract Length
                                </label>
                                <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="contractLength" name="contractLength" type="text" onChange={event => this.props.onInput('contractLength', event)}>
                                    <option selected="selected">Enter Contract Length</option>
                                    <option>12 Months</option>
                                    <option>18 Months</option>
                                    <option>24 Months</option>
                                    <option>36 Months</option>
                                    <option>48 Months</option>
                                    <option>60 Months</option>
                                </select>
                                <span style={{color: "red"}}>{this.props.errors["contractLength"]}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 rounded-t">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    File Upload
                                </label>
                                <FileUpload fileUploadKey={this.props.fileUploadKey}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 border-b border-solid border-gray-300 rounded-t">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Callback
                                </label>
                                <p className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                Add date time you would like a call from one of our partners
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Callback Time
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="requestCall" name="requestCall" type="time" placeholder="--:--" onChange={event => this.props.onInput('callback_time', event)}/>
                                <span style={{color: "red"}}>{this.props.errors["callback_time"]}</span>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Callback Date
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="requestCall" name="requestCall" type="date" placeholder="dd-mm-yyyy" onChange={event => this.props.onInput('callback_date', event)}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 border-b border-solid border-gray-300 rounded-t">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Costs
                                </label>
                                <p className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                Add your yearly costs below and will estimate the monthly costs
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Cost Per Year (£)
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="cost_year" name="cost_year" type="number" placeholder="£0.00" min="0.01" step="0.01" max="250000" onChange={event => this.props.onInput('cost_year', event)}/>
                                <span style={{color: "red"}}>{this.props.errors["cost_year"]}</span>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                    Cost Per Month (£)
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="cost_month" name="cost_month" type="number" placeholder="£0.00" min="0.01" step="0.01" max="2500" onChange={event => this.props.onInput('cost_month', event)}/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 border-b border-solid border-gray-300 rounded-t">
                                <label className="block uppercase tracking-wide text-gray-700 text-blue-600 text-xs font-bold mb-2">
                                Yes, I’d like to share my service details with the suppliers and affiliate who introduced me.
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-3">
                            <div className="w-full px-3">
                                <input id="permission" name="permission" type="checkbox" onChange={event => this.props.onActivate('permission', event)}/>
                            </div>
                        </div>
                    </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                    <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={this.props.onClose}
                    >
                    Close
                    </button>
                    <button
                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 hover:border-transparent hover:text-blue-500 hover:bg-white hover:border-blue-500"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={this.props.submitLead}
                    >
                        Add Service
                    </button>
                </div>
                </div>
            </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        );
    }
}

export default Modal;