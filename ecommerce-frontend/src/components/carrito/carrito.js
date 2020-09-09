import React, { useState , useEffect} from 'react'
import Layout from '../../core/layout'
import Card from '../productos/cardProducto'
import {obtenerCarrito} from './carritoHelpers'
import { Link } from 'react-router-dom'
import Checkout from './checkout'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



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

            
         

                   <Grid container alignItems="center" justify="center" style={{ padding: '10px' }}>
                    <Grid item xs={12} sm={5}  >
                        <Box m={2} pt={3}>
                        {productos.length > 0 ? MostrarProductos(productos) :mensajeSinProductos()}  

                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={5}  >
                        <Box m={2} pt={3}>
                        <h2 className="mb-4"> Total Compra</h2>
                          <hr/>
                       <Checkout productos={productos} setRun={setRun} run={run}></Checkout>

                        </Box>
                    </Grid>
               
                </Grid>





      </Layout>

    )
}


export default Carrito;