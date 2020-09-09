import React from 'react'
import {API} from '../../config'

const MostrarImagen =({img, url, className})=>(

    <div className="contorno-img">
        <img src={`${API}/${url}/photo/${img._id}` } 
             alt={img.name} 
             className={className} 
             ></img>
    </div>

)


export default MostrarImagen
