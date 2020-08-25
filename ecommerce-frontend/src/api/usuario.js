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