import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import { FiBell } from 'react-icons/fi';
import { FiUser } from 'react-icons/fi';
import { FiMessageSquare} from 'react-icons/fi';
import { IconContext } from "react-icons";
import { Link } from 'react-router-dom';

import './Navbar.css';
class Navbar extends Component {

    constructor(props) {

        super(props);
        this.state={
          userData: this.props.userData,
          token: this.props.token
          }
          this.handleClick = this.handleClick.bind(this);
          this.handleToUser = this.handleToUser.bind(this);
          this.handleToHome = this.handleToHome.bind(this);

    }
    handleClick() {
	    this.LinkElement.click();
    }
    handleToUser(){
        this.handleClick();
    }
    handleToHome(){
        this.LinkHomeElement.click();
    }
      render(){
          return(      <div className="nav_bar">
          <div className="nav_bar_container">
            <Grid container 
                    spacing={5}
                    direction = "row"
                    justify = "center"
                    alignItems = "center" >
                    <Grid item xs={2}>
                        <div className="logo" onClick={this.handleToHome}>
                           <a ><img src="https://raw.githubusercontent.com/nsaavedraa/imgs/master/nysqua.png"></img></a> 
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
                            <FiBell/>
                            <FiMessageSquare/> 
                            <div onClick={this.handleClick}>
                                <FiUser/>
                            </div>
                            <Link to={{
									pathname: '/UserProfile',
									state: {
                                        token: this.state.token,
                                        userData: this.state.userData
									}
								}}
									ref={
										Link => this.LinkElement = Link
									}>
							</Link>
                            <Link to={{
									pathname: '/Home',
									state: {
                                        token: this.state.token,
                                        userData: this.state.userData
									}
								}}
									ref={
										LinkHome => this.LinkHomeElement = LinkHome
									}>
							</Link>
                            
                        </div>
                    </IconContext.Provider>
                    </Grid>
                </Grid>
            </div>
      </div>
      );
      }
}
export default Navbar;  

