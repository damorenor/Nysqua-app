import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './ProductCard.css';
import { IconContext } from "react-icons";
import Slider from 'react-animated-slider';
import {FaChevronCircleLeft} from "react-icons/fa";
import {FaChevronCircleRight} from "react-icons/fa";

class ProductCard extends Component {
    constructor(props) {
        super(props);

        this.content = [
        {
          image:'https://i.pinimg.com/564x/21/e7/08/21e7083828c82f4192c02d1200d52c7f.jpg',
        },
        {
          image:'https://i.pinimg.com/564x/15/79/e3/1579e3d5ac97980f165ab29ad0629620.jpg',
        },
        {
          image:'https://i.pinimg.com/564x/03/7c/77/037c7710e895aab8e8affa0340b2fea6.jpg',
        },
        {
          image:'https://i.pinimg.com/564x/1f/23/80/1f23806884be7158e391f84eea82497e.jpg',
        },
        {
          image:'https://i.pinimg.com/564x/d9/2c/80/d92c80cb5cc338ff20e61c0fb59426a6.jpg',
        },
        {
          image:'https://i.pinimg.com/564x/28/bb/c3/28bbc36cbf189e1fb8b9441c9269cac8.jpg',
        },
        {
          image:'https://i.pinimg.com/564x/28/88/f3/2888f3822f05d3705fede9d57173b63c.jpg',
        },
      ];

      let sliderRef;
    }

    render() {
        return (
            <div>
                <div className="product_card_container">
                    <div className="product_card">
                        <IconContext.Provider value={{ size: "2.2em ", className: 'product_left_arrow'}}>
                            <FaChevronCircleLeft onClick={() => this.sliderRef.previous()}/>
                        </IconContext.Provider>
                        <IconContext.Provider value={{ size: "2.2em ", className: 'product_right_arrow'}}>
                            <FaChevronCircleRight onClick={() => this.sliderRef.next()}/>
                        </IconContext.Provider>
                        <div className="size_label">
                            <p><span>Talla:</span> M</p>
                        </div>
                        <div className = "img_slider_container" >
                            <Slider duration={300}
                                ref={ref => (this.sliderRef = ref)}
                                previousButton={null}
                                nextButton={null}>
                                {this.content.map((item, index) => (
                                    <div className="img_content"
                                        key={index}
                                        style={{ background: `url('${item.image}') no-repeat center center` }}>
                                        <div className="img_overlay" onClick={() => {
                                                console.log("in");
                                        }}> 
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="product_title">
                    <h1>Product title</h1>
                    <p>Estado: estado</p>
                </div>
            </div>
        );
    }
}

export default ProductCard;