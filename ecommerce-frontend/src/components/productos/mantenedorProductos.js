import React , { useState, useEffect }from "react";
import Layout from '../../core/layout'
import {isAuthenticate} from './../../auth/auth'
import {Link} from 'react-router-dom'
import {obtenerProductosParaAdmin, eliminarProducto} from '../../api/producto'


const MantenedorProductos= () =>{


    const [productos, setProductos] = useState([]);
    const {user,token} = isAuthenticate();
    const cargarProducto =()=>{
        obtenerProductosParaAdmin().then(data=>{
            
            if(data.error){
                   console.log(data.error)
            }else{
                setProductos(data)
            }

        })
    }
   
     const eliminar = (productId) =>{
        eliminarProducto (productId, user._id, token).then(data => {
            if(data.error){
                console.log(data.error)
         }else{
             cargarProducto()
         }
        })
     }

   useEffect(() => {
       cargarProducto()
    },[])


    return (
        <Layout  titulo='Mantenedor' descripcion="Mantiene al dia tus productos" >
        
        <div className="row">
              <div className="col-12">
                 <h2 className="text-center"> Total productos : {productos.length}</h2>
                   <ul className="list-group">
                      {productos.map((producto,index)=>(
                           <li key={index} className="list-group-item d-flex justify-content-center-between align-items-center">
                              {producto.nombre}
                              <Link to={`/admin/producto/modificar/${producto._id}`}>
                                  <span className="badge badge-warning badge-pill"> Modificar </span>
                              </Link>
                              <span onClick={() =>eliminar(producto._id)} className="badge badge-danger badge-pill"> Delete </span>

                           </li>
                      ))}
                   </ul>
                </div>  
                          
        </div>
    
        
        </Layout>
    )
}


export default MantenedorProductos