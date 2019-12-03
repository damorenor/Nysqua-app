import React, { Component } from 'react';
import Navbar from '../home/Navbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import StepConnector from '@material-ui/core/StepConnector';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Select from '@material-ui/core/Select';
import SwipeableViews from 'react-swipeable-views';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { ThemeProvider } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import route from '../Route';
import Grid from '@material-ui/core/Grid';

import './UserEdit.css';

var stateCategories=[];

class UserEdit extends Component {

    constructor(props) {
        super(props);
        this.state={
            index : 0,
            checked1: false,
            checked2: false,
            checked3: false,
            checked4: false,
            checked5: false,
            token: this.props.location.state.token,
            userData: this.props.location.state.userData, 
            profilePhoto: this.props.location.state.userData.profilePhoto,
            bio: this.props.location.state.userData.biography,
            password:"",
            passwordPrev:"",
            showPassword: false,
            showPasswordPrev: false,
            passwordError: false,
            gender: this.props.location.state.userData.gender,
            subcategories: [],
            categories: [],
            initialCategories:this.props.location.state.userData.categories,
            initialSubCategories:this.props.location.state.userData.subCategories   

        }
        this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
        this.primaryColor = '#E94057';
        this.onImageChange = this.onImageChange.bind(this);
        this.handleChangeBio = this.handleChangeBio.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
        this.handleGenderChange = this.handleGenderChange.bind(this);
        this.initializeCategories = this.initializeCategories.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleClickShowPasswordPrev = this.handleClickShowPasswordPrev.bind(this);
        this.handleClickToUser = this.handleClickToUser.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleMouseDownPassword = event => {
			event.preventDefault();
        };
        this.handleMouseDownPasswordPrev = event => {
			event.preventDefault();
        };
        this.theme = createMuiTheme({
			palette: {
				primary: {
					main: this.primaryColor,
					contrastText: '#FFF',
				},
			},
		});
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

        this.StyledButton = withStyles({
			root: {
				backgroundImage: this.gradient,
				fontFamily: 'Product Sans !important',
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
    initializeCategories(){
        //1 Hombre 2 Mujer 3 Niño 4 Niñas 5 Bebes
        var cat = ['Hombre', 'Mujer', 'Niño', 'Niña', 'Bebes'];
        for (var i = 0; i < cat.length; i++){
            if(this.state.initialCategories.includes(cat[i])){
                var add = i+1;
                var idcheck = "checked"+add;
                this.setState({
                    [idcheck]: true
                });

            }
        }
    }
    handleClickToUser() {

		this.LinkToUserElement.click();
	}
    handleChange = (event, value) => {
        

        this.setState({
            index: value,
        });
        this.initializeCategories();
        
        axios.post(route.url+'/assistant/categories', {
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
                    if(this.state.initialSubCategories.includes(serverSubCategories[i])){
                        console.log(serverSubCategories[i]);
                        subCategories.push({ name: serverSubCategories[i], checked: true });
                    } 
                    else{
                        subCategories.push({ name: serverSubCategories[i], checked: false });
                    }
                    
                    
                }
                console.log(subCategories);
                this.setState({ subcategories: subCategories });

            }, (error) => {
                console.log(error);
            });
       
        
            
      
    };
    handleGenderChange(event) {
		this.setState({
			gender: event.target.value
		});
	}
    handleChangeForm(event) {
		var prop = String(event.target.id);
		this.setState({
			[prop]: event.target.value
		});
	}
    handleChangeIndex = index => {
        this.setState({
            index,
        });
        
    };
    onImageChange = (event) => {

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ profilePhoto: e.target.result });
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }
    handleCheckChange(event) {
        //aca toca 
        var changedProp = "checked" + event.currentTarget.value.toString();
        if(event.currentTarget.value.toString() == "1"){
            if(this.state[changedProp]){
                var aux = this.state.initialCategories;
                var i = aux.indexOf("Hombre");
                aux.splice( i, 1 );
                this.setState({
                    initialCategories: aux
                });
            }
            else{
                var aux = this.state.initialCategories;
                aux.push("Hombre");
                this.setState({
                    initialCategories: aux
                });
              
            }
   

        }
        if(event.currentTarget.value.toString() == "2"){
            if(this.state[changedProp]){

                var aux = this.state.initialCategories;
                var i = aux.indexOf("Mujer");
                aux.splice( i, 1 );
                this.setState({
                    initialCategories: aux
                });
            }
            else{
                var aux = this.state.initialCategories;
                aux.push("Mujer");
                this.setState({
                    initialCategories: aux
                });
              
            }
            
        }
        if(event.currentTarget.value.toString() == "3"){
            if(this.state[changedProp]){
                var aux = this.state.initialCategories;
                var i = aux.indexOf("Niño");
                aux.splice( i, 1 );
                this.setState({
                    initialCategories: aux
                });
            }
            else{
                var aux = this.state.initialCategories;
                aux.push("Niño");
                this.setState({
                    initialCategories: aux
                });
              
            }
            
        }
        if(event.currentTarget.value.toString() == "4"){
            if(this.state[changedProp]){
              
                var aux = this.state.initialCategories;
                var i = aux.indexOf("Niña");
                aux.splice( i, 1 );
                this.setState({
                    initialCategories: aux
                });
            }
            else{
                var aux = this.state.initialCategories;
                aux.push("Niña");
                this.setState({
                    initialCategories: aux
                });
              
            }
            
        }
        if(event.currentTarget.value.toString() == "5"){
            if(this.state[changedProp]){
                var aux = this.state.initialCategories;
                var i = aux.indexOf("Bebes");
                aux.splice( i, 1 );
                this.setState({
                    initialCategories: aux
                });
            }
            else{
                var aux = this.state.initialCategories;
                aux.push("Bebes");
                this.setState({
                    initialCategories: aux
                });
              
            }
            
        }
        
        this.setState({
            [changedProp]: !this.state[changedProp]
        });
    }
    handleClickShowPassword() {
		this.setState({
			showPassword: !this.state.showPassword
		});
    }

    handleClickShowPasswordPrev() {
		this.setState({
			showPasswordPrev: !this.state.showPasswordPrev
		});
	}
    
    handleChangeBio(event) {
        this.setState({
            bio: event.target.value
        });
    }
  
    render(){
        
        const handleCheckChangeSub = (event) => {
            for (var i = 0; i < this.state.subcategories.length; i++) {
                if (this.state.subcategories[i].name == event.currentTarget.value.toString()) {
                    this.state.subcategories[i].checked = !this.state.subcategories[i].checked;
                    console.log(this.state.subcategories[i].checked);
                }
            };
        };
        const checkeditems = this.state.initialSubCategories;
        const listItems = this.state.subcategories.map(function (d) {
            var idstr = "checkbox" + d.name;
            
            if(checkeditems.includes(d.name)){
                return <ul className="ks-cboxtags-checked">
                <li>
                    <input type="checkbox" id={idstr}
                        value={d.name}
                        onChange={handleCheckChangeSub}
                    />
                    <label htmlFor={idstr}>{d.name}</label>
                </li>
             </ul>
            }
            else{
                return <ul className="ks-cboxtags">
                <li>
                    <input type="checkbox" id={idstr}
                        value={d.name}
                        onChange={handleCheckChangeSub}
                    />
                    <label htmlFor={idstr}>{d.name}</label>
                </li>
            </ul>
            }

            
        });
        console.log(this.state.userData);
        
        return(
    <div className ="editProfile_container">
        <Navbar token = {this.state.token} userData ={this.state.userData} />
        <div className="userEdit">

            <div className = "tabs_container">       
                <Tabs value={this.state.index} fullWidth onChange={this.handleChange} >
                    <Tab label="Información Basica" />
                    <Tab label="Categorias Preferidas" />
                    <Tab label="Subcategorias Preferidas" />
                </Tabs>
                <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                    <div className= "tab_info">
                        <div className="image-upload">
                            < label htmlFor="file-input" >
                                <div className="profilepic">
                                    <img id="target" className="crop" src={this.state.profilePhoto} ></img>
                                </div>
                            </label>
                            <input id="file-input" name="profilePhoto" type="file" onChange={this.onImageChange} />
                            <p className="user_name_text">{this.state.userData.username}</p>
                        </div>
                            
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
                                defaultValue = {this.state.bio}
                            />
                            <div className="passwords-container">
                                <div className= "password_item">
                                    < this.StyledTextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            name="passwordPrev"
                                            label="Contraseña Actual"
                                            id="passwordPrev"
                                            autoComplete="current-password"
                                            type={this.state.showPasswordPrev ? 'text' : 'password'}
                                            value={this.state.passwordPrev}
                                            onChange={this.handleChangeForm}
                                            error={this.state.passwordError && this.state.passwordPrev.length < 7}
                                            helperText={this.state.passwordError && this.state.passwordPrev.length < 7 ? "La contraseña debe tener minimo 7 caracteres" : ""}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={this.handleClickShowPasswordPrev}
                                                            onMouseDown={this.handleMouseDownPasswordPrev}>
                                                            {(this.state.showPasswordPrev) ? (<VisibilityOff />) : (<Visibility />)}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                    />
                                </div>

                                < this.StyledTextField
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        name="password"
                                        label="Nueva Contraseña"
                                        id="password"
                                        autoComplete="current-password"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        value={this.state.password}
                                        onChange={this.handleChangeForm}
                                        error={this.state.passwordError && this.state.password.length < 7}
                                        helperText={this.state.passwordError && this.state.password.length < 7 ? "La contraseña debe tener minimo 7 caracteres" : ""}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={this.handleClickShowPassword}
                                                        onMouseDown={this.handleMouseDownPassword}>
                                                        {(this.state.showPassword) ? (<VisibilityOff />) : (<Visibility />)}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                />
                            </div>
                            
                            <div className="gender_container">
                                <ThemeProvider theme={this.theme}>
                                    <FormControl
                                    variant="outlined"
                                    fullWidth>
                                        <InputLabel htmlFor="outlined-age-simple">
                                            Genero
                                        </InputLabel>
                                        <Select
                                            fullWidth
                                            value={this.state.gender}
                                            onChange={this.handleGenderChange}
                                            labelWidth={54}
                                            inputProps={{
                                                gender: 'age',
                                                id: 'outlined-age-simple',
                                            }}
                                        >
                                            <MenuItem value="Men">Hombre</MenuItem>
                                            <MenuItem value="Women">Mujer</MenuItem>
                                            <MenuItem value="Undefined">Indefinido</MenuItem>
                                        </Select>
                                    </FormControl>
                                </ThemeProvider>
                            </div>
                    </div>
                    <div className= "tab_categories">
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
                    <div className= "tab_subcategories">
                        <div className="subcategories_container">
                            {listItems}
                        </div>
                    </div>
                </SwipeableViews>
            </div>
            <div>
                <this.StyledButton 
                    focusRipple
                    variant="contained"
                    size="medium"
                    text="bold"
                    onClick ={()=>{
                        var subcategoriesChecked = [];
                        for (var z = 0; z < this.state.subcategories.length; z++) {
                            if (this.state.subcategories[z].checked == true) {
                                subcategoriesChecked.push(this.state.subcategories[z].name);
                            }
                        }
                        const config = {
                            headers: {
                                'authorization': this.state.token,
                            }
                        };
                        console.log("//////////////////////");
                        console.log(subcategoriesChecked);
                        console.log(this.state.subcategories);
                        axios.patch(route.url+'/users/me ', {
                            
                            profilePhoto: this.state.profilePhoto,
                            biography: this.state.bio,
                            categories: this.state.initialCategories,
                            subCategories: subcategoriesChecked,
                            gender:this.state.gender
            
                        }, config)
                            .then((response) => {
                                //añadir logica
                                console.log("funciona");
                                console.log(response.data);
                                this.setState({
                                    userData: response.data
                                });
                                this.handleClickToUser();
                                
            
                            }, (error) => {
                                console.log(error);
            
                            });
                    }}
                    > Guardar Cambios
                </this.StyledButton>
                <Link to={{
									pathname: '/UserProfile',
									state: {
                                        token: this.state.token,
                                        userData: this.state.userData
									}
								}}
									ref={
										Link => this.LinkToUserElement = Link
									}>
				</Link>
            </div>
            
        </div>
    </div>
        );
    }
}
export default UserEdit