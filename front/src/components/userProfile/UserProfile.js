import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
              biography: "texto de biografia",
              username: "Lorem ipsum",
              exchangeList :[],
              garmentList: [],
              profilePhoto : "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
          }
      }
     
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
                                <Grid container 
                                spacing={4}
                                direction = "row"
                                justify = "center"
                                alignItems = "stretch"
                                wrap = "nowrap" >
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