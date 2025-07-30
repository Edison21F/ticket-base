const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const cacheDataSchema = new mongoose.Schema({
    key: {
        type: String,
        unique: true,
        required: true
    },
    value: { type: String }, // Convertido a string para uniformidad
    type: { type: String, required: true }, // Siempre string
    ttl: { type: String }, // Fecha como string
    tags: [{ type: String }], // Array de strings
    size: { type: String }, // Siempre string
    hitCount: { type: String }, // Siempre string
    lastAccess: { type: String } // Fecha como string
}, {
    timestamps: true,
    collection: 'cacheData'
});
const CacheData = mongoose.model('CacheData', cacheDataSchema);
// ¡Modelo de cacheData solo con strings
module.exports = CacheData;