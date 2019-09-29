import React from 'react';
import Grid from '@material-ui/core/Grid';
import './components/signIn/SignIn.css';
import './App.css';
import SingIn from './components/signIn/SignIn.js';

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
            <Grid item sm={5}>
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