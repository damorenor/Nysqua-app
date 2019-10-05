import React, { Component } from "react";
import Slider from 'react-animated-slider';
import './SignUp.css';

class SliderSignUp extends Component {
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
        
      ]

    };
    
    render(){
  
        return(
          < div className = "slider_container" >
            <div className="slider_overlay">
            <img  
              className= "Logoimg" 
              src= 'https://raw.githubusercontent.com/nsaavedraa/imgs/master/nysqualetter.png'/>
            </div>
            <Slider autoplay={2000}>
              {this.content.map((article, index) => <div key={index}>
                <img className ="imageSlider" src= {article.image}/>

              </div>)}
            </Slider>
          </div>
        );
    };
};

export default SliderSignUp;