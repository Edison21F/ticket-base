const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const systemLogSchema = new mongoose.Schema({
    level: { type: String, default: 'info' },
    message: { type: String },
    service: { type: String },
    module: { type: String },
    stackTrace: { type: String },
    requestId: { type: String },
    userId: { type: String },
    metadata: { type: String },
    timestamp: { type: String }
}, {
    timestamps: true,
    collection: 'systemLogs'
});

const SystemLog = mongoose.model('SystemLog', systemLogSchema);
module.exports = SystemLog;
