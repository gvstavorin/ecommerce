import React from "react";
import Layout from '../../core/layout'
import {isAuthenticate} from './../../auth/auth'
import {Link} from 'react-router-dom'

const dashboardUsuario = ()=> {


     const {user:{_id,nombre,correo,rol}} = isAuthenticate()
       //console.log(isAuthenticate())

       const userLinks = () =>{

        return (
            <div className="card">
            <h4 className="card-header"> Usuario</h4>
                 <ul className="list-group">
                    <li className="list-group-item">  <Link className="nav-link" to="/carrito">Mi carro</Link> </li>
                    <li className="list-group-item">  <Link className="nav-link" to="/perfil/modificar">Modificar Perfil</Link> </li>
                 </ul>
            </div>
        )
       }

       const userInfo =() =>{
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

       const historialCompra = ()=>{
           return (
            <div className="card mb-5">
            <h3 className="card-header"> Historial de compra </h3>
            <ul className="list-group">
               <li className="list-group-item"> Historial</li>
           
            </ul>
               
       </div>
           )
       }
    return(

        <div>
        <Layout  titulo='Bienvenido' descripcion={`Hola ${nombre}`} className="container">
        
        <div className="row">
              <div className="col-6">
                   {userInfo()}
                </div>  
                <div className="col-3 offset-md-3">
                   {userLinks()}
                </div>            
        </div>
        <div className="row">
              <div className="col">
                   {historialCompra()}
                </div>  
                       
        </div>
        
        </Layout>
            
      </div>
    )
}



export default dashboardUsuario;