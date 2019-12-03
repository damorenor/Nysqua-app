import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { IconContext } from "react-icons";
import Slider from 'react-animated-slider';
import {FaChevronCircleLeft} from "react-icons/fa";
import {FaChevronCircleRight} from "react-icons/fa";
import { FaExchangeAlt } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';
import { FiX } from 'react-icons/fi';
import { FiMessageSquare } from "react-icons/fi";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ProductDetails from './ProductDetails';
import route from './Route';

import './ExchangeDetails.css';
class ExchangeDetails extends Component {

    constructor(props) {
        super(props);

        this.state={
            exchangeType: this.props.exchangeType,
            token: this.props.token,
            exchangeID: this.props.exchangeData._id,
            userData: this.props.userData,

            user1ID: this.props.exchangeData.idUserOne,
            user2ID: this.props.exchangeData.idUserTwo,

            user1GarmentID: this.props.exchangeData.idGarmentOne,
            user2GarmentID: this.props.exchangeData.idGarmentTwo,

            user1Data: "",
            user1Photo: "",
            user1Name: "",

            user2Data: "",
            user2Photo: "",
            user2Name: "",
            
            user1Garment:"",
            garment1Images:[],
            garment1Title:"",
            
            user2Garment:"",
            garment2Images:[],
            garment2Title:"",

            garment1DialogOpen: false,
            garment2DialogOpen: false,
        };

        this.handleToUser = this.handleToUser.bind(this);

        this.handleAcceptProposal = this.handleAcceptProposal.bind(this);
        this.handleDeclineProposal = this.handleDeclineProposal.bind(this);

        this.handleDialogGarment1Open = this.handleDialogGarment1Open.bind(this);
        this.handleDialogGarment1Close = this.handleDialogGarment1Close.bind(this);
        this.callbackFunctionGarment1 = this.callbackFunctionGarment1.bind(this);

        this.handleDialogGarment2Open = this.handleDialogGarment2Open.bind(this);
        this.handleDialogGarment2Close = this.handleDialogGarment2Close.bind(this);
        this.callbackFunctionGarment1 = this.callbackFunctionGarment1.bind(this);

        let userGarmentSliderRef;
        let exuserGarmentSliderRef;
    }

    handleAcceptProposal(event){
        const config = {
            headers: {
                'authorization': this.state.token,
            }
        };

        console.log("Accept");
        axios.post(route.url+'/exchange/accept',{
            exchangeID: this.state.exchangeID,
            },config).then((response)=>
                {
                    console.log(response.data); 
                    
               
                }, (error) => {
                console.log(error);
            });
        this.props.parentCallback([true]);
    }

    handleDeclineProposal(event) {
        console.log("Decline");
        const config = {
            headers: {
                'authorization': this.state.token,
            }
        };

        axios.post(route.url+'/exchange/cancel',{
            exchangeID: this.state.exchangeID,
            },config).then((response)=>
                {
                    console.log(response.data); 
                    
               
                }, (error) => {
                console.log(error);
            });
        this.props.parentCallback([true]);
    }

    callbackFunctionGarment1(childData) {
        console.log(childData);
    }

    handleDialogGarment1Open() {
        this.setState({
            garment1DialogOpen: true
        });
    }

    handleDialogGarment1Close() {
        this.setState({
            garment1DialogOpen: false
        });
    }

    callbackFunctionGarment2(childData) {
        console.log(childData);
    }

    handleDialogGarment2Open() {
        this.setState({
            garment2DialogOpen: true
        });
    }

    handleDialogGarment2Close() {
        this.setState({
            garment2DialogOpen: false
        });
    }

    selectButtons(){
        const othersProposalButtons = <div className="exchange_buttons_container">
                                        <div className="exchange_button_container">
                                            <div className="exchange_button" onClick={this.handleAcceptProposal}>
                                                <IconContext.Provider value={{ size: "1.7em ", className: 'exchange_button_icon' }}>
                                                    <FiCheck/>
                                                </IconContext.Provider>
                                            </div>
                                            <p>Aceptar</p>
                                        </div>
                                        <div className="exchange_buttons_margin"></div>
                                        <div className="exchange_button_container">
                                            <div className="exchange_button" onClick={this.handleDeclineProposal}>
                                                <IconContext.Provider value={{ size: "1.7em ", className: 'exchange_button_icon' }}>
                                                    <FiX/>
                                                </IconContext.Provider>
                                            </div>
                                            <p>Rechazar</p>
                                        </div>
                                    </div>;

        const exchangeButtons = <div className="exchange_buttons_container">
                                        <div className="exchange_button_container">
                                            <div className="exchange_button">
                                                <IconContext.Provider value={{ size: "1.7em ", className: 'exchange_button_icon' }}>
                                                    <FiMessageSquare/>
                                                </IconContext.Provider>
                                            </div>
                                            <p>Chat</p>
                                        </div>
                                    </div>;

        const myProposalButtons = <div className="exchange_buttons_container">
                                        <div className="exchange_button_container">
                                            <p>Esta propuesta aun no ha sido respondida</p>
                                        </div>
                                    </div>;

        let ret = null;
        if(this.state.exchangeType == "my proposal"){
            ret = myProposalButtons;
        }else if(this.state.exchangeType == "other proposal"){
            ret = othersProposalButtons;
        }else if (this.state.exchangeType == "exchange") {
            ret = exchangeButtons;
        }

        return ret;
    }

