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
import DialogContent from '@material-ui/core/DialogContent';
import Navbar from '../home/Navbar';
import ClothesAssistant from '../ClothesAssistant/ClothesAssistant';
import axios from 'axios';
import './OtherProfile.css';



class OtherProfile extends Component {

    constructor(props) {
      super(props);
      this.state={
          index : 0,
          token:this.props.location.state.token,
          ownerData:this.props.location.state.ownerData,    
          userData:this.props.location.state.userData,
          garmentList: [],

      };

      this.handleToEdit = this.handleToEdit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleChangeIndex = this.handleChangeIndex.bind(this);
      this.renderGarmentList = this.renderGarmentList.bind(this);


      this.gradient = 'linear-gradient(136deg, rgb(242, 113, 33) 0%, rgb(233, 64, 87) 50%, rgb(138, 35, 135) 100%)';

     
    }

    handleChange(event, value){
        console.log(this.state.index);

        this.setState({
            index: value,
        });
    }
    
    handleChangeIndex(index) {
        this.setState({
            index,
        });
    }

    handleToEdit(){
        this.LinkToEditElement.click();
    }

    componentDidMount(){
        this.renderGarmentList();
    }

    
    renderGarmentList() {
        var ctx = this;
        let maxSize = this.state.ownerData.garmentList.length;
        let garmentObjects = [];
        for(var i = 0; i < maxSize; i += 4){
            garmentObjects.push(
        
                    <Grid 
                        container
                        spacing={4}
                        direction = "row"
                        justify = "center">
                        <Grid item xs={3}>
                            {(i < maxSize) ? <ProductCard token= {this.state.token} productData={this.state.ownerData.garmentList[i]} /> : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 1 < maxSize) ? <ProductCard token= {this.state.token} productData={this.state.ownerData.garmentList[i+1]} /> : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 2 < maxSize) ?<ProductCard token= {this.state.token} productData={this.state.ownerData.garmentList[i+2]} /> : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 3 < maxSize) ? <ProductCard token= {this.state.token} productData={this.state.ownerData.garmentList[i+3]} /> : ""}
                        </Grid>
                    </Grid>
              
            );
        }

        this.setState({
            garmentList:garmentObjects
        })
    }



    render(){
        return(
            <div className = "profile_container">
                 <Navbar token = {this.state.token} userData ={this.state.userData} />
                 <div className = "userProfile">
                     <div className = "info_container">
                         <div className = "profilephoto">
                            <img  className ="adjust_photo"  src ={this.state.ownerData.profilePhoto} ></img>
                        </div>
                        <div className = "text_info">
                            <div className="user_name_container_otherProfile">
                                <p className="user_name_text">{this.state.ownerData.username}</p>
                               
                            </div>
                            <p className="user_bio_text">{this.state.ownerData.biography}</p>
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
                                            rating={this.state.ownerData.rating}
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
                                                        <p className="number">{this.state.ownerData.totalExchanges}</p>
                                                        <p>Completados exitosamente</p>
                                                    </div>
                                                    <span className="swap_rating_divider"></span>
                                                    <div className="swap_rate_content">
                                                        <p className="number">{this.state.ownerData.exchangesCanceled}</p>
                                                        <p>Cancelados por el usuario</p>
                                                    </div>
                                                    <span className="swap_rating_divider"></span>
                                                    <div className="swap_rate_content">
                                                        <p className="number">{this.state.ownerData.exchangesCanceledByOthers}</p>
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
                            <Tab label="Intercambios" />
                        </Tabs>
                        <SwipeableViews index={this.state.index} onChangeIndex={this.handleChangeIndex}>
                            <div className= "tab_garment">
            
                                <div className="wardrobe_container">
                            
                                   {this.state.garmentList}
                                </div>
                            </div>
                            
                            <div className= "tab_garment">Aca estaran los intercambios del usuario</div>
                        </SwipeableViews>
                        
                     </div>
                 </div>
            </div>
        )
    }

}


export default OtherProfile;