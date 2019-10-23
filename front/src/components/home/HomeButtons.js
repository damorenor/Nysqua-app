import React from 'react';
import Grid from '@material-ui/core/Grid';
import { IconContext } from 'react-icons';
import { FaTshirt }  from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import { FaCompass } from 'react-icons/fa';
import './HomeButtons.css';

function HomeButtons() {
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
                    <div className="home_button_centered">
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
                    <div className="home_button_centered">
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
      </div>
  );
}

export default HomeButtons;