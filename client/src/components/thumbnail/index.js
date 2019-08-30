import React, { Component } from "react";
import axios from "axios";

const imageStyle = {
    height: '100%', 
    width: '100%', 
    position: 'relative'
}

class Thumbnail extends Component {

    state = {
        name: "", 
        url: "", 
    }


   

    componentDidMount() {
        this.retrieveImage();
    }

    retrieveImage = () => {
        var formattedStr = this.props.name.split(" ").join("%");
        axios.get('https://pixabay.com/api/?key=13232685-3497331870f507199a8b8b2b7&q=' + formattedStr + '&image_type=photo')
        .then(res => {
            console.log("Response", res);
            // console.log("Our url", res.data.hits[0].largeImageURL);
            if (res.data.hits) {
                if (res.data.hits[0]) {
                    // console.log("Our url", res.data.hits[0].largeImageURL);
                    this.setState({url: res.data.hits[0].largeImageURL});
                }
            }
        })
    }

    render() {
        return (
            
                <img style = {imageStyle} src = {this.state.url === ""? 'https://t4.ftcdn.net/jpg/01/19/60/67/500_F_119606707_zuSz6XRfX4s3x2BVhjpehqYtXLOISCGI.jpg': this.state.url}></img>
            
        )
    }

}

export default Thumbnail;