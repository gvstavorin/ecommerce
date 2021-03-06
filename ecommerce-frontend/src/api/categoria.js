import {API} from '../config'


export const crearCategoria = (userID,token,categoria) => {

   return fetch(`${API}/category/create/${userID}`,{
        
      method: "POST",
      headers: {
          Accept :'application/json',
          "Content-Type" : "application/json",
           Authorization : `Bearer ${token}`
      },
      body:JSON.stringify(categoria)
    })
    .then(response =>{
         return response.json()
    })
    .catch(error =>{
        console.log(error)
    })
  }


 
export const obtenerCategorias = () => {

  return fetch(`${API}/categories`,{
       
     method: "GET",
     headers: {
         Accept :'application/json',
     },
   })
   .then(response =>{
        return response.json()
   })
   .catch(error =>{
       console.log(error)
   })
 }

