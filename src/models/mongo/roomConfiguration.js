const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const roomConfigurationSchema = new mongoose.Schema({
    seatsPerRow: [{ type: String }],
    technology: [{ type: String }],
    seatConfiguration: {
        layout: { type: String },
        accessibility: {
            wheelchairSeats: [{ type: String }],
            companionSeats: [{ type: String }]
        },
        vipSection: {
            rows: [{ type: String }],
            amenities: [{ type: String }]
        }
    },
    amenities: {
        soundSystem: { type: String },
        projectionType: { type: String },
        screenSize: { type: String },
        specialFeatures: [{ type: String }]
    },
    maintenanceSchedule: {
        lastMaintenance: { type: String },
        nextMaintenance: { type: String },
        maintenanceType: { type: String },
        notes: { type: String }
    },
    idRoomSql: { type: String }
}, {
    timestamps: true,
    collection: 'roomConfigurations'
});

const RoomConfiguration = mongoose.model('RoomConfiguration', roomConfigurationSchema);
module.exports = RoomConfiguration;