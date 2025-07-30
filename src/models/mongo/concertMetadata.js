const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const concertMetadataSchema = new mongoose.Schema({
    setlist: [{
        songTitle: { type: String },
        duration: { type: String },
        order: { type: String },
        isEnccore: { type: String }
    }],
    bandMembers: [{
        name: { type: String },
        instrument: { type: String },
        role: { type: String },
        image: { type: String }
    }],
    technicalRequirements: {
        soundSystem: { type: String },
        lightingRig: { type: String },
        stageSize: { type: String },
        powerRequirements: { type: String },
        specialEffects: [{ type: String }]
    },
    merchandising: [{
        item: { type: String },
        price: { type: String },
        description: { type: String },
        image: { type: String }
    }],
    socialMedia: {
        hashtags: [{ type: String }],
        liveStream: {
            platform: { type: String },
            url: { type: String },
            startTime: { type: String }
        }
    },
    weatherConsiderations: {
        isOutdoor: { type: String },
        weatherBackup: { type: String },
        temperatureRange: { type: String }
    },
    historicalData: {
        previousVenues: [{ type: String }],
        attendanceHistory: [{
            date: { type: String },
            venue: { type: String },
            attendance: { type: String }
        }]
    },
    idConcertSql: { type: String }
}, {
    timestamps: true,
    collection: 'concertMetadata'
});

const ConcertMetadata = mongoose.model('ConcertMetadata', concertMetadataSchema);
module.exports = ConcertMetadata;