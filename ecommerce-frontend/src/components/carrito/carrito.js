import React, { useState , useEffect} from 'react'
import Layout from '../../core/layout'
import Card from '../productos/cardProducto'
import {obtenerCarrito} from './carritoHelpers'
import { Link } from 'react-router-dom'
import Checkout from './checkout'




const Carrito =()=>{

     const [productos, setProductos] = useState([])
     const [run, setRun] = useState(false);



      useEffect(() => {
            setProductos(obtenerCarrito())
      },[run])

      const MostrarProductos = productos =>{
                return (

                    <div> 
                        <h2> 
                            Tienes {`${productos.length}`} productos en tu carrito
                            </h2>
                            <hr/>

                              {productos.map((producto,i)=>(
                                  <Card producto={producto} key={i}
                                   botonAgregarAlCarrito={false} 
                                   modificarCarrito={true}
                                   botonEliminarProducto={true}
                                   setRun={setRun}
                                   run={run}
                                   ></Card>
                              ))} 

                       
                    </div>
                )
      }


      const mensajeSinProductos = () =>{
          return (

            <h2> Tu carrito esta vacio,  <Link to='/tienda'> Ir a comprar</Link></h2>
          )
      }

    return (
             
        <Layout titulo='Tus productos' descripcion="Listo para comprar?" className="container">

            
                   <div className="row">
                        <div className="col">
                         {productos.length > 0 ? MostrarProductos(productos) :mensajeSinProductos()}  
                        </div> 
                        <div className="col">
                         <h2 className="mb-4"> Total Compra</h2>
                          <hr/>
                       <Checkout productos={productos} setRun={setRun} run={run}></Checkout>

                              
                        </div> 

                   </div>
      </Layout>

    )
}


export default Carrito;