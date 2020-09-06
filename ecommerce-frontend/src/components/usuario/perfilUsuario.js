
import React,{ useState, useEffect} from "react";
import Layout from '../../core/layout'
import {isAuthenticate} from './../../auth/auth'
import {Link, Redirect} from 'react-router-dom'
import {obtenerUsuario, modificarUsuario,modificarUsuarioLocal} from '../../api/usuario'



const PerfilUsuario = ({match}) =>{

     const [values, setValues] = useState({
         nombre :'',
         correo: '',
         contrasena : '',
         error : '',
         success : false,

     })
      const {token} = isAuthenticate()
      const {nombre,correo,contrasena,error,success} = values 
      
      const init = (userId) => {
         
         obtenerUsuario(userId, token).then(data => {
             if (data.error){
                 setValues({ ...values, error: true })
             }else{

                setValues({ ...values,nombre:data.nombre,correo:data.correo})
             }
         })

      }

      useEffect(() => {
             init(match.params.userId)
      },[])
    
     const handleChange = nombre => e => {
             
             setValues({ ...values,error: false, [nombre]: e.target.value})
            
     }
     const clickSubmit = (e) => {
             
         e.preventDefault()
         modificarUsuario(match.params.userId,token, {nombre, correo, contrasena}).then(data => {

            if (data.error){
                console.log(data.error)
            }
            else{
                modificarUsuarioLocal(data, ()=>{
                    setValues({ ...values,nombre: data.nombre,correo: data.correo, success:true})
                })
            }
         })
            
    }

    const redirectUsers =(success) =>{

        if(success){
            return <Redirect to ="/usuario/dashboard"></Redirect>
        }

    }


      const formPerfilMod = (nombre,correo,contrasena) => (
           
  
          <form>
              <div className="form-group">
                <label className="text-muted"> Nombre</label>   
                <input type="text" className="form-control" value={nombre} onChange={handleChange('nombre')}></input>
             </div>  
             <div className="form-group">
                <label className="text-muted"> Correo</label>   
                <input type="text" className="form-control" value={correo} onChange={handleChange('correo')}></input>
             </div>  
             <div className="form-group">
                <label className="text-muted"> Contraseña</label>   
                <input type="text" className="form-control" value={contrasena} onChange={handleChange('contrasena')}></input>
             </div>  
                  
                  <button className="btn btn-primary"  onClick={clickSubmit}>Guardar</button>
          </form>
          

      )
    
    
    return (
        <Layout  titulo='Cambiar datos' descripcion="modifica tus datos" className="container">
                <h2 className="mb-4">Perfil Usuario</h2>

               
              {JSON.stringify(values)}
                {formPerfilMod(nombre, correo,contrasena)}
                {redirectUsers(success)}
               

        </Layout>

    )


}


export default  PerfilUsuario