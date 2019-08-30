import React, { Component } from "react";
import Navbar from "../components/Navbar"


function NoMatch (){
    return (
        <div>
            <Navbar />
            <h1>This page was not found</h1>
        </div>
    )
}

export default NoMatch;