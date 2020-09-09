import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import MostrarImagen from './imagenProducto'
import moment from 'moment'
import { agregarAlCarrito, moficarCarritoProducto, eliminarCarritoProducto } from '../carrito/carritoHelpers'
import { makeStyles } from '@material-ui/core/styles';
import CardMaterial from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import CardActionArea from '@material-ui/core/CardActionArea';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIconButton from '@material-ui/icons/Delete';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import VisibilityIcon from '@material-ui/icons/Visibility';
import CurrencyFormat from 'react-currency-format';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonBase from '@material-ui/core/ButtonBase';



const useStyles = makeStyles({
    root: {

        maxWidth: 500,
        maxHeight: 500,
        borderRadius: 0,
        background: 'linear-gradient(90deg, rgba(240,240,240,1) 0%, rgba(247,247,247,0.5998774509803921) 100%);',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
   
    },
    media: {
        height: 200,
        width: 'auto',
        borderRadius: '2px'
          },
});


const Card = ({ producto,
    BotonVerProducto = true,
    botonAgregarAlCarrito = true,
    modificarCarrito = false,
    botonEliminarProducto = false,
    setRun = f => f, // default value of function
    run = undefined // default value of undefined
}) => {

    const classes = useStyles();

    const [redirect, setRedirect] = useState(false)
    const [cantidad, setCantidad] = useState(producto.cantidad)

    const btnVerProducto = (BotonVerProducto) => {

        return (
            BotonVerProducto && (
                <Link to={`/producto/${producto._id}`}>
                    <Tooltip title="Ver Producto">
                        <IconButton variant="contained" color="primary" >
                            <VisibilityIcon></VisibilityIcon>
                        </IconButton>
                    </Tooltip>
                </Link>

            )
        )
    }

    const agregarProductoAlCarrito = () => {
        agregarAlCarrito(producto, () => {

            setRedirect(true)

        })
    }


    const sRedirect = redirect => {

        if (redirect) {
            return <Redirect to='/carrito'></Redirect>
        }
    }

    const btnAgregarCarro = () => {

        return (

            botonAgregarAlCarrito && (
                <Tooltip title="Agregar producto">

                    <IconButton onClick={agregarProductoAlCarrito} color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>

                </Tooltip>


            ))


    }



    const btnEliminarProductoCarrito = botonEliminarProducto => {

        return (

            botonEliminarProducto && (

                <Tooltip title="Eliminar Producto">

                <IconButton onClick={() => {
                    eliminarCarritoProducto(producto._id); setRun(!run); // run useEffect in parent Cart
                }} aria-label="share" color="secondary">
                    <DeleteIconButton />
                </IconButton>
                </Tooltip>

            ))


    }


    const MostrarModificacionCarrito = modificarCarrito => {

        return modificarCarrito &&

            <div className="row">
                <div className="input-group mb-1">
                    <div className="input-group-prepend">
                        <span className="input-group-text"> Cantidad </span>
                    </div>
                    <input type="number" className="form-control" value={cantidad} onChange={handleChange(producto._id)}></input>

                </div>
            </div>

    }

    const handleChange = productoId => event => {
        setRun(!run); // run useEffect in parent Cart
        setCantidad(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            moficarCarritoProducto(productoId, event.target.value)
        }

    }

    const MostrarStock = (cantidad) => {

        return cantidad > 0 ? (
            <Tooltip title="Producto Disponible">
                <CheckCircleIcon className="icon-check"></CheckCircleIcon>
            </Tooltip>


        ) : (
                <Tooltip title="Producto Agotado">
                    <CloseIcon className="icon-delete"></CloseIcon>
                </Tooltip>


            );
    }

    return (

     
     
        
         <CardMaterial className={classes.root}>
             
            <CardActionArea onClick={()=> {btnVerProducto(BotonVerProducto)}}>
                {sRedirect(redirect)}
                <CardHeader  title={producto.nombre}   subheader={producto.categoria.nombre}    />

                <Grid container alignItems="center" justify="center"  >
                <MostrarImagen className={classes.media} img={producto} url="products"></MostrarImagen>

               </Grid>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                         {MostrarStock(producto.cantidad)}
                    </Typography>
                    <Typography gutterBottom  >
                        <CurrencyFormat value={producto.precio} displayType={'text'} thousandSeparator={true} prefix={'$'} />

                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {producto.descripcion.substring(0, 50)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
      
 
 
 
                 {btnVerProducto(BotonVerProducto)}
                {btnAgregarCarro(botonAgregarAlCarrito)}
                {btnEliminarProductoCarrito(botonEliminarProducto)}
                
              {MostrarModificacionCarrito(modificarCarrito)}

            </CardActions>
        </CardMaterial>
    





    )
}


export default Card