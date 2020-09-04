import React from 'react'
import {API} from '../../config'

const MostrarImagen =({img, url})=>(

    <div >
        <img src={`${API}/${url}/photo/${img._id}` } 
             alt={img.name} 
             className="product-img" 
             ></img>
    </div>

)


export default MostrarImagen
