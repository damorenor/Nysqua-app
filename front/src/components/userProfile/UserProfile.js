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

import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import Navbar from '../home/Navbar';
import ClothesAssistant from '../ClothesAssistant/ClothesAssistant';
import './UserProfile.css';



class UserProfile extends Component {

    constructor(props) {
      super(props);
      this.state={
          index : 0,
          token:this.props.location.state.token,
          userData:this.props.location.state.userData,    
          userDataC : {
              biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquased do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
              username: "Nombre de Usuario",
              rating : 3,
              exchangeList :[],
              garmentList: ["prenda1","prenda2","prenda3","prenda4","prenda5","prenda6","prenda7","prenda8" ,"prenda9","prenda10","prenda11"     ],
              profilePhoto : "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
          },
          clothesAssistantDialogOpen: false
      }

      this.handleToEdit = this.handleToEdit.bind(this);


      this.handleDialogOpen = this.handleDialogOpen.bind(this);
      this.handleDialogClose = this.handleDialogClose.bind(this);

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

    handleToEdit(){
        this.LinkToEditElement.click();


    handleDialogOpen(){
        this.setState({ clothesAssistantDialogOpen: true});
    }

    handleDialogClose(){
        this.setState({ clothesAssistantDialogOpen: false});

    }
 
    render(){
        console.log(this.state.userData);
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
                 <Navbar token = {this.state.token} userData ={this.state.userData} />
                 <div className = "userProfile">
                     <div className = "info_container">
                         <div className = "profilephoto">
                            <img  className ="adjust_photo"  src ={this.state.userData.profilePhoto} ></img>
                        </div>
                        <div className = "text_info">
                            <div className="user_name_container">
                                <p className="user_name_text">{this.state.userData.username}</p>
                                <div className="user_edit_btn_container" onClick={this.handleToEdit}>
                                    <div className="user_edit_btn">
                                        <IconContext.Provider value={{ size: "1em", className: 'user_edit_icon'}}>
                                            <FiEdit2 />
                                        </IconContext.Provider>
                                        <p className="user_edit_btn_label">Editar perfil</p>
                                    </div>
                                    <Link to={{
                                        pathname: '/UserEdit',
                                        state: {
                                            token: this.state.token,
                                            userData: this.state.userData
                                        }
                                        }}
                                        ref={
                                            LinkToEdit => this.LinkToEditElement = LinkToEdit
                                        }>
                                    </Link>
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
                                            rating={4}
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
                                    <button className="icon-btn add_clothes-btn" onClick={this.handleDialogOpen}>
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
                        <Dialog onClose={this.handleDialogClose} aria-labelledby="customized-dialog-title" open={this.state.clothesAssistantDialogOpen} fullWidth={true}>
                            <DialogContent dividers>
                                <ClothesAssistant/>
                            </DialogContent>
                        </Dialog>
                     </div>
                 </div>
            </div>
        )
    }

}


export default UserProfile;