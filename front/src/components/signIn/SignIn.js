import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { IconContext } from "react-icons";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import route from "../Route";
import ReCAPTCHA from "react-google-recaptcha";
import validator from "validator";
import "./SignIn.css";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: "",
      email: "",
      showPassword: false,
      password: "",
      error: false,
      dialogOpen: false,

      captchaExpired: false,
      captchaValue: null,
      usuarioValido: false,
    };
    this._reCaptchaRef = React.createRef();
    this.gradient =
      "linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)";
    this.primaryColor = "#E94057";

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleToAssistant = this.handleToAssistant.bind(this);
    this.onClickLogin = this.onClickLogin.bind(this);
    this.handleCaptchaChange = this.handleCaptchaChange.bind(this);

    this.handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    this.theme = createMuiTheme({
      palette: {
        primary: {
          main: this.primaryColor,
        },
        fontFamily: '"Product Sans"',
      },
    });

    this.StyledTextField = withStyles({
      root: {
        marginTop: "1.2vh",
        fontFamily: "Product Sans !important",
        "& label.Mui-focused": {
          color: this.primaryColor,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: this.primaryColor,
        },
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "rgba(0, 0, 0, 0.3);",
          },
          "&:hover fieldset": {
            borderColor: "rgba(0, 0, 0, 0.6);",
          },
          "&.Mui-focused fieldset": {
            borderColor: this.primaryColor,
          },
        },
      },
    })(TextField);

    this.StyledButton = withStyles({
      root: {
        backgroundImage: this.gradient,
        fontFamily: "Product Sans",
        borderRadius: 3,
        border: 0,
        color: "white",
        height: 48,
        padding: "0 30px",
        boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
        margin: "1vh 0vw 1vh 0vh",
        fontSize: "1.05rem",
        transitionProperty: "opacity",
        transitionDuration: "0.1s",
        "&:hover": {
          opacity: 0.9,
        },
        "&:active": {
          boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
        },
      },
      label: {
        textTransform: "capitalize",
      },
    })(Button);

    this.SocialMedia = withStyles({
      root: {
        border: "1px solid rgba(0, 0, 0, 0.3)",
        borderRadius: "50% !important",
        color: "rgba(0, 0, 0, 0.5)",
        backgroundColor: "white",
        boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
        padding: "16px 15px",
        fontSize: "0.95rem",
        transitionProperty: "color, border",
        transitionDuration: "0.2s, 0.2s",
        "&:hover": {
          color: this.primaryColor,
          border: "1px solid #E94057",
          backgroundColor: "white",
        },
        "&:active": {
          boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
        },
      },
    })(Button);
  }

  handleChange(event) {
    var prop = String(event.target.id);
    this.checkEmail();
    this.checkPassword();
    this.setState({ [prop]: event.target.value });
  }
  checkEmail() {
    if (validator.isEmail(this.state.email)) {
      console.warn("El correo tiene un formato correcto");
    } else {
      console.error(
        "Error de validación: el campo correo debe cumplir el formato xxxx@yyy.zzz"
      );
    }
  }
  checkPassword() {
    if (validator.isStrongPassword(this.state.password)) {
      console.warn("La contraseña cumple el formato seguro");
    } else {
      console.error(
        "Error de validación: el campo contraseña no tiene almenos 8 caracteres, una minuscula, una mayuscula, un numero y un caracter especial "
      );
    }
  }

  handleClickShowPassword() {
    this.setState({ showPassword: !this.state.showPassword });
  }

  handleClick(udata) {
    this.setState({
      userData: udata,
    });
    this.LinkElement.click();
  }

  handleToAssistant(udata) {
    this.setState({
      userData: udata,
    });
    this.LinkToAssistantElement.click();
  }

  handleDialogOpen() {
    this.setState({ dialogOpen: true });
  }

  handleDialogClose() {
    this.setState({ dialogOpen: false });
  }

  handleCaptchaChange(value) {
    console.log("Captcha value:", value);
    console.log(value === null);

    if (value === null) {
      this.setState({ captchaExpired: true });
      console.log("handle captcha value is null");
    } else {
      this.setState({ captchaValue: value });
      console.log("handle captcha seting value state");
    }
  }

  onClickLogin = (e) => {
    e.preventDefault();
    if (this.state.email !== "" && this.state.password !== "") {
      this.setState({ usuarioValido: true });
      console.log("usuario valido");
      if (!this.state.captchaExpired && this.state.captchaValue) {
        console.log(
          "Captcha expirado?: ",
          this.state.captchaExpired,
          "value: ",
          this.state.captchaValue
        );

        axios
          .post(route.url + "/users/login", {
            email: this.state.email,
            password: this.state.password,
          })
          .then(
            (response) => {
              //añadir logica
              var data = "";
              console.log(response.data);
              data = response.data;
              this.setState({
                error: false,
              });
              this.handleClick(data);
            },
            (error) => {
              console.log(error);
              this.setState({
                error: true,
              });
            }
          );
      } else {
        console.log(
          "Captcha expirado?: ",
          this.state.captchaExpired,
          "value: ",
          this.state.captchaValue
        );
      }
    } else {
      this.setState({ usuarioValido: false });
      console.log("usuario invalido");
    }
  };

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
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <FacebookLogin
                      appId="974527812899696"
                      autoLoad={false}
                      fields="name,email,picture,id"
                      callback={(response) => {
                        console.log(response.accessToken);
                        axios
                          .post(route.url + "/authentication/oauth/facebook", {
                            access_token: response.accessToken,
                          })
                          .then(
                            (resp) => {
                              //añadir logica
                              var data = "";
                              console.log(resp.data);
                              data = resp.data;
                              if (data.user.profilePhoto === "undefined") {
                                this.handleToAssistant(data);
                              } else {
                                this.handleClick(data);
                              }
                            },
                            (error) => {
                              console.log(error);
                            }
                          );
                      }}
                      render={(renderProps) => (
                        <div
                          className="social_media_btn"
                          onClick={renderProps.onClick}
                        >
                          <this.SocialMedia
                            type="submit"
                            variant="contained"
                            size="medium"
                            text="bold"
                          >
                            <IconContext.Provider
                              value={{
                                size: "1.9em",
                                className: "react-icons",
                              }}
                            >
                              <div>
                                <FaFacebookF />
                              </div>
                            </IconContext.Provider>
                          </this.SocialMedia>
                        </div>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <GoogleLogin
                      clientId="568886817959-8j3mo86mfato65k3qdj65jjlmemih428.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <div
                          className="social_media_btn"
                          onClick={renderProps.onClick}
                        >
                          <this.SocialMedia
                            type="submit"
                            variant="contained"
                            size="medium"
                            text="bold"
                          >
                            <IconContext.Provider
                              value={{
                                size: "1.9em ",
                                className: "react-icons",
                              }}
                            >
                              <div>
                                <FaGoogle />
                              </div>
                            </IconContext.Provider>
                          </this.SocialMedia>
                        </div>
                      )}
                      onSuccess={(response) => {
                        console.log(response.Zi.access_token);
                        axios
                          .post(route.url + "/authentication/oauth/google", {
                            access_token: response.Zi.access_token,
                          })
                          .then(
                            (resp) => {
                              var data = "";
                              console.log(resp.data);
                              data = resp.data;
                              if (data.user.profilePhoto === "undefined") {
                                this.handleToAssistant(data);
                              } else {
                                this.handleClick(data);
                              }
                            },
                            (error) => {
                              console.log(error);
                            }
                          );
                      }}
                      onFailure={(response) => {
                        console.log("Google Error");
                        console.log(response);
                      }}
                      cookiePolicy={"single_host_origin"}
                    />
                  </Grid>
                </Grid>
              </ThemeProvider>
            </div>

            <div id="or">O</div>

            <div
              className="error_msg"
              style={this.state.error ? {} : { display: "none" }}
            >
              <div className="help">
                <IconContext.Provider
                  value={{ size: "2.2em ", className: "help_icon" }}
                >
                  <div>
                    <FaQuestionCircle onClick={this.handleDialogOpen} />
                  </div>
                </IconContext.Provider>
              </div>
              <span>
                Correo electrónico o contraseña incorrectos. Por favor inténtalo
                nuevamente
              </span>
            </div>

            <div
              className="error_msg"
              style={this.state.captchaExpired ? {} : { display: "none" }}
            >
              <span>Completa el captcha</span>
            </div>

            <Dialog
              onClose={this.handleDialogClose}
              aria-labelledby="customized-dialog-title"
              open={this.state.dialogOpen}
              fullWidth={true}
            >
              <DialogTitle
                className="dialog_title"
                id="customized-dialog-title"
                onClose={this.handleDialogClose}
              >
                ¿Problemas con tu inicio de sesión?
              </DialogTitle>
              <DialogContent dividers>
                <div className="dialog_content">
                  <p>
                    Recuerda escribir una dirección de correo válida
                    (nombre@dominio.com) y ten cuidado con las mayúsculas al
                    momento de escribir tu contraseña.
                  </p>
                  <p>
                    Si aún no tienes una cuenta,{" "}
                    <a href="/SignUp"> Regístrate aquí </a>
                  </p>
                </div>
              </DialogContent>
              <DialogActions>
                <ThemeProvider theme={this.theme}>
                  <Button onClick={this.handleDialogClose}>cerrar</Button>
                </ThemeProvider>
              </DialogActions>
            </Dialog>

            <form className="form" noValidate onSubmit={this.onSubmit}>
              <this.StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                onChange={this.handleChange}
              />

              <this.StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                label="Contraseña"
                id="password"
                autoComplete="current-password"
                type={this.state.showPassword ? "text" : "password"}
                //value={this.state.password}
                onChange={this.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={this.handleClickShowPassword}
                        onMouseDown={this.handleMouseDownPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <ThemeProvider theme={this.theme}>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Recuerdame"
                />
              </ThemeProvider>
              <div>
                <this.StyledButton
                  /* href="/PrefAssistant" */
                  fullWidth
                  focusRipple
                  variant="contained"
                  size="medium"
                  text="bold"
                  onClick={this.onClickLogin}
                >
                  Inicia sesion
                </this.StyledButton>
                <Link
                  to={{
                    pathname: "/Home",
                    state: {
                      token: this.state.userData.token,
                      userData: this.state.userData.user,
                    },
                  }}
                  ref={(Link) => (this.LinkElement = Link)}
                ></Link>
                <Link
                  to={{
                    pathname: "/PrefAssistant",
                    state: {
                      token: this.state.userData,
                      userData: this.state.userData.user,
                    },
                  }}
                  ref={(Link) => (this.LinkToAssistantElement = Link)}
                ></Link>
              </div>

              <div className="login_link">
                <a href="#"> ¿Olvidaste tu contraseña? </a>
              </div>
              <ReCAPTCHA
                onChange={this.handleCaptchaChange}
                sitekey="6Lf4gVoeAAAAAEoi7WgrcYI5Nk-EIRzKvUM2Z8RW"
                style={{ display: "inline-block" }}
                ref={this._reCaptchaRef}
              />
            </form>
          </div>
        </div>

        <Box mt={5}>
          <div className="login_link">
            <p>
              ¿No tienes una cuenta? <a href="/SignUp"> Regístrate </a>
            </p>
          </div>
        </Box>
      </Container>
    );
  }
}

export default SignIn;
