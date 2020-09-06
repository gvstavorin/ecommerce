import React, { Fragment, setState } from 'react'
import { Link, withRouter } from "react-router-dom";
import { desUsuario, isAuthenticate } from '../auth/auth'
import { totalProductos } from '../components/carrito/carritoHelpers'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

let datosUsuario = JSON.parse(localStorage.getItem('jwt'));
let MiCuenta = "Mi cuenta"

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
                <li className="ml-auto"><a className="nav-link"></a>
                </li>




                <li className="nav-item ">

                    <Tooltip title="Ver Carrito">
                        <Link className="nav-link" style={isActive(history, '/carrito')} to="/carrito">
                            <Badge badgeContent={totalProductos()} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </Link>
                    </Tooltip>

                </li>
            
            {isAuthenticate() && (

                <div className="btn-group dropdown-menu-lg-left  boton-perfil">
                    <Button style={{
                        color: "white",
                        fontSize: "12px",
                        minWidth: "200"
                       
                    }}
                        data-toggle="dropdown"

                        endIcon={<AccountCircleIcon />}
                    >

                        Mi Cuenta

                    </Button>

                    <div className="dropdown-menu menu-perfil">
                        {isAuthenticate() && isAuthenticate().user.rol === 0 && (
                            <li className="nav-item">

                                <Link className="link" style={isActive(history, '/usuario/dashboard')} to="/usuario/dashboard"> Perfil </Link>

                            </li>



                        )}
                        {isAuthenticate() && isAuthenticate().user.rol === 1 && (
                            <li className="nav-item">

                                <Link className="link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Perfil  </Link>

                            </li>



                        )}

                           <div className="dropdown-divider"></div>

                        {isAuthenticate() && (
                            <Fragment>

                                <li className="nav-item">
                                    <span className="link" style={{ cursor: "pointer", color: "#ffffff" }} onClick={() => desUsuario(() => {
                                        datosUsuario = null;
                                        history.push('/')
                                    })}>
                                        Salir
                                       </span>
                                </li>

                            </Fragment>
                        )}






                    </div>
                </div>
            )}
             
                {!isAuthenticate() && (
                   <li className="nav-item">
                       <Link className="nav-link" style={isActive(history, '/ingresar')} to="/ingresar"> Ingresar</Link>
                  </li>
                
                        )}

                {!isAuthenticate() && (
                   <li className="nav-item">
                       <Link className="nav-link" style={isActive(history, '/registro')} to="/registro"> Registrarse</Link>
                  </li>
                
                        )}


            </ul>
        </div>
    )


export default withRouter(Menu);