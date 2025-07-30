const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const movieMetadataSchema = new mongoose.Schema({
    posterImage: { type: String },
    backdropImage: { type: String },
    trailerUrl: { type: String },
    gallery: [{ type: String }],
    subtitles: [{ type: String }],
    formats: [{ type: String }],
    cast: [{
        name: { type: String },
        character: { type: String },
        image: { type: String },
        order: { type: String }
    }],
    director: {
        name: { type: String },
        image: { type: String },
        biography: { type: String }
    },
    production: {
        studio: { type: String },
        producers: [{ type: String }],
        writers: [{ type: String }]
    },
    technicalSpecs: {
        aspectRatio: { type: String },
        soundMix: { type: String },
        color: { type: String },
        filmingLocations: [{ type: String }]
    },
    awards: [{
        name: { type: String },
        category: { type: String },
        year: { type: String },
        won: { type: String }
    }],
    trivia: [{ type: String }],
    quotes: [{ type: String }],
    goofs: [{ type: String }],
    soundtrack: [{
        title: { type: String },
        artist: { type: String },
        duration: { type: String }
    }],
    idMovieSql: { type: String }
}, {
    timestamps: true,
    collection: 'movieMetadata'
});

const MovieMetadata = mongoose.model('MovieMetadata', movieMetadataSchema);
module.exports = MovieMetadata;