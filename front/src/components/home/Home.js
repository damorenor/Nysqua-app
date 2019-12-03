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
import route from '../Route';



class Home extends Component {
   

    constructor(props) {

      super(props);
        this.state={
            userData: this.props.location.state.userData,
            token: this.props.location.state.token,
            clothes : [],
            garmentList: [],
        };

        this.handleToUser = this.handleToUser.bind(this);
        this.renderGarmentList = this.renderGarmentList.bind(this);
    }

    handleToUser(){
        this.LinkToUserElement.click();

    }
    
    componentDidMount(){
        console.log("info flag");
        console.log(this.props.location.state.token)     ;
        const config = {
            headers: {
                'authorization': this.state.token,
            }
        };
        axios.get(route.url+'/users/me',config).then((response2)=>{
                    console.log(response2.data);
                     
                    this.setState({userData : response2.data});   
                    
                    const head = {
                        headers: {
                            'authorization': this.state.token,
                        }
                    }


                    console.log(this.state.userData.subCategories);
                    axios.post(route.url+'/garment/preferences',{
                        categories: this.state.userData.categories,
                        subcategories: this.state.userData.subCategories,
                    
                        
                    },head).then((response)=>{
                        console.log(response.data);
                        this.setState({clothes : response.data});    
                        this.renderGarmentList();    

                    }     , (error) => {
                        console.log(error);
                    })
                    


                  

                }, (error) => {
                console.log(error);
            })

    }

    renderGarmentList() {
        var ctx = this;
        let maxSize = this.state.clothes.length;
        let garmentObjects = [];
        for(var i = 0; i < maxSize; i += 4){
            garmentObjects.push(
        
                    <Grid 
                        container
                        spacing={4}
                        direction = "row"
                        justify = "center">
                        <Grid item xs={3}>
                            {(i < maxSize) ? <ProductCard token= {this.state.token} productData={this.state.clothes[i]} /> : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 1 < maxSize) ? <ProductCard token= {this.state.token} productData={this.state.clothes[i+1]} /> : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 2 < maxSize) ?<ProductCard token= {this.state.token} productData={this.state.clothes[i+2]} /> : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 3 < maxSize) ? <ProductCard token= {this.state.token} productData={this.state.clothes[i+3]} /> : ""}
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
            <div className="home_container">
                <Navbar token = {this.state.token} userData ={this.state.userData} />
                <div className="home">
                    <div className="categories-container">
                    <CategoriesBar token = {this.state.token} userData ={this.state.userData} />
                    </div>
                    
                    <div className="carouselcontainer">
                        <Banner />       
                    </div>
                    <HomeButtons token = {this.state.token} 
                                 userData ={this.state.userData}/>
                    <h1 className="heading-1">Recomendado para ti</h1>
                    <div className="divider-1"> <span></span></div>
                   
                   {this.state.garmentList} 
         
                  
                   
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;