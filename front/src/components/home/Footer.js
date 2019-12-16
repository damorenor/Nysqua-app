import React from 'react';
import Grid from '@material-ui/core/Grid';
import { IconContext } from "react-icons";
import { FaFacebookF } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaPinterestP } from 'react-icons/fa';

import './Footer.css';

function Footer() {
  return (
      <div className="footer_container">
            <div className="footer_logo_container">
                <img className="footer_logo" src="https://raw.githubusercontent.com/nsaavedraa/imgs/master/nysqua.png"></img>
                <p className = "footer_description"> En nysqua proponemos una solución tecnológica que le permita a nuestros
                usuarios ofrecer las prendas de vestir que deseen intercambiar con las prendas de otros usuarios que sean de su interés.
                Si deseas conocer más de nuestro proyecto <a className="footer_link" href="https://sites.google.com/view/nysqua/home" target="_blank">
                    haz click aquí</a></p>
            </div>
            <div className="footer_spacing"></div>
            <div className="footer_content_container">
                <div className="footer_contact_content">
                    <div className="footer_contact">
                        <h1>Contacto</h1>
                        <p>+57 (350)-826-3720</p>
                        <p>nysqua@hotmail.com</p>
                        <p>Bogota, Colombia</p>
                    </div>
                </div>
                <div className="footer_divider"></div>
                <div className="footer_social_media_container">
                    <div className="footer_social_media">
                        <h1>Redes sociales</h1>
                        <div className="footer_social_media_btns_container">
                            <IconContext.Provider value={{ size: "2em", className: 'footer_social_media_icons' }}>
                                <Grid container
                                    spacing={4}
                                    direction = "row"
                                    justify = "stretch"
                                    alignItems = "stretch"
                                    wrap = "nowrap" >

                                    <Grid item xs={4}>
                                        <div className="footer_social_media_btn">
                                            <FaFacebookF />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="footer_social_media_btn">
                                            <FaInstagram />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="footer_social_media_btn">
                                            <FaTwitter />
                                        </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <div className="footer_social_media_btn">
                                            <FaPinterestP />
                                        </div>
                                    </Grid>
                                </Grid>
                            </IconContext.Provider>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  );
}

export default Footer;
