const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dividendoSchema = new Schema({
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
    montoDividendo: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },


}, { timestamps: true });

const Dividendo = mongoose.model('Dividendo', dividendoSchema);

module.exports = Dividendo;