import React from 'react';
import Grid from '@material-ui/core/Grid';
import './components/signUp/SignUp.css';
import SignUp from './components/signUp/SignUp.js';
import './App.css';
import SliderSignUp from './components/signUp/SliderSignUp.js';

function SignUpPage() {
  return (
    <div className="sign_up" >
      <div className="slider_container">
        <Grid container 
          spacing={4}
          direction = "row"
          justify = "center"
          alignItems = "stretch"
          wrap = "nowrap" >
          <Grid item xs={6} sm={6}>
            <SliderSignUp />
          </Grid>
          <Grid item xs={6} sm={5}>
            <div className="card">
              <SignUp/>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default SignUpPage;