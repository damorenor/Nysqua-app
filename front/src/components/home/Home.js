import React, { Component } from "react";
import HomeButtons from './HomeButtons';
import './Home.css';
import Navbar from './Navbar';
import Footer from './Footer';
import Banner from './Banner';
import CategoriesBar from './CategoriesBar';
import { Grid } from "@material-ui/core";
import ProductCard from './../productCard';


class Home extends Component {

    constructor(props) {
      super(props);
    }

    render(){
        console.log("datos de usuario");
        console.log(this.props.location.state);
        return(
            <div className="home_container">
                <Navbar />
                <div className="home">
                    <div className="categories-container">
                    <CategoriesBar/>
                    </div>
                    
                    <div className="carouselcontainer">
                            <Banner />       
                    </div>
                    <HomeButtons />
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