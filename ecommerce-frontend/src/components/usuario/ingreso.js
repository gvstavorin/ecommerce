import React, { useState } from "react";
import { Link, Redirect } from 'react-router-dom'
import Layout from '../../core/layout'
import { ingresar } from '../../api/usuario'
import { authenticate, isAuthenticate } from '../../auth/auth'
import { Box, Grid, Button, TextField, Container, Card, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

const Ingreso = () => {

  const [values, setValues] = useState({
    correo: '',
    contrasena: '',
    error: '',
    loading: false,
    redirectToReferrer: false,

  })
  const { correo, contrasena, error, loading, redirectToReferrer } = values
  const { user } = isAuthenticate()
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

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  //MENSAJE DE ERROR AL INGRESAR AL SISTEMA
  const showError = () => (

    <Alert severity="warning" style={{display: error ?  '' : 'none'}}>  {error}</Alert>


  )
  //ANIMACION DE CARGA AL MOMENTO DE ENVIAR DATOS 
  const showLoading = () => (

    loading && (
     
         <LinearProgress />

     
    

    )
  )

  //METODO QUE REDIRIGE AL USUARIO A OTRA RUTA

  const redirectUsers = () => {
    if (redirectToReferrer) {
      if (user && user.rol === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/usuario/dashboard" />
      }

    }

    if (isAuthenticate()) {
      return <Redirect to="/" />
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


  const formularioIngreso = () => (
    <Card>
      <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
           
          </Avatar>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} >
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={handleChange('correo')} value={correo} variant="outlined" required fullWidth id="correo" label="Direccion electronica" autoComplete="email" />
              </Grid>
              <Grid item xs={12}>
                <TextField onChange={handleChange('contrasena')} value={contrasena} variant="outlined" required fullWidth name="contrasena" label="Contraseña" type="password" autoComplete="current-password" />
              </Grid>
              <Grid item xs={12}>
             
              </Grid>
            </Grid>
            <Button onClick={clickSubmit} fullWidth variant="contained" color="primary" className={classes.submit}> Ingresar</Button>
         
          </form>
        </div>
      </Container>
    </Card>
  )


  //"VISTA"  DE LA PAGINA /INGRESO

  return (

    <div>
      <Layout
        titulo='Ingreso'
        descripcion="Ingreso de usuario "
        className="container col-md-8 offset-md-2"

      >
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12} sm={9}  >
            {showError()}
            {showLoading()}
            <Box m={3} pt={3}>
              {formularioIngreso()}
              {redirectUsers()}

            </Box>

          </Grid>

        </Grid>



      </Layout>

    </div>
  )
}




export default Ingreso;