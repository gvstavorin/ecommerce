import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Ingreso from  './components/usuario/ingreso'
import Registro from './components/usuario/registro'
import dashboardUsuario from './components/usuario/dashboardUsuario'
import Home from './core/home'
import PrivateRoute from './auth/privateRoute'
import AdminRoute from './auth/adminRoute'
import dashboardAdmin from './components/usuario/dashboardAdmin'
import AgregarCategoria from './components/categorias/agregarCategoria'
import AgregarProducto from './components/productos/agregarProducto'
import Tienda from './components/tienda/tienda'
import Mostrarproducto from './components/productos/mostrarProducto';
import Carrito from './components/carrito/carrito'



const Routes = () =>{
    
    return (<BrowserRouter>
        
            <Switch>
            
              {/* //RUTAS REALACIONADAS CON EL USUARIO*/}   
               <Route path='/' exact component ={Home}/>
               <Route path='/registro' exact component ={Registro}/>
               <Route path='/ingresar' exact component ={Ingreso}/>
               <PrivateRoute path='/usuario/dashboard' exact component ={dashboardUsuario}/>
               <AdminRoute path='/admin/dashboard' exact component ={dashboardAdmin}/>
              {/* //RUTAS REALACIONADAS CON CATEGORIAS*/}   
               
               <AdminRoute path='/crear/categoria' exact component ={AgregarCategoria}/>
               {/* //RUTAS REALACIONADAS CON productos*/}   
               <Route path='/producto/:productoId' exact component ={Mostrarproducto}/>               
               <AdminRoute path='/crear/producto' exact component ={AgregarProducto}/>
               {/*  //RUTAS RELACIONADAS CON LA TIENDA */}   
              
               <Route path='/tienda' exact component ={Tienda}/>
              {/*  //RUTAS RELACIONADAS CON CARRITO DE COMPRA */}   
               
              <Route path='/carrito' exact component ={Carrito}/>

               
            </Switch>
           
          </BrowserRouter>)

}


export default Routes;
