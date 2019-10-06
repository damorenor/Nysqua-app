import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { FaBell } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { FaComments} from 'react-icons/fa';
import { IconContext } from "react-icons";

import './Navbar.css';

const  StyledButton = withStyles({
    root: {
      backgroundImage: 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)',
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


function Navbar() {
  return (
      <div className="nav_bar">
          <div className="nav_bar_container">
            <Grid container 
                    spacing={5}
                    direction = "row"
                    justify = "center"
                    alignItems = "center" >
                    <Grid item xs={2}>
                        <div className="logo">
                           <a href="/Home"><img src="https://raw.githubusercontent.com/nsaavedraa/imgs/master/nysqua.png"></img></a> 
                        </div>
                    </Grid>
                    <Grid item xs={7}>
                        <form className="search-container">
                            <input type="text" id="search-bar" placeholder="What can I help you with today?">
                            </input>
                        </form>
                    </Grid>
                    <Grid item xs={3}>
                    <IconContext.Provider value={{ size: "1.9em ", className: 'Nav-icons' }}>
                        <div className="nav_bar_buttons_container">
                            <FaBell/>
                            <FaComments/> 
                            <FaUser/>
                        </div>
                        </IconContext.Provider>
                    </Grid>
                </Grid>
            </div>
      </div>
  );
}

export default Navbar;