import React, { Component } from 'react';

class Dashboard extends Component {
    render(){
        return(
            <div className="container my-12 mx-auto px-4 md:px-12">
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-black" href="#">
                                        Welcome back, 
                                    </a>
                                </h1>
                            </header>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-blue-500">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-white text-2xl" href="#">
                                        Your Services
                                    </a>
                                </h1>
                            </header>
                            <div className="flex items-center justify-center justify-between leading-none p-2 md:p-4">
                                <button className="flex items-center no-underline hover:underline text-white border-2 p-5" href="#">
                                    Add Service
                                </button>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <button className="flex items-center no-underline hover:underline text-white border-2 p-4" href="#">
                                    View Services
                                </button>
                            </div>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-pink-700 bg-opacity-85">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-white text-2xl" href="#">
                                        Annual Expenses
                                    </a>
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline hover:underline text-white" href="#">
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline hover:underline text-white" href="#">
                                    <p className="ml-2 text-sm">
                                        View Details
                                    </p>
                                </a>
                            </div>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-green-400 bg-opacity-95">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-white text-2xl" href="#">
                                        You've Saved
                                    </a>
                                </h1>
                            </header>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline hover:underline text-white" href="#">
                                    <p alt="Placeholder" className="block rounded-full">£</p>
                                    <p className="ml-2 text-sm">
                                        Author Name
                                    </p>
                                </a>
                            </div>
                            <div className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline hover:underline text-white" href="#">
                                    <p className="ml-2 text-sm">
                                        View Details
                                    </p>
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-black" href="#">
                                        Latest News 
                                    </a>
                                </h1>
                            </header>
                        </article>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-1 lg:-mx-4">
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-gray-200">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-black" href="#">
                                        Reduce your Waste Management costs
                                    </a>
                                </h1>
                            </header>
                            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline hover:underline text-black" href="#">
                                    <p className="ml-2 text-sm">
                                        See if you can reduce your waste manageemnt costs with a free quote from our partners.
                                    </p>
                                </a>
                            </footer>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-gray-200">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-black" href="#">
                                        Merchant services savings
                                    </a>
                                </h1>
                            </header>
                            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline hover:underline text-black" href="#">
                                    <p className="ml-2 text-sm">
                                        Save money on every transaction you make with low merchant service transaction costs. Find out more.
                                    </p>
                                </a>
                            </footer>
                        </article>
                    </div>
                    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                        <article className="overflow-hidden rounded-lg shadow-lg bg-gray-200">
                            <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                                <h1 className="text-lg">
                                    <a className="no-underline hover:underline text-black" href="#">
                                        New updated business rates
                                    </a>
                                </h1>
                            </header>
                            <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                                <a className="flex items-center no-underline hover:underline text-black" href="#">
                                    <p className="ml-2 text-sm">
                                        Find out about the latest business rates
                                    </p>
                                </a>
                            </footer>
                        </article>
                    </div>
                </div>
            </div>
        )
    }
}
export default Dashboard;