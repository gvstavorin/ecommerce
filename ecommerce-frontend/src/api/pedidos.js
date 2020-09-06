import { API } from '../config'




export const crearPedido = (userId, token,crearOrdenData) => {


    return fetch(`${API}/order/create/${userId}`, {

        method: "POST",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({order:crearOrdenData})
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export const listarPedidos = (userId, token) => {


    return fetch(`${API}/order/list/${userId}`, {

        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}



export const obtenerValosDeEstados = (userId, token) => {


    return fetch(`${API}/order/statusValues/${userId}`, {

        method: "GET",
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}


export const modificarEstadoPedido = (userId, token,orderId, status) => {


    return fetch(`${API}/order/${orderId}/status/${userId}`, {

        method: "PUT",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },

        body : JSON.stringify({status,orderId})
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
