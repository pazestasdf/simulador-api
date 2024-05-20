//Importo dotenv para usar .env
require('dotenv').config()
const express = require('express')
const cors = require('cors')
//Importo archivo db, que tiene la conexión a la base de datos y las funciones para guardar y leer información desde ella.
const db = require('./db/db.js');

const app = express()
app.use(cors())
app.use(express.json());

//Opciones del cors
var corsOptions = {
    origin: '*', // reemlazar por dominio donde estará la aplicacion: ej. localhost:3001
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


/*
Funciones que procesan según el tipo de simulador
*/

const getNextId = async (simulador) => {
    if (simulador == 'dividendo') {
        return await db.getNextDividendoId();
    }
    if (simulador == 'ingreso') {
        return db.getNextIngresoId();
    }
    if (simulador == 'precio') {
        return db.getNextPrecioId();
    }
}

const getData = async (simulador) => {
    if (simulador == 'dividendo') {
        return await db.getDividendoData();
    }
    if (simulador == 'ingreso') {
        return db.getIngresoData();
    }
    if (simulador == 'precio') {
        return db.getPrecioData();
    }
}

/* Función principal */
const initApi = async () => {

    // Me conecto con el servidor de mongoDB (espero a que se conecte con await antes de ejecutar lo demás, 
    // ya que todo el programa depende de que estemos conectados a base de datos)
    await db.connect();

    //Express va a escuchar en el puerto 3000

    app.listen(process.env.PORT || 3007, () => {
        console.log("Server running on port 3007");
    });

    //Endpoint /getnextid que va a devolver el número de contador siguiente según el tipo de simulador
    app.post('/getnextid', cors(corsOptions), async function (req, res) {
        //Obtiene contador según el tipo de simulador
        const id = await getNextId(req.body.simulador)
        //Envía la respuesta (el metodo send no acepta numeros, por lo que hay que transformalo a string antes de enviarlo)
        res.send(id.toString())
    })

    //Endpoint /save que va guarda un registro en base de datos según el tipo de simulador
    app.post('/save', cors(corsOptions), async function (req, res) {
        const data = req.body;
        const simulador = data.simulador;
        //Guarda el registro en base de datos. Si se guarda de manera exitosa devuelve true, de lo contrario de devuelve false
        const save = await db.saveEntry(simulador, data)
        //Devuelvo true o false
        res.send(save)
    })

    //Endpoint /save que va guarda un registro en base de datos según el tipo de simulador
    app.post('/getdata', cors(corsOptions), async function (req, res) {
        //Guarda el registro en base de datos. Si se guarda de manera exitosa devuelve true, de lo contrario de devuelve false
        const data = await getData(req.body.simulador)
        //Envío la informacion de la base de datos de mongo como respuesta
        res.send(data)
    })


}

//Inicia la aplicación llamando a la función principal
initApi()
