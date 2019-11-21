import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './ProductCard.css';
import { IconContext } from "react-icons";
import Slider from 'react-animated-slider';
import {FaChevronCircleLeft} from "react-icons/fa";
import {FaChevronCircleRight} from "react-icons/fa";
import axios from 'axios';

class ProductCard extends Component {

    constructor(props) {
        super(props);

        this.state={
             images: "",
            category:"",
            color:"",
            description:"",
            title: "", 
            state:"",
            size:"",
            tags:"",
            idUser:"",
            content:[] 
        };

     

      let sliderRef;
    }

     componentDidMount(){
      const config = {
        headers: {
            'authorization': this.props.token
        }
    };
      axios.post('http://localhost:3001/garment/get',{
        garmentID: this.props.productData
        },config).then((response)=>
            {
                
            this.setState({ images: response.data.images});
            this.setState({ category: response.data.category});
            this.setState({ color: response.data.color});
            this.setState({ descripton: response.data.description});
            this.setState({ title: response.data.title});
            this.setState({ state:response.data.state});
            this.setState({ size: response.data.size});
            this.setState({ tags: response.data.tags});
            this.setState({ idUser: response.data.idUser});
            var aux = this.state.content;

            for(var i=0;i<this.state.images.length;i++){
                if(this.state.images[i] != ""){
                aux.push({
                    image: this.state.images[i],
                });
                }
                
            }
            this.setState({ content: aux});
            console.log(this.state.title) ;
            
            }, (error) => {
            console.log(error);

        });
    }
 
    render() {

        return (
            <div>
                <div className="product_card_container">
                    <div className="product_card">
                        <IconContext.Provider value={{ size: "2.2em ", className: 'product_left_arrow'}}>
                            <FaChevronCircleLeft onClick={() => this.sliderRef.previous()}/>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: "2.2em ", className: 'product_right_arrow'}}>
                            <FaChevronCircleRight onClick={() => this.sliderRef.next()}/>
                        </IconContext.Provider>
                        <div className="size_label">
                            <p><span>{this.state.size}</span> </p>
                        </div>
                        <div className = "img_slider_container" >
                            <Slider duration={300}
                                ref={ref => (this.sliderRef = ref)}
                                previousButton={null}
                                nextButton={null}>
                                {this.state.content.map((item, index) => (
                                    <div className="img_content"
                                        key={index}
                                        style={{ background: `url('${item.image}') no-repeat center center` }}>
                                        <div className="img_overlay" onClick={() => {
                                                console.log("in");
                                        }}> 
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="product_title">
                    <h1>{this.state.title}</h1>
                    <p>Estado: {this.state.state}</p>
                </div>
            </div>
        );
    }
}

export default ProductCard;