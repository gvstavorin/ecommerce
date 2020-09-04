import React, { Fragment } from 'react'
import { Link, withRouter } from "react-router-dom";
import { desUsuario, isAuthenticate } from '../auth/auth'
import { totalProductos } from '../components/carrito/carritoHelpers'
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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


                <div className="btn-group dropdown-menu-lg-left">
                    <Tooltip data-toggle="dropdown" title="Ver Perfil">
                        <IconButton variant="contained" color="default"  >
                            <AccountCircleIcon></AccountCircleIcon>
                        </IconButton>
                    </Tooltip>
                    <div className="dropdown-menu menu-perfil">
                        {isAuthenticate() && isAuthenticate().user.rol === 0 && (
                            <li className="nav-item">
                                
                                    <Link className="link" style={isActive(history, '/usuario/dashboard')} to="/usuario/dashboard"> Perfil Usuario</Link>
                               
                            </li>



                        )}
                        {isAuthenticate() && isAuthenticate().user.rol === 1 && (
                            <li className="nav-item">
                             
                                    <Link className="link"  style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Perfil Administrador </Link>
                                
                            </li>



                        )}


                        {isAuthenticate() && (
                            <Fragment>

                                <li className="nav-item">
                                    <span className="link" style={{ cursor: "pointer", color: "#ffffff" }} onClick={() => desUsuario(() => {
                                        history.push('/')
                                    })}>
                                        Salir
                                       </span>
                                </li>

                            </Fragment>
                        )}
                       {!isAuthenticate() && (
                    <Fragment>
                        <li className="nav-item  ">
                            <Link className="link"  style={isActive(history, '/ingresar')} to="/ingresar">Ingresar</Link>
                        </li>
                        <li className="nav-item  ">
                            <Link className="link" style={isActive(history, '/registro')} to="/registro">Registro</Link>
                        </li>


                    </Fragment>
                )}

                     


                    </div>
                </div>

            


            </ul>
        </div>
    )


export default withRouter(Menu);