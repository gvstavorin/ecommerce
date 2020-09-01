import {API} from '../config'
import queryString from 'query-string'

export const crearProducto = (userID,token,producto) => {

   return fetch(`${API}/product/create/${userID}`,{
        
      method: "POST",
      headers: {
          Accept :'application/json',
           Authorization : `Bearer ${token}`
      },
      body:producto
    })
    .then(response =>{
         return response.json()
    })
    .catch(error =>{
        console.log(error)
    })
  }


  export const obtenerProductos = (sortBy) => {

    return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limit=6`,{
         
       method: "GET",

     })
     .then(response =>{
          return response.json()
     })
     .catch(error =>{
         console.log(error)
     })
   }




   
   export const buscarProducto = (skip, limit, filters  ={}) => {

    const data = { limit, skip, filters};



    return fetch(`${API}/products/by/search`,{
         
       method: "POST",
       headers: {
           Accept :'application/json',
           "Content-Type" : "application/json",

       },
       body:JSON.stringify(data)

      })
     .then(response =>{
          return response.json()
     })
     .catch(error =>{
         console.log(error)
     })
   }
 

   export const ListarBusqueda = params => {
     const query = queryString.stringify(params)
    return fetch(`${API}/products/search?${query}`,{
         
       method: "GET",

     })
     .then(response =>{
          return response.json()
     })
     .catch(error =>{
         console.log(error)
     })
   }


   
   export const buscarProductoPorId = (productoId) => {   
   return fetch(`${API}/product/${productoId}`,{
        
      method: "GET",

    })
    .then(response =>{
         return response.json()
    })
    .catch(error =>{
        console.log(error)
    })
  }


     
  export const productosRelacionadosPorCategoria = (productoId) => {

  
  return fetch(`${API}/products/related/${productoId}`,{
       
     method: "GET",

   })
   .then(response =>{
        return response.json()
   })
   .catch(error =>{
       console.log(error)
   })
 }

  