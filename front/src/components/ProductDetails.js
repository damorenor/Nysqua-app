import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import ReactSwipe from 'react-swipe';

import './ProductDetails.css';

class ProductDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

        this.handletoSwap = this.handletoSwap.bind(this);
        this.handlecancelSwap = this.handlecancelSwap.bind(this);
        let productDetailsSwipe;
    }

    handletoSwap() {
        this.productDetailsSwipe.next();
    }

    handlecancelSwap() {
        this.productDetailsSwipe.prev();
    }


    render(){
        return(
            <div className="product_details_main_container">
                <ReactSwipe
                    className = "product_details_carousel"
                    swipeOptions={{ continuous: false }}
                    ref = {
                        el => (this.productDetailsSwipe = el)
                    } >
                    <div className="product_details_content">
                        <div className="product_details_swap_btn" onClick={this.handletoSwap}>
                            <p>Proponer intercambio</p>
                        </div>
                    </div>
                    <div className="product_details_content">
                        <div className="product_details_swap_btn" onClick={this.handlecancelSwap}>
                            <p>Cancelar intercambio</p>
                        </div>
                    </div>
                </ReactSwipe>
            </div>
        );
    }
}

export default ProductDetails;