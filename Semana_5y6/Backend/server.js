/*haciendo referencia a express*/
const express = require('express')
const  bodyParser = require('body-parser')

const { initializeApp } = require('firebase/app')
const {getAuth, createUserWithEmailAndPassword} = require('firebase/auth')

const path = require('path')
const cors = require('cors');
const { ServerApiVersion,MongoClient, ObjectId } = require('mongodb');

let port = 3001;
const uri = 'mongodb+srv://usuario:password1!@ux2023.lg0z62y.mongodb.net/?retryWrites=true&w=majority&appName=ux2023'
const firebaseConfig = {
    apiKey: "AIzaSyBaejQ2O8MRgMtsQFFVqkMwiTx7e2_KkXA",
    authDomain: "ux2024-6cba2.firebaseapp.com",
    projectId: "ux2024-6cba2",
    storageBucket: "ux2024-6cba2.appspot.com",
    messagingSenderId: "342081729560",
    appId: "1:342081729560:web:c891f7902249a31dd0bf6d",
    measurementId: "G-5NG5C4NQFH"
  };

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

const firebaseApp = initializeApp(firebaseConfig);
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


app.post('/signUpFirebase',async (req,res)=>{
    /*
    correo, contrasena, nombre 
    */
   const auth = getAuth(firebaseApp);
   const email = req.body.correo;
   const password = req.body.contrasena;
   try{
         const userCredential = await createUserWithEmailAndPassword(auth,email,password);
         res.status(200).send({
            descripcion: 'usuario creado con exito',
            resultado: userCredential
        });
   }catch(error){
       console.error('Hubo un error al crear el usuario',error)
       res.status(500).send({
        descripcion: 'No se pudo crear el usuario en firebase',
        resultado: error
    });
   }
});

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
            //    usuario: req.body.usuario,
            //    contrasena: req.body.contrasena,
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
    app.delete('/delete',async (req,res)=>{
        try{
            const client = new MongoClient(uri);
            //conectarse a la db
            const database = client.db('pruebaBackend');
            //seleccionar la coleccion
            const collection = database.collection('logInUsers');
            //delete document 
            const query = {_id: new ObjectId(req.body.id)};
            const resultado = await collection.deleteOne(query);

            if(resultado.deletedCount === 1){
                res.status(200).send({
                    mensaje: 'Usuario eliminado con exito',
                });
            }else{
                res.status(200).send({
                    mensaje: 'No se encontro el usuario a eliminar, no se elimino nada',
                });
            }

           
        }catch(error){
            console.error('No se pudo eliminar el usuario',error)
            res.status(500).send({
                mensaje: "No se eliminar  el usuario"+error
            });
        }
   
    });

    /*como enviar los archivos */
app.get('/archivo',(req,res)=>{
    // res.sendFile(path.join(__dirname,'index.html'))
    let dir= path.join(__dirname,'index.html')
    console.log(dir)
    res.status(200).sendFile(dir)

});

app.get('/getInfo',async (req,res)=>{
    try{
        const client = new MongoClient(uri);
            //conectarse a la db
            const database = client.db('pruebaBackend');
            //seleccionar la coleccion
            const collection = database.collection('logInUsers');
        //delete document 

        const findResult = await collection.find({}).toArray();
        if(findResult.length > 0){
            res.status(200).send({mensaje: 'Informacion obtenida con exito',resultado: findResult});
        }else{
            res.status(200).send({mensaje: 'Informacion obtenida con exito',resultado: []});
        }
        
        console.log('Found documents =>', findResult);

        // const query = {usuario: req.body.usuario};
        // const options ={
        //     /*
        //     sort: {nombre:0, category:1},
        //     */ 
        //     projection:{
        //         usuario:1,
        //         contrasena:1,
        //     }
        // }

        // const resultado = await collection.find({},{
        //     usuario:1,
        //     contrasena:1,
        // },{});
        //     console.log(resultado)
        // let resultadoFinal = [];

        // resultado.forEach((doc)=>{
        //     resultadoFinal.push(doc);
        // });
        // res.status(200).send({mensaje: 'Informacion obtenida con exito',
        // resultado: resultadoFinal});
    }catch(error){
        res.status(500).send({
            mensaje: "algo salio mal",
            resultado:[],
        });
    }
});

/*
1) envio de datos por params x
2) connectar nuestro FE con nuestro BE
3) conectarnos por ngrok 
*/









