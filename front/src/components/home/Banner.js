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
              title: 'Project Name 1',
              description:
              'A Simple Project Description.',
              button: 'Read More',
              image: 'https://i.imgur.com/ZXBtVw7.jpg',
              user: 'Luan Gjokaj',
              userProfile: 'https://i.imgur.com/JSW6mEk.png'
            },
            {
              title: 'Project Name 2',
              description:
              'Nullam id dolor id nibh ultricies vehicula ut id elit. Cras mattis consectetur purus sit amet fermentum. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec sed odio dui.',
              button: 'Discover',
              image: 'https://i.imgur.com/DCdBXcq.jpg',
              user: 'Erich Behrens',
              userProfile: 'https://i.imgur.com/0Clfnu7.png'
            },
            {
              title: 'Project Name 3',
              description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Duis mollis, est non commodo luctus, nisi erat porttitor ligula.',
              button: 'Buy now',    
              image: 'https://i.imgur.com/DvmN8Hx.jpg',
              user: 'Bruno Vizovskyy',
              userProfile: 'https://i.imgur.com/4KeKvtH.png'
            }
          ]
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
                        <div className="carousel-overlay"> 
                            <div className ="TextCarousel">
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
                                        {/* <button>{item.button}</button> */}

                                        {/* boton */}
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