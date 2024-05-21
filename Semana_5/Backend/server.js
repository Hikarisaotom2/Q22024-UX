/*haciendo referencia a express*/
const express = require('express')

const  bodyParser = require('body-parser')

var urlEncodeParser = bodyParser.urlencoded({extended:true});

/*inciializando express*/
const app = express()
app.use(urlEncodeParser)

/*
                    terminologia: 
    Endpoint: es la url a la que se le hace una peticion
    Payload: es la informacion que se envia a traves de una peticion 
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

// app.post('/saludar',(req,res)=>{})
// app.put('/saludar',(req,res)=>{})
// app.delete('/saludar',(req,res)=>{})
                 //request, response
app.get('/saludar',(req,res)=>{
console.log("peticiendo procesada")
    res.status(200).send([
        {
            id:123,
            nombre: 'Jorge',
            apellido: 'Lopez'
        },
        {
            id:2345,
            nombre: 'Juan',
            apellido: 'Perez'
        }
    ]);
}
);

app.post('/logIn',(req,res)=>{
    console.log("usuario",req.body.usuario);
    console.log("contrasena",req.body.contrasena)
    if(req.body.usuario === 'admin' && req.body.contrasena === 'admin'){
        res.status(200).send({
            message: 'Bienvenido',
            token: '123456789',
            id: 123,
            nombre: 'Jorge',
        });
    }else{
        res.status(401).send({
            message: 'Credenciales incorrectas',
            descripcion: 'Usuario o contrasena incorrecta'
        });
    }
       
    }
);











