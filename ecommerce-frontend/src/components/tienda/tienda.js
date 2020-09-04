import React, { useState, useEffect } from 'react'
import Layout from '../../core/layout'
import Card from '../productos/cardProducto'
import { obtenerCategorias } from '../../api/categoria'
import { buscarProducto } from '../../api/producto'
import Checkbox from '../categorias/checkbox';
import { Precios } from '../categorias/filtroPrecios'
import RadioBox from '../categorias/radiobox'
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
                setResultado([...resultado,...data.data]);
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

        if (filterBy ==='precio') {
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

    return (
        <Layout
            titulo="Tienda"
            descripcion="Busca y encuentra tu producto ideal"
            className="container-fluid">
            <div className="row">
                <div className="col-2">

                    <h4>Filtrar por categorias</h4>
                    <ul>
                        <Checkbox
                            categorias={categorias}
                            handleFilter={filters => handleFilter(filters, 'categoria')}

                        />


                    </ul>

                    <h4>Filtrar por Precio</h4>
                    <ul>
                        <RadioBox
                            precios={Precios}
                            handleFilter={filters => handleFilter(filters, 'precio')}
                        />
                    </ul>
                </div>
                <div className="col-sm">
                    <h2 className="mb-4">Productos</h2>
                    <div className="row">
                        {resultado.map((producto, i) => {
                            if (producto) {
                                return (
                                    <div key={i} className="col-4 mb-3">
                                    <Card  producto={producto} ></Card>
                                </div>
                                )
                            } else {
                                return (
                                    <h2> no hay jiji</h2>

                                )
                            }
                        })}
                    </div>
                    <hr/>
                     <div className="text-center">
                     {botonCargarProductos()}
                     </div>
                 
                </div>
            </div>

        </Layout>
    )

}

export default Tienda;