import React, { Component } from "react";

class Settings extends Component {
    render(){
        return (
            <div class="flex mb-8 h-screen">
                <div class="w-full rounded m-8 bg-gray-400">
                    <div className="max-w-md mx-auto flex p-6 bg-gray-100 mt-10 rounded-lg shadow-xl">
                        <div className="ml-6 pt-1">
                            <h1 className="text-2xl text-blue-700 leading-tight">
                                Settings
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Settings;