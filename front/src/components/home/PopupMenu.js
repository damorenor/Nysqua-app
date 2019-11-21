import React, { Component } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import './PopupMenu.css';

class PopupMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isShownMenu : false,
          clothes: "",
          userData: this.props.userData,
          token: this.props.token,
          categorieToFind: "",
          subcategorieToFind: "",
          categories : {
            "Hombre": ["Camisas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas", "Sweaters y Cardigans", "Chaquetas y Blazers"],
            "Mujer": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
            "Niño": ["Camisas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas", "Sweaters y Cardigans", "Chaquetas y Blazers"],
            "Niña": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
            "Bebes": ["Camisas", "Blusas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas ", "Shorts", "Vestidos y Faldas", "Sweaters y Cardigans", "Chaquetas y Blazers"]
        },
        }
        
        this.onClickButton = this.onClickButton.bind(this);
        this.onMouseEnter  = this.onMouseEnter.bind(this);
        this.onMouseLeave  = this.onMouseLeave.bind(this);
        this.handleToFind = this.handleToFind.bind(this);

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
      handleToFind(categorie){
        var categorie = [categorie];
        var subcategorie = this.state.categories[this.props.title];  
        var char = this.props.title;
        console.log(categorie);
        console.log(subcategorie);  
        const head = {
            headers: {
                'authorization': this.state.token,
            }
        }

        axios.post('http://localhost:3001/garment/preferences',{
            categories: categorie,
            subcategories: subcategorie,
        
            
        },head).then((response)=>{
            console.log(response.data);
            this.setState({clothes : response.data});    
            this.setState({categorieToFind: categorie[0]}); 
            this.LinkResultElement.click();

        }     , (error) => {
            console.log(error);
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
             <div className= "PopupMenu_title">
              <p onClick={()=>{this.handleToFind(this.props.title);}}>{this.props.title}</p>
              <Link to={{
									pathname: '/SearchResult',
									state: {
                    token: this.state.token,
                    userData: this.state.userData,
                    clothes: this.state.clothes,
                    labelCategorie: this.state.categorieToFind,
                    labelSubcategorie: this.state.subcategorieToFind,                
									}
								}}
									ref={
										LinkResult => this.LinkResultElement = LinkResult
									}>
				      </Link>
             </div> 
             
                
             
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