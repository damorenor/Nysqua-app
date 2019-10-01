import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
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
import axios from 'axios';

import './SignIn.css';



class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      showPassword: false,
      password: ''
    };

    this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
    this.primaryColor = '#E94057';

    this.handleChange = this.handleChange.bind(this);

    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

    this.handleMouseDownPassword = event => {
      event.preventDefault();
    };


    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: this.primaryColor
        },
      },
    });

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
    this.setState({ [prop]: event.target.value });
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <div className="internal_paper_in">

            <div className="title">
              <h1>Inicia sesion con</h1>
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
                name="password"
                label="Contraseña"
                id="password"
                autoComplete="current-password"
                type={this.state.showPassword ? 'text' : 'password'}
                //value={this.state.password}
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

              <ThemeProvider theme={this.theme}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
              </ThemeProvider>

              < this.StyledButton onClick={() => {
                axios.get('http://localhost:3000/signIn', {
                  userId: this.state.email,
                  pass: this.state.password,
                })
                  .then((response) => {
                    //añadir logica
                    console.log(response.data);
                  }, (error) => {
                    console.log(error);
                  });

              }}
                fullWidth
                focusRipple
                variant="contained"
                size="medium"
                text="bold"
              > Inicia sesion </this.StyledButton>

              <div className="login_link">
                < a href="#"> Olvidaste tu contraseña? </a>
              </div>

            </form>
          </div>
        </div>

        <Box mt={5}>
          < div className="login_link" >
            <p className="login_text">
              No tienes una cuenta? <a href="/SignUp" > Registrate </a>
            </p>
          </div>
        </Box>
      </Container>
    );
  }
}

export default SignIn;
