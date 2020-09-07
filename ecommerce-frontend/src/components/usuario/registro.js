import React, { useState } from "react";
import {Link}  from 'react-router-dom'
import Layout from '../../core/layout'
import {registro} from '../../api/usuario'
import {Box,Grid,Button,TextField,Container,Card, Avatar } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

const Registro = ()=> {

    const [values,setValues] = useState({
        nombre :'',
        correo:'',
        contrasena:'',
        confirmarContraseña:'',
        error:'',
        success:false

    })
    const {nombre,correo,contrasena,error,success,confirmarContraseña} = values
    const handleChange = name =>event =>{
            setValues({...values, error:false, [name]:event.target.value})
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

    
    
    const clickSubmit =(event) =>{

        const { contrasena, confirmarContraseña,error } = values;
    
        if (contrasena !== confirmarContraseña) {
                  setValues({...values,error:"Contraseña no coinciden"})

        } else {
                   
            event.preventDefault()
            setValues({...values,error:false})
            registro({nombre,correo,contrasena})
            .then(data=>{
                if(data.error){
    
                    setValues({...values,error:data.error,success:false})
                }
                else {
                    setValues({...values,
                        nombre:'',
                        correo:'',
                        contrasena:'',
                        confirmarContraseña: '',
                        error:'',
                        success:true,
                    })
                }
            })
        }
    }

      

    

 
    
    const formularioRegistro = () =>(
        <Card>
        <Container component="main" maxWidth="sm">
        <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndIcon />
        </Avatar>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField  onChange={handleChange('nombre')} name="nombre" value={nombre}   variant="outlined" required fullWidth id="nombre" label="Nombre "autoFocus required />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleChange('correo')} value={correo}  variant="outlined"  required fullWidth id="correo" label="Direccion electronica"   autoComplete="email"  />
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleChange('contrasena')}  value={contrasena} variant="outlined" required  fullWidth name="contrasena" label="Contraseña" type="password" autoComplete="current-password"/>
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={handleChange('confirmarContraseña')} 
               value={confirmarContraseña} variant="outlined" required  fullWidth name="confirmarContraseña" label="Confirmar Contraseña"
              type="password"autoComplete="current-password"/>
            </Grid>
          </Grid>
          <Button   onClick={clickSubmit} fullWidth variant="contained" color="primary" className={classes.submit}> Registrar</Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/ingresar" variant="body2">
                Ya tienes una cuenta, ingresa aqui
              </Link>
            </Grid>
          </Grid>
        </form>
        </div>
        </Container>
        </Card>
      
    )

    const showError=()=>(
        
        <Alert severity="warning" style={{display: error ?  '' : 'none'}}>  {error}</Alert>
    )

    const showSuccess=()=>(
 
       
       <Alert severity="success"  style={{display: success ?  '' : 'none'}}>
               Cuenta creada exitosamente!<Link to="/ingresar"> Ingresar  </Link>
         </Alert>



    )
    return(

        <div>
        <Layout 
        titulo='Registro' 
        descripcion="Registro de usuario "
       
        
        >
              
              <Grid container alignItems="center" justify="center">
                <Grid item xs={12} sm={9}  >
                {showError()}
                      {showSuccess()}
                      <Box  m={3} pt={3}>
                    
                      { formularioRegistro()}

                      </Box>

                </Grid>

              </Grid>

                 

            
        </Layout>
            
      </div>
    )
}



export default Registro;