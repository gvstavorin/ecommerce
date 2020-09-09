import React, { useState, useEffect } from "react";
import Layout from './layout'
import { obtenerProductos } from '../api/producto'
import { obtenerCategorias } from "../api/categoria";
import Card from '../components/productos/cardProducto'
import Busqueda from '../components/tienda/busquedaProducto'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';



const Home = () => {

  const [pruductosPorVenta, setProductosPorventa] = useState([])
  const [productosPorLlegada, setProductosPorLlegada] = useState([])
  const [error, setError] = useState([])


  const cargarProductosPorVenta = () => {

    obtenerProductos('venta').then(data => {
      if (data.erro) {
        setError(data.error)
      } else {
        setProductosPorventa(data)
      }
    })

  }

  const cargarProductosPorLlegada = () => {

    obtenerProductos('createdAt').then(data => {
      if (data.erro) {
        setError(data.error)
      } else {
        setProductosPorLlegada(data)
      }
    })

  }

  useEffect(() => {
    cargarProductosPorLlegada()
    cargarProductosPorVenta()
  }, [])

  return (

    <Layout titulo='Pagina Inicio' descripcion="TIENDA ACG" >
      <Grid container alignItems="center" justify="center"  style={{padding:'10px'}}>
        
            <Busqueda></Busqueda>
        
        <Grid item xs={12} sm={9}  >
          <Box m={2} pt={3}>
            <h2 className="mb-2">  </h2>
          </Box>
        </Grid>
        {productosPorLlegada.map((producto, index) =>
          <Grid item xs={12} sm={8} md={4}  key={index} >
            <Box m={2} pt={3}>
              <Card producto={producto} ></Card>
            </Box>
          </Grid>
        )}
      </Grid>

    </Layout>
  )
}


export default Home;