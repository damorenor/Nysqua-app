import React from 'react';
import logo from './logo.svg';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import './components/signIn/SignIn.css'
import './components/signUp/SignUp.css'
import SingIn from './components/signIn/SignIn.js';
import SignUp from './components/signUp/SignUp.js';
import SliderSignUp from './components/signUp/SliderSignUp.js';

function SingInPage() {
    return (
        <div className="App" >
        <div className="slider_container">
          <Grid container 
            spacing={4}
            direction = "row"
            justify = "center"
            alignItems = "stretch"
            wrap = "nowrap" >
            <Grid item xs={6} sm={6}>
              <div className="logo_Card">
              <h1>Logo de la aplicacion</h1>
              </div>
            </Grid>
            <Grid item xs={6} sm={6}>
                <div class= "card">
                <SingIn/>
                </div>
           
            </Grid>
          </Grid>
        </div>
      </div>


      );
}

export default SingInPage;