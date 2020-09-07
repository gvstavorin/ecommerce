import React from "react";
import Layout from '../../core/layout'
import {isAuthenticate} from './../../auth/auth'
import {Link} from 'react-router-dom'
import {Box,Grid} from '@material-ui/core'

const dashboardAdmin = ()=> {


     const {user:{_id,nombre,correo,rol}} = isAuthenticate()
       //console.log(isAuthenticate())

       const adminLinks = () =>{

        return (
            <div className="card">
            <h4 className="card-header"> Administracion</h4>
                 <ul className="list-group">
                    <li className="list-group-item">  <Link className="nav-link" to="/crear/categoria">Agregar nueva categoria</Link> </li>
                    <li className="list-group-item">  <Link className="nav-link" to="/crear/producto">Agregar nuevos productos</Link> </li>
                    <li className="list-group-item">  <Link className="nav-link" to="/admin/pedidos">Ver pedidos</Link> </li>
                    <li className="list-group-item">  <Link className="nav-link" to="/admin/productos">Ver productos</Link> </li>


                 </ul>
            </div>
        )
       }

       const adminInfo =() =>{
           return (
            <div className="card">
            <h3 className="card-header"> Informacion </h3>
            <ul className="list-group">
               <li className="list-group-item"> {nombre}</li>
               <li className="list-group-item"> {correo}</li>
               <li className="list-group-item"> {rol ===1 ? 'Usuario Administrador' : ' Usuario'} </li>
            </ul>
               
       </div>

           )
       }

    

    return(

        <div>
        <Layout  titulo='Bienvenido' descripcion={`Hola ${nombre}`} >
    
                  
                  <Grid container >
                     <Grid item xs={12} sm={6} > 
                          <Box  m={3} pt={3}>
                                {adminInfo()}
                          </Box>
                     </Grid>
                     <Grid item xs={12} sm={6} > 
                          <Box  m={3} pt={3}>
                                {adminLinks()}
                          </Box>
                     </Grid>
                  
                  </Grid>
            
            
                 
       
    
        
        </Layout>
            
      </div>
    )
}



export default dashboardAdmin;