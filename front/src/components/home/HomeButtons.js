import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import { IconContext } from 'react-icons';
import { FaTshirt }  from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { FaCompass } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ClothesAssistant from '../ClothesAssistant/ClothesAssistant';

import './HomeButtons.css';

class HomeButtons extends Component {
   
    constructor(props) {

        super(props);
        this.state={
            userData: this.props.userData,
            token: this.props.token,
            clothesAssistantDialogOpen: false,
            uploadedClothes: false,
        };

        this.handleToUser = this.handleToUser.bind(this);
        this.handleDialogOpen = this.handleDialogOpen.bind(this);
        this.handleDialogClose = this.handleDialogClose.bind(this);
        this.callbackFunction = this.callbackFunction.bind(this);
    }

    componentDidUpdate() {
        if (this.state.uploadedClothes) {
            console.log(this.state.userData.garmentList);
            this.setState({
                uploadedClothes: false
            });
            this.handleDialogClose();
        }
    }

    handleToUser(){
        this.LinkToUserElement.click();
    }

    handleDialogOpen(){
        this.setState({ clothesAssistantDialogOpen: true});
    }

    handleDialogClose(){
        this.setState({ clothesAssistantDialogOpen: false});
    }

    callbackFunction(childData) {
        this.setState({
            userData: childData[0],
            uploadedClothes: childData[1]
        });
    }

    render(){
        return (
            <div className="home_buttons_container">
                  <Grid container 
                      spacing={4}
                      direction = "row"
                      justify = "stretch"
                      alignItems = "stretch"
                      wrap = "nowrap" 
                      spacing = {4}>
                      <Grid item xs={4}>
                          <div className="home_button_centered" onClick={this.handleToUser}>
                              <li>
                                  <div className="ch-item ch-img-1">
                                  <IconContext.Provider value={{ size: "4.5em ", className: 'home-button-icons' }}>
                                      <FaTshirt/>
                                  </IconContext.Provider>
                                  < div className = "ch-info" >
                                      <h3>Mi guardarropa</h3>
                                      <IconContext.Provider value={{ size: "2.3em ", className: 'home-button-icons-hover' }}>
                                          <FaTshirt/>
                                      </IconContext.Provider>
                                  </div>
                                  </div>
                              </li>
                                <Link to={{
                                    pathname: '/UserProfile',
                                    state: {
                                        token: this.state.token,
                                        userData: this.state.userData
                                    }
                                }}
                                ref={
                                    LinkToUser => this.LinkToUserElement = LinkToUser
                                }>
                                </Link>
                          </div>
                      </Grid>
                      <Grid item xs={4}>
                          <div className="home_button_centered">
                              <li>
                                  <div className="ch-item ch-img-2">
                                  <IconContext.Provider value={{ size: "4.5em ", className: 'home-button-icons' }}>
                                      <FaExchangeAlt/>
                                  </IconContext.Provider>
                                  < div className = "ch-info" >
                                      <h3>Mis intercambios</h3>
                                      <IconContext.Provider value={{ size: "2.3em ", className: 'home-button-icons-hover' }}>
                                          <FaExchangeAlt/>
                                      </IconContext.Provider>
                                  </div>
                                  </div>
                              </li>
                          </div>
                      </Grid>
                      <Grid item xs={4}>
                          <div className="home_button_centered" onClick={this.handleDialogOpen}>
                              <li>
                                  <div className="ch-item ch-img-3">
                                  <IconContext.Provider value={{ size: "4.5em ", className: 'home-button-icons' }}>
                                      <FiUpload/>
                                  </IconContext.Provider>
                                  < div className = "ch-info" >
                                      <h3>Subir una prenda</h3>
                                      <IconContext.Provider value={{ size: "2.3em ", className: 'home-button-icons-hover' }}>
                                          <FiUpload/>
                                      </IconContext.Provider>
                                  </div>
                                  </div>
                              </li>
                          </div>
                      </Grid>
                      <Grid item xs={4}>
                          <div className="home_button_centered">
                              <li>
                                  <div className="ch-item ch-img-4">
                                  <IconContext.Provider value={{ size: "4.5em ", className: 'home-button-icons' }}>
                                      <FaCompass/>
                                  </IconContext.Provider>
                                  < div className = "ch-info" >
                                      <h3>Explorar</h3>
                                      <IconContext.Provider value={{ size: "2.5em ", className: 'home-button-icons-hover' }}>
                                          <FaCompass/>
                                      </IconContext.Provider>
                                  </div>
                                  </div>
                              </li>
                          </div>
                      </Grid>
                  </Grid>
                  <Dialog onClose={this.handleDialogClose} aria-labelledby="customized-dialog-title" open={this.state.clothesAssistantDialogOpen} fullWidth={true}>
                        <DialogContent dividers>
                            <ClothesAssistant token = {this.state.token} userData ={this.state.userData} parentCallback = {this.callbackFunction}/>
                        </DialogContent>
                    </Dialog>
            </div>
        );
    }
}



export default HomeButtons;