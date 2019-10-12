import React from 'react';
import Grid from '@material-ui/core/Grid';
import './components/signIn/SignIn.css';
import './App.css';
import SingIn from './components/signIn/SignIn.js';

function SingInPage() {
    return (
        <div className="sign_in" >
          <div className= "card">
                <SingIn/>
          </div>
      </div>


      );
}

export default SingInPage;