const mongoose = require('mongoose');


const activityLogSchema = new mongoose.Schema({
    userId: { type: String }, // Siempre string
    action: { type: String }, // Siempre string
    entityType: { type: String }, // Siempre string
    entityId: { type: String }, // Siempre string
    details: { type: String }, // Convertido a string para uniformidad
    ipAddress: { type: String }, // Siempre string
    userAgent: { type: String }, // Siempre string
    timestamp: { type: String }, // Fecha como string para máxima compatibilidad
    sessionId: { type: String }, // Siempre string
    location: {
        country: { type: String }, // Siempre string
        city: { type: String }, // Siempre string
        coordinates: {
            latitude: { type: String }, // Siempre string
            longitude: { type: String } // Siempre string
        }
    }
}, {
    timestamps: true,
    collection: 'activityLogs'
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
// Modelo de activityLogs solo con strings
module.exports = ActivityLog;