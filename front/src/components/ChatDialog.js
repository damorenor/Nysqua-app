import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import route from './Route';
import ReactSwipe from 'react-swipe';
import { IconContext } from "react-icons";
import Slider from 'react-animated-slider';
import {FaChevronCircleLeft} from "react-icons/fa";
import {FaChevronCircleRight} from "react-icons/fa";

import axios from 'axios';
import './ChatDialog.css';


class ChatDialog extends Component {

    constructor(props) {
        super(props);

        this.state={
            chatDialog: "",
            token: this.props.token,
            exchangeID: this.props.exchangeID,
            exchangeData: this.props.exchangeData,
            userData: this.props.userData,
            userId: "",
            otherUserId: "",
            userState: false,
            otherUserState: false,
            otherUserName: "",
        };
        let chatSwipe;
        this.handleToNext = this.handleToNext.bind(this);
        this.handleToprevious = this.handleToprevious.bind(this);
        this.handleToCancel = this.handleToCancel.bind(this);
        this.handleToFinish = this.handleToFinish.bind(this);
       
    }
    handleToNext() {
        this.chatSwipe.next();
    }
    handleToprevious() {
        this.chatSwipe.prev();
    }

    handleToCancel() {

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
                    this.props.parentCallback(true);
                    
               
                }, (error) => {
                console.log(error);
            });
    }

    componentDidMount(){
        if(this.state.userData._id == this.state.exchangeData.idUserOne){
            this.setState({
                userId: this.state.exchangeData.idUserOne,
                otherUserId: this.state.exchangeData.idUserTwo,
                userState : this.state.exchangeData.completeUserOne,
                otherUserState: this.state.exchangeData.completeUserTwo,
               
            });
        }else{
            this.setState({ 
                userId: this.state.exchangeData.idUserTwo,
                otherUserId: this.state.exchangeData.idUserOne,
                userState : this.state.exchangeData.completeUserTwo,
                otherUserState: this.state.exchangeData.completeUserOne,
            });
        }

        if (this.props.user1Name == this.state.userData.username){
            this.setState({
                otherUserName: this.props.user2Name
            });
        }else{
            this.setState({
                otherUserName: this.props.user1Name
            });
        }
    }

    handleToFinish(){
        console.log(this.state.exchangeID);
        console.log(this.state.token);

        const config = {
            headers: {
                'authorization': this.state.token,
            }
        };
        axios.post(route.url+'/exchange/close',{
            exchangeID: this.state.exchangeID,
            },config).then((response)=>
                {
                  console.log(response.data);
                    this.props.parentCallback(true);
                    
               
                }, (error) => {
                console.log(error);
            });
       
    }
    
        
        render() {
            console.log(this.state.exchangeData);
            return (
            <div className = "chat_dialog_main_container">
                 <ReactSwipe
                    className = "chat_carousel"
                    swipeOptions={{ continuous: false }}
                    ref = {
                        el => (this.chatSwipe = el)
                    } >
                    <div className="chat_content">
                        <div class="container clearfix">
                            <div class="chat">
                                <div class="chat-header clearfix">
                                    <img src={this.state.userData.profilePhoto} alt="avatar" />

                                    <div class="chat-about">
                                            <div class="chat-with">{"Chat con " + this.state.otherUserName}</div>
                                            <div class="chat-num-messages">Visto a las 10:32 AM</div>
                                    </div>

                                </div>

                                <div class="chat-history">
                                    <ul className ="chat-list">
                                        <li class="clearfix">
                                            <div class="message-data align-right">
                                                <span class="message-data-time" >10:10 AM, Hoy</span> &nbsp; &nbsp;
                                        <span class="message-data-name" >Tu</span>

                                            </div>
                                            <div class="message other-message float-right">
                                                Hi Vincent, how are you? How is the project coming along?
                                        </div>
                                        </li>

                                        <li>
                                            <div class="message-data">
                                                    <span class="message-data-name"> {this.state.otherUserName}</span>
                                                <span class="message-data-time">10:12 AM, Hoy</span>
                                            </div>
                                            <div class="message my-message">
                                                Are we meeting today? Project has been already finished and I have results to show you.
                                        </div>
                                        </li>

                                        <li class="clearfix">
                                            <div class="message-data align-right">
                                                <span class="message-data-time" >10:14 AM, Hoy</span> &nbsp; &nbsp;
                                        <span class="message-data-name" >Tu</span>

                                            </div>
                                            <div class="message other-message float-right">
                                                Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                                        </div>
                                        </li>

                                        <li>
                                            <div class="message-data">
                                                    <span class="message-data-name">{this.state.otherUserName}</span>
                                                <span class="message-data-time">10:20 AM, Hoy</span>
                                            </div>
                                            <div class="message my-message">
                                                Actually everything was fine. I'm very excited to show this to our team.
                                        </div>
                                        </li>

                                        <li>
                                            <div class="message-data">
                                                    <span class="message-data-name"> {this.state.otherUserName}</span>
                                                <span class="message-data-time">10:31 AM, Hoy</span>
                                            </div>
                                        </li>

                                            <li class="clearfix">
                                                <div class="message-data align-right">
                                                    <span class="message-data-time" >10:14 AM, Hoy</span> &nbsp; &nbsp;
                                        <span class="message-data-name" >Tu</span>

                                                </div>
                                                <div class="message other-message float-right">
                                                    Abuenotemecuidas
                                        </div>
                                            </li>

                                    </ul>
                                </div>
                                <div class="chat-message clearfix">
                                    <textarea name="message-to-send" id="message-to-send" placeholder="Escribe tu mensaje" rows="3"></textarea>
                                    <button>Enviar mensaje</button>
                                </div>

                            </div> 
                            <div className="chat_buttons_container">
                                <div className="chat_btn" onClick={this.handleToCancel}>
                                    <p>Cancelar Intercambio</p>
                                </div>
                                <div className="chat_btn" onClick={this.handleToNext}>
                                    <p>Finalizar Intercambio</p>
                                </div>
                            </div>
                        </div>
    
                        </div>
                    <div className="chat_content">
                        <h1 className="chat_title">¿Estás seguro que deseas finalizar el intercambio?</h1>
                        <div className = "chat_info_container">
                            
                        <p className="chat_subtitle">Finaliza el intercambio solo cuando ya se haya realizado el cambio de prendas en la vida real y todo se encuentre en orden, recuerda que   
                                                              <span className="chat_subtitle_bold"> el intercambio solo finalizara y dejara de esta activo cuando ambos usuarios lo finalicen. </span></p>
                        <p className="chat_subtitle">Una vez se finalizado el intercambio el canal de chat será cerrado para ambos usuarios, así que es muy importante que solo 
                                                    finalices el intercambio cuando todo está en orden.</p>

                        </div>
                        
                      
                        <p className="chat_subtitle">
                                {(!this.state.otherUserState) ? this.state.otherUserName + " aún no ha finalizado el intercambio, el intercambio no dejara de estar activo hasta que esto suceda." : 
                                this.state.otherUserName +" ya finalizo el intercambio, una vez tu lo finalices este quedara totalmente completo"}    
                        </p>
                            <div className={!this.state.userState ? "chat_buttons_container" : "chat_buttons_container_2"}>
                                <div className="chat_btn" onClick={this.handleToprevious}>
                                <p>Volver al Chat</p>
                            </div>
                            {(this.state.userState && !this.state.otherUserState) ? <div></div>: <div className="chat_btn" onClick={this.handleToFinish}>
                                <p>Finalizar Intercambio</p>
                            </div>}
                        </div>
                    </div>
                    
                </ReactSwipe>
            </div>)
        }
    
}
export default ChatDialog;