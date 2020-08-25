import React, { Component } from 'react'
import {Route,Redirect} from 'react-router-dom'
import {isAuthenticate} from './auth'

const AdminRoute = ({component:Component,...rest})=>(
    <Route {...rest} render = { props => isAuthenticate() &&  isAuthenticate().user.rol === 1 ? (
        <Component {...props} />

    ) : (
          <Redirect to ={{pathname: '/ingresar', state:{from:props.location}}} />
    ) } />
)

 
export default AdminRoute;