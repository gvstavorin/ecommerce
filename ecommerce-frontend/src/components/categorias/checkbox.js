import React,  {useState} from 'react'

const Checkbox = ({categorias, handleFilter})=>{
   
    const [checked,setChecked] = useState([])

    const handleToggle=(c)=>{
        
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]

        if(currentCategoryId===-1){
                 newCheckedCategoryId.push(c)
        } 
        else{
                
             newCheckedCategoryId.splice(currentCategoryId,1)

        }
         setChecked(newCheckedCategoryId);
         handleFilter(newCheckedCategoryId)


    }
    return categorias.map((c,index)=>
           <li key={index} className="list-unstyled">
             <input onChange={() => handleToggle(c._id)} type="checkbox" value={checked.indexOf(c._id !==-1)} className="form-check-input"/>
             <label className="form-check-label">{c.nombre}</label>
         </li>

    )
}


export default Checkbox