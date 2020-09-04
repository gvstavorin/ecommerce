import { API } from '../config'




export const obtenerTokenClienteBraintree = (userId, token) => {

    return fetch(`${API}/braintree/getToken/${userId}`, {

        method: "GET",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
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


export const proccessPayment = (userId, token,paymentData) => {

    return fetch(`${API}/braintree/payment/${userId}`, {

        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(paymentData)
    })
        .then(response => {
            return response.json()
        })
        .catch(error => {
            console.log(error)
        })
}
