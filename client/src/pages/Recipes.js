import React, { Component } from "react";
import ingredients from "../utils/json/rawingredientslist"
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
// import CheckBoxIcon from '@material-ui/icons/CheckBox';
import axios from "axios";
import VerticalGridList from "../components/verticalGridList";
import Grid from '@material-ui/core/Grid';
import RecipeCard from "../components/RecipeCard";
import Container from '@material-ui/core/Container';
import "./style.css";
import { withAuth } from '@okta/okta-react';
import NotSignedIn from "../components/NotSignedIn";
import API from '../utils/api';


import Button from '@material-ui/core/Button';
import { borderRadius } from "@material-ui/system";


//something about how the children don't all have a unique key


const ingredientsStyle = {
    width: '100vw',
    height: '100%',
    margin: '0 auto',
    marginTop: "20px",
    marginBottom: "20px",
    // overflow: "scroll",
    padding: "20px",
    fontSize: "10px"
}

const buttonHolder = {
    textAlign: "center",
    margin: "0auto",
    marginBottom: "20px"
}

const buttonStyle = {
    margin: "20px",
    variant: "contained",
    color: "primary"
}

const cardStyle = {

    margin: '0 auto',
    textAlign: "center",
    marginTop: "5px",
    marginBottom: "5px",
    padding: "10px",
    fontSize: "10px",
    float: "left"    
}

const rightStyle = {

maxHeight: "700px",
overflow: "scroll",
margin: "0 auto",

}

export default withAuth(class Recipes extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          authenticated: null,
          ingredients: [],
          displayResults: false,
          results: [], 
          queryURL: "",
          items: []
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

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            const userinfo = await this.props.auth.getUser();
            this.setState({ userinfo });
            console.log(this.state.userinfo);
            this.setState({ authenticated });
            if (this.state.authenticated) {
                this.setState({ user: userinfo.email })
            }
            console.log(this.state)

            console.log('This is the state.user', this.state.user)
            API.createFridge(this.state.user)
                .then(res => {
                    console.log(res, 'create fridge')
                })
            API.getFridge(this.state.user)
                .then(res => {
                    console.log(res, 'res')
                    console.log('Succesfully accessed fridge data.\n', res.data)
                    this.setState({ items: res.data[0].items }, () => console.log('This is the updated fridge', this.state.items))
                })
                .catch(err => {
                    throw err
                })
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

    handleCheckBox = event => {
        console.log("The handle checkbox function ran");
        const newState = { ...this.state } // Instantiates a holding area for state mutations.
        const newItem = event.target.value // Grabs value of checkbox item
        console.log("Event target value", newItem);
        if (this.state.ingredients.includes(newItem)) {
            // console.log(newState.ingredients.indexOf(newItem))
            const itemIndex = newState.ingredients.indexOf(newItem)
            newState.ingredients.splice(itemIndex, 1)
            console.log(`You removed ${newItem}`, this.state.ingredients)

            console.log('QueryURL', this.createQuery())
        } else {
            newState.ingredients.push(newItem)
            this.setState(newState)
            console.log(`You've added ${newItem} to your search query.`, this.state.ingredients)

            //console.log('QueryURL', this.createQuery())
            this.createQuery()
        }
    };

    createQuery = () => {
        // const apiKey = '&apiKey=65fdffe480f1407ea6a4a3b80c3df511'; // TODO: Hide with dotenv
        const apiKey = '&apiKey=41e31ae78aea452c86c7c8a9e248aa2f'; // TODO: Hide with dotenv
        const queryParams = this.state.ingredients.join('+,')
        const queryURL = ('https://api.spoonacular.com/recipes/findByIngredients?ingredients=' + queryParams + apiKey).split(' ').join('+')
        console.log('QUERY URL', queryURL);

        this.setState({
            queryURL: queryURL
        })
    }

    handleSubmit = event => {
        //:? do we need the event.preventDefault part
        console.log("The handle submit function ran");
        axios.get(this.state.queryURL)
            .then(res => {
                console.log("Our recipe response was", res);
                this.setState({
                    results: res.data,
                    displayResults: true
                })
                console.log("Did we get to after set state?");
                console.log("The first recipe is ", this.state.results[1]);
            })
            .catch(err => {
                throw err
            })
    }




    
    render() {

      if (this.state.authenticated){
        return (
            // <div>
            // <h1 className="title" style={titleStyle}>Recipes for You</h1>
            // <div className='ingredients-container' style={ingredientsStyle}>
            //     <FormGroup row>
            //         {ingredients.map(ingredient => {
            //             return (
            //                 <FormControlLabel
            //                     key={ingredient.n}
            //                     control={
            //                         <Checkbox
            //                             onClick={(event) => this.handleCheckBox(event)}
            //                             value={ingredient}
            //                             color="primary"
            //                         />
            //                     }
            //                     label={ingredient}
            //                 />
            //             );
            //         })
            //         }
            //     </FormGroup>
            // </div>
            // <div className="button-holder" style={buttonHolder}>
            // <button onClick={this.handleSubmit} style={buttonStyle}>Submit</button>
            //     {this.state.displayResults ? <div>{this.state.results.map(result => {
            //         return (
            //             <p>{result.title}</p>
            //         )
            //     })}</div> : <div>Nothing to display yet</div>}
            // </div>
            // </div>

            <div>
                {/* <Container> */}
                <Grid container spacing={2} style={ingredientsStyle}>
                    <Grid item xs={6}>
                        <VerticalGridList ingredients={this.state.items} handleCheckBox={this.handleCheckBox}></VerticalGridList>
                    </Grid>
                    <br></br>
                    <Grid className="right-side" style={rightStyle} item xs={6}>
                        {/* <div className="button-holder" style={buttonHolder}> */}
                        <Button
                            style={buttonStyle}
                            type='submit'
                            onClick={this.handleSubmit}
                            variant="outlined" color="secondary">
                            Find Recipes
                        </Button>
                        {/* <button onClick={this.handleSubmit} style={buttonStyle}>Submit</button> */}

                        {this.state.displayResults ? <div style={{float: "left"}}>{this.state.results.map((result, i) => {
                            return (

                                
                                    <div style={cardStyle}>
                                        <RecipeCard
                                            key = {i}
                                            name = {result.title}
                                            image = {result.image}
                                            missingIngredients = {result.missedIngredients}
                                            id = {result.id}
                                        ></RecipeCard>
                                    </div>
                        
                            )
                        })}</div> : <div>Nothing to display yet</div>}

                        {/* </div> */}
                    </Grid>
                </Grid>
                {/* </Container> */}
            </div>
            )
        }
        else {
            return(
                <NotSignedIn item="recipes" img="https://media.istockphoto.com/vectors/strawberry-half-cut-in-splash-on-pink-background-vector-illustration-vector-id860392710?k=6&m=860392710&s=612x612&w=0&h=kSDFPCPFIqRD7vVGK3snIWZWC-z5p_ZhPnpbmjzFYb0=" />
            )
        }
        

    }

  });