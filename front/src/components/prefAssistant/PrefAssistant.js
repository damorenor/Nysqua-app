import React, { Component } from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import { FaUserAlt } from 'react-icons/fa';
import { FaTshirt } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';
import AvatarImageCropper from 'react-avatar-image-cropper';
import TextField from '@material-ui/core/TextField';
import 'react-animated-slider/build/horizontal.css';
import './PrefAssistant.css';
import ReactSwipe from 'react-swipe';
import 'react-animated-slider/build/horizontal.css';
import Grid from '@material-ui/core/Grid';

class PrefAssistant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0,
            bio: "",
        };

        this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
        this.primaryColor = '#E94057';

        this.steps = this.getSteps();
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handlReset = this.handleReset.bind(this);
        this.colorlibStepIcon = this.colorlibStepIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        let reactSwipeEl;

        this.colorlibConnector = withStyles({
            root:{
                width: '100%',
            },
            alternativeLabel: {
                top: 26,
            },
            active: {
                '& $line': {
                    backgroundImage: this.gradient,
                },
            },
            completed: {
                '& $line': {
                    backgroundImage: this.gradient,
                },
            },
            line: {
                height: 5,
                border: 0,
                backgroundColor: '#eaeaf0',
                borderRadius: 1,
            },
        })(StepConnector);

        this.StyledButton = withStyles({
            root: {
                backgroundImage: this.gradient,
                borderRadius: 3,
                border: 0,
                color: 'white',
                height: 48,
                padding: '0 30px',
                boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
                margin: '1vh 0vw 1vh 0vh',
                fontSize: '1.05rem',
                transitionProperty: 'opacity',
                transitionDuration: '0.1s',
                marginRight: '0px !important',
                '&:hover': {
                    opacity: 0.9,
                },
                '&:active': {
                    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
                },
            },
        })(Button);

        this.BackButton = withStyles({
            root: {
                backgroundColor: 'transparent',
                fontWeight: 'bold',
                color: this.primaryColor,
                height: 48,
                padding: '0',
                fontSize: '1.05rem',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
                '&:active': {
                    backgroundColor: 'transparent',
                    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
                },
            },
        })(Button);
        
        this.StyledTextField = withStyles({
            root: {
                '& label.Mui-focused': {
                    color: this.primaryColor,
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: this.primaryColor,
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.3);',
                    },
                    '&:hover fieldset': {
                        borderColor: 'rgba(0, 0, 0, 0.6);',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: this.primaryColor,
                    },
                },
            },
        })(TextField);
    }

      
    getSteps() {
        return ['Descripcion', 'Que ropa buscas?', 'Categorias'];
    }

    handleNext(){
        this.setState({activeStep: this.state.activeStep + 1});
        this.reactSwipeEl.next();
    }

    handleBack(){
        this.setState({activeStep: this.state.activeStep - 1});
        this.reactSwipeEl.prev();
    }

    handleReset(){
        this.setState({activeStep: 0});
    }

    colorlibStepIcon(props) {
        console.log(props);

        var iconClass = "";

        if (props.completed == true){
            iconClass = "completed";
        }
        
        if (props.completed == false){
            iconClass = "uncompleted";
        }

        if(props.active == true){
            iconClass = "active";
        }

        const icons = {
            1: < FaUserAlt /> ,
            2: < FaTshirt /> ,
            3: < FaTags /> ,
        };

        return (
            <div className={iconClass}>
                {icons[String(props.icon)]}
            </div>
        );
    }
    apply = (file) => {
        // handle the blob file you want
        // such as get the image src
        var src = window.URL.createObjectURL(file);
    }

    handleChange(event) {
        this.setState({
            bio: event.target.value
        });
    }

    render(){
        return(
            < div className = "preferences_assistant" >
                <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<this.colorlibConnector />}>
                        {this.steps.map(label => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={this.colorlibStepIcon}>{label}</StepLabel>
                        </Step>
                        ))}
                </Stepper>
                < div className = "card" >
                    <div className="content">
                       <ReactSwipe
                            className="carousel"
                            swipeOptions={{ continuous: false }}
                            ref={el => (this.reactSwipeEl = el)}>
                            <div className="carousel_content">
                                <div className="title_container">
                                    <h1 className="title">1. Informacion extra para tu perfil</h1>
                                </div>
                                <Grid container 
                                    spacing={6}
                                    direction = "row"
                                    justify = "center"
                                    alignItems = "stretch">
                                    <Grid item xs={6} sm={6} className="column">
                                        
                                     //AQUI

                                    </Grid>
                                    <Grid item xs={6} sm={6} className="column">
                                        < this.StyledTextField
                                            variant = "outlined"
                                            margin = "normal"
                                            fullWidth
                                            id = "bio"
                                            label = "Tu biografia"
                                            name = "bio"
                                            autoComplete = "Bio"
                                            color = {this.primaryColor}
                                            multiline
                                            rows = "12"
                                            rowsMax = "14"
                                            onChange = {this.handleChange}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="carousel_content">
                                <div className="title_container">
                                    <h1 className="title">2. Para quien buscas ropa?</h1>
                                </div>
                                <h1>2</h1>
                            </div>
                            <div className="carousel_content">
                                <div className="title_container">
                                    <h1 className="title">3. Que tipo de ropa buscas?</h1>
                                </div>
                                <h1>3</h1>
                            </div>
                        </ReactSwipe>
                    </div>
                    < div className = "buttons_container" >
                        < this.BackButton disableRipple = {true}
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}>
                            Back
                        </this.BackButton>
                        <this.StyledButton onClick={this.handleNext}>
                            {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                        </this.StyledButton>
                    </div>
                </div>
            </div>
        );
    }

}

export default PrefAssistant;