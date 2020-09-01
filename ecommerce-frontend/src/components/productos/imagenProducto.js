import React from 'react'
import {API} from '../../config'

const MostrarImagen =({img, url})=>(

    <div >
        <img src={`${API}/${url}/photo/${img._id}` } 
             alt={img.name} 
             className="mb-3 product-img" 
             style={{maxHeight:"40%",maxWidth:"40%"}}></img>
    </div>

)


export default MostrarImagen
