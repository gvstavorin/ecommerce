import React,{ useState, useEffect} from "react";
import Layout from '../../core/layout'
import {isAuthenticate} from './../../auth/auth'
import {Link} from 'react-router-dom'
import {obtenerHistorialDeCompras} from '../../api/pedidos'
import moment from 'moment'
moment().locale('es')
const DashboardUsuario = ()=> {

     const [historial, setHistorial] = useState([])
     const {user:{_id,nombre,correo,rol}} = isAuthenticate()
       const token = isAuthenticate().token


       const init = (userId, token) =>{
         
         obtenerHistorialDeCompras(userId, token).then(data =>{
             if (data.error){
                console.log(data.error)
             }else{
                setHistorial(data)
             }
          })
       }

       useEffect(() => {
          init(_id,token)
       },[])
       const userLinks = () =>{

        return (
            <div className="card">
            <h4 className="card-header"> Usuario</h4>
                 <ul className="list-group">
                    <li className="list-group-item">  <Link className="nav-link" to="/carrito">Mi carro</Link> </li>
                    <li className="list-group-item">  <Link className="nav-link" to={`/perfil/${_id}`}>Modificar Perfil</Link> </li>
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

       const historialCompra = historial => {
         return (
             <div className="card mb-5">
                 <h3 className="card-header">Historial</h3>
                 <ul className="list-group">
                     <li className="list-group-item">
                         {historial.map((h, i) => {
                             return (
                                 <div>
                                     <hr />
                                     {h.productos.map((p, i) => {
                                         return (
                                             <div key={i}>
                                                 <h6>Nombre: {p.nombre}</h6>
                                                 <h6>Precio: ${p.precio}</h6>
                                                 <h6>
                                                     Fecha compra:{" "}
                                                     {moment(p.createdAt).format('L')}
                                                 </h6>
                                             </div>
                                         );
                                     })}
                                 </div>
                             );
                         })}
                     </li>
                 </ul>
             </div>
         );
     };
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
                   {historialCompra(historial)}
                </div>  
                       
        </div>
        
        </Layout>
            
      </div>
    )
}



export default DashboardUsuario;