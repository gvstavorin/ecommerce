import React, { useState } from "react";

const RadioBox = ({ precios, handleFilter }) => {
    const [values, setValue] = useState(0);
    
    const handleChange =event=> {

        handleFilter    (event.target.value)
        setValue    (event.target.value)
       
      console.log(event.target.value)


    };
    return precios.map((p, i) => (
        <div key={i}>
            <input
                onClick={handleChange}
               value={`${p._id}`}
                name={p}
                type="radio"
                className="mr-2"
            />
            <label className="form-check-label">{p.nombre} </label>
        </div>
    ));
};

export default RadioBox;
