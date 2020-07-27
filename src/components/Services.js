import React, { Component } from "react";
import DataTable from "./DataTable";

class Services extends Component {

    render(){
        return (
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
                    <DataTable/>
                </div>	
            </div>	
        )
    }
}

export default Services;