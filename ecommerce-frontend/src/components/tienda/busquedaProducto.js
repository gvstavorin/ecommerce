import React, { useState, useEffect } from 'react'
import Layout from '../../core/layout'
import {obtenerProductos,ListarBusqueda} from '../../api/producto'
import { obtenerCategorias } from '../../api/categoria'
import Card from '../productos/cardProducto'


const Busqueda = () => {
    const [data, setData] = useState({

        categorias: [],
        categoria: '',
        busqueda: '',
        resultados: [],
        buscado: false

    })

    const { categorias, categoria, busqueda, resultados, buscado } = data;

    const cargarCategorias = () => {

        obtenerCategorias().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {

                setData({ ...data, categorias: data })
            }
        })

    }
    const searchMessage = (buscado,resultados) => {
         
        if(buscado && resultados.length > 0) {
            return ` Se encontraron ${resultados.length} resultados`
        }
        if(buscado && resultados.length < 1) {
            return `No se encontro el producto`
        }
    }

    const productosBuscados = (resultados = []) => {
 
         return (
            <div> 
                   <h2 className="mt-4 mb-4">
                       {searchMessage(buscado,resultados)}
                   </h2>
                   <div className="row">
                        {resultados.map((producto,i)=>(
                            <Card key={i} producto={producto} > </Card>
                        ))}
              </div>
            </div>
         )

    }

    useEffect(() => {
        cargarCategorias();
    }, [])
    const searchData = () => {

        if (busqueda){
            ListarBusqueda({search: busqueda || undefined , category: categoria}).then((res) => {
                  if(res.error){
                      console.log(res.error)
                  }
                  else{
                      setData({ ...data, resultados: res, buscado: true})

                  }
              })
        }
       
    }
    const botonBuscar = (e) => {
        e.preventDefault();
        searchData();
    }

    const handleChange = name => event => {
        setData({...data,[name]:event.target.value,buscado:false})
    }

    const formBuscador = () => {
          
        return(
            <form onSubmit={botonBuscar}>
            <span className="input-group-text">
                <div className="input-group input-group-sm">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange('categoria')} > 
                         <option value="All">Todas</option>
                          {categorias.map((cat,i)=>(
                            <option key={i} value={cat._id} >{cat.nombre}</option>
                          ))}
                        </select>
                    </div>
                    
                    <input type="search"
                        className="form-control"
                        onChange={handleChange("busqueda")}
                        placeholder="Buscador :)"
                        required
                    />
                </div>
                <div className="btn  input-group-append" style={{border:'none'}}>
                    <button className="btn-dark input-group-text">Buscar </button>
                    
                </div>
            </span>
        </form>
        )
   
    }

    return (

        <div className="row">
            <div className="container mb-3">   
            {formBuscador()}
            </div>

            <div className="container-fluid">   
            
             {productosBuscados(resultados)}
            
            </div>
         
        </div>
    )
}


export default Busqueda 