import React, { useState } from 'react'
import Layout from '../../core/layout'
import { isAuthenticate } from '../../auth/auth'
import { crearCategoria } from '../../api/categoria'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const AgregarCategoria = () => {

    const [nombre, setNombre] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);



    // obtener * usuario y token desde localstorage
    const { user, token } = isAuthenticate();

    const handleChange = (e) => {
        setError('')
        setNombre(e.target.value)
    }
    const clickSubmit = (e) => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        //realizar petician a la api para crear categoria
        crearCategoria(user._id, token, { nombre })
            .then(data => {
                if (data.error) {
                    setError(true)
                } else {
                    setError("")
                    setSuccess(true)
                }
            })


    }

    const showError = () => {
        if (error) {
            return <div className="alert alert-danger"> Categoria {nombre} ya existe</div>
        }
    }
    const showSuccess = () => {
        if (success) {
            return <div className="alert alert-success"> {nombre} Agregada exitosamente</div>
        }

    }
    const goBack = () => (
        <div className="card">

            <div className="card-body">
                <div className="mt-2 ">

                    <Link to="/admin/dashboard" > Volver el menu administrador</Link>

                </div>
            </div>
        </div>
    )

    const formNuevaCategoria = () =>
        (
            <form onSubmit={clickSubmit}>
                <div className="form-group mt-4">
                    <TextField className="form-control" type="text" onChange={handleChange} value={nombre}
                    label="Nombre Categoria" variant="outlined"
                    autoFocus required></TextField>

                </div>
                <Button type="submit" variant="contained" color="primary" className="mt-4" > Crear Categoria</Button>

            </form>
        )


    return (

        <div>
            <Layout titulo='Categeorias' descripcion="Agregar una nueva categoria" >
                <Grid container alignItems="center" justify="center" style={{ padding: '10px' }}>
                    <Grid item xs={12} sm={9}  >
                        <Box m={2} pt={3}>
                        {showError()}
                        {showSuccess()}
                        {goBack()}
                        {formNuevaCategoria()}
                        </Box>
                    </Grid>
               
                </Grid>

            </Layout>

        </div>
    )

}


export default AgregarCategoria;