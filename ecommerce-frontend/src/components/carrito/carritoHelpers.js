
// agregar itema al carrito de localStorage.getItem('carrito')
export const agregarAlCarrito = (producto = [], next) => {

    let carrito = [];

    if(typeof window !== 'undefined'){
        if(localStorage.getItem('carrito')){

            carrito = JSON.parse(localStorage.getItem('carrito'));
        }

        carrito.push({            
              ...producto,
              count: 1

        })

        carrito = Array.from(new Set(carrito.map((p)=> (p._id)))).map(id=>{

            return carrito.find(p=>p._id === id)
        })

        localStorage.setItem('carrito', JSON.stringify(carrito))
        next();
    }
}



//Retorna el total de productos que hay en el carrito

export const totalProductos = () => {

    if(typeof window !== 'undefined'){

        if(localStorage.getItem('carrito')){
            return JSON.parse(localStorage.getItem('carrito')).length;

        } 

        return 0;
         
    }
}


//Obtener los datos del carrito localStorage.getItem('carrito')

export const obtenerCarrito = () => {

    if(typeof window !== 'undefined'){

        if(localStorage.getItem('carrito')){
            return JSON.parse(localStorage.getItem('carrito'));

        } 

        return [];
         
    }
}



export const moficarCarritoProducto = (productoId, cantidad) => {


    let carrito=[]
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('carrito')){
            carrito = JSON.parse(localStorage.getItem('carrito'));

        }
            carrito.map((producto,index)=>{
                if(producto._id === productoId){
                  carrito[index].count = cantidad

                }
            })
            localStorage.setItem('carrito', JSON.stringify(carrito))
        


    }
}


export const eliminarCarritoProducto = (productoId) => {


    let carrito=[]
    if(typeof window !== 'undefined'){
        if(localStorage.getItem('carrito')){
            carrito = JSON.parse(localStorage.getItem('carrito'));

        }
            carrito.map((producto,index)=>{
                if(producto._id === productoId){
                  carrito.splice(index, 1)

                }
            })
            localStorage.setItem('carrito', JSON.stringify(carrito))
        


    }


    

    return carrito;
}

export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('carrito');
        next();
    }
};
