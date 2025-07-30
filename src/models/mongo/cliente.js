const mongoose = require('mongoose')

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const clienteSchema = new mongoose.Schema({
    direccionCliente: { type: String }, // Siempre string
    telefonoCliente: { type: String },  // Siempre string
    emailCliente: { type: String },     // Siempre string
    tipoCliente: { type: String },      // Siempre string
    idClienteSql: { type: String },     // Siempre string
})

const cliente = mongoose.model('clientes', clienteSchema)

// ¡Modelo de cliente solo con strings!
module.exports = cliente