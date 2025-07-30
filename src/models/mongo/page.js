const mongoose = require('mongoose')

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const pageSchema = new mongoose.Schema({
    visionPage: { type: String },
    misionPage: { type: String },
    celularPage: { type: String },
    correoPagina: { type: String },
    createPageMongo: { type: String },
    updatePageMongo: { type: String },
    idPageSql: { type: String }
}, {
    timestamps: false,
    collection: 'pages'
})

const page = mongoose.model('pages', pageSchema)

module.exports = page