    import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import PopupMenu from './PopupMenu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './CategoriesBar.css';


class CategoriesBar extends Component {

    constructor(props) {
      super(props);
      this.state = {
        userData: this.props.userData,
        token: this.props.token,
        categorieToFind: "",
        subcategorieToFind: "",
        categories : {
            "Hombre": ["Camisas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas", "Sweaters y Cardigans", "Chaquetas y Blazers"],
            "Mujer": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
            "Ninos": ["Camisas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas", "Sweaters y Cardigans", "Chaquetas y Blazers"],
            "Ninas": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
            "Bebes": ["Camisas", "Blusas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas ", "Shorts", "Vestidos y Faldas", "Sweaters y Cardigans", "Chaquetas y Blazers"]
        },
        clothes: "",

      }
      this.handleToFind= this.handleToFind.bind(this);
      this.manSubcategories = this.manSubcategories.bind(this);
      this.womanSubcategories = this.womanSubcategories.bind(this);
      this.boySubcategories = this.boySubcategories.bind(this);
      this.girlSubcategories = this.girlSubcategories.bind(this);
      this.babySubcategories = this.babySubcategories.bind(this);
     
    };
    handleToFind(categorie,subcategorie){
        categorie = [categorie];
        subcategorie = [subcategorie];  
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
            this.setState({subcategorieToFind : subcategorie[0]}); 
            this.LinkResultElement.click();

        }     , (error) => {
            console.log(error);
        })
 
     
        
    }

    manSubcategories(data){
        return(
        <li>
            < button onClick= {()=>{
                
                this.handleToFind("Hombre",data);
            
            }} 
                     className= "Menu-item" 
                     type="button">
                <p>{data}</p>
            </button>
        </li>
        )
    }
    womanSubcategories(data){
        return(
        <li>
            < button onClick= {()=>{
                
                this.handleToFind("Mujer",data);
            
            }} 
                     className= "Menu-item" 
                     type="button">
                <p>{data}</p>
            </button>
        </li>
        )
    }
    boySubcategories(data){
        return(
        <li>
            < button onClick= {()=>{
                
                this.handleToFind("Niño",data);
            
            }} 
                     className= "Menu-item" 
                     type="button">
                <p>{data}</p>
            </button>
        </li>
        )
    }
    girlSubcategories(data){
        return(
        <li>
            < button onClick= {()=>{
                
                this.handleToFind("Niña",data);
            
            }} 
                     className= "Menu-item" 
                     type="button">
                <p>{data}</p>
            </button>
        </li>
        )
    }
    babySubcategories(data){
        return(
        <li>
            < button onClick= {()=>{
                
                this.handleToFind("Bebes",data);
            
            }} 
                     className= "Menu-item" 
                     type="button">
                <p>{data}</p>
            </button>
        </li>
        )
    }
    


    render(){

  

        return(
            <div  className ="container-cat">
                <Grid 
                    container spacing={2}
                    direction = "row"   
                    justify="center"
                   
                    alignItems="center"
                    wrap = "nowrap" >   

                        <Grid item xs={2}>
                            <PopupMenu token= {this.state.token} userData ={this.state.userData} id="PopupMenuUnder" menuLabel="Menu Under" title="Hombre" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                               {/*  {manSubcategories} */}
                               <div>
                               {this.state.categories.Hombre.map(this.manSubcategories, this)}
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
                              
                                </ul>
                            </PopupMenu>
                        </Grid>
                        <Grid item xs={2}>
                            <PopupMenu token= {this.state.token} userData ={this.state.userData} id="PopupMenuUnder" menuLabel="Menu Under" title="Mujer" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {this.state.categories.Mujer.map(this.womanSubcategories, this)}
                                </ul>
                            </PopupMenu>
                        </Grid>
                        <Grid item xs={2}>
                        <PopupMenu token= {this.state.token} userData ={this.state.userData} id="PopupMenuUnder" menuLabel="Menu Under" title="Niño" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {this.state.categories.Ninos.map(this.boySubcategories, this)}
                                </ul>   
                            </PopupMenu>
                
                        </Grid>
                        <Grid item xs={2}>
                        <PopupMenu token= {this.state.token} userData ={this.state.userData} id="PopupMenuUnder" menuLabel="Menu Under" title="Niña" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {this.state.categories.Ninas.map(this.girlSubcategories, this)}
                                </ul>
                            </PopupMenu>
                        </Grid>
                        <Grid item xs={2}>
                            <PopupMenu token= {this.state.token} userData ={this.state.userData} id="PopupMenuUnder" menuLabel="Menu Under" title="Bebes" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {this.state.categories.Bebes.map(this.babySubcategories, this)}
                                </ul>
                            </PopupMenu>
                        </Grid>

                </Grid>
                
            </div>
            
        )
    }
}


export default CategoriesBar;
