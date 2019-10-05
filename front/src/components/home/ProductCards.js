import React, { Component } from 'react';
import './ProductCards.css';
import Grid from '@material-ui/core/Grid';
import { IconContext } from 'react-icons';
import { FaHandsHelping } from 'react-icons/fa'

class ProductCards extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div class="project_card">
                <div className="project_card_overlay"></div>
                <div className="project_card_content">
                    <Grid container
                        spacing={2}
                        direction="row"
                        justify="flex-end"
                        alignItems="flex-end"
                        wrap="nowrap" >
                        <Grid item xs={9}>
                            <div className="project_card_text_content">
                                <h1>{this.props.title}</h1>
                                <p>{this.props.description}</p>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <IconContext.Provider value={{ className: "categories_icon" }}>
                                <div>
                                    <FaHandsHelping />
                                </div>
                            </IconContext.Provider>
                        </Grid>
                    </Grid>
                </div>
                <div class="card_image">
                    <img src="http://www.illuminationworksllc.com/wp-content/uploads/2017/04/ProjectManagement-1.jpg" />
                </div>
            </div>
        );
    }
}

export default ProductCards;