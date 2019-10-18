import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { IconContext } from "react-icons";
import StarRatings from 'react-star-ratings';
import { FaPlus } from 'react-icons/fa';
import SwipeableViews from 'react-swipeable-views';
import ProductCard from './../productCard';

import Navbar from '../home/Navbar';
import './UserProfile.css';



class UserProfile extends Component {

    constructor(props) {
      super(props);
      this.state={
          index : 0,    
          userData : {
              biography: "Texto de biografia",
              username: "Nombre de Usuario",
              rating : 3,
              exchangeList :[],
              garmentList: ["prenda1","prenda2","prenda3","prenda4","prenda5","prenda6","prenda7","prenda8" ,"prenda9","prenda10","prenda11"     ],
              profilePhoto : "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
          }

      }
      this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';
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
    handleChange = (event, value) => {
        console.log(this.state.index);

        this.setState({
          index: value,
        });
      };
    
      handleChangeIndex = index => {
        this.setState({
          index,
        });
      };
 
    render(){
        var myElements = [];
        var completes= this.state.userData.garmentList.length - (this.state.userData.garmentList.length %  4);
        for(var i = 0; i < Math.floor(this.state.userData.garmentList.length/4) ; i++) {
            myElements.push(
                <Grid container 
                        spacing={4}
                        direction = "row"
                        justify = "center"
                        alignItems = "stretch"
                        wrap = "nowrap" 
                        className = "products_margin">

                            <Grid item xs={3}>
                                <ProductCard/>
                            </Grid>
                            <Grid item xs={3}>
                                <ProductCard/>
                            </Grid>
                            <Grid item xs={3}>
                                <ProductCard/>
                            </Grid>
                            <Grid item xs={3}>
                                <ProductCard/>
                            </Grid>
                </Grid>
            );
        };



        return(
            <div className = "profile_container">
                 <Navbar />
                 <div className = "userProfile">
                     <div className = "info_container">
                        <Grid container 
                        direction="row"
                        justify="center"
                        alignItems="center">
                            <Grid item xs={4}>
                                <div className = "profilephoto">
                                <img  className ="adjust_photo"  src ={this.state.userData.profilePhoto} ></img>
                                </div>
                            </Grid>
                            <Grid item xs={8}>
                                <div className = "text_info">
                                    <p>{this.state.userData.username}</p>
                                    <StarRatings
                                    rating={this.state.userData.rating}
                                    starRatedColor="black"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension ="25px"
                                    />
                                    <p>{this.state.userData.biography}</p>
                                 
                                    <p>Intercambios</p> 
                                </div>
                            </Grid>
                        </Grid>
                     </div>
                     <div className = "tabs_container">       
                        <Tabs value={this.state.index} fullWidth onChange={this.handleChange} >
                            <Tab label="Guardarropa" />
                            <Tab label="Mis Catalogos" />
                            <Tab label="Mis Intercambios" />
                        </Tabs>
                        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                            <div className= "tab_garment">
                                <Grid
                                container 
                                direction = "column"
                                justify = "center"
                                alignItems = "center"
                                wrap = "nowrap">
                                <Grid item xs={4}>
                                <this.StyledButton 
									fullWidth
									focusRipple
									variant="contained"
									size="medium"
									text="bold"
								>
                                <IconContext.Provider value={{ className: 'button_icon' }}>
                                    <div>
                                    <FaPlus/> 
                                    </div>
                                </IconContext.Provider>
                                  Añadir prenda
							</this.StyledButton>    
                                </Grid>
                                </Grid>

                                <div>
                                {myElements}
                            </div>
                                
                                
                            </div>

                            <div className= "tab_garment">Aca estaran los catalogos del usuario</div>

                            <div className= "tab_garment">Aca estaran los intercambios del usuario</div>
                        </SwipeableViews>
               
                     </div>

                 </div>
            </div>
        )
    }

}


export default UserProfile;