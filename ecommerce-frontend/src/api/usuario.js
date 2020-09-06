import {API} from '../config'


export const registro = (usuario) => {

   return fetch(`${API}/registro`,{
        
      method: "POST",
      headers: {
          Accept :'application/json',
          "Content-Type" : "application/json"
      
      },
      body:JSON.stringify(usuario)
    })
    .then(response =>{
         return response.json()
    })
    .catch(error =>{
        console.log(error)
    })
  }


  export const ingresar = (usuario) => {

    return fetch(`${API}/ingresar`,{
         
       method: "POST",
       headers: {
           Accept :'application/json',
           "Content-Type" : "application/json"
       
       },
       body:JSON.stringify(usuario)
     })
     .then(response =>{
          return response.json()
     })
     .catch(error =>{
         console.log(error)
     })
   }

   export const obtenerUsuario = (userId, token) => {

    return fetch(`${API}/user/${userId}`,{
         
       method: "GET",
       headers: {
           Accept :'application/json',
           "Content-Type" : "application/json",
             Authorization: `Bearer ${token}`
       },
     })
     .then(response =>{
          return response.json()
     })
     .catch(error =>{
         console.log(error)
     })
   }

   export const modificarUsuario = (userId, token,user) => {

    return fetch(`${API}/user/${userId}`,{
         
       method: "PUT",
       headers: {
           Accept :'application/json',
           "Content-Type" : "application/json",
             Authorization: `Bearer ${token}`
       },
       body: JSON.stringify(user)
     })
     .then(response =>{
          return response.json()
     })
     .catch(error =>{
         console.log(error)
     })
   }


   export const modificarUsuarioLocal  =(user,next) => {
     if(typeof window !== 'undefined'){
       if(localStorage.getItem('jwt')){
                 let auth = JSON.parse(localStorage.getItem('jwt'))
                 auth.user = user
                 localStorage.setItem('jwt',JSON.stringify(auth))
                 next();
       }
     }
   }