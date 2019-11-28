import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './ExchangeDetails.css';
class ExchangeDetails extends Component {

    constructor(props) {
        super(props);

        this.state={
            userGarmentID: this.props.exchangeData.idGarmentOne,
            exUserID: this.props.exchangeData.idUserTwo,
            exGarmentID: this.props.exchangeData.idGarmentTwo,
            token: this.props.token,

            userData:this.props.userData,
            userPhoto: this.props.userData.profilePhoto,
            userName: this.props.userData.username,
            

            userGarment:"",
            garmentImages:[],
            garmentTitle:"",

            exUserData:"",
            exUserPhoto: "",
            exUserName: "",
            
            exGarment:"",
            exGarmentImages:[],
            exGarmentTitle:"",

        }
        this.handleToUser = this.handleToUser.bind(this);
    }

    componentDidMount(){
        const config = {
            headers: {
                'authorization': this.state.token
            }
            };
            axios.post('http://localhost:3001/garment/get',{
                garmentID: this.state.userGarmentID
                },config).then((response)=>
                    {
                    console.log(response.data);
                    this.setState({ userGarment: response.data});  
                    this.setState({ garmentTitle: response.data.title});

                    
                    var images = this.state.garmentImages;
    
                    for(var i=0;i<response.data.images.length;i++){
                        if(response.data.images[i] != ""){
                        images.push({
                            image: response.data.images[i],
                        });
                        }
                        
                    }
                    this.setState({ garmentImages: images});
                   
                    
                    }, (error) => {
                    console.log(error);
    
                });

            axios.post('http://localhost:3001/garment/get',{
            garmentID: this.state.exGarmentID
            },config).then((response)=>
                {
                console.log(response.data);
                this.setState({ exGarment: response.data});  
                this.setState({ exGarmentTitle: response.data.title});

                
                var images = this.state.exGarmentImages;

                for(var i=0;i<response.data.images.length;i++){
                    if(response.data.images[i] != ""){
                    images.push({
                        image: response.data.images[i],
                    });
                    }
                    
                }
                this.setState({ exGarmentImages: images});
                
                
                }, (error) => {
                console.log(error);

              });

            axios.post('http://localhost:3001/users/getUser',{

                userid: this.state.exUserID
                }
                ,config).then((response)=>
                {
                    this.setState({ exUserData: response.data});
                    this.setState({ exUserPhoto: response.data.profilePhoto});  
                    this.setState({ exUserName: response.data.username});    
         
                    console.log(response.data);

                }, (error) => {
                    console.log(error);
        
                });

    }

    handleToUser(event){

        this.LinkToProfileElement.click();
    
    }

    render() {

        return (<div>
             <p><span> Subido por: </span> 
                <a id={this.state.exUserName}
                    onClick={this.handleToUser}>{this.state.exUserName}</a></p>
            <Link to={{
                    pathname: '/OtherProfile',
                    state: {
                        token: this.state.token,
                        ownerData: this.state.exUserData,
                        userData: this.state.userData,
                    }
                }}
                ref={
                    LinkToProfile => this.LinkToProfileElement = LinkToProfile
                }>
            </Link>
              
        </div>)
    }

}

export default ExchangeDetails;