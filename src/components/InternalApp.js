import React, { Component } from "react";
import logo from "../logo.svg";
import Nav from "./NavBar";

export class InternalApp extends Component {
    
    render(){
        if(this.props.authState === "signedIn"){
            return (
                <>
                    <Nav/>
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                        <img class="w-full" src={logo} alt="Sunset in the mountains"/>
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
                            <p class="text-gray-700 text-base">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div class="px-6 py-4">
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
                            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
                        </div>
                    </div>
                    
                </>
            )
        } else {
            return null;
        }
    }
}