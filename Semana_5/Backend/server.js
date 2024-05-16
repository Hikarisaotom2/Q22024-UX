/*haciendo referencia a express*/
const express = require('express')

/*inciializando express*/
const app = express()

/*
terminologia: 
Payload: 
Callback: un fragmento de codigo que se ejecuta luego de un suceso
*/
/*definir el puerto en el que se levantara el servicio*/

/*
1) llamamos listen 
2) listen a a actualizar la informacion del puerto y otras dependencias.... 
3) cuando lisen finalice de hacer su trabajo, va a ejecutar el callback
*/
let port = 3000;
app.listen(port,()=>{
    console.log('Servior corriendo en el puerto', port)
    //Despues de eso, podemos hacer peticiones a la url  http://localhost:port
})

app.get('/saludar',(req,res)=>{
    console.log("Recibimos una solicitud.....");
    res.send("Hola desde mi primer api!!!! :) ");
}
);









