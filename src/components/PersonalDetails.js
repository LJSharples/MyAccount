import React, { Component } from "react";

class PersonalDetails extends Component {
    render(){
        return (
            <div>
                <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
                    <div className="ml-6 pt-1">
                        <h1 className="text-2xl text-blue-700 leading-tight">
                            My Details
                        </h1>
                    </div>
                </div>
                <div class="px-2">
                    <div class="flex -mx-2">
                        <div class="w-1/3 px-2">
                            <div class="max-w-md mx-auto flex p-6 bg-blue-500 mt-10 rounded-lg shadow-xl items-center content-center justify-center">
                                <div className="ml-6 pt-1 text-white ">
                                    <h1 className="text-2xl text-white leading-tight">
                                        Your Services
                                    </h1>
                                    <p className="text-base text-gray-700 leading-normal my-6">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white border-4 border-white font-bold py-2 px-4 rounded">
                                            Add Services
                                        </button>
                                    </p>
                                    <p className="text-base text-gray-700 leading-normal">
                                        <button class="bg-blue-500 hover:bg-blue-700 text-white border-4 border-white font-bold py-2 px-4 rounded">
                                            View Services
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PersonalDetails;