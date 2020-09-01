import React, { Fragment } from 'react'
import { Link, withRouter } from "react-router-dom";
import { desUsuario, isAuthenticate } from '../auth/auth'
import { totalProductos } from '../components/carrito/carritoHelpers'

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


const Menu = ({ history }) =>
    (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/"> Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/tienda')} to="/tienda"> Tienda</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/carrito')} to="/carrito">
                              Carrito 
                        <sup>
                            <small className="cart-badge"> {totalProductos()} </small>
                        </sup>
                    </Link>
                </li>

                {!isAuthenticate() && (
                    <Fragment>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/ingresar')} to="/ingresar">Ingresar</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/registro')} to="/registro">Registro</Link>
                        </li>

                    </Fragment>
                )}

                {isAuthenticate() && isAuthenticate().user.rol === 0 && (

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/usuario/dashboard')} to="/usuario/dashboard">Dashboard</Link>
                    </li>
                )}
                {isAuthenticate() && isAuthenticate().user.rol === 1 && (

                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}

                {isAuthenticate() && (
                    <Fragment>



                        <li className="nav-item">
                            <span className="nav-link" style={{ cursor: "pointer", color: "#ffffff" }} onClick={() => desUsuario(() => {
                                history.push('/')
                            })}>
                                Salir
                      </span>
                        </li>

                    </Fragment>
                )}
            </ul>
        </div>
    )


export default withRouter(Menu);