import { useState } from "react";

const CustomInput = () =>{
 const [valor, modificarValor] = useState("");
 const [lista, modificarLista] = useState([]);

 const agregar = ()=>{
  // let nuevaLista = [valor]
  // nuevaLista.join(lista);
  // modificarLista(nuevaLista);

  modificarLista([...lista,valor])
  console.log(lista)
 }
  const actualizar = (event) =>
    {
      let nuevoValor = event.target.value;
      modificarValor(nuevoValor);
    }


    const mostrarElementos = () =>{
      if(lista.length==0){
        return <text> No hay nada que mostrar </text>
      }else{
       return  lista.map( item => (<text> 
        {item}
      </text>))
      }
    }
    return(
        // cotendor vacio
      <>
      {valor}
        <input type= "text" placeholder = "ingrese un valor" onChange={actualizar}/>
        <button onClick={agregar} >agregar</button>

        {/* {
         lista.length==0 ? <text> No hay nada que mostrar</text> : <text> lista</text>
        } */}

        {
          mostrarElementos()
        }

        {
          lista.length!=0 && <text> se esta mostrando por que la lista tiene algo</text>
        }

      </>
    );
}

export default CustomInput;