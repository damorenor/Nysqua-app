import React, { Component } from "react";
import { red }from "@material-ui/core/colors";
import { withStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { Slide } from 'material-auto-rotating-carousel';
import './SignUp.css';
import { width } from "@material-ui/system";

class SliderSignUp extends Component {
    constructor(props) {    
        super(props);

        this.StyledSlide = withStyles({
            root: {
                height: "100%",
                minHeight: "100%",
                maxHeight: "100%",
                width: "100%",
                minWidth: "100%",
                borderRadius: "0.5vh",
            },
            media: {
                backgroundColor: red[400],
            }
        })(Slide); 
    }   
    render() {
        return(
            <this.StyledSlide
                media={<img src='http://www.icons101.com/icon_png/size_256/id_79394/youtube.png' />}/>
        );
    }

    

};

export default SliderSignUp;