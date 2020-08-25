import React,{ useState} from 'react'
import Layout from '../../core/layout'
import {isAuthenticate} from '../../auth/auth'
import {crearCategoria} from '../../api/categoria'
import { Link } from 'react-router-dom'

const AgregarCategoria = () =>{

    const [nombre, setNombre] =  useState("");
    const [error, setError] =    useState(false);
    const [success, setSuccess]= useState(false);

     
     // obtener * usuario y token desde localstorage
     const {user, token } = isAuthenticate();
     
     const handleChange=(e) =>{
            setError('')
            setNombre(e.target.value)
     }
     const clickSubmit=(e)=>{
            e.preventDefault()
            setError('')
            setSuccess(false)
       //realizar petician a la api para crear categoria
            crearCategoria(user._id,token,{nombre})
            .then(data =>{
                if(data.error){
                    setError(true)
                }else{
                    setError("")
                    setSuccess(true)
                }
            })
         

     }

     const showError =()=>{
        if(error){
            return    <div className="alert alert-danger"> Categoria {nombre} ya existe</div>
        }
     }
     const showSuccess =()=>{
         if(success){
             return <div className="alert alert-success"> {nombre} Agregada exitosamente</div>
         }
         
    }
    const goBack =()=>(
        <div className="card">

        <div className="card-body">
       <div className="mt-2 ">

           <Link to="/admin/dashboard" > Volver el menu administrador</Link>

       </div>
       </div>
       </div>
   )
     
     const formNuevaCategoria = ()=>
     (
         <form onSubmit={clickSubmit}>
             <div className="form-group mt-4">
                 <label className="text-muted">Nombre Categoria</label>
                 <input className="form-control" type="text" onChange={handleChange} value={nombre} autoFocus required></input>
               
             </div>
             <button className="btn btn-primary" > Crear Categoria</button>

         </form>
     )


     return(

        <div>
        <Layout  titulo='Categeorias' descripcion="Agregar una nueva categoria" >
        
        <div className="row">
               <div className="col-md-8 offset-md-2">
                   {showError()}
                   {showSuccess()}
                   {goBack()}
                   {formNuevaCategoria()}
                   
                   </div>
                       
        </div>
        
        </Layout>
            
      </div>
    )

}


export default AgregarCategoria;