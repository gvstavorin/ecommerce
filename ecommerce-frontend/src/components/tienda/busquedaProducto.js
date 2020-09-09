import React, { useState, useEffect, Fragment } from 'react'
import Layout from '../../core/layout'
import { obtenerProductos, ListarBusqueda } from '../../api/producto'
import { obtenerCategorias } from '../../api/categoria'
import Card from '../productos/cardProducto'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


const Busqueda = () => {
    const [data, setData] = useState({

        categorias: [],
        categoria: '',
        busqueda: '',
        resultados: [],
        buscado: false,
        loading: false
   

    })

    const { categorias, categoria, busqueda, resultados, buscado,loading } = data;

    const cargarCategorias = () => {
        

        obtenerCategorias().then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {

                setData({ ...data, categorias: data })
            }
        })

    }
    const searchMessage = (buscado, resultados) => {

        if (buscado && resultados.length > 0) {

            return ( <Alert severity="success">
            
             Se encontraron <strong> {resultados.length}</strong> producto
          </Alert>)
        }
        if (buscado && resultados.length < 1) {
            return (
                <Alert severity="info">
                <AlertTitle>Ups</AlertTitle>
               No se encontro el producto, <strong>Vuelva a intentarlo</strong>
              </Alert>
            )

        }
    }

    const productosBuscados = (resultados = []) => {

        return (
            <Fragment>
                 <Grid item xs={12} sm={9}  >
                        <Box m={1} >      
                        {showLoading()}                  
                     {searchMessage(buscado, resultados)}
             
                        </Box>
                    </Grid>
               

                {resultados.map((producto, index) => (
                    <Grid item xs={12} sm={4} key={index}  >
                        <Box m={3}  pt={3}>
                            <Card  producto={producto} > </Card>
                        </Box>
                    </Grid>
                ))}

         </Fragment>
           
        )

    }

    useEffect(() => {
        cargarCategorias();
    }, [])
    const searchData = () => {
    
        if (busqueda) {
            setData({ ...data,loading: true })
            ListarBusqueda({ search: busqueda || undefined, category: categoria }).then((res) => {
                if (res.error) {
                    console.log(res.error)
                    
                    setData({ ...data,loading: false })

                }
                else {
                    setData({ ...data, resultados: res, buscado: true, loading:false })

                }
            })
        }

    }
    const botonBuscar = (e) => {
        e.preventDefault();
        searchData();
    }

    const handleChange = name => event => {
        setData({ ...data, [name]: event.target.value, buscado: false })
    }
    const showLoading = () => (

        loading && (      
             <LinearProgress />
    
         
        
    
        )
      )
    

    const formBuscador = () => {

        return (


            <form onSubmit={botonBuscar}>
                <span className="input-group-text barra-busqueda">
                    <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                            <select className="btn mr-2" onChange={handleChange('categoria')} >
                                <option value="All">Todas</option>
                                {categorias.map((cat, i) => (
                                    <option key={i} value={cat._id} >{cat.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <TextField type="search"
                            className="form-control input-busqueda"
                            onChange={handleChange("busqueda")}
                            placeholder=""
                            required
                        />
                    </div>
                    <div className="btn  input-group-append" style={{ border: 'none' }}>
                        <Button type="submit" color="primary"  variant="contained" >Buscar </Button>
                    </div>
                </span>
            </form>
        )

    }

    
    return (


        <Grid container alignItems="center" justify="center" style={{ padding: '10px' }}>
            <Grid item xs={12} sm={9}  >
                <Box >
                    {formBuscador()}
                </Box>
            </Grid>
          
                    {productosBuscados(resultados)}

           
        </Grid>

    

    )
}


export default Busqueda 