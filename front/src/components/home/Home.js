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
        };

        this.handleToUser = this.handleToUser.bind(this);
    }

    handleToUser(){
        this.LinkToUserElement.click();

    }
    
    componentDidMount(){
        console.log("info flag");
        console.log(this.props.location.state.token);
        const config = {
            headers: {
                'authorization': this.state.token,
            }
        };
        axios.get('http://localhost:3001/users/me',config).then((response2)=>{
                    console.log(response2.data);
                    console.log("funciono");    
                    this.setState({userData : response2.data}); 

                }, (error) => {
                console.log(error);
            })
    }

    render(){
        console.log(this.state.clothes);
        console.log("datos que llegan");
        console.log(this.props.location.state);
        var count = 0;
        var tok = this.state.token;
        const listItems = this.state.userData.garmentList.map(function (d) {
            return  (<Grid item xs={3}>
                        <ProductCard token = {tok} productData={d}/>
                    </Grid>);
        });
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
                    <HomeButtons token = {this.state.token} 
                                 userData ={this.state.userData}/>
                    <h1 className="heading-1">Recomendado para ti</h1>
                    <div className="divider-1"> <span></span></div>
                    <Grid container 
                        spacing={4}
                        direction = "row"
                        justify = "center"
                        alignItems = "stretch"
                        wrap = "nowrap" >

                    {listItems}
                    </Grid>
                    {/* <Grid container 
                        spacing={4}
                        direction = "row"
                        justify = "center"
                        alignItems = "stretch"
                        wrap = "nowrap" 
                        className = "products_margin">

                        <Grid item xs={3}>
                            <ProductCard token = {this.state.token} productData={this.state.userData.garmentList[4]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard token = {this.state.token} productData={this.state.userData.garmentList[5]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard token = {this.state.token} productData={this.state.userData.garmentList[6]}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard token = {this.state.token} productData={this.state.userData.garmentList[7]}/>
                        </Grid>
                    </Grid> */}
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;