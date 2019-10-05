import React, { Component } from "react";
import InfoCards from './InfoCards';
import './Home.css';
import Navbar from './Navbar';
import ProductCards from './ProductCards';
import Banner from './Banner';


class Home extends Component {

    constructor(props) {
      super(props);
    }

    render(){
        return(
            
            <div className="home_container">
                <Navbar />
                <div className="home">
                    <div className="carouselcontainer">
                            <Banner />       
                    </div>
                    <InfoCards />
                    <h1 className="heading-1">Recomendado para ti</h1>
                    <div className="divider-1"> <span></span></div>
                </div>
            </div>
        );
    }
}

export default Home;