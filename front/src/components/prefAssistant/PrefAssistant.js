import React, { Component } from "react";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import { FaFacebookF } from 'react-icons/fa';
import AvatarImageCropper from 'react-avatar-image-cropper';
import TextField from '@material-ui/core/TextField';


    
import './PrefAssistant.css';

class PrefAssistant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStep: 0
        };

        this.StyledTextField = withStyles({
            root: {
              marginTop: '1.2vh',
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

        this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
        this.primaryColor = '#E94057';

        this.steps = this.getSteps();
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handlReset = this.handleReset.bind(this);
        this.colorlibStepIcon = this.colorlibStepIcon.bind(this);

        this.colorlibConnector = withStyles({
            alternativeLabel: {
                top: 22,
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
                height: 3,
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
                '&:hover': {
                    opacity: 0.9,
                },
                '&:active': {
                    boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
                },
            },
            label: {
                textTransform: 'capitalize',
            },
        })(Button);
    }

      
    getSteps() {
        return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
    }
    
    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
            return 'Select campaign settings...';
            case 1:
            return 'What is an ad group anyways?';
            case 2:
            return 'This is the bit I really care about!';
            default:
            return 'Uknown stepIndex';
        }
    }

    handleNext(){
        this.setState({activeStep: this.state.activeStep + 1});
    }

    handleBack(){
        this.setState({activeStep: this.state.activeStep - 1});
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

        return (
            <div className={iconClass}>
                <FaFacebookF />
            </div>
        );
    }
    apply = (file) => {
        // handle the blob file you want
        // such as get the image src
        var src = window.URL.createObjectURL(file);
    }

    render(){
        return(
            < div className = "preferences_assistant" >
                <div style={{ width: '27vh', height: '27vh', margin: 'auto', border: '1px solid black' }}>
                    <AvatarImageCropper apply={this.apply} />
                </div>
                < this.StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
              />
                <Typography>{this.getStepContent(this.state.activeStep)}</Typography>
                <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<this.colorlibConnector />}>
                    {this.steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={this.colorlibStepIcon}>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
                <div>
                    {this.state.activeStep === this.steps.length ? (
                    <div>
                        <Typography>All steps completed</Typography>
                        <Button onClick={this.handleReset}>Reset</Button>
                    </div>
                    ) : (
                    <div>
                        <div>
                        <Button
                            disabled={this.state.activeStep === 0}
                            onClick={this.handleBack}   
                        >
                            Back
                        </Button>
                        <this.StyledButton onClick={this.handleNext}>
                            {this.state.activeStep === this.steps.length - 1 ? 'Finish' : 'Next'}
                        </this.StyledButton>
                        </div>
                    </div>
                    )}
                </div>
            </div>

        );
    }

}

export default PrefAssistant;