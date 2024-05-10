import react from 'react'
import { useState } from 'react';
const Boton = (params) =>{
      //State 
      const [textoAMostrar,ModificarCadena] = useState("");
    const {titulo } = params;
    const modificar = ()=>{
      // let nueva = textoAMostrar.substring(0,textoAMostrar.length/2)
      ModificarCadena(titulo+"a")
     
    }
    return (
       <div>
        {textoAMostrar}
         <button onClick={()=>
          {modificar()}
         }>{titulo}</button>
       </div>
    );
}
export default Boton;
