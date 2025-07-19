const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const cinemaDetailsSchema = new mongoose.Schema({
    imageUrl: { type: String },
    openingHours: {
        monday: { open: { type: String }, close: { type: String } },
        tuesday: { open: { type: String }, close: { type: String } },
        wednesday: { open: { type: String }, close: { type: String } },
        thursday: { open: { type: String }, close: { type: String } },
        friday: { open: { type: String }, close: { type: String } },
        saturday: { open: { type: String }, close: { type: String } },
        sunday: { open: { type: String }, close: { type: String } }
    },
    services: [{ type: String }],
    features: {
        parking: { type: String },
        wifi: { type: String },
        restaurant: { type: String },
        accessibility: { type: String },
        airConditioning: { type: String }
    },
    socialMedia: {
        facebook: { type: String },
        instagram: { type: String },
        twitter: { type: String },
        website: { type: String }
    },
    description: { type: String },
    gallery: [{ type: String }],
    idCinemaSql: { type: String }
}, {
    timestamps: true,
    collection: 'cinemaDetails'
});
const CinemaDetails = mongoose.model('CinemaDetails', cinemaDetailsSchema);
module.exports = CinemaDetails;