    selectUsersName(name){
        let ret = null;
        if(name === this.props.userData.username){
            ret = <div>
                        <p>Tu</p>
                    </div> ;
        }else{
            var user = this.state.user2Data;;
            var owner  = this.state.user1Data;;

            if(this.state.userData._id == this.state.user1Data._id){
                user = this.state.user1Data;
                owner = this.state.user2Data;
            }

            ret = <div>
                        <p><a className="exchange_user_link" id={this.state.user2Name} onClick={this.handleToUser}>{name}</a></p>
                        <Link to={{
                                pathname: '/OtherProfile',
                                state: {
                                    token: this.state.token,
                                    ownerData: owner,
                                    userData: user,
                                }
                            }}
                            ref={
                                LinkToProfile => this.LinkToProfileElement = LinkToProfile
                            }>
                        </Link>
                    </div> ;
        }

        return ret;
    }

    componentDidMount(){
        const config = {
            headers: {
                'authorization': this.state.token
            }
            };
            axios.post(route.url+'/garment/get',{
                garmentID: this.state.user1GarmentID
                },config).then((response)=>
                    {
                    console.log(response.data);
                    this.setState({ user1Garment: response.data});  
                    this.setState({ garment1Title: response.data.title});

                    var garment1Images = [];

                    for (var i = 0; i < response.data.images.length; i++) {
                        if (response.data.images[i] != "") {
                            garment1Images.push(response.data.images[i]);
                        }
                    }
                    this.setState({
                        garment1Images
                    });
                    console.log(this.state.garment1Images);
                    
                    }, (error) => {
                    console.log(error);
    
                });

            axios.post(route.url+'/garment/get',{
            garmentID: this.state.user2GarmentID
            },config).then((response)=>
                {
                console.log(response.data);
                this.setState({ user2Garment: response.data});  
                this.setState({ garment2Title: response.data.title});

                
                var garment2Images = [];

                for (var i = 0; i < response.data.images.length; i++) {
                    if (response.data.images[i] != "") {
                        garment2Images.push(response.data.images[i]);
                    }
                    
                }
                this.setState({ garment2Images});
                
                
                }, (error) => {
                console.log(error);

              });

            axios.post(route.url+'/users/getUser',{

                userid: this.state.user1ID
                }
                ,config).then((response)=>
                {
                    this.setState({ user1Data: response.data});
                    this.setState({ user1Photo: response.data.profilePhoto});  
                    this.setState({ user1Name: response.data.username});    
         
                    console.log(response.data);

                }, (error) => {
                    console.log(error);
        
                });

            axios.post(route.url+'/users/getUser',{

                userid: this.state.user2ID
                }
                ,config).then((response)=>
                {
                    this.setState({ user2Data: response.data});
                    this.setState({ user2Photo: response.data.profilePhoto});  
                    this.setState({ user2Name: response.data.username});    
         
                    console.log(response.data);

                }, (error) => {
                    console.log(error);
        
                });

    }

    handleToUser(event){
        this.LinkToProfileElement.click();
    }

