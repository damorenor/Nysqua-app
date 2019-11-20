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
        console.log(this.props.location.state.token)     ;
        const config = {
            headers: {
                'authorization': this.state.token,
            }
        };
        axios.get('http://localhost:3001/users/me',config).then((response2)=>{
                    console.log(response2.data);
                     
                    this.setState({userData : response2.data});    
                    const head = {
                        headers: {
                            'authorization': this.state.token,
                        }
                    }



                    axios.post('http://localhost:3001/garment/preferences',{
                        categories: this.state.userData.categories,
                        subcategories: this.state.userData.subCategories,
                    
                        
                    },head).then((response)=>{
                        console.log(response.data);
                        this.setState({clothes : response.data});    

                    }     , (error) => {
                        console.log(error);
                    })
                    


                  

                }, (error) => {
                console.log(error);
            })

    }

    render(){
        var myElements = [];
        var completes= 0;
        for(var i = 0; i < Math.floor(this.state.clothes.length/4) ; i++) {
            myElements.push(
                <Grid container 
                        spacing={4}
                        direction = "row"
                        justify = "center">

                        <Grid item xs={3}>
                            <ProductCard token= {this.state.token} productData={this.state.clothes[completes]._id} />
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard  token={this.state.token} productData={this.state.clothes[completes+1]._id}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard token= {this.state.token} productData={this.state.clothes[completes+2]._id}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard token= {this.state.token} productData={this.state.clothes[completes+3]._id}/>
                        </Grid>
                </Grid>
                
            );
            completes += 4;
        }
        
  

        
        for(var j = 0; j < Math.floor((this.state.clothes.length-completes)/3) ; j++){
            myElements.push(
                <Grid container 
                        spacing={4}
                        direction = "row"
                        justify = "center">

                        <Grid item xs={3}>
                            <ProductCard token= {this.state.token} productData={this.state.clothes[completes]._id} />
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard  token={this.state.token} productData={this.state.clothes[completes+1]._id}/>
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard token= {this.state.token} productData={this.state.clothes[completes+2]._id}/>
                        </Grid>
                        <Grid item xs={3}>
                            
                        </Grid>
                </Grid>
            );
            completes= completes + 3;
        }
      
        for(var j = 0; j < Math.floor((this.state.clothes.length-completes)/2) ; j++){
            console.log("esto no deberia ejecutarse");
            myElements.push(
                <Grid container 
                        spacing={4}
                        direction = "row"
                        justify = "center">

                        <Grid item xs={3}>
                            <ProductCard token= {this.state.token} productData={this.state.clothes[completes]._id} />
                        </Grid>
                        <Grid item xs={3}>
                            <ProductCard  token={this.state.token} productData={this.state.clothes[completes+1]._id}/>
                        </Grid>
                        <Grid item xs={3}>
                            
                        </Grid>
                        <Grid item xs={3}>
                            
                        </Grid>
                </Grid>
            );
            completes = completes +2;
        }
        for(var j = 0; j < Math.floor((this.state.clothes.length-completes)) ; j++){
            myElements.push(
                <Grid container 
                        spacing={4}
                        direction = "row"
                        justify = "center">

                        <Grid item xs={3}>
                            <ProductCard token= {this.state.token} productData={this.state.clothes[completes]._id} />
                        </Grid>
                        <Grid item xs={3}>
                            
                        </Grid>
                        <Grid item xs={3}>
                            
                        </Grid>
                        <Grid item xs={3}>
                            
                        </Grid>
                </Grid>
            );
            completes = completes +1;
        }



        console.log(this.state.clothes);
        console.log("datos que llegan");
        console.log(this.props.location.state);
        var count = 0;
        var tok = this.state.token;
        const listItems = this.state.clothes.map(function (d) {
            return  (<Grid item xs={3}>
                        <ProductCard token = {tok} productData={d._id}/>
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
                    {myElements}
                   
                </div>
                <Footer />
            </div>
        );
    }
}

export default Home;