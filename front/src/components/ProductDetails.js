import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import ReactSwipe from 'react-swipe';
import { IconContext } from "react-icons";
import Slider from 'react-animated-slider';
import {FaChevronCircleLeft} from "react-icons/fa";
import {FaChevronCircleRight} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import route from './Route';

import axios from 'axios';


import './ProductDetails.css';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.productData._id,
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
            token: this.props.token,
            ownerData: "",
            userData: "",
            garmentList: [],
            selectedGarmets: [],
            garmentObjects: [],
            detailsType: this.props.detailsType,
        };

        this.handletoSwap = this.handletoSwap.bind(this);
        this.handlecancelSwap = this.handlecancelSwap.bind(this);
        this.handleToUser = this.handleToUser.bind(this);
        this.isTheSameUser = this.isTheSameUser.bind(this);
        this.isExchangeType = this.isExchangeType.bind(this);
        this.handleSwapSubmit = this.handleSwapSubmit.bind(this);
        this.garmentOnClick = this.garmentOnClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        let productDetailsSwipe;
        let wardrobeSliderRef;
    }

    isExchangeType(){
        if(this.state.detailsType == "exchange"){
            return true;
        }
        else{
            return false;
        }
    }

    isTheSameUser(){
        if(this.state.userData._id == this.state.idUser){
            return true;
        }
        else{
            return false;
        }
    }

    handletoSwap() {
        this.productDetailsSwipe.next();
    }

    handlecancelSwap() {
        this.productDetailsSwipe.prev();
    }

    handleToUser(event){
        if(this.isTheSameUser()){
            this.LinkToUserProfileElement.click();
        }
        else{
            this.LinkToProfileElement.click();
        }
       
    }

    searchSelectedGarment(garmentID){
        return this.state.selectedGarmets.includes(garmentID);
    }

    garmentOnClick(event){
        this.state.selectedGarmets.pop();
        this.state.selectedGarmets.push(event.target.id);
        this.renderGarmentList();
        return Promise.resolve();
    }

    handleSwapSubmit(event){
        console.log("submit");
        if(this.state.selectedGarmets.length > 0){
            //ID owner/other user
            console.log(this.state.ownerData._id);

            //Garment details ID
            console.log(this.state.id);

            //Selected garment ID
            console.log(this.state.selectedGarmets);
            const config = {
                headers: {
                    'authorization': this.state.token
                }
            };
            axios.post(route.url+'/exchange/create',{
                otherUser: this.state.ownerData._id,
                garmentInterest: this.state.id,
                ownGarment: this.state.selectedGarmets[0],
                proposalDate: "2019-11-27"
            },config).then((response)=>
            {
                console.log(response.data);
            }, (error) => {
                console.log(error);

            });
            this.props.parentCallback(true);
        }else{
            console.log("error");
        }
        
    }

    buildGarmentCard(garment){
        let clothesSliderRef;
        let garmentSelected = this.searchSelectedGarment(garment.garmentID);
        if (garment.images != undefined){
            return (
                <div>
                    <div className="garment_clothes_container">
                        <div className="garment_clothes">
                            <IconContext.Provider
                                value={{
                                    size: "2.2em ",
                                    className: 'garment_clothes_left_arrow'
                                }}>
                                <FaChevronCircleLeft onClick={() => clothesSliderRef.previous()} />
                            </IconContext.Provider>
                            <IconContext.Provider
                                value={{
                                    size: "2.2em ",
                                    className: 'garment_clothes_right_arrow'
                                }}>
                                <FaChevronCircleRight onClick={() => clothesSliderRef.next()} />
                            </IconContext.Provider>
                            <div className="garment_clothes_size_label">
                                <p><span>{garment.size}</span> </p>
                            </div>
                            <div className={garmentSelected ? "garment_clotehs_img_slider_container_selected" : "garment_clotehs_img_slider_container"} >
                                <Slider duration={300}
                                    ref={
                                        ref => (clothesSliderRef = ref)
                                    }
                                    previousButton={null}
                                    nextButton={null}>
                                    {garment.images.map((image) => (
                                        <div className="img_content"
                                            style={{ background: `url('${image}') no-repeat center center` }}>
                                            <div id={garment.garmentID}
                                                className="img_overlay"
                                                onClick={this.garmentOnClick}>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                    <div className={garmentSelected ? "garment_clothes_title_selected" : "garment_clothes_title"}>
                        <h1>{garmentSelected ? "Seleccionado" : garment.title}</h1>
                    </div>
                </div>
            );
        }else{
            return(<div></div>);
        }
    }

    async componentDidMount(): Promise<void> {
        const config = {
            headers: {
                'authorization': this.state.token
            }
        };

        axios.get(route.url+'/users/me',config).then((response2)=>{
                    console.log(response2.data);
                    this.setState({userData : response2.data}); 
                    let garments = response2.data.garmentList;
                    let garmentList = [];
                    for (let i = 0; i < garments.length; i++) {
                        let garment = {};
                        axios.post(route.url+'/garment/get', {
                            garmentID: garments[i]
                        }, config).then((response2) => {
                            garment.garmentID = response2.data._id;
                            garment.size = response2.data.size;
                            garment.images = response2.data.images;
                            garment.title = response2.data.title;
                            var aux = [];

                            for (var i = 0; i < garment.images.length; i++) {
                                if (garment.images[i] != "") {
                                    aux.push(garment.images[i]);
                                }
                            }
                            garment.images = aux;

                        }, (error) => {
                            console.log(error);
                        });
                        garmentList.push(garment);
                    }

                    this.setState({
                        garmentList
                    })
                }, (error) => {
                console.log(error);
            });

        axios.post(route.url+'/users/getUser',{

            userid: this.state.idUser
            }
            ,config).then((response)=>
            {
                this.setState({ ownerData: response.data});  
            }, (error) => {
                console.log(error);

            });
        
        //await new Promise(resolve => { setTimeout(resolve, 2000); });
        var ctx = this;
        await new Promise(function (resolve, reject) {
            (function waitForFoo() {
                if (ctx.state.garmentList[ctx.state.garmentList.length - 1] != undefined){
                    if (ctx.state.garmentList[ctx.state.garmentList.length - 1].size != undefined &&
                            ctx.state.garmentList[ctx.state.garmentList.length - 1].images != undefined &&
                            ctx.state.garmentList[ctx.state.garmentList.length - 1].title != undefined) {
                        return resolve();
                    }                    
                }
                setTimeout(waitForFoo, 500);
            })();
        });

        let maxSize = this.state.garmentList.length;
        let garmentObjects = [];
        for(var i = 0; i < maxSize; i += 4){
            garmentObjects.push(
                <div className="wardrobe_container_row">
                    <Grid 
                        container
                        spacing={0}
                        direction = "row"
                        justify = "center"
                        alignItems = "center">
                        <Grid item xs={3}>
                            {(i < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i]) : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 1 < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i + 1]) : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 2 < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i + 2]) : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 3 < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i + 3]) : ""}
                        </Grid>
                    </Grid>
                </div> 
            );
        }

        this.setState({
            garmentObjects
        })

        let imagesArray = [];
        console.log(this.state.images);
        for(var i=0;i<this.state.images.length;i++){
            if(this.state.images[i] != ""){
                imagesArray.push(this.state.images[i]);
            }
            
        }

        console.log(imagesArray);
        this.setState({
            images: imagesArray
        });
        return Promise.resolve();
    }
    handleDelete(){
        console.log(this.state.id);
        const config = {
            headers: {
                'authorization': this.state.token
            }
        };
        axios.post(route.url+'/garment/delete',{
            garmentID: this.state.id,
            
            
        },config).then((response)=>
        {
            console.log(response.data);
        }, (error) => {
            console.log(error);

        });
        this.props.parentCallback(true);


    }

    renderGarmentList() {
        var ctx = this;
        let maxSize = this.state.garmentList.length;
        let garmentObjects = [];
        for(var i = 0; i < maxSize; i += 4){
            garmentObjects.push(
                <div className="wardrobe_container_row">
                    <Grid 
                        container
                        spacing={0}
                        direction = "row"
                        justify = "center"
                        alignItems = "center">
                        <Grid item xs={3}>
                            {(i < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i]) : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 1 < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i + 1]) : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 2 < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i + 2]) : ""}
                        </Grid>
                        <Grid item xs={3}>
                            {(i + 3 < maxSize) ? ctx.buildGarmentCard(this.state.garmentList[i + 3]) : ""}
                        </Grid>
                    </Grid>
                </div> 
            );
        }

        this.setState({
            garmentObjects
        })
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

        const renderThumb = ({ style, ...props }) => {
            const thumbStyle = {
                width: "8px", 
                height: "0px",
                marginRight: "0px",
                cursor: "pointer",
                borderRadius: 6,
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            };
            return <div style={{ ...style, ...thumbStyle }} {...props} />;
        };

        const CustomScrollbars = props => (
            <Scrollbars
                renderThumbHorizontal={renderThumb}
                renderThumbVertical={renderThumb}
                {...props}
            />
        );

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
                                    <a id={this.state.ownerData.username}
                                        onClick={this.handleToUser}>{this.state.ownerData.username}</a></p>
                                        <Link to={{
                                        pathname: '/OtherProfile',
                                        state: {
                                            token: this.state.token,
                                            ownerData: this.state.ownerData,
                                            userData: this.state.userData,
                                        }
                                        }}
                                        ref={
                                            LinkToProfile => this.LinkToProfileElement = LinkToProfile
                                        }>
                                         </Link>
                                         <Link to={{
                                        pathname: '/UserProfile',
                                        state: {
                                            token: this.state.token,
                                            userData: this.state.userData,
                                        }
                                        }}
                                        ref={
                                            LinkToUserProfile => this.LinkToUserProfileElement = LinkToUserProfile
                                        }>
                                         </Link>
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
                        {this.isExchangeType()?
                            <div></div> :
                            <div>
                                 {this.isTheSameUser() ? 
                                    <div className="product_details_swap_btn" onClick={this.handleDelete}>
                                        <p>Eliminar Prenda</p>
                                    </div>:
                                    <div className="product_details_swap_btn" onClick={this.handletoSwap}>
                                        <p>Proponer intercambio</p>
                                    </div>} 
                            </div>}

                      

                    </div>
                    <div className="product_details_content">
                        <h1 className="swap_wardrobe_title">Selecciona prendas para realizar el intecambio</h1>
                        <p className="swap_wardrobe_subtitle">Recuerda que puedes seleccionar <span className="swap_wardrobe_subtitle_bold">1 o mas prendas de tu guardaropa</span>  
                                                                para realizar un intercambio. cuando hayas terminado de seleccionar las prendas haz 
                                                                <span className="swap_wardrobe_subtitle_bold">click en enviar propuesta</span> para finalizar el proceso</p>
                        <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                        <div className="wardrobe_ctx">
                            <div className="wardrobe_container">
                                    {this.state.garmentObjects}
                            </div>
                        </div>
                        </CustomScrollbars>
                        <div className="swap_wardrobe_buttons_container">
                            <div className="product_details_swap_btn" onClick={this.handlecancelSwap}>
                                <p>Cancelar intercambio</p>
                            </div>
                            <div className="product_details_swap_btn" onClick={this.handleSwapSubmit}>
                                <p>Enviar propuesta</p>
                            </div>
                        </div>
                    </div>
                </ReactSwipe>
            </div>
        );
    }
}

export default ProductDetails;