import React from 'react'
import { Route, Link,withRouter } from "react-router-dom";


const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};


const Menu = ({ history }) =>
(
    <di>
        <ul className="nav nav-tabs bg-primary"> 
           <li className="nav-item">
                <Link className="nav-link"  
                 style={isActive(history,'/')}  
                 to="/"> Home</Link>
           </li>
           <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/ingresar')}  to="/ingresar">Ingresar</Link>
           </li>
           <li className="nav-item">
                <Link className="nav-link"  style={isActive(history,'/registro')}  to="/registro">Registro</Link>
           </li>
        </ul>
    </di>
)


export default withRouter(Menu);