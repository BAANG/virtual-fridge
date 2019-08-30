import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import tileData from './tileData';
import axios from "axios";
import Thumbnail from '../thumbnail';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 750,
        height: 700,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const titleStyle = {
    fontSize: "40px",
    color: "black",
    margin: "0 auto",
    textAlign: "center",
    marginBottom: "20px",
    marginTop: "10px",
    verticalAlign: 'top',
    fontFamily: 'Beth Ellen',
    backgroundColor: 'lightseagreen',
    width: '80%'
    // borderRadius: '10px'
}

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

function convertIngredientToImage(str) {
    axios.get('https://pixabay.com/api/?key=13232685-3497331870f507199a8b8b2b7&q=' + str + '&image_type=photo')
        .then(res => {
            console.log("Response", res);
            // console.log("Our url", res.data.hits[0].largeImageURL);
            if (res.data.hits) {
                if (res.data.hits[0]) {
                    console.log("Our url", res.data.hits[0].largeImageURL);
                    return res.data.hits[0].largeImageURL;
                }
            }
            else {
                return "";
            }
        })
    //console.log("This function ran");
    // return 'https://pixabay.com/get/57e7d44b4856a814f6da8c7dda79367d173cdce35b546c4870297ed6974ecc50b1_1280.jpg';
    // return 'https://pixabay.com/get/55e5d1444a55a414f6da8c7dda79367d173cdce35b546c4870297ed69748c55fba_1280.jpg';
}


export default function TitlebarGridList(props) {
    const classes = useStyles();

    console.log("Props Ingredients", props.ingredients);

    const converter = convertIngredientToImage;

    var newIngredients = props.ingredients;


    return (
        <div className={classes.root} style={{ borderRadius: '12px' }}>
            <GridList cellHeight={180} cols = {3} className={classes.gridList}>
                <GridListTile key="Subheader" cols={3} style={{ height: 'auto' }}>
                    <ListSubheader component="div">
                        <h1 className="title" style={titleStyle}>What would you like to make?</h1>
                        </ListSubheader>
                </GridListTile>
                {newIngredients.map((ingredient, i) => (
                    <GridListTile key={ingredient.name + i}>
                        <Thumbnail name = {ingredient.name}></Thumbnail>
                        {/* <img src={converter(ingredient)} alt={ingredient} /> */}
                        {/* <img src = "https://pixabay.com/get/54e5d3414c53b108f5d084609629347c163dd8ed564c704c732a79d4924dc25a_1280.jpg"></img> */}
                        <GridListTileBar
                            title={ingredient.name}
                            // actionIcon={
                            //     <IconButton aria-label={`info about ${ingredient}`} className={classes.icon}>
                            //         <InfoIcon />
                            //     </IconButton>
                            // }
                            actionIcon = {<Checkbox 
                                onClick={(event) => props.handleCheckBox(event)}
                                value = {ingredient.name}
                                // try to make the checkboxes red
                                ></Checkbox>}
                        />
                    </GridListTile>
                ))}
            </GridList>
            {/* {props.ingredients.map(ingredient => <p>{ingredient}</p>)} */}
        </div>
    );
}