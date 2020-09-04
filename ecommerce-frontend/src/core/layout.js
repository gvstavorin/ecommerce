import React from 'react'
import MenuPrincipal from './menu'
import '../style.css'
import Container from '@material-ui/core/Container';


const Layout = ({ titulo = "Titulo", descripcion = "Descripcion", children, className }) =>

  (
    <div>

      <div className="jumbotron">

        <h2>{titulo}</h2>

        <p className="lead"> {descripcion}</p>
        <MenuPrincipal></MenuPrincipal>
      </div>


      <Container maxWidth="xl">
        {children}
      </Container>



    </div>

  )


export default Layout;