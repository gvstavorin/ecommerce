import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import MostrarImagen from './imagenProducto'
import moment from 'moment'
import { agregarAlCarrito, moficarCarritoProducto, eliminarCarritoProducto } from '../carrito/carritoHelpers'


const Card = ({ producto,
    BotonVerProducto = true,
    botonAgregarAlCarrito = true,
    modificarCarrito = false,
    botonEliminarProducto = false,
    setRun = f => f, // default value of function
    run = undefined // default value of undefined
}) => {

    const [redirect, setRedirect] = useState(false)
    const [cantidad, setCantidad] = useState(producto.cantidad)

    const btnVerProducto = (BotonVerProducto) => {

        return (
            BotonVerProducto && (
                <Link to={`/producto/${producto._id}`}>
                    <button className="btn btn-primary mt-2 mb-2">
                        Ver Producto
                                </button>
                </Link>

            )
        )
    }

    const agregarProductoAlCarrito = () => {
        agregarAlCarrito(producto, () => {

            setRedirect(true)

        })
    }


    const sRedirect = redirect => {

        if (redirect) {
            return <Redirect to='/carrito'></Redirect>
        }
    }

    const btnAgregarCarro = () => {

        return (

            botonAgregarAlCarrito && (
                <button onClick={agregarProductoAlCarrito} className="btn btn-warning mt-2 mb-2 ml-2">
                    Agregar al carro
                </button>
            ))


    }
    


    const btnEliminarProductoCarrito = botonEliminarProducto => {

        return (

            botonEliminarProducto && (
                <button onClick={() => {eliminarCarritoProducto(producto._id); setRun(!run); // run useEffect in parent Cart
                } }    
                className="btn btn-warning mt-2 mb-2 ml-2">
                    Eliminar
                </button>
            ))


    }


    const MostrarModificacionCarrito = modificarCarrito => {

        return modificarCarrito &&
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"> Cantidad </span>

                </div>
                <input type="number" className="form-control" value={cantidad} onChange={handleChange(producto._id)}></input>

            </div>

    }

    const handleChange = productoId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCantidad(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            moficarCarritoProducto(productoId, event.target.value)
        }

    }

    const MostrarStock = (cantidad) => {

        return cantidad > 0 ? (<span className=" badge badge-success badge.pill">  Disponible </span>) :
            (<span className=" ml-2 badge badge-primary badge.pill"> No disponible </span>);
    }

    return (

        <div className="card ">
            <div className="card-header">
                {producto.nombre}
            </div>
            <div className="card-body">
                {sRedirect(redirect)}
                <MostrarImagen img={producto} url="products"></MostrarImagen>
                <p className="lead mt-2">{producto.descripcion.substring(0, 50)}</p>
                <p className="black-9">Precio: ${producto.precio}</p>
                <p className="black-8">Categoria: {producto.categoria && producto.categoria.nombre}</p>
                <p className="black-8">Agregado el {moment(producto.createdAt).format('MM-DD-YYYY')}</p>

                {MostrarStock(producto.cantidad)}
                <br />
                {btnVerProducto(BotonVerProducto)}

                {btnAgregarCarro(botonAgregarAlCarrito)}    {btnEliminarProductoCarrito(botonEliminarProducto)}
                {MostrarModificacionCarrito(modificarCarrito)}


            </div>
        </div>


    )
}


export default Card