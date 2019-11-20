    import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import PopupMenu from './PopupMenu';
import './CategoriesBar.css';

class CategoriesBar extends Component {

    constructor(props) {
      super(props);
      this.state = {
 
          categories : {
            "Hombre": ["Camisas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas", "Sweaters y Cardigans", "Chaquetas y Blazers"],
            "Mujer": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
            "Ninos": ["Camisas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas", "Sweaters y Cardigans", "Chaquetas y Blazers"],
            "Ninas": ["Blusas", "Zapatos", "Buzos", "Chalecos", "Jeans", "Camisetas", "Pantalones", "Shorts", "Vestidos y Faldas", "Chaquetas y Blazers", "Sweaters y Cardigans", "Accesorios", "Pijamas"],
            "Bebes": ["Camisas", "Blusas", "Camisetas", "Pantalones", "Bermudas", "Zapatos", "Buzos", "Jeans", "Accesorios", "Pijamas ", "Shorts", "Vestidos y Faldas", "Sweaters y Cardigans", "Chaquetas y Blazers"]
        },

      }
      
     
    };
    

    render(){
        const manSubcategories = this.state.categories.Hombre.map(function (item) {
            return <li>< button onClick= {()=>{console.log("click")}} className= "Menu-item" type="button"><p>{item}</p></button></li>
        });
        const womanSubcategories = this.state.categories.Mujer.map(function (item) {
            return <li>< button onClick= {()=>{console.log("click")}} className= "Menu-item" type="button"><p>{item}</p></button></li>
        });
        const boySubcategories = this.state.categories.Ninos.map(function (item) {
            return <li>< button onClick= {()=>{console.log("click")}} className= "Menu-item" type="button"><p>{item}</p></button></li>
        });
        const girlSubcategories = this.state.categories.Ninas.map(function (item) {
            return <li>< button onClick= {()=>{console.log("click")}} className= "Menu-item" type="button"><p>{item}</p></button></li>
        });
        const babySubcategories = this.state.categories.Bebes.map(function (item) {
            return <li>< button onClick= {()=>{console.log("click")}} className= "Menu-item" type="button"><p>{item}</p></button></li>
        });
        return(
            <div  className ="container-cat">
                <Grid 
                    container spacing={2}
                    direction = "row"   
                    justify="center"
                   
                    alignItems="center"
                    wrap = "nowrap" >   

                        <Grid item xs={2}>
                            <PopupMenu id="PopupMenuUnder" menuLabel="Menu Under" title="Hombre " position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {manSubcategories}
                                </ul>
                            </PopupMenu>
                        </Grid>
                        <Grid item xs={2}>
                            <PopupMenu id="PopupMenuUnder" menuLabel="Menu Under" title="Mujer" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {womanSubcategories}
                                </ul>
                            </PopupMenu>
                        </Grid>
                        <Grid item xs={2}>
                        <PopupMenu id="PopupMenuUnder" menuLabel="Menu Under" title="Niño" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {boySubcategories}
                                </ul>
                            </PopupMenu>
                
                        </Grid>
                        <Grid item xs={2}>
                        <PopupMenu id="PopupMenuUnder" menuLabel="Menu Under" title="Niña" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {girlSubcategories}
                                </ul>
                            </PopupMenu>
                        </Grid>
                        <Grid item xs={2}>
                            <PopupMenu id="PopupMenuUnder" menuLabel="Menu Under" title="Bebes" position="under">
                                <div className ="MenuTitle">
                                    <p>SUBCATEGORÍAS</p>
                                    <hr></hr>
                                </div>
                                <ul className="Menu">
                                {babySubcategories}
                                </ul>
                            </PopupMenu>
                        </Grid>

                </Grid>
            </div>
            
        )
    }
}


export default CategoriesBar;
