const mongoose = require('mongoose');
const Dividendo = require('./models/dividendo.js');
const Ingreso = require('./models/ingreso.js');
const Precio = require('./models/precio.js');
const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`

const connect = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongodb connected!!');
        return true;
    } catch (err) {
        console.log('Failed to connect to Mongodb', err);
        return false;
    }
};

// Obtiene el siguiente numero de registro del simulador de Dividendo guardado en base de datos
const getNextDividendoId = async () => {
    //Busco Ultimo registro de la base de datos
    const latestEntry = await Dividendo.find().sort({ contador: -1 }).limit(1);
    //Si no encuentra nada, devuelvo 1, si encuentra registro devuelvo el numero de registro + 1
    if (latestEntry.length == 0) return 1
    return (latestEntry[0].contador + 1);
}

// Obtiene el siguiente numero de registro del simulador de Ingreso guardado en base de datos
const getNextIngresoId = async () => {
    //Busco Ultimo registro de la base de datos
    const latestEntry = await Ingreso.find().sort({ contador: -1 }).limit(1);
    //Si no encuentra nada, devuelvo 1, si encuentra registro devuelvo el numero de registro + 1
    if (latestEntry.length == 0) return 1
    return (latestEntry[0].contador) + 1;
}

// Obtiene el siguiente numero de registro del simulador de Precio guardado en base de datos
const getNextPrecioId = async () => {
    //Busco Ultimo registro de la base de datos
    const latestEntry = await Precio.find().sort({ contador: -1 }).limit(1);
    console.log(latestEntry.length);
    //Si no encuentra nada, devuelvo 1, si encuentra registro devuelvo el numero de registro + 1
    if (latestEntry.length == 0) return 1
    return (latestEntry[0].contador) + 1;
}

// Guarda un registro en base de datos
const saveEntry = async (simulador, data) => {
    try {
        if (simulador == 'dividendo') {
            const entry = new Dividendo({
                contador: data.contador,
                simulador: data.simulador,
                ciudad: data.ciudad,
                subsidio: data.subsidio,
                valorEn: data.valorEn,
                porcentajeFinanciarBanco: data.porcentajeFinanciarBanco,
                montoDividendo: data.montoDividendo,
                fecha: data.fecha
            })

            await entry.save();
            console.log(`[${simulador}] Entry succesfully saved.`);
            return true;
        }
        if (simulador == 'ingreso') {
            const entry = new Ingreso({
                contador: data.contador,
                simulador: data.simulador,
                ciudad: data.ciudad,
                subsidio: data.subsidio,
                valorEn: data.valorEn,
                porcentajeFinanciarBanco: data.porcentajeFinanciarBanco,
                renta: data.renta,
                fecha: data.fecha
            })
            await entry.save();
            console.log(`[${simulador}] Entry succesfully saved.`);
            return true;
        }
        if (simulador == 'precio') {
            const entry = new Precio({
                contador: data.contador,
                simulador: data.simulador,
                ciudad: data.ciudad,
                subsidio: data.subsidio,
                valorEn: data.valorEn,
                porcentajeFinanciarBanco: data.porcentajeFinanciarBanco,
                precioCasa: data.precioCasa,
                fecha: data.fecha
            })
            await entry.save();
            console.log(`[${simulador}] Entry succesfully saved.`);
            return true;
        }
    } catch (err) {
        console.log('There was an error saving the video data into the database:', err);
        return false;
    }
}

const getDividendoData = async () => {
    const dividendoData = await Dividendo.find();
    return dividendoData;
}

const getIngresoData = async () => {
    const ingresoData = await Ingreso.find();
    return ingresoData;
}

const getPrecioData = async () => {
    const precioData = await Precio.find();
    return precioData;
}

module.exports = {
    connect,
    getNextDividendoId,
    getNextIngresoId,
    getNextPrecioId,
    saveEntry,
    getDividendoData,
    getIngresoData,
    getPrecioData
}
