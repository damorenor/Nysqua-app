import React, { Component } from "react";
import HomeButtons from './HomeButtons';
import './Home.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Banner from './Banner';
import CategoriesBar from './CategoriesBar';
import { Grid } from "@material-ui/core";
import ProductCard from './../productCard';
import axios from 'axios';



class Home extends Component {
   

    constructor(props) {

      super(props);
      this.state={
        userData: this.props.location.state.userData,
        token: this.props.location.state.token,
        clothes : [],
        }
        this.handleToUser = this.handleToUser.bind(this);
    }
    handleToUser(){
        this.LinkToUserElement.click();

    }
    componentDidMount(){
        const config = {
            headers: {
                'authorization': this.state.token
            }
        };

        console.log(this.state.token);
        for(var i = 0; i< this.state.userData.garmentList.length; i++){
            axios.post('http://localhost:3001/garment/get',{
                garmentID: this.state.userData.garmentList[i]
            },config).then((response)=>
            {
 
                var aux = this.state.clothes;
                aux.push(response.data)
                this.setState({
                    clothes: aux
                });
    
            }, (error) => {
            console.log(error);
    
        })
        }
        
       
    }
    

    render(){
        console.log(this.state.clothes);
        console.log("datos que llegan");
        console.log(this.props.location.state);
        return(
            <div className="home_container">
                <Navbar token = {this.state.token} userData ={this.state.userData} />
                <div className="home">
                    <div className="categories-container">
                    <CategoriesBar/>
                    </div>
                    
                    <div className="carouselcontainer">
                            <Banner />       
                    </div>
                    <HomeButtons token = {this.state.token} userData ={this.state.userData} />
                    <h1 className="heading-1">Recomendado para ti</h1>
                    <div className="divider-1"> <span></span></div>
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
                <Footer />
            </div>
        );
    }
}

export default Home;