    render() {
        return (
            <div className="exchange_details_card">
                <Grid container 
                    spacing={0}
                    direction = "row"
                    justify = "center">
                    <Grid item xs={5}>
                        <div className="exchange_details_user_content">
                            <div className="exchange_details_user_info_container">
                                <div className = "exchange_user_profile_photo">
                                    <img  className ="adjust_photo"  src ={this.state.user1Photo} ></img>
                                </div>
                                {this.selectUsersName(this.state.user1Name)}
                            </div>
                            <div className="exchange_user_info_margin"></div>
                            <div>
                                <div className="exchange_garment_container">
                                    <div className="garment">
                                        <IconContext.Provider 
                                            value={{ size: "1.8em ", 
                                                        className: 'exchange_garment_left_arrow'}}>
                                            <FaChevronCircleLeft onClick={() => this.userGarmentSliderRef.previous()}/>
                                        </IconContext.Provider>
                                        <IconContext.Provider 
                                            value={{ size: "1.8em ", 
                                                        className: 'exchange_garment_right_arrow'}}>
                                            <FaChevronCircleRight onClick={() => this.userGarmentSliderRef.next()}/>
                                        </IconContext.Provider>
                                        <div className="exchange_garment_size_label">
                                            <p><span>{this.state.user1Garment.size}</span> </p>
                                        </div>
                                        <div className = "exchange_garment_img_slider_container">
                                            <Slider duration={300}
                                                ref = {
                                                    ref => (this.userGarmentSliderRef = ref)
                                                }
                                                previousButton={null}
                                                nextButton={null}>
                                                {this.state.garment1Images.map((image) => (
                                                    <div className="img_content"
                                                        style={{ background: `url('${image}') no-repeat center center` }}>
                                                        <div className = "img_overlay" onClick = {this.handleDialogGarment1Open}></div>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                                <div className="exchange_garment_title">
                                    <h1>{this.state.garment1Title}</h1>
                                </div>
                            </div>
                        </div>
                    </Grid>    
                    <Grid item xs={2}>
                        <div className="exchange_details_exchange_content">
                            <div className="exchange_details_exchange_info_container">
                                < h1 > {
                                        (this.state.exchangeType == "exchange") ?
                                            "Intercambio" : 
                                            "Propuesta"
                                        } </h1>
                                <IconContext.Provider value={{ size: "4.5em ", className: 'exchange_details_icon' }}>
                                    <FaExchangeAlt/>
                                </IconContext.Provider>
                                {this.selectButtons()}
                            </div>
                        </div>
                    </Grid>   
                    <Grid item xs={5}>
                        <div className="exchange_details_user_content">
                            <div>
                                <div className="exchange_garment_container">
                                    <div className="garment">
                                        <IconContext.Provider 
                                            value={{ size: "1.8em ", 
                                                        className: 'exchange_garment_left_arrow'}}>
                                            <FaChevronCircleLeft onClick={() => this.exuserGarmentSliderRef.previous()}/>
                                        </IconContext.Provider>
                                        <IconContext.Provider 
                                            value={{ size: "1.8em ", 
                                                        className: 'exchange_garment_right_arrow'}}>
                                            <FaChevronCircleRight onClick={() => this.exuserGarmentSliderRef.next()}/>
                                        </IconContext.Provider>
                                        <div className="exchange_garment_size_label">
                                            <p><span>{this.state.user2Garment.size}</span> </p>
                                        </div>
                                        <div className = "exchange_garment_img_slider_container">
                                            <Slider duration={300}
                                                ref = {
                                                    ref => (this.exuserGarmentSliderRef = ref)
                                                }
                                                previousButton={null}
                                                nextButton={null}>
                                                {this.state.garment2Images.map((image) => (
                                                    <div className="img_content"
                                                        style={{ background: `url('${image}') no-repeat center center` }}>
                                                        <div className = "img_overlay"  onClick = {this.handleDialogGarment2Open}></div>
                                                    </div>
                                                ))}
                                            </Slider>
                                        </div>
                                    </div>
                                </div>
                                <div className="exchange_garment_title">
                                    <h1>{this.state.garment2Title}</h1>
                                </div>
                            </div>
                            <div className="exchange_user_info_margin"></div>
                            <div className="exchange_details_user_info_container">
                                <div className = "exchange_user_profile_photo">
                                    <img  className ="adjust_photo"  src ={this.state.user2Photo} ></img>
                                </div>
                                {this.selectUsersName(this.state.user2Name)}
                            </div>
                        </div>
                    </Grid>   
                </Grid>
                <Dialog 
                    className="dialog" 
                    scroll="body"
                    onClose={this.handleDialogGarment1Close} 
                    aria-labelledby="customized-dialog-title" 
                    open={this.state.garment1DialogOpen} 
                    fullWidth={true}>
                    <DialogContent dividers>
                        < ProductDetails token = {
                            this.props.token
                        }
                        productData = {
                            this.state.user1Garment
                        }
                        parentCallback = {
                            this.callbackFunctionGarment1
                        }
                        detailsType={
                            "exchange"
                        }
                        />
                    </DialogContent>
                </Dialog>
                <Dialog 
                    className="dialog" 
                    scroll="body"
                    onClose={this.handleDialogGarment2Close} 
                    aria-labelledby="customized-dialog-title" 
                    open={this.state.garment2DialogOpen} 
                    fullWidth={true}>
                    <DialogContent dividers>
                        < ProductDetails token = {
                            this.props.token
                        }
                        productData = {
                            this.state.user2Garment
                        }
                        parentCallback = {
                            this.callbackFunctionGarment2
                        }
                        detailsType={
                            "exchange"
                        }
                        />
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

}

export default ExchangeDetails;