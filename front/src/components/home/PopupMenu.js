import React, { Component } from "react";
import './PopupMenu.css';

class PopupMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShownMenu : false
        }
        
        this.onClickButton = this.onClickButton.bind(this);
        this.onMouseEnter  = this.onMouseEnter.bind(this);
        this.onMouseLeave  = this.onMouseLeave.bind(this);
      }

      onClickButton() {
        this.setState({
          isShownMenu : !this.state.isShownMenu
        });
      }
      
      onMouseEnter() {
        this.setState({
          isShownMenu : true
        })
      }
      
      onMouseLeave() {
        this.setState({
          isShownMenu : false
        })
      }

      render() {
        return(
          <div
            className="PopupMenu"
            aria-expanded={this.state.isShownMenu}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <div className="PopupMenu__inner">
             <p onClick={()=>{console.log("clock")}}>{this.props.title}</p>
                
             
              <div
                id={this.props.id}
                className={`PopupMenu__Menu -${this.props.position}`}
                aria-hidden={!this.state.isShownMenu}
                aria-label={this.props.menuLabel}
              >
                {this.props.children}
              </div>
            </div>
          </div>
        );
      }


}

  

export default PopupMenu;