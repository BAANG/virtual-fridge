import React from 'react';
import Container from '@material-ui/core/Container';
import { getThemeProps } from '@material-ui/styles';
import "./style.css"

export default function NotSignedIn (props){
    return (
    // <Container maxWidth="sm">
        <div id="container">
            <img src={props.img} alt="fruit-img" id="fruit"></img>
            <br></br><br></br>
          <h1>Uh Oh. Please sign in to access your {props.item}</h1>  
        </div>
    // </Container>
    )
}