import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import './CategoriesBar.css';

class CategoriesBar extends Component {

    constructor(props) {
      super(props);
      this.subcategories=[ {name:"Camisas"},
      {name:"Camisetas"},
      {name:"Pantalones"},
      {name:"Sweaters y Cardigans"},
      {name:"Bermudas"},
      {name:"Chaquetas y Blazers"},
      {name:"Zapatos"},
      {name:"Buzos"},
      {name:"Jeans"},
      {name:"Accesorios"},
      {name:"Pijamas"},
      {name:"Blusas"},
      {name:"Shorts"},
      {name:"Vestidos y Faldas" },];
    };
    

    render(){
        return(
            <div  className ="container-cat">
                <Grid 
                    container spacing={2}
                    direction = "row"   
                    justify="center"
                   
                    alignItems="center"
                    wrap = "nowrap" >   
                    
                        <Grid item xs={2} >
                        <p    href="/SignUp" > Hombre </p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>Mujer</p>
                        </Grid>
                        <Grid item xs={2}>
                        <p>Niño</p>
                
                        </Grid>
                        <Grid item xs={2}>
                            <p>Niña</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>Bebes</p>
                        </Grid>

                </Grid>
            </div>
            
        )
    }
}


export default CategoriesBar;
