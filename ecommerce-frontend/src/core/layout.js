import React from 'react'
import Menu from './menu'

const Layout =({titulo="Titulo",descripcion="Descripcion", children,className   }) =>

(
 <div>
     <Menu></Menu>
   <div className="jumbotron"> 
    
     <h2>{titulo}</h2>
 
     <p className="lead"> {descripcion}</p>
 
   </div>
  
<div className={className}> {children}</div>


   </div>

)


export default Layout;