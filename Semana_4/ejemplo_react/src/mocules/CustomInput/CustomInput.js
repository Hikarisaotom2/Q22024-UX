import { useState } from "react";
import Message from "../../atoms/message/Message";
import Lista from "../lista/Lista";
import BotonLista from "../../atoms/botonLista/BotonLista";
import axios from "axios";

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

    const realizarPeticion = async () =>{
      let url = "http://localhost:3001/logIn"; 

      const body = {
        usuario:'admin1',
        contrasena: 'admin1',
      }

      const config = {
        headers: {
          'Content-Type': ' application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin': '*',
      }
    }
      /*async*/
      /* las promise son async*/
      /*
      1) async/await 
      2) then catch
      */

      // let res = await axios.post(url,body,config)
      // console.log("La respuesta del backend ",res.data)
      // modificarValor(res.data.message)
    
      axios.post(url,body,config).then((res)=>{ 
        console.log("La respuesta del backend ",res.data)
        modificarValor(res.data.nombre)
        
      })
      .catch((error)=>{
        console.log("Error en la peticion",error.response.data.descripcion)
        modificarValor(error.response.data.descripcion)

      } )
      console.log("Peticion realizada") 
      metodo("hola","mundo")
      metodo("hola") 
  }
  

  const metodo =(param,param2="hola")=> {
    console.log("parametro",param)
    console.log("parametro2",param2)
  }
  
    return(
        // cotendor vacio
      <>
        {valor}
        <input type= "text" placeholder = "ingrese un valor" onChange={actualizar}/>
      <BotonLista title="agregar" comportamiento = {agregar} />
      <BotonLista title="Peticion al BE"  comportamiento ={realizarPeticion}/>
      <BotonLista title="limpiar"  comportamiento ={()=>console.log("limpiar")}/>
       <Lista list = {lista} />
        {
          lista.length!==0 && <Message title ="Listando los elementos" />
        }

      </>
    );
}


export default CustomInput;