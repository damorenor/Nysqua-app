import React from 'react';
import Grid from '@material-ui/core/Grid';
import { IconContext } from 'react-icons';
import { FaTshirt }  from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaCompass } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi';
import './InfoCards.css';

function InfoCards() {
  return (
      <div className="info_cards_container">
            <Grid container 
                spacing={4}
                direction = "row"
                justify = "stretch"
                alignItems = "stretch"
                wrap = "nowrap" >
                <Grid item xs={3}>
                    <div className="card-container"> 
                        <div className="info_card card--dark"><a href="">
                            <div className="card--display">
                                <IconContext.Provider value={{ className: "info_icon" }}>
                                    <div>
                                        <FaTshirt />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div className="card--hover">
                                <h2>Mi guardarropa</h2>
                            </div></a>
                            <div className="card--border"></div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="card-container"> 
                        <div className="info_card card--dark"><a href="">
                            <div className="card--display">
                                <IconContext.Provider value={{ className: "info_icon" }}>
                                    <div>
                                        <FaExchangeAlt />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div className="card--hover">
                                <h2>Mis intercambios</h2>
                            </div></a>
                            <div className="card--border"></div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="card-container"> 
                        <div className="info_card card--dark"><a href="">
                            <div className="card--display">
                                <IconContext.Provider value={{ className: "info_icon" }}>
                                    <div>
                                        <FiUpload />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div className="card--hover">
                                <h2>Sube una prenda</h2>
                            </div></a>
                            <div className="card--border"></div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={3}>
                    <div className="card-container"> 
                        <div className="info_card card--dark"><a href="">
                            <div className="card--display">
                                <IconContext.Provider value={{ className: "info_icon" }}>
                                    <div>
                                        <FaCompass />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div className="card--hover">
                                <h2>Explora</h2>
                            </div></a>
                            <div className="card--border"></div>
                        </div>
                    </div>
                </Grid>
            </Grid>
      </div>
  );
}

export default InfoCards;