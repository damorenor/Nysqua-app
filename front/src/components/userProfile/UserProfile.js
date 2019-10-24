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
import { FiEdit2 } from 'react-icons/fi';
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
              biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquased do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
                        justify = "center">

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
                         <div className = "profilephoto">
                            <img  className ="adjust_photo"  src ={this.state.userData.profilePhoto} ></img>
                        </div>
                        <div className = "text_info">
                            <div className="user_name_container">
                                <p className="user_name_text">{this.state.userData.username}</p>
                                <div className="user_edit_btn_container">
                                    <div className="user_edit_btn">
                                        <IconContext.Provider value={{ size: "1em", className: 'user_edit_icon'}}>
                                            <FiEdit2 />
                                        </IconContext.Provider>
                                        <p className="user_edit_btn_label">Editar perfil</p>
                                    </div>
                                </div>
                            </div>
                            <p className="user_bio_text">{this.state.userData.biography}</p>
                            <Grid container 
                                direction = "row"
                                justify = "center"
                                alignItems = "center"
                                wrap = "nowrap"
                                spacing={6}>

                                <Grid item xs={6}>
                                    <div className="user_rating_container_container">
                                        <div className="user_rating_container">
                                            <p>Confiabilidad</p>
                                            <StarRatings
                                            rating={this.state.userData.rating}
                                            starRatedColor="black"
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension ="25px"/>
                                            <p className="user_rate_text">Super confiable!</p>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="swap_rating_container_container">
                                        <div className="swap_rating_container_margin">
                                            <div className="swap_rating_container">
                                                <p>Intercambios</p>
                                                <div className="swap_rating">
                                                    <div className="swap_rate_content">
                                                        <p className="number">100</p>
                                                        <p>Completados exitosamente</p>
                                                    </div>
                                                    <span className="swap_rating_divider"></span>
                                                    <div className="swap_rate_content">
                                                        <p className="number">15</p>
                                                        <p>Cancelados por el usuario</p>
                                                    </div>
                                                    <span className="swap_rating_divider"></span>
                                                    <div className="swap_rate_content">
                                                        <p className="number">9</p>
                                                        <p>Cancelados por otros usuarios</p>
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                     </div>
                     <div className = "tabs_container">       
                        <Tabs value={this.state.index} fullWidth onChange={this.handleChange} >
                            <Tab label="Guardarropa" />
                            <Tab label="Mis Catalogos" />
                            <Tab label="Mis Intercambios" />
                        </Tabs>
                        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                            <div className= "tab_garment">
                                <div className="add_clothes_btn_container">
                                    <button className="icon-btn add_clothes-btn">
                                        <div className="add_clothes-icon"></div>
                                        <div className="add_clothes_btn-txt">Nueva Prenda</div>
                                    </button>
                                </div>
                                <div className="wardrobe_container">
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