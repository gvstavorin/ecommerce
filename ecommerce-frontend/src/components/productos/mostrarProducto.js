import React, { useState, useEffect } from 'react';
import Layout from '../../core/layout'
import Card from './cardProducto'
import { buscarProductoPorId, productosRelacionadosPorCategoria } from '../../api/producto'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const Mostrarproducto = (props) => {

    const [producto, setProducto] = useState({})
    const [productosRelacionados, setProductosRelacionados] = useState([])
    const [error, setError] = useState(false)


    const cargarProducto = productoId => {

        buscarProductoPorId(productoId).then((data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setProducto(data)
                //Al obtener el producto buscamos los productos relacionados por categoria de
                productosRelacionadosPorCategoria(data._id).then((data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setProductosRelacionados(data)
                    }

                }))

            }
        }))

    }

    useEffect(() => {
        const productoId = props.match.params.productoId
        cargarProducto(productoId)
    }, [props])



    return (

        <Layout
            titulo={producto && producto.nombre}
            descripcion={producto && producto.descripcion && producto.descripcion.substring(0, 100)} >
            <Grid container alignItems="center" justify="center" style={{ padding: '10px' }}>
                <Grid item xs={12} sm={4} md={4}  >
                    <Box m={2} pt={3}>

                        {
                            producto && producto.descripcion &&
                            <Card producto={producto} BotonVerProducto={false} />
                        }

                    </Box>
                </Grid>

                <h4>Productos que te pueden interesar</h4>
                {productosRelacionados.map((p, i) => (
                    
                    <Grid item xs={12} sm={4} md={4}  >
                        
                        <Box m={2} pt={3} key={i}>

                            <Card producto={p}></Card>
                        </Box>
                    </Grid>

                ))}


            </Grid>
        </Layout>
    )
}





export default Mostrarproducto;