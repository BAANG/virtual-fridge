import React, { Component } from "react";
import axios from "axios";
import Avatar from '@material-ui/core/Avatar';

const imageStyle = {
    height: '50px', 
    width: '50px', 
    position: 'relative'
}

class PicAvatar extends Component {

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
            
                 <Avatar style = {imageStyle} src = {this.state.url === ""? 'https://t4.ftcdn.net/jpg/01/19/60/67/500_F_119606707_zuSz6XRfX4s3x2BVhjpehqYtXLOISCGI.jpg': this.state.url}></Avatar>
                // <Avatar src = 'https://pixabay.com/get/57e7d44b4856a814f6da8c7dda79367d173cdce35b546c4870297ed6974ecc50b1_1280.jpg'></Avatar>   
        )
    }

}

export default PicAvatar;