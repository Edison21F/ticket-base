const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const transportMetadataSchema = new mongoose.Schema({
    routeDetails: {
        gpsCoordinates: [{
            latitude: { type: String },
            longitude: { type: String },
            stopName: { type: String },
            estimatedTime: { type: String }
        }],
        trafficPatterns: [{
            timeRange: { type: String },
            congestionLevel: { type: String },
            alternativeRoutes: [{ type: String }]
        }],
        weatherImpact: {
            rainDelayMinutes: { type: String },
            snowCancellation: { type: String },
            windSpeedLimit: { type: String }
        }
    },
    vehicleFeatures: {
        wifi: { type: String },
        airConditioning: { type: String },
        entertainment: [{ type: String }],
        accessibility: {
            wheelchairAccessible: { type: String },
            audioAnnouncements: { type: String },
            visualDisplays: { type: String }
        },
        safety: {
            emergencyExits: { type: String },
            firstAidKit: { type: String },
            securityCameras: { type: String }
        }
    },
    serviceLevel: {
        punctualityScore: { type: String },
        cleanlinessRating: { type: String },
        customerSatisfaction: { type: String },
        lastInspection: { type: String }
    },
    realTimeTracking: {
        currentLocation: {
            latitude: { type: String },
            longitude: { type: String },
            lastUpdate: { type: String }
        },
        estimatedArrival: { type: String },
        delayStatus: { type: String }
    },
    idTransportSql: { type: String }
}, {
    timestamps: true,
    collection: 'transportMetadata'
});

const TransportMetadata = mongoose.model('TransportMetadata', transportMetadataSchema);
module.exports = TransportMetadata;