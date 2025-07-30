const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const notificationSchema = new mongoose.Schema({
    userId: { type: String },
    type: { type: String, required: true },
    title: { type: String },
    message: { type: String },
    additionalData: { type: String },
    read: { type: String },
    sentEmail: { type: String },
    sentPush: { type: String },
    scheduledDate: { type: String },
    sentDate: { type: String },
    channels: [{ type: String }],
    priority: { type: String }
}, {
    timestamps: true,
    collection: 'notifications'
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;