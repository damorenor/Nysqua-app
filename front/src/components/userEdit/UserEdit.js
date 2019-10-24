import React, { Component } from 'react';
import Navbar from '../home/Navbar';

import './UserEdit.css';


class UserEdit extends Component {
    constructor(props) {
        super(props);
        this.state={
            userData : {
                biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliquased do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                username: "Nombre de Usuario",
                rating : 3,
                exchangeList :[],
                garmentList: ["prenda1","prenda2","prenda3","prenda4","prenda5","prenda6","prenda7","prenda8" ,"prenda9","prenda10","prenda11"     ],
                profilePhoto : "https://www.rogowaylaw.com/wp-content/uploads/Blank-Employee.jpg",
            }
        }
    }
    render(){
        return(
    <div className ="editProfile_container">
        <Navbar />
        <div className="userEdit">
            <div className = "profilephoto">
                <img  className ="adjust_photo"  src ={this.state.userData.profilePhoto} ></img>
            </div>

        </div>
    </div>
        );
    }
}
export default UserEdit