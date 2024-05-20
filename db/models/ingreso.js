const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingresoSchema = new Schema({
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
    renta: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },



}, { timestamps: true });

const Ingreso = mongoose.model('Ingreso', ingresoSchema);

module.exports = Ingreso;