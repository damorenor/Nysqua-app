import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import { FaFacebookF } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { IconContext } from "react-icons";
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

import './SignUp.css';

class SignUp extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			username: '',
			showPassword: false,
			showConfirmPassword: false,
			password: '',
			confirmPassword: '',
			birthdate: new Date('2018-08-18T21:11:54'),
			gender: '',
		};

		this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
		this.primaryColor = '#E94057';

		this.handleChange = this.handleChange.bind(this);
		this.handleGenderChange = this.handleGenderChange.bind(this);

		this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

		this.handleMouseDownPassword = event => {
			event.preventDefault();
		};

		this.handleClickShowConfirmPassword = this.handleClickShowConfirmPassword.bind(this);

		this.handleMouseDownConfirmPassword = event => {
			event.preventDefault();
		};

		this.handleDateChange = this.handleDateChange.bind(this);

		this.theme = createMuiTheme({
			palette: {
				primary: {
					main: this.primaryColor,
					contrastText: '#FFF',
				},
			},
		});


		this.StyledTextField = withStyles({
			root: {
				marginTop: '1.2vh',
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

		this.SocialMedia = withStyles({
			root: {

				border: '1px solid rgba(0, 0, 0, 0.3)',
				borderRadius: '50% !important',
				color: 'rgba(0, 0, 0, 0.5)',
				backgroundColor: 'white',
				boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
				padding: '16px 15px',
				fontSize: '0.95rem',
				transitionProperty: 'color, border',
				transitionDuration: '0.2s, 0.2s',
				'&:hover': {
					color: this.primaryColor,
					border: '1px solid #E94057',
					backgroundColor: 'white',
				},
				'&:active': {
					boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
				},
			},
		})(Button);

	}


	handleChange(event) {
		var prop = String(event.target.id);
		this.setState({
			[prop]: event.target.value
		});
	}

	handleClickShowPassword() {
		this.setState({
			showPassword: !this.state.showPassword
		});
	}

	handleClickShowConfirmPassword() {
		this.setState({
			showConfirmPassword: !this.state.showConfirmPassword
		});
	}

	handleDateChange(date) {
		this.setState({
			birthdate: date
		});
	}

	handleGenderChange(event) {
		this.setState({
			gender: event.target.value
		});
	}

	render() {
		return (
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className="paper">
					<div className="internal_paper">

						<div className="title">
							<h1>Registrate con</h1>
						</div>


						<div className="social_icons">
							<ThemeProvider theme={this.theme}>
								< Grid container>
									< Grid item xs={12} sm={6}>
										< div className="social_media_btn" >
											< this.SocialMedia
												type="submit"
												variant="contained"
												size="medium"
												text="bold" >
												<IconContext.Provider value={{ size: "1.9em", className: 'react-icons' }}>
													<div>
														<FaFacebookF />
													</div>
												</IconContext.Provider>
											</this.SocialMedia>
										</div>
									</Grid>
									<Grid item xs={12} sm={6}>
										< div className="social_media_btn" >
											< this.SocialMedia
												type="submit"
												variant="contained"
												size="medium"
												text="bold" >
												<IconContext.Provider value={{ size: "1.9em ", className: 'react-icons' }}>
													<div>
														<FaGoogle />
													</div>
												</IconContext.Provider>
											</this.SocialMedia>
										</div>
									</Grid>
								</Grid>
							</ThemeProvider>
						</div>

						<div id="or">O</div>

						<form className="form" noValidate>

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

							< this.StyledTextField
								variant="outlined"
								margin="normal"
								fullWidth
								id="username"
								label="Nombre de Usuario"
								name="username"
								autoComplete="username"
								onChange={this.handleChange}
							/>

							< this.StyledTextField
								variant="outlined"
								margin="normal"
								fullWidth
								name="password"
								label="Contraseña"
								id="password"
								autoComplete="current-password"
								type={this.state.showPassword ? 'text' : 'password'}
								value={this.state.password}
								onChange={this.handleChange}
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

							< this.StyledTextField
								variant="outlined"
								margin="normal"
								fullWidth
								name="confirmPassword"
								label="Confirmar contraseña"
								id="confirmPassword"
								autoComplete="confirm password"
								type={this.state.showConfirmPassword ? 'text' : 'password'}
								value={this.state.confirmPassword}
								onChange={this.handleChange}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												aria-label="toggle password visibility"
												onClick={this.handleClickShowConfirmPassword}
												onMouseDown={this.handleMouseDownConfirmPassword}>
												{(this.state.showConfirmPassword) ? (<VisibilityOff />) : (<Visibility />)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>

							<ThemeProvider theme={this.theme}>
								<div className="columns_container">
									<Grid container
										spacing={2}
										direction="row"
										justify="flex-end"
										alignItems="flex-end"
										wrap="nowrap" >
										<Grid item xs={7}>
											<MuiPickersUtilsProvider utils={DateFnsUtils}>
												<KeyboardDatePicker
													fullWidth
													variant="inline"
													inputVariant="outlined"
													format="MM/dd/yyyy"
													id="date-picker-inline"
													label="Fecha de nacimiento"
													maxDateMessage="Fecha no valida"
													minDateMessage="Fecha no valida"
													invalidDateMessage="Fecha no valida"
													maxDate={new Date()}
													InputAdornmentProps={{ position: "end" }}
													edge="end"
													value={this.state.birthdate}
													onChange={this.handleDateChange}
													KeyboardButtonProps={{
														'aria-label': 'change date',
													}}
												/>
											</MuiPickersUtilsProvider>
										</Grid>
										< Grid item xs={5}>
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
										</Grid>
									</Grid>
								</div>
							</ThemeProvider>

							<this.StyledButton onClick={() => {

								axios.post('https://nysqua-integration.herokuapp.com/users', {
									email: this.state.email,
									password: this.state.password,
									username: this.state.username,
									birthDate: this.state.birthdate,
									gender: this.state.gender,

								}).then((response) => {
									//añadir logica
									console.log(response.data);
								}, (error) => {
									console.log(error);
								});
							}}
								href="/PrefAssistant"
								fullWidth
								focusRipple
								variant="contained"
								size="medium"
								text="bold"
							> Registrate </this.StyledButton>
						</form>
					</div>
				</div>

				<Box mt={5}>
					< div className="login_link" >
						<p className="login_text">
							¿Ya tienes una cuenta? <a href="/SignIn" > Inicia sesion </a>
						</p>
					</div>
				</Box>
			</Container>
		);
	}
}

export default SignUp;