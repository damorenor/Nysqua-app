import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import ReactSwipe from 'react-swipe';
import { IconContext } from "react-icons";
import Slider from 'react-animated-slider';
import {FaChevronCircleLeft} from "react-icons/fa";
import {FaChevronCircleRight} from "react-icons/fa";

import './ProductDetails.css';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: this.props.productData.images,
            title: this.props.productData.title,
            description: this.props.productData.description,
            idUser: this.props.productData.idUser,
            category: this.props.productData.category,
            subcategory: this.props.productData.subcategory,
            tags: this.props.productData.tags,
            size: this.props.productData.size,
            color: this.props.productData.color,
            state: this.props.productData.state,
            timeUsed: "entre 6 meses y un año",
        };

        this.handletoSwap = this.handletoSwap.bind(this);
        this.handlecancelSwap = this.handlecancelSwap.bind(this);
        this.handleToUser = this.handleToUser.bind(this);
        let productDetailsSwipe;
    }

    handletoSwap() {
        this.productDetailsSwipe.next();
    }

    handlecancelSwap() {
        this.productDetailsSwipe.prev();
    }

    handleToUser(event){
        console.log(event.target.id);
    }
    componentDidMount(){
        let imagesArray = this.state.images;
        for (var i = 0; i < imagesArray.length; i++) {
            if (imagesArray[i] == "") {
                imagesArray.splice(i, 1);
            }
        }
        for (i = 0; i < imagesArray.length; i++) {
            if (imagesArray[i] == "") {
                imagesArray.splice(i, 1);
            }
        }
        this.setState({
            images: imagesArray
        });
    }

    render(){
        let productImages = this.state.images.map(function (image) {
            return(
                <div className="header_img_container"
                    style={{ background: `url('${image}') no-repeat center center` }}>
                    < div className = "img_overlay">
                    </div>
                </div>
            );
        });

        let productTags = this.state.tags.map(function (tag) {
            return(
                <div className="details_header_tag">
                    <p>{tag}</p>
                </div>
            );
        });

        let colorsMap = {
            "white": "#FFFFFF",
            "black": "#000000",
            "gray": "#757575",
            "red": "#C62828",
            "orange": "#EF6C00",
            "yellow": "#FBC02D",
            "green": "#8BC34A",
            "blue": "#2196F3",
            "purple": "#9C27B0",
            "pink": "#E91E63",
        };

        const colorStyle = {
            backgroundColor: colorsMap[this.state.color]
        };

        let colorsTranslation = {
            "white": "Blanco",
            "black": "Negro",
            "gray": "Gris",
            "red": "Rojo",
            "orange": "Naranja",
            "yellow": "Amarillo",
            "green": "Verde",
            "blue": "Azul",
            "purple": "Morado",
            "pink": "Rosa",
        };

        const colorStr = colorsTranslation[this.state.color];

        let time;

        if(this.state.timeUsed == "nuevo"){
            time = "";
        }else{
            time = "Utilizada por un tiempo de " + this.state.timeUsed;
        }

        return(
            <div className="product_details_main_container">
                <ReactSwipe
                    className = "product_details_carousel"
                    swipeOptions={{ continuous: false }}
                    ref = {
                        el => (this.productDetailsSwipe = el)
                    } >
                    <div className="product_details_content">
                        <div className="details_header_container">
                            <div className="details_header_imgs_container">
                                <div className="details_header_imgs">
                                    <div className="details_header_img_content">
                                        <IconContext.Provider value={{ size: "2.2em ", className: 'details_header_left_arrow'}}>
                                            <FaChevronCircleLeft onClick={() => this.sliderRef.previous()}/>
                                        </IconContext.Provider>
                                        <IconContext.Provider value={{ size: "2.2em ", className: 'details_header_right_arrow'}}>
                                            <FaChevronCircleRight onClick={() => this.sliderRef.next()}/>
                                        </IconContext.Provider>
                                        <div className = "details_header_img_slider_container" >
                                            <Slider duration={300}
                                                ref={ref => (this.sliderRef = ref)}
                                                previousButton={null}
                                                nextButton={null}>
                                                {productImages}
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="details_header_desc">
                                <h1>{this.state.title}</h1>
                                <p><span className="bold">Descripcion: </span>{this.state.description}</p>
                                <p><span className="bold">Subido por: </span> 
                                    <a id={this.state.idUser}
                                        onClick={this.handleToUser}>{this.state.idUser}</a></p>
                                <div className="details_header_categories_container">
                                    <div className="details_header_category">
                                        <p>Ropa para {this.state.category}</p>
                                    </div>
                                    <div className="details_header_category">
                                        <p>{this.state.subcategory}</p>
                                    </div>
                                </div>
                                <div className="details_header_tags_container">
                                    {productTags}
                                </div>
                            </div>
                        </div>
                        <div className="product_extra_info_container">
                            <Grid 
                                container
                                spacing={4}
                                direction = "row"
                                justify = "center"
                                alignItems = "center">
                                <Grid item xs={4}>
                                    <div className="details_info_container">
                                        <h1>Talla</h1>
                                            <h2 className="size_txt">{this.state.size.replace("talla ", "")}</h2>
                                    </div>  
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="details_info_container">
                                        <h1>Gama de color</h1>
                                        <div className="details_color" 
                                            style = {colorStyle}>
                                        </div>
                                        <p className="details_color_string">{colorStr}</p>
                                    </div> 
                                </Grid>
                                <Grid item xs={4}>
                                    <div className="details_info_container">
                                        <h1>Estado de la prenda</h1>
                                        <h2 className="state_string">{this.state.state}</h2>
                                        <p className="time_string">{time}</p>
                                    </div> 
                                </Grid>
                            </Grid>
                        </div>
                        <div className="product_details_swap_btn" onClick={this.handletoSwap}>
                            <p>Proponer intercambio</p>
                        </div>
                    </div>
                    <div className="product_details_content">
                        <div className="product_details_swap_btn" onClick={this.handlecancelSwap}>
                            <p>Cancelar intercambio</p>
                        </div>
                    </div>
                </ReactSwipe>
            </div>
        );
    }
}

export default ProductDetails;