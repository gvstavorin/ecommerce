import React, { useState, useEffect } from 'react'
import Layout from '../../core/layout'
import Card from '../productos/cardProducto'
import { obtenerCategorias } from '../../api/categoria'
import { buscarProducto } from '../../api/producto'
import Checkbox from '../categorias/checkbox';
import { Precios } from '../categorias/filtroPrecios'
import RadioBox from '../categorias/radiobox'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CardM from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Tienda = () => {


    const [myFilters, setMyFilters] = useState({
        filters: { categoria: [], precio: [] }
    });
    const [categorias, setCategorias] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [resultado, setResultado] = useState([]);

    const useStyles = makeStyles({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
      
    });

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    //cargar categorias 
    const init = () => {
        obtenerCategorias().then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setCategorias(data)
            }
        })
    }

    const cargarResultadosFiltro = (newFilter) => {
        // console.log(newFilter)
        buscarProducto(skip, limit, newFilter).then(data => {
            if (data.error) {
                setError(data.error)

            }
            else {
                setResultado(data.data)
                setSize(data.size)
                setSkip(0)


            }
        })
    }

    const cargarMasProductos = () => {
        let toSkip = skip + limit
        // console.log(newFilter)
        buscarProducto(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error)
            }
            else {
                setResultado([...resultado, ...data.data]);
                setSize(data.size)
                setSkip(0)


            }
        })
    }
    const botonCargarProductos = () => {

        return (
            size > 0 && size >= limit && (

                <button onClick={cargarMasProductos} className="btn btn-warning mb-5">Cargar mas productos</button>
            )
        )
    }
    useEffect(() => {
        init();
        cargarResultadosFiltro(skip, limit, myFilters.filters);
    }, []);

    const handleFilter = (filters, filterBy) => {

        const newFilter = { ...myFilters }
        newFilter.filters[filterBy] = filters

        if (filterBy === 'precio') {
            let precioValue = handlePrice(filters)
            newFilter.filters[filterBy] = precioValue;
        }
        cargarResultadosFiltro(myFilters.filters)
        setMyFilters(newFilter)
    }

    const handlePrice = value => {
        const data = Precios
        let array = []

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array
            }
        }

        return array;
    }


     const MenuFiltro = () => {
         return (
            <div >
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>Filtrar</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                
            <CardM className={classes.root}>
                <CardContent>
                    <Grid item xs={12} >
                    <h4>Categorias</h4>
                    <ul>
                        <Checkbox
                            categorias={categorias}
                            handleFilter={filters => handleFilter(filters, 'categoria')}
                        />
                    </ul>
                    </Grid>
                    <Grid item xs={12}>
                    <h4>Precio</h4>
                    <ul>
                        <RadioBox
                            precios={Precios}
                            handleFilter={filters => handleFilter(filters, 'precio')}
                        />
                    </ul>
                    </Grid>
                </CardContent>
            </CardM>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </div>
         )
     }



    return (
        <Layout
            titulo="Tienda"
            descripcion="Busca y encuentra tu producto ideal">
                      <Grid  >
                    {MenuFiltro ()}
                    </Grid>
            <Grid container>
          
                  
                        {resultado.map((producto, index) =>
                        <Grid item xs={12} sm={4} key={index} md={3} >
                            <Box m={2} >
                                <Card key={index} producto={producto} ></Card>
                            </Box>
                            </Grid>
                        )}
    
           
          
          
            </Grid>
          
        </Layout>
    )

}

export default Tienda;