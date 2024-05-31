/*haciendo referencia a express*/
const express = require('express')

const  bodyParser = require('body-parser')

const path = require('path')
const cors = require('cors');
const { ServerApiVersion,MongoClient } = require('mongodb');

let port = 3001;

const uri = 'mongodb+srv://usuario:password1!@ux2023.lg0z62y.mongodb.net/?retryWrites=true&w=majority&appName=ux2023'



var urlEncodeParser = bodyParser.urlencoded({extended:true});

/*inciializando express*/
const app = express()
app.use(urlEncodeParser)
app.use(cors())
app.options('*', cors())
const client = new MongoClient(uri, {
    serverApi:{
        version:ServerApiVersion.v1,
        strict:true,
    }
});
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

async function run(){
    try{
        await client.connect();
        console.log('Conectado a la base de datos')
    }catch(error){
        console.error('Hubo un error al conectarse a la base de datos',error)
    }
}


app.listen(port,()=>{
    console.log('Servior corriendo en el puerto', port)
    run();
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
    app.post('/signUp',async (req,res)=>{
        try{
            const client = new MongoClient(uri);
            //conectarse a la db
            const database = client.db('pruebaBackend');
            //seleccionar la coleccion
            const collection = database.collection('logInUsers');
            //insertar un documento
           const resultado =  await collection.insertOne({
                usuario: req.body.usuario,
                contrasena: req.body.contrasena,
                ...req.body
            });
            console.log(resultado)
            console.log('Usuario creado con exito')
            res.status(200).send({
                mensaje: "Usuario creado con exito",
                resultado: resultado,
            });

        }catch(error){
            console.error('No se pudo crear el usuario',error)
            res.status(500).send({
                mensaje: "No se pudo crear el usuario"+error
            });
        }   
        

    })

    /*update*/
    app.put('/update',async (req,res)=>{
      try{
        const client = new MongoClient(uri);
        //conectarse a la db
        const database = client.db('pruebaBackend');
        //seleccionar la coleccion
        const collection = database.collection('logInUsers');
        //update document 
        const resultado = await collection.updateOne({
            //where usuario = req.body.usuario
            usuario: req.body.usuario,
        },{
            $set:{
               ...req.body
            }
        });
        res.status(200).send({
            mensaje: "se actualizo la información",
            resultado: resultado,
        });
      }catch(error){
        console.error('No se pudo crear el usuario',error)
        res.status(500).send({
            mensaje: "No se pudo crear el usuario"+error
        });
      }
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









