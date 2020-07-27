import React, { Component } from "react";
import DataTable from "./DataTable";

class Expenses extends Component {

    render(){
        return (
            <div class="container my-12 mx-auto px-4 md:px-12">
                <div class="flex flex-wrap -mx-1 lg:-mx-4">
                    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                            <article class="overflow-hidden rounded-lg">
                                <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                    <h1 class="text-lg">
                                        <a class="no-underline hover:underline text-black" href="#">
                                            Expenses Today
                                        </a>
                                    </h1>
                                </header>
                            </article>
                        </div>
                    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                    </div>
                    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article class="overflow-hidden rounded-lg shadow-lg bg-blue-200">
                            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 class="text-lg">
                                    <a class="no-underline hover:underline text-blue-700 text-2xl" href="#">
                                        Savings To Date
                                    </a>
                                </h1>
                            </header>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <a class="flex items-center no-underline hover:underline text-blue-700" href="#">
                                    <p alt="Placeholder" class="block rounded-full">£</p>
                                    <p class="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <a class="flex items-center no-underline hover:underline text-blue-700" href="#">
                                    <p class="ml-2 text-sm">
                                        View Details
                                    </p>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-1 lg:-mx-4">
                    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article class="overflow-hidden rounded-lg shadow-lg bg-blue-500">
                            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 class="text-lg">
                                    <a class="no-underline hover:underline text-white text-2xl" href="#">
                                        Monthly Expenses
                                    </a>
                                </h1>
                            </header>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <a class="flex items-center no-underline hover:underline text-white" href="#">
                                    <p alt="Placeholder" class="block rounded-full">£</p>
                                    <p class="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <a class="flex items-center no-underline hover:underline text-white" href="#">
                                    <p class="ml-2 text-sm">
                                        View Details
                                    </p>
                                </a>
                            </div>
                        </article>
                    </div>
                    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article class="overflow-hidden rounded-lg shadow-lg bg-pink-700 bg-opacity-85">
                            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 class="text-lg">
                                    <a class="no-underline hover:underline text-white text-2xl" href="#">
                                        Annual Expenses
                                    </a>
                                </h1>
                            </header>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <a class="flex items-center no-underline hover:underline text-white" href="#">
                                    <p alt="Placeholder" class="block rounded-full">£</p>
                                    <p class="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <a class="flex items-center no-underline hover:underline text-white" href="#">
                                    <p class="ml-2 text-sm">
                                        View Details
                                    </p>
                                </a>
                            </div>
                        </article>
                    </div>
                    <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article class="overflow-hidden rounded-lg shadow-lg bg-green-400 bg-opacity-95">
                            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 class="text-lg">
                                    <a class="no-underline hover:underline text-white text-2xl" href="#">
                                        Expenses Breakdown
                                    </a>
                                </h1>
                            </header>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                                <h1 class="text-lg">
                                    <a class="no-underline hover:underline text-white text-2xl" href="#">
                                        Expenses Breakdown
                                    </a>
                                </h1>
                            </div>
                            <div class="flex items-center justify-between leading-none p-2 md:p-4">
                            </div>
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

export default Expenses;