import React,{ useState, useEffect} from 'react';
import Layout from '../../core/layout'
import Card from './cardProducto'
import {buscarProductoPorId, productosRelacionadosPorCategoria} from '../../api/producto'


const Mostrarproducto = (props) => {
   
    const [producto, setProducto] = useState({})
    const [productosRelacionados, setProductosRelacionados] = useState([])
    const [error, setError] = useState(false)

   
    const cargarProducto = productoId=>{
         
           buscarProductoPorId(productoId).then((data=>{
               if(data.error){
                    setError(data.error)
               }
               else{
                  setProducto(data)
                  //Al obtener el producto buscamos los productos relacionados por categoria de
                  productosRelacionadosPorCategoria(data._id).then((data=>{
                        if(data.error){
                                 setError(data.error)
                        }else{
                             setProductosRelacionados(data)
                        }
                        
                  }))

               }
           }))

    }

    useEffect(() => {
        const productoId = props.match.params.productoId
        cargarProducto(productoId)
        console.log(producto)
    },[props])



    return (

        <Layout 
         titulo={ producto && producto.nombre}
         descripcion={producto &&  producto.descripcion && producto.descripcion.substring(0, 100)  } className="containe-fluid">
    
              <div className="row">
                  <div className="col-md-8 ml-3">  
                      
                        {
                          producto && producto.descripcion && 
                          <Card producto={producto} BotonVerProducto={false} />
                        }
                   
                  </div>

                  
                  <div className="col-3 ">
                              <h4>Productos que te pueden interesar</h4>
                               {productosRelacionados.map((p,i)=>(

                                   <div key={i} className="mb-3">
                                       <Card producto={p}></Card>
                                   </div>
                                   
                               ))}
                        </div>
              </div>
    
        </Layout>
      )
}





export default Mostrarproducto;