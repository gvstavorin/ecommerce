import React from "react";
import Layout from '../../core/layout'
import {isAuthenticate} from './../../auth/auth'
import {Link} from 'react-router-dom'

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
                 </ul>
            </div>
        )
       }

       const adminInfo =() =>{
           return (
            <div className="card mb-5">
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
        <Layout  titulo='Bienvenido' descripcion={`Hola ${nombre}`} className="container">
        
        <div className="row">
              <div className="col-md">
                   {adminInfo()}
                </div>  
                <div className="col-md offset-3">
                   {adminLinks()}
                </div>            
        </div>
    
        
        </Layout>
            
      </div>
    )
}



export default dashboardAdmin;