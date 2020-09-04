import {API} from '../config'



//GUARDA LOS DATOS DEL USUARIO QUE INGRESO EN EL SISTEMA EN LOCAL STORAGE
export const authenticate = (data,next) =>{

    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt', JSON.stringify(data))
        next();

    }


}

//Elimina lo datos del usuario ingresado de LOCAL STORAGE y desconecta al usuario del 
export const desUsuario = next => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('jwt');
            localStorage.removeItem('carrito');
            next();
            return fetch(`${API}/desconectar`, {
                method: 'GET'
            })
                .then(response => {
                    console.log('signout', response);
                })
                .catch(err => console.log(err));
        }
    };


//VERIFICAR SI EL USUARIO ESTA AUTENTIFICADO -- obtener los datos almacenados en LOCAL STORAGE 
export const isAuthenticate = () => {
    if (typeof window == 'undefined') {
        return false;
    }
    if (localStorage.getItem('jwt')) {
        return JSON.parse(localStorage.getItem('jwt'));
    } else {
        return false;
    }
};
