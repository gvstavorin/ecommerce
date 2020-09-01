import React, { useState, useEffect } from "react";
import Layout from './layout'
import { obtenerProductos } from '../api/producto'
import { obtenerCategorias } from "../api/categoria";
import Card from '../components/productos/cardProducto'
import Busqueda from '../components/tienda/busquedaProducto'


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

    <Layout titulo='Pagina Inicio' descripcion="Ecommer-e  App con react js:)" className="container">

      <Busqueda></Busqueda>
      <h2 className="mb-4"> Nuevos productos</h2>

      <div className="row">
        {productosPorLlegada.map((producto, index) =>
               <div key={index} className="col-4 mb-3">
                   <Card  producto={producto} ></Card>
               </div>
         
        )}
      </div>

      <h2 className="mb-2"> Lo mas vendido</h2>
      <div className="row">

        {pruductosPorVenta.map((producto, index) =>
            <div key={index} className="col-4 mb-3">
            <Card  producto={producto} ></Card>
        </div>
        )}
      </div>

    </Layout>
  )
}


export default Home;