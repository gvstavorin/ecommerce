import React, { useState } from "react";
import {Link}  from 'react-router-dom'
import Layout from '../../core/layout'
import {registro} from '../../api/usuario'


const Registro = ()=> {

    const [values,setValues] = useState({
        nombre :'',
        correo:'',
        contrasena:'',
        error:'',
        success:false

    })
    const {nombre,correo,contrasena,error,success} = values
    const handleChange = name =>event =>{
            setValues({...values, error:false, [name]:event.target.value})
    }

    
    
    const clickSubmit =(event) =>{

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
                    error:'',
                    success:true,
                })
            }
        })

    }

    const formRegistro =() =>(
      
        <div className="card">
          <div className="card-body">
      <form>
                  <div className="from-group">
                      <label className="text-muted">Nombre  </label>
                      <input onChange={handleChange('nombre')} value={nombre} className="form-control" type="text"></input>
                  </div>
                  <div className="from-group">
                      <label className="text-muted">Correo  </label>
                      <input onChange={handleChange('correo')} value={correo} className="form-control" type="email"></input>
                  </div>
                  <div className="from-group">
                      <label className="text-muted">Contraseña  </label>
                      <input onChange={handleChange('contrasena')}  value={contrasena} className="form-control" type="password"></input>
                  </div>              
                        <div className="d-flex justify-content-center">
                               <button onClick={clickSubmit}  className="btn btn-primary mt-2">Registrar </button>
                        </div>
        </form>
          </div>
        </div>
    )

    const showError=()=>(
        
            <div className="alert alert-danger" style={{display: error ?  '' : 'none'}}>
   
                {error}
            </div>
       
    )

    const showSuccess=()=>(
        <div className="alert alert-success" style={{display: success ?  '' : 'none'}}>

        Cuenta creada exitosamente!<Link to="/ingresar"> Ingresar  </Link>
     </div>
    )
    return(

        <div>
        <Layout 
        titulo='Registro' 
        descripcion="Registro de usuario "
        className="container col-md-8 offset-md-2"
        
        >
              {showError()}
              {showSuccess()}
              { formRegistro()}
        </Layout>
            
      </div>
    )
}



export default Registro;