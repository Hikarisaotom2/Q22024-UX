import { useState } from "react";
import Message from "../../atoms/message/Message";
import Lista from "../lista/Lista";
import BotonLista from "../../atoms/botonLista/BotonLista";

const CustomInput = () =>{
 const [valor, modificarValor] = useState("");
 const [lista, modificarLista] = useState([]);

 const agregar = ()=>{
  modificarLista([...lista,valor])
  console.log(lista)
 }

  const actualizar = (event) =>
    {
      let nuevoValor = event.target.value;
      modificarValor(nuevoValor);
    }


  
    return(
        // cotendor vacio
      <>
        {valor}
        <input type= "text" placeholder = "ingrese un valor" onChange={actualizar}/>
      <BotonLista title="agregar" comportamiento = {agregar} />
      <BotonLista title="eliminar"  comportamiento ={()=>console.log("hola")}/>
      <BotonLista title="limpiar"  comportamiento ={()=>console.log("limpiar")}/>
       <Lista list = {lista} />
        {
          lista.length!==0 && <Message title ="Listando los elementos" />
        }

      </>
    );
}


export default CustomInput;