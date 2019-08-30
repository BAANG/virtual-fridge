import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PicAvatar from '../Avatar';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    card: {
        width: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function RecipeReviewCard(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    console.log("The props are", props);

    function linkClick() {
        // console.log("The link button was clicked");
        // console.log("props", props);
        // window.open('https://www.nba.com/article/2019/08/07/durant-discusses-warriors-injury-brooklyn-free-agency-decision', "_blank");
        // axios.get('https://api.spoonacular.com/recipes/716429/information&apiKey=65fdffe480f1407ea6a4a3b80c3df511')
        //     .then(res => {
        //         console.log("res", res);
        //     })
        axios.get('https://api.spoonacular.com/recipes/' + props.id + '/information?includeNutrition=false&apiKey=41e31ae78aea452c86c7c8a9e248aa2f')
            .then(res => {
                console.log("Response", res);
                window.open(res.data.sourceUrl, 'blank');
            })
    }

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
          </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.name}
            />
            <CardMedia
                className={classes.media}
                image={props.image}
                title="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    Missing Ingredients: {props.missingIngredients.length}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share" onClick = {linkClick}>
                    <ShareIcon />
                </IconButton>
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    {props.missingIngredients.map((ingredient, i) => {
                        return (
                            <div style = {{display: 'flex'}}>
                                <p>{ingredient.name}</p>
                                <PicAvatar
                                key = {i * Math.random() * 1000}
                                name = {ingredient.name}
                                ></PicAvatar>
                            </div>
                        )
                    })}
                </CardContent>
            </Collapse>
        </Card>
    );
}