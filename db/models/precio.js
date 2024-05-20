const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const precioSchema = new Schema({
    contador: {
        type: Number,
        required: true
    },
    simulador: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    subsidio: {
        type: String,
        required: true
    },
    valorEn: {
        type: String,
        required: true
    },
    porcentajeFinanciarBanco: {
        type: String,
        required: true
    },
    precioCasa: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },



}, { timestamps: true });

const Precio = mongoose.model('Precio', precioSchema);

module.exports = Precio;