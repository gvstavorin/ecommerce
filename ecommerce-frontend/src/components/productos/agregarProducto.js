import React, { useState, useEffect } from 'react'
import Layout from '../../core/layout'
import { isAuthenticate } from '../../auth/auth'
import { crearProducto } from '../../api/producto'
import { obtenerCategorias } from '../../api/categoria'
import { Link } from 'react-router-dom'


const AgregarCategoria = () => {

    const [values, setValues] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categorias: [],
        categoria: '',
        envio: '',
        cantidad: '',
        foto: '',
        loading: false,
        error: '',
        productoCreado: '',
        redirectToProfile: false,
        formData: ''

    })
    const { user, token } = isAuthenticate()
    const { nombre, descripcion, precio, categorias, categoria,
        envio, cantidad, loading, error, productoCreado,
        redirectToProfile, formData } = values;


    //cargar categorias para select.
    const init = () => {
        obtenerCategorias().then(response => {
            if (response.error) {
                setValues({ ...values, error: response.error })
            } else {
                setValues({ ...values, categorias: response, formData: new FormData() })
            }
        })
    }
    useEffect(() => { init() }, [])

    const handleChange = name => event => {
        const value = name === 'foto' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })

    }




    const clickSubmit = event => {

        event.preventDefault()
        setValues({ ...values, error: '', loading: true })

        crearProducto(user._id, token, formData)
            .then(data => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({
                        ...values,
                        nombre: '',
                        descripcion: '',
                        foto: '',
                        precio: '',
                        cantidad: '',
                        loading: false,
                        productoCreado: data.nombre
                    })

                }
            })


    }

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-info " style={{ display: productoCreado ? '' : 'none' }}>
            <h2>{`${productoCreado}`} Agregado como producto correctamente </h2>
        </div>
    )

    const showLoading = () => (

        loading && (
            <div className="alert alert-success"><h2>Cargando...</h2></div>
        )
    )


    const goBack = () => (
        <div className="card">

            <div className="card-body">
                <div className="mt-2 ">

                    <Link to="/admin/dashboard" > Volver el menu administrador</Link>

                </div>
            </div>
        </div>
    )

    const formNuevoProducto = () => (
        <div className="card mt-2">
            <div className="card-body">
                <form className="mb-3" onSubmit={clickSubmit}>
                    <h4>Elegir foto</h4>
                    <div className="form-group">
                        <label className="btn btn-dark">
                            <input type="file" name="foto" accept="image/*" onChange={handleChange('foto')} required></input>
                        </label>
                    </div>
                    <div className="row">

                        <div className="form-group col-md-6">
                            <label className="text-muted">Nombre</label>
                            <input type="text" className="form-control" onChange={handleChange('nombre')} value={nombre} required></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label className="text-muted">Precio</label>
                            <input type="number" className="form-control" onChange={handleChange('precio')} value={precio} required></input>
                        </div>
                    </div>
                    <div className="row">
                    <div className="form-group col-md-6">
                        <label className="text-muted">Categoria</label>
                        <select type="text" className="form-control" onChange={handleChange('categoria')} required>
                            <option>-- Seleccionar opcion -- </option>
                            {categorias && categorias.map((categorias, i) => (
                                <option key={i} value={categorias._id} > {categorias.nombre}  </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group col-md-6">
                        <label className="text-muted">Cantidad</label>
                        <input type="number" className="form-control" onChange={handleChange('cantidad')} value={cantidad} required></input>
                    </div>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Descripcion</label>
                        <input type="area" className="form-control" onChange={handleChange('descripcion')} value={descripcion} required></input>
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Envio</label>
                        <select type="text" className="form-control" onChange={handleChange('envio')} required>
                            <option>-- Seleccionar opcion -- </option>
                            <option value="0">No</option>
                            <option value="1">Si</option>
                        </select>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary">Agregar producto</button>
                    </div>
                </form>
            </div>
        </div>
    )
    return (

        <div>
            <Layout titulo='Productos' descripcion="Agregar una nuevo producto" >

                <div className="row">
                    <div className="col-md-8 offset-md-2">
                        {showError()}
                        {showSuccess()}
                        {goBack()}
                        {showLoading()}
                        {formNuevoProducto()}

                    </div>

                </div>

            </Layout>

        </div>
    )
}

export default AgregarCategoria;