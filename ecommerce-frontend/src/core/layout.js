import React from 'react'
import Menu from './menu'
import '../style.css'

const Layout =({titulo="Titulo",descripcion="Descripcion", children,className   }) =>

(
 <div>
     
   <div className="jumbotron"> 
    
     <h2>{titulo}</h2>
 
     <p className="lead"> {descripcion}</p>
     <Menu></Menu>
   </div>
        <div className="principal">
        <div  className={className}> 
        {children}
        
        </div>

        </div>
      

   </div>

)


export default Layout;