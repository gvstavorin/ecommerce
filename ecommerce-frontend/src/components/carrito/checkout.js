import React, { useState, useEffect } from 'react';
import { obtenerTokenClienteBraintree,proccessPayment } from '../../api/braintree';
import { crearPedido } from '../../api/pedidos';
import { emptyCart } from './carritoHelpers';
import Card from '../productos/cardProducto';
import { isAuthenticate } from '../../auth/auth';
import { Link } from 'react-router-dom';
// import "braintree-web"; // not using this package
import DropIn from 'braintree-web-drop-in-react';

const Checkout = ({ productos, setRun = f => f, run = undefined }) => {

    
    const [data, setData] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: '',
        instance: {},
        direccion: ''
    });

    const userId = isAuthenticate() && isAuthenticate().user._id;
    const token = isAuthenticate() && isAuthenticate().token;
    console.log(userId)
    const getToken = (userId, token) => {
        obtenerTokenClienteBraintree(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
                setData({ ...data, error: data.error });
            } else {
                console.log(data);
                setData({ clientToken: data.clientToken });
            }
        });
    };

    useEffect(() => {
        getToken(userId, token);
    }, [run]);

    const handleAddress = event => {
        setData({ ...data, direccion: event.target.value });
    };

    const getTotal = () => {
        return productos.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.precio;
        }, 0);
    };

    const showCheckout = () => {
        return isAuthenticate() ? (
            <div>{showDropIn()}</div>
        ) : (
            <Link to="/signin">
                <button className="btn btn-primary">Sign in to checkout</button>
            </Link>
        );
    };

    let direccionEntrega = data.direccion;

    const buy = () => {
        setData({ loading: true });
        // enviar nonce a nuestro servidor
        // nonce = data.instance.requestPaymentMethod()
        let nonce;
        let getNonce = data.instance
            .requestPaymentMethod()
            .then(data => {
                // console.log(data);
                nonce = data.nonce;
                // una vez obtengas el nonce (card type, card number) enviar nonce como 'paymentMethodNonce'
           
                const paymentData = {
                    paymentMethodNonce: nonce,
                    amount: getTotal(productos)
                };

                proccessPayment(userId, token, paymentData)
                    .then(response => {
                        console.log(response);
                        // empty cart
                        // create order

                        const crearOrdenData = {
                            productos: productos,
                            transaction_id: response.transaction.id,
                            amount: response.transaction.amount,
                            direccion: direccionEntrega
                        };

                        crearPedido(userId, token, crearOrdenData)
                            .then(response => {
                                emptyCart(() => {
                                    setRun(!run); // run useEffect in parent Cart
                                    console.log('payment success and empty cart');
                                    setData({
                                        loading: false,
                                        success: true
                                    });
                                });
                            })
                            .catch(error => {
                                console.log(error);
                                setData({ loading: false });
                            });
                    })
                    .catch(error => {
                        console.log(error);
                        setData({ loading: false });
                    });
            })
            .catch(error => {
                // console.log("dropin error: ", error);
                setData({ ...data, error: error.message });
            });
    };

    const showDropIn = () => (
        <div onBlur={() => setData({ ...data, error: '' })}>
            {data.clientToken !== null && productos.length > 0 ? (
                <div>
                    <div className="gorm-group mb-3">
                        <label className="text-muted">Direccion de entrega:</label>
                        <textarea
                            onChange={handleAddress}
                            className="form-control"
                            value={data.direccion}
                            placeholder=""
                        />
                    </div>

                    <DropIn
                        options={{
                            authorization: data.clientToken,
                            paypal: {
                                flow: 'vault',
                            

                            }
                        }}
                        onInstance={instance => (data.instance = instance)}
                    />
                    <button onClick={buy} className="btn btn-success btn-block">
                        Pagar
                    </button>
                </div>
            ) : null}
        </div>
    );

    const showError = error => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = success => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            Thanks! Your payment was successful!
        </div>
    );

    const showLoading = loading => loading && <h2 className="text-danger">Loading...</h2>;

    return (
        <div>
            <h2>Total: ${getTotal()}</h2>
            {showLoading(data.loading)}
            {showSuccess(data.success)}
            {showError(data.error)}
            {showCheckout()}
        </div>
    );
};

export default Checkout;
