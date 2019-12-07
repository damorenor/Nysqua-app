import React, { Component } from "react";
import Slider from 'react-animated-slider';
import HorizontalCss from  'react-animated-slider/build/horizontal.css';
import Grid from '@material-ui/core/Grid';



import './Banner.css'

class Banner extends Component {

    constructor(props) {
        super(props);
        
        this.content = [
            {
              title: 'Chaquetas',
              description:
              'A Simple Project Description.',
              button: 'Read More',
                image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cazadora-piel-marron-hombre-otono-2018-1535370632.jpg',
              user: 'Luan Gjokaj',
              userProfile: 'https://i.imgur.com/JSW6mEk.png'
            },
            {
              title: 'Jeans',
              description:
              'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
              button: 'Discover',
              image: 'https://s3.amazonaws.com/arc-wordpress-client-uploads/infobae-wp/wp-content/uploads/2017/11/07141617/jean-ss.jpg',
              user: 'Erich Behrens',
              userProfile: 'https://i.imgur.com/0Clfnu7.png'
            },
            {
              title: 'Camisetas',
              description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
              button: 'Buy now',    
                image: 'https://www.cleanipedia.com/images/v2/c908487e8858ced5dac05db7094af8fa-1800w-1200h.jpg',
              user: 'Bruno Vizovskyy',
              userProfile: 'https://i.imgur.com/4KeKvtH.png'
            }
          ]
          this.handleToClick = this.handleToClick.bind(this);
    }

    handleToClick(title){
        console.log("funciona");

    }
    


    render(){
        return(
            <Slider autoplay={3000}     >
                {this.content.map((item, index) => (
           

                    <div
                    className="sliderContent"
                    key={index}
                    style={{ background: `url('${item.image}') no-repeat center center` }}
                   
                    >
                        <div className="carousel-overlay" > 
                            <div className ="TextCarousel"   >
                                <Grid 
                                    container spacing={3}
                                    direction = "row"   
                                    className ="TextCarousel"
                                    alignItems = "flex-end"
                                    wrap = "nowrap" >
                                    <Grid item xs={8}
                                    >
                                    <div className= "TextCarouselContent">
                                        <h1>{item.title}</h1>
                                        <p>{item.description}</p>
                                    </div>
                                    </Grid>
                                    <Grid item xs={4}>
                                    </Grid>

                                </Grid>
                            </div>
                        </div>

                    </div>

               


                ))}</Slider>
        )
    }
}

export default Banner;