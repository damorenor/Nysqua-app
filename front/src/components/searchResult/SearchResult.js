import React, { Component } from "react";
import Navbar from '../home/Navbar';
import Footer from '../home/Footer';
import { Grid } from "@material-ui/core";


import ProductCard from './../productCard';

import './SearchResult.css';
class SearchResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token : this.props.location.state.token,
            userData: this.props.location.state.userData,
            clothes: this.props.location.state.clothes,
            labelCategorie:this.props.location.state.labelCategorie,
            labelSubcategorie:this.props.location.state.labelSubcategorie,


        };
        this.isEmpty = this.isEmpty.bind(this);
        this.isCategorieSearch = this.isCategorieSearch.bind(this);
    }

    componentDidMount(){

    }
    isEmpty(){
        if(this.state.clothes.length == 0){
            return true;
        }
        else{
            return false;
        }
    }
    isCategorieSearch(){
        if(this.state.labelSubcategorie == ""){
            return true;
        }
        else{
            return false;
        }
    }
    render() {
        console.log(this.state.clothes);
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


        return (
            <div className="results_container">
             <Navbar token = {this.state.token} userData ={this.state.userData} />

            <div className="results">


              {this.isCategorieSearch()? <h1 className="heading-1">Resultados de {this.state.labelCategorie} </h1> : <h1 className="heading-1"> Resultados de {this.state.labelSubcategorie} para {this.state.labelCategorie}  </h1>}

             <div className="divider-1"> <span></span></div>
            { this.isEmpty() ?<p>Lo sentimos, no se encontraron resultados para esta búsqueda</p>:myElements}    

            </div>
            <Footer />
        </div>

        )
    }

}

export default SearchResult;
