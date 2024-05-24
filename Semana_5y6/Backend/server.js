/*haciendo referencia a express*/
const express = require('express')

const  bodyParser = require('body-parser')

const path = require('path')
const cors = require('cors')

var urlEncodeParser = bodyParser.urlencoded({extended:true});

/*inciializando express*/
const app = express()
app.use(urlEncodeParser)
app.use(cors())
app.options('*', cors())
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
let port = 3001;
app.listen(port,()=>{
    console.log('Servior corriendo en el puerto', port)
    //Despues de eso, podemos hacer peticiones a la url  http://localhost:port
})

// app.post('/saludar',(req,res)=>{})
// app.put('/saludar',(req,res)=>{})
// app.delete('/saludar',(req,res)=>{})
                 //request, response
app.get('/saludar/:id',(req,res)=>{
    console.log("el valor del id: "+req.params.id)

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
    } );

    /*sign up*/
    app.post('/signUp',(req,res)=>{
        res.status(200).send({
            mensaje: 'Usuario creado con exito',
        });
    })

    /*update*/
    app.put('/update',(req,res)=>{
        res.status(200).send({
            mensaje: 'Usuario actualizado con exito',
        });
    });
    /*delete*/
    app.delete('/delete',(req,res)=>{

        res.status(200).send({
            mensaje: 'Usuario eliminado con exito',
        });
    });

    /*como enviar los archivos */
app.get('/archivo',(req,res)=>{
    // res.sendFile(path.join(__dirname,'index.html'))
    let dir= path.join(__dirname,'index.html')
    console.log(dir)
    res.status(200).sendFile(dir)

});

/*
1) envio de datos por params x
2) connectar nuestro FE con nuestro BE
3) conectarnos por ngrok 
*/









