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
import Pedidos from './components/pedidos/pedidos'
import PerfilUsuario from './components/usuario/perfilUsuario'
import MantenedorProductos from './components/productos/mantenedorProductos'
import ModificarProducto from './components/productos/modificarProducto'

const Routes = () =>{
    
    return (<BrowserRouter>
        
            <Switch>
            
              {/* //RUTAS REALACIONADAS CON EL USUARIO*/}   
               <Route path='/' exact component ={Home}/>
               <Route path='/registro' exact component ={Registro}/>
               <Route path='/ingresar' exact component ={Ingreso}/>
               <PrivateRoute path='/perfil/:userId' exact component ={PerfilUsuario}/>
               <PrivateRoute path='/usuario/dashboard' exact component ={dashboardUsuario}/>
               <AdminRoute path='/admin/dashboard' exact component ={dashboardAdmin}/>
              {/* //RUTAS REALACIONADAS CON CATEGORIAS*/}   
               
               <AdminRoute path='/crear/categoria' exact component ={AgregarCategoria}/>
               {/* //RUTAS REALACIONADAS CON productos*/}   
               <Route path='/producto/:productoId' exact component ={Mostrarproducto}/>               
               <AdminRoute path='/crear/producto' exact component ={AgregarProducto}/>
               <AdminRoute path='/admin/productos' exact component ={MantenedorProductos}/>
               <AdminRoute path='/admin/producto/modificar/:productId' exact component ={ModificarProducto}/>


               
               {/*  //RUTAS RELACIONADAS CON LA TIENDA */}   
              
               <Route path='/tienda' exact component ={Tienda}/>
              {/*  //RUTAS RELACIONADAS CON CARRITO DE COMPRA */}   
               
              <Route path='/carrito' exact component ={Carrito}/>

                 {/*  //RUTAS RELACIONADAS CON CARRITO LOS PEDIDOS */}   
                 <AdminRoute path='/admin/pedidos' exact component ={Pedidos}/>


               
            </Switch>
           
          </BrowserRouter>)

}


export default Routes;
