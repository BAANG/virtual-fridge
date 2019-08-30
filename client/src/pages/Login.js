import React, { Component } from "react";
import { withAuth } from '@okta/okta-react';
import { Security, ImplicitCallback } from '@okta/okta-react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const homeStyle = {

  width: '80vw',
  height: '100%',
  margin: 'auto',
  marginTop: "27vh",
  // marginBottom: "20px",
  // borderStyle: "solid",
  borderRadius: '12px',
  // borderWidth: "1px",
  overflow: "none",
  color: "black",
  padding: "20px",
  fontSize: "15px",
  textAlign: "center",
  backgroundColor: "white",
  // boxShadow: '0px 0px 1px 1px gray',
  // border: '10px',

}

const homeStyle2 = {
    
  width: '80vw',
  height: '100%',
  margin: '0 auto',
  marginTop: "10px",
  marginBottom: "20px",
  borderStyle: "solid",
  borderWidth: "1px",
  overflow: "scroll",
  color: "black",
  paddingTop: "15px",
  paddingBottom: "20px",
  fontSize: "15px",
  textAlign: "center",
  // backgroundColor: "white",
  // boxShadow: '0px 0px 1px 1px gray',
  // border: '10px',

}

const titleStyle = {
  fontSize: "40px",
  color: "black",
  margin: "0auto",
  textAlign: "center",
  marginBottom: "20px",
  marginTop: "10px",
  fontFamily: 'Beth Ellen',
  backgroundColor: 'lightseagreen'
  // fontFamily: 'Libre Caslon Text',
  // fontFamily: 'Playfair Display',
  // fontFamily: 'Source Serif Pro',
  // fontFamily: 'Domine',
  // fontFamily: 'Old Standard TT',
}
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
const config = {
    issuer: 'https://dev-622585.okta.com/oauth2/default',
    redirect_uri: window.location.origin + '/implicit/callback',
    client_id: '0oa11poaf4Foygnfy357'
  }
export default withAuth(class Home extends Component {
    constructor(props) {
      super(props);
      this.state = { 
        authenticated: null,
        userinfo: {}
       };
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
    }
  
    async checkAuthentication() {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        const userinfo = await this.props.auth.getUser();
        this.setState({ userinfo }); 
        console.log(this.state.userinfo);
        this.setState({ authenticated });
      }
    }
  
    componentDidUpdate() {
      this.checkAuthentication();
    }
  
    async login() {
      // Redirect to '/' after login
      this.props.auth.login('/');
    }
  
    async logout() {
      // Redirect to '/' after logout
      this.props.auth.logout('/');
    }
  
    render() {
      if (this.state.authenticated === null) return null;
      if (this.state.authenticated && this.state.userinfo){
        return (
          <div className="home-container" style={homeStyle}>
          <h1 className="title" style={titleStyle}>Welcome to Fridge, {this.state.userinfo.name}</h1>
          <h2>Signed in as: {this.state.userinfo.email}</h2>

          <br />
          <Button onClick={this.logout}size="large" className={useStyles.margin} variant="outlined" color="secondary">
          Logout
          </Button>
        </div>
        )
      }else {
        return(
          <div className="home-container" style={homeStyle}>

          <h1 className="title" style={titleStyle}>Welcome to Fridge</h1>
          <h2>save food, save time, save money</h2>
          <br />
          <Button onClick={this.login}size="large" className={useStyles.margin} variant="outlined" color="secondary">
          Login
          </Button>
        </div>
        )
    }
  }

  });