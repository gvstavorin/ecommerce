import React, { useState, useEffect } from 'react'
import Layout from '../../core/layout'
import { Link } from 'react-router-dom'
import { isAuthenticate } from '../../auth/auth'


const Checkout = ({ productos }) => {

    const obtenerTotalProductos = () => {

        return productos.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.precio
        }, 0)
    }


    const filtroUsuario=() => {

        return(
            isAuthenticate() ? (

                <button className="btn btn-success"> Ir a pagar</button>

            ) : (
                    <Link to="/ingresar">
                        <button className="btn btn-primary"> Ingresar para continar </button>
                    </Link>
                )
    

        )
    }

    return (
        <div>
            <h2> Total: ${obtenerTotalProductos()}</h2>


            {filtroUsuario()}

          </div>
    )


}

export default Checkout;
