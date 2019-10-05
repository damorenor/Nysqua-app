import React from 'react';
import Grid from '@material-ui/core/Grid';
import { IconContext } from 'react-icons';
import { FaHandsHelping }  from 'react-icons/fa';
import { FaLightbulb } from 'react-icons/fa';
import { FaCompass } from 'react-icons/fa';
import './InfoCards.css';

function InfoCards() {
  return (
      <div className="info_cards_container">
            <Grid container 
                spacing={5}
                direction = "row"
                justify = "stretch"
                alignItems = "stretch"
                wrap = "nowrap" >
                <Grid item xs={4}>
                    <div class="card-container"> 
                        <div class="info_card card--dark"><a href="hottub">
                            <div class="card--display">
                                <IconContext.Provider value={{ className: "info_icon" }}>
                                    <div>
                                        <FaHandsHelping />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div class="card--hover">
                                <h2>Mi guardarropa</h2>
                            </div></a>
                            <div class="card--border"></div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div class="card-container"> 
                        <div class="info_card card--dark"><a href="hottub">
                            <div class="card--display">
                                <IconContext.Provider value={{ className: "info_icon" }}>
                                    <div>
                                        <FaLightbulb />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div class="card--hover">
                                <h2>Propone</h2>
                            </div></a>
                            <div class="card--border"></div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div class="card-container"> 
                        <div class="info_card card--dark"><a href="hottub">
                            <div class="card--display">
                                <IconContext.Provider value={{ className: "info_icon" }}>
                                    <div>
                                        <FaCompass />
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div class="card--hover">
                                <h2>Explora</h2>
                            </div></a>
                            <div class="card--border"></div>
                        </div>
                    </div>
                </Grid>
            </Grid>
      </div>
  );
}

export default InfoCards;