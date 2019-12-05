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
            
        
        };
        let chatSwipe;
        this.handleToNext = this.handleToNext.bind(this);
        this.handleToCancel = this.handleToCancel.bind(this);
        this.handleToFinish = this.handleToFinish.bind(this);
       
    }
    handleToNext() {
        this.chatSwipe.next();
    }

    handleToCancel() {
        this.chatSwipe.prev();
    }

    handleToFinish(){
        this.props.parentCallback(true);
    }
    
        
        render() {

            return (
            <div className = "chat_dialog_main_container">
                 <ReactSwipe
                    className = "chat_carousel"
                    swipeOptions={{ continuous: false }}
                    ref = {
                        el => (this.chatSwipe = el)
                    } >
                    <div className="chat_content">
                        

                        
                        <div className="chat_btn" onClick={this.handleToNext}>
                            <p>Finalizar Intercambio</p>
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
                        
                      
                        <p className="chat_subtitle">#Nombre de Usuario aún no ha finalizado el intercambio, el intercambio no dejara de estar activo hasta que esto suceda. </p>
                        <div className="chat_buttons_container">
                            <div className="chat_btn" onClick={this.handleToCancel}>
                                <p>Volver al Chat</p>
                            </div>
                            <div className="chat_btn" onClick={this.handleToFinish}>
                                <p>Finalizar Intercambio</p>
                            </div>
                        </div>
                    </div>
                    
                </ReactSwipe>
            </div>)
        }
    
}
export default ChatDialog;