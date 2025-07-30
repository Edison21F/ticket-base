const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const systemSettingsSchema = new mongoose.Schema({
    type: { type: String, required: true },
    colors: {
        primary: { type: String },
        secondary: { type: String },
        accent: { type: String },
        background: {
            from: { type: String },
            via: { type: String },
            to: { type: String }
        },
        text: {
            primary: { type: String },
            secondary: { type: String }
        },
        borders: { type: String },
        success: { type: String },
        error: { type: String },
        warning: { type: String }
    },
    typography: {
        primary: { type: String },
        secondary: { type: String },
        monospace: { type: String },
        sizes: {
            small: { type: String },
            normal: { type: String },
            medium: { type: String },
            large: { type: String },
            extraLarge: { type: String }
        },
        weights: {
            light: { type: String },
            normal: { type: String },
            medium: { type: String },
            semiBold: { type: String },
            bold: { type: String }
        },
        lineHeights: {
            compact: { type: String },
            normal: { type: String },
            relaxed: { type: String },
            loose: { type: String }
        }
    }
}, {
    timestamps: true,
    collection: 'systemSettings'
});

const SystemSettings = mongoose.model('SystemSettings', systemSettingsSchema);
module.exports = SystemSettings;