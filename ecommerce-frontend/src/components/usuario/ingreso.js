import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import Layout from '../../core/layout'
import { ingresar } from '../../api/usuario'
import { authenticate,isAuthenticate } from '../../auth/auth'

const Ingreso = () => {

  const [values, setValues] = useState({
    correo: '',
    contrasena: '',
    error: '',
    loading: false,
    redirectToReferrer: false,

  })
  const { correo, contrasena, error, loading, redirectToReferrer } = values
  const {user} = isAuthenticate()
  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }


  // BOTON REGISTRO USUARIO
  const clickSubmit = (event) => {

    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    ingresar({ correo, contrasena })
      .then(data => {
        if (data.error) {

          setValues({ ...values, error: data.error, loading: false })
        }
        else {
          authenticate(
            data, () => {
              setValues({
                ...values,
                redirectToReferrer: true
              })
            }
          )
        }
      })

  }

  //MENSAJE DE ERROR AL INGRESAR AL SISTEMA
  const showError = () => (

    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>

      {error}
    </div>

  )
  //ANIMACION DE CARGA AL MOMENTO DE ENVIAR DATOS 
  const showLoading = () => (

    loading && (
      <div className="alert alert-info">
        <h2> Cargando...</h2>
      </div>
    )
  )

  //METODO QUE REDIRIGE AL USUARIO A OTRA RUTA

  const redirectUsers = () => {
    if (redirectToReferrer) {
     if(user && user.rol === 1){
       return <Redirect to ="/admin/dashboard"/>
    } else{
       return <Redirect to = "/usuario/dashboard"/>
    }

    }

    if(isAuthenticate()){
      return <Redirect to ="/"/>
    }
  }

  // FORMULARIO DE INGRESO AL SISTEMA
  const formIngreso = () => (

    <div className="card">
      <div className="card-body">
        <form>

          <div className="from-group">
            <label className="text-muted">Correo  </label>
            <input onChange={handleChange('correo')} value={correo} className="form-control" type="email"></input>
          </div>
          <div className="from-group">
            <label className="text-muted">Contraseña  </label>
            <input onChange={handleChange('contrasena')} value={contrasena} className="form-control" type="password"></input>
          </div>
          <div className="d-flex justify-content-center">
            <button onClick={clickSubmit} className="btn btn-primary mt-2">Ingresar </button>
          </div>
        </form>
      </div>
    </div>
  )


  //"VISTA"  DE LA PAGINA /INGRESO

  return (

    <div>
      <Layout
        titulo='Ingreso'
        descripcion="Ingreso de usuario "
        className="container col-md-8 offset-md-2"

      >
        {showError()}
        {showLoading()}
        {formIngreso()}
        {redirectUsers()}
      </Layout>

    </div>
  )
}




export default Ingreso;