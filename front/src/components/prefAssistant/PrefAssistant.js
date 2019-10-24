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
import axios from 'axios';
import { Link } from 'react-router-dom';


class PrefAssistant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "",
            activeStep: 0,
            bio: "",
            userData: "",
            file: null,
            profilephoto: "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            subcategories: [{ name: "Camisas", checked: false },
            { name: "Camisetas", checked: false },
            { name: "Pantalones", checked: false },
            { name: "Sweaters y Cardigans", checked: false },
            { name: "Bermudas", checked: false },
            { name: "Chaquetas y Blazers", checked: false },
            { name: "Zapatos", checked: false },
            { name: "Buzos", checked: false },
            { name: "Jeans", checked: false },
            { name: "Accesorios", checked: false },
            { name: "Pijamas", checked: false },
            { name: "Blusas", checked: false },
            { name: "Shorts", checked: false },
            { name: "Vestidos y Faldas", checked: false },]
        };

        this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
        this.primaryColor = '#E94057';
        this.token = this.props.location.state;
        this.steps = this.getSteps();
        this.handleClick = this.handleClick.bind(this);
        this.onImageSubmit = this.onImageSubmit.bind(this);
        this.onImageChange = this.onImageChange.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handlReset = this.handleReset.bind(this);
        this.colorlibStepIcon = this.colorlibStepIcon.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);

        let reactSwipeEl;

        this.colorlibConnector = withStyles({
            root: {
                width: '100%',
                fontFamily: 'Product Sans',
            },
            alternativeLabel: {
                top: 27,
                fontFamily: 'Product Sans',
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
                fontFamily: 'Product Sans',
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
                fontFamily: 'Product Sans',
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
                fontFamily: 'Product Sans',
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


    onImageSubmit() {

        const profilePhot = new FormData();
        console.log(this.state.file);

        profilePhot.append('profilePhoto', this.state.file);
        console.log(profilePhot.get('profilePhoto'));
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            }
        };
        console.log(profilePhot);
        axios.post("http://localhost:3001/assistant/upload", profilePhot, config)
            .then((response) => {

                console.log(response);
            }).catch((error) => {
            });
    }

    onImageChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profilephoto: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
        this.setState({ file: event.target.files[0] });
    }

    getSteps() {
        return ['Descripcion', 'Que ropa buscas?', 'Categorias'];
    }

    handleNext() {
        this.setState({ activeStep: this.state.activeStep + 1 });
        this.reactSwipeEl.next();

        if (this.state.activeStep == 1) {


            axios.post('http://localhost:3001/assistant/categories', {
                checked1: this.state.checked1,
                checked2: this.state.checked2,
                checked3: this.state.checked3,
                checked4: this.state.checked4,
                checked5: this.state.checked5,
            })
                .then((response) => {

                    var serverResponse = response.data.out;
                    var serverSubCategories = [];
                    var subCategories = [];

                    serverResponse.map((e, i) => !serverSubCategories.includes(e) && serverSubCategories.push(e))

                    for (var i = 0; i < serverSubCategories.length; i++) {
                        subCategories.push({ name: serverSubCategories[i], checked: false });
                    }

                    console.log(subCategories);
                    this.setState({ subcategories: subCategories });

                }, (error) => {
                    console.log(error);
                });
        } else if (this.state.activeStep == 2) {
            //Aqui va la logica del request de los demas datos
            //this.onImageSubmit();
            var subcategoriesChecked = [];
            var categoriesChecked = [];
            var categories = ['Hombre', 'Mujer', 'Niño', 'Niña', 'Bebes'];
            for (var j = 0; j < categories.length; j++) {
                var checkAux = "checked" + (j + 1);
                if (this.state[checkAux] == true) {
                    categoriesChecked.push(categories[j]);
                }
            }
            for (var z = 0; z < this.state.subcategories.length; z++) {
                if (this.state.subcategories[z].checked == true) {
                    subcategoriesChecked.push(this.state.subcategories[z].name);
                }
            }

            const config = {
                headers: {
                    'authorization': this.props.location.state.token.token,
                }
            };

            axios.post('http://localhost:3001/assistant/prefAssistant', {
                bio: this.state.bio,
                categories: categoriesChecked,
                subCategories: subcategoriesChecked,
                profilePhoto: this.state.profilephoto

            }, config)
                .then((response) => {
                    //añadir logica
                    console.log(response.data);
                    var data = "";
                    //aca meter el link
                    data = response.data;
					this.handleClick(data);

                }, (error) => {
                    console.log(error);

                });

        }
    }

    handleBack() {
        this.setState({ activeStep: this.state.activeStep - 1 });
        this.reactSwipeEl.prev();
    }

    handleReset() {
        this.setState({ activeStep: 0 });
    }

    handleClick(udata) {
		this.setState({
			userData: udata
		});
		this.LinkElement.click();
	}

    colorlibStepIcon(props) {

        var iconClass = "";

        if (props.completed === true) {
            iconClass = "completed";
        }

        if (props.completed === false) {
            iconClass = "uncompleted";
        }

        if (props.active === true) {
            iconClass = "active";
        }

        const icons = {
            1: < FaUserAlt />,
            2: < FaTshirt />,
            3: < FaTags />,
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

    handleCheckChange(event) {
        var changedProp = "checked" + event.currentTarget.value.toString();
        this.setState({
            [changedProp]: !this.state[changedProp]
        });
    }


    render() {
        console.log("datos de usuario");
        console.log(this.props.location.state);

        const handleCheckChangeSub = (event) => {
            console.log("llego");
            for (var i = 0; i < this.state.subcategories.length; i++) {
                if (this.state.subcategories[i].name == event.currentTarget.value.toString()) {
                    this.state.subcategories[i].checked = !this.state.subcategories[i].checked;
                    console.log(this.state.subcategories[i].checked);
                }
            };
        };

        const listItems = this.state.subcategories.map(function (d) {
            var idstr = "checkbox" + d.name;

            return <ul className="ks-cboxtags">
                <li>
                    <input type="checkbox" id={idstr}
                        value={d.name}
                        onChange={handleCheckChangeSub}
                    />
                    <label htmlFor={idstr}>{d.name}</label>
                </li>
            </ul>
        });


        return (
            <div className="preferences_assistant_container">
                < div className="preferences_assistant" >
                    <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<this.colorlibConnector />}>
                        {this.steps.map(label => (
                            <Step key={label}>
                                <StepLabel StepIconComponent={this.colorlibStepIcon}>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    < div className="card" >
                        <div className="content">
                            <ReactSwipe
                                className="carousel"
                                swipeOptions={{ continuous: false }}
                                ref={el => (this.reactSwipeEl = el)}>
                                <div className="carousel_content">
                                    <div className="title_container">
                                        <h1 className="title"> Cuentanos un poco sobre ti</h1>
                                    </div>
                                    <Grid container
                                        spacing={0}
                                        direction="column"
                                        justify="center"
                                        alignItems="center"
                                        wrap="nowrap">
                                        <Grid item xs={6} sm={12}>

                                            <div className="image-upload">
                                                < label htmlFor="file-input" >
                                                    <div className="profilepic">
                                                        <img id="target" className="crop" src={this.state.profilephoto} ></img>
                                                    </div>

                                                </label>

                                                <input id="file-input" name="profilePhoto" type="file" onChange={this.onImageChange} />
                                                {/* <Button onClick={this.onImageSubmit}>Enviar Test</Button> */}


                                            </div>

                                        </Grid>
                                        <Grid item xs={6} sm={12}>
                                            <h2>Agrega una breve descripcion para quienes verán tu perfil</h2>
                                        </Grid>
                                        <Grid item xs={6} sm={12}>
                                            < this.StyledTextField
                                                variant="outlined"
                                                margin="normal"
                                                fullWidth
                                                id="bio"
                                                label="Tu biografia"
                                                name="bio"
                                                autoComplete="Bio"
                                                color={this.primaryColor}
                                                multiline
                                                rows="4"
                                                rowsMax="10"
                                                onChange={this.handleChange}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="carousel_content">
                                    <div className="title_container">
                                        <h1 className="title"> ¿Qué ropa estas buscando?</h1>
                                    </div>
                                    <div className="second_container">
                                        <Grid container
                                            spacing={1}
                                            direction="row"
                                            justify="center"
                                            alignItems="center">
                                            <Grid item xs={4} sm={4}>
                                                <div className="type1">
                                                    <div>
                                                        <div className="img_overlay">
                                                            <a className="tm-link left">Hombre</a>
                                                        </div>
                                                        <img
                                                            src="http://assets.myntassets.com/assets/images/1862801/2018/2/9/11518155061506-Roadster-Men-Maroon--Navy-Blue-Regular-Fit-Checked-Casual-Shirt-8861518155061131-1.jpg">
                                                        </img>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="yrdo_1" id="yes_1"
                                                            value={1}
                                                            checked={this.state.checked1}
                                                            onChange={this.handleCheckChange}></input>
                                                        <input type="radio" name="nrdo_1" id="no_1"
                                                            value={1}
                                                            checked={!this.state.checked1}
                                                            onChange={this.handleCheckChange}></input>
                                                        <div id="switch_1">
                                                            <label htmlFor="yes_1">Si</label>
                                                            <label htmlFor="no_1">No</label>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div className="type1">
                                                    <div>
                                                        <div className="img_overlay">
                                                            <a className="tm-link left">Mujer</a>
                                                        </div>
                                                        <img
                                                            src="http://image27.choichic.com/o_img/2018/03/04/252822-10530412/women-s-fashion-front-zip-mesh-jacket.jpg">
                                                        </img>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="yrdo_2" id="yes_2"
                                                            value={2}
                                                            checked={this.state.checked2}
                                                            onChange={this.handleCheckChange}></input>
                                                        <input type="radio" name="nrdo_2" id="no_2"
                                                            value={2}
                                                            checked={!this.state.checked2}
                                                            onChange={this.handleCheckChange}></input>
                                                        <div id="switch_2">
                                                            <label htmlFor="yes_2">Si</label>
                                                            <label htmlFor="no_2">No</label>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div className="type1">
                                                    <div>
                                                        <div className="img_overlay">
                                                            <a className="tm-link left">Niño</a>
                                                        </div>
                                                        <img
                                                            src="https://imagena1.lacoste.com/dw/image/v2/AAUP_PRD/on/demandware.static/-/Sites-master/default/dw26b0e681/AJ8064_W9D_20.jpg">
                                                        </img>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="yrdo_3" id="yes_3"
                                                            value={3}
                                                            checked={this.state.checked3}
                                                            onChange={this.handleCheckChange}></input>
                                                        <input type="radio" name="nrdo_3" id="no_3"
                                                            value={3}
                                                            checked={!this.state.checked3}
                                                            onChange={this.handleCheckChange}></input>
                                                        <div id="switch_3">
                                                            <label htmlFor="yes_3">Si</label>
                                                            <label htmlFor="no_3">No</label>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div className="type2">
                                                    <div>
                                                        <div className="img_overlay">
                                                            <a className="tm-link left">Niña</a>
                                                        </div>
                                                        <img
                                                            src="https://cdn.shopify.com/s/files/1/1017/0329/products/isla-dress-ghosty-raspberry-socks-websized_2000x.jpg?v=1567646051">
                                                        </img>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="yrdo_4" id="yes_4"
                                                            value={4}
                                                            checked={this.state.checked4}
                                                            onChange={this.handleCheckChange}></input>
                                                        <input type="radio" name="nrdo_4" id="no_4"
                                                            value={4}
                                                            checked={!this.state.checked4}
                                                            onChange={this.handleCheckChange}></input>
                                                        <div id="switch_4">
                                                            <label htmlFor="yes_4">Si</label>
                                                            <label htmlFor="no_4">No</label>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                            <Grid item xs={4} sm={4}>
                                                <div className="type2">
                                                    <div>
                                                        <div className="img_overlay">
                                                            <a className="tm-link left">Bebes</a>
                                                        </div>
                                                        <img
                                                            src="http://www.babyfashions.us/wp-content/uploads/2018/09/Baby-Fashion-Buying-the-Trendiest-Infant-Clothes.jpeg">
                                                        </img>
                                                    </div>
                                                    <div>
                                                        <input type="radio" name="yrdo_5" id="yes_5"
                                                            value={5}
                                                            checked={this.state.checked5}
                                                            onChange={this.handleCheckChange}></input>
                                                        <input type="radio" name="nrdo_5" id="no_5"
                                                            value={5}
                                                            checked={!this.state.checked5}
                                                            onChange={this.handleCheckChange}></input>
                                                        <div id="switch_5">
                                                            <label htmlFor="yes_5">Si</label>
                                                            <label htmlFor="no_5">No</label>
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </div>
                                </div>
                                <div className="carousel_content">
                                    <div className="title_container">
                                        <h1 className="title">¿Te interesa algo en especifico?</h1>
                                    </div>
                                    <div className="subcategories_container">
                                        {listItems}
                                    </div>
                                </div>
                            </ReactSwipe>
                        </div>
                        < div className="buttons_container" >
                            < this.BackButton disableRipple={true}
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleBack}>
                                Anterior
                            </this.BackButton>
                            <div>
                                <this.StyledButton onClick={this.handleNext}>
                                    {this.state.activeStep === this.steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </this.StyledButton>
                                <Link to={{
									pathname: '/Home',
									state: {
                                        token: this.props.location.state.token.token,
                                        userData: this.state.userData
									}
								}}
									ref={
										Link => this.LinkElement = Link
									}>
								</Link>
                            </div>

           
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default PrefAssistant;