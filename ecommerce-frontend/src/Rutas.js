import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Ingreso from  './usuario/ingreso'
import Registro from './usuario/registro'
import Home from './core/home'
import Menu from './core/menu'

const Routes = () =>{
    
    return (<BrowserRouter>
            <Menu/>
            <Switch>
               <Route path='/' exact component ={Home}/>
               <Route path='/registro' exact component ={Registro}/>
               <Route path='/ingresar' exact component ={Ingreso}/>
            </Switch>
           
          </BrowserRouter>)

}


export default Routes;
