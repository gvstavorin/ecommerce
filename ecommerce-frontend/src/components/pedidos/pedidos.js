import React, { useState, useEffect } from "react";
import Layout from '../../core/layout'
import { isAuthenticate } from './../../auth/auth'
import { Link } from 'react-router-dom'
import { listarPedidos, obtenerValosDeEstados,modificarEstadoPedido } from '../../api/pedidos'
import { moment } from 'moment'


const Pedidos = () => {


  const [pedidos, setPedidos] = useState([])
  const [pedidosEstados, setPedidosEstados] = useState([])
  const { user, token } = isAuthenticate()


  const cargarPedidos = () => {

    listarPedidos(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {

        setPedidos(data.orders)
      }
    })
  }
  const cargarValorDeEstados = () => {

    obtenerValosDeEstados(user._id, token).then(data => {
      if (data.error) {
        console.log(data.error)
      } else {

        setPedidosEstados(data)
      }
    })
  }
  useEffect(() => {
    cargarPedidos();
    cargarValorDeEstados();
  }, [])

  const handleStatus  =(e, orderId)=>{

    modificarEstadoPedido(user._id, token, orderId,e.target.value ).then(data=>{
      if(data.error){
        console.log('Error al actualizar')

      }
      else{
        cargarPedidos()
      }
    })
    }

  const mostrarEstados = (o) => (
    <div className="form-group">

      <h3 className="mark mb-4"> Estado {o.status}</h3>
      <select className="form-control" onChange={e=>handleStatus(e,o._id)}> 
       <option  >Cambiar estado</option>
        {pedidosEstados.map((e, i)=>(
           <option key={i} value={e}>{e}</option>
          ))}
      </select>
    </div>
  )

  const MostrarTotalPedidos = () => {

    if (pedidos.length > 0) {
      return (<h1 className="text-danger display-2">Total pedidos : {pedidos.length} </h1>
      )
    } else {
      return <h1 className="text-danger ">Sin pedidos</h1>
    }

  }

  const DescripcionProductos = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input
        type="text"
        value={value}
        className="form-control"
        readOnly
      />
    </div>
  );



  return (

    <div>
      <Layout
        titulo='Pedidos'
        descripcion="Pedidos "


      >
        <div className="row">




          <div className="col-md">
            {MostrarTotalPedidos()}
            {pedidos.map((pedido, index) => {
              return (

                <div className="mt-5" key={index}  >
                  <h2 className="mb-5">
                    <span className="bg-primary">Pedido ID : {pedido._id}</span>
                  </h2>
                  <ul className="list-group mb-2">
                    <li className="list-group-item">
                      {mostrarEstados(pedido)}
                    </li>
                    <li className="list-group-item">
                      Transaccion id : {pedido.transaction_id}
                    </li>
                    <li className="list-group-item">
                      Total monto :  {pedido.amount}
                    </li>
                    <li className="list-group-item">
                      Pedido por :  {pedido.usuario.nombre}
                    </li>
                    <li className="list-group-item">
                      Pedido en fecha :  {pedido.createdAt}
                    </li>
                    <li className="list-group-item">
                      Direccion:  {pedido.direccion}
                    </li>
                  </ul>
                  <h3 className="mt-4 mb-4 font-italic">
                    Total de productos ordenados : {pedido.productos.length}
                  </h3>
                  {pedido.productos.map((producto, pIndex) => (
                    <div
                      className="mb-4"
                      key={pIndex}
                      style={{
                        padding: "20px",
                        border: "1px solid indigo"
                      }}
                    >
                      {DescripcionProductos("Nombre", producto.nombre)}
                      {DescripcionProductos("Precio", producto.precio)}
                      {DescripcionProductos("Total", producto.count)}
                    </div>
                  ))}

                </div>

              )
            })}


          </div>



        </div>
      </Layout>

    </div>
  )

}




export default Pedidos;