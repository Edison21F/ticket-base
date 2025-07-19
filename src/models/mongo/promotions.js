const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const promotionSchema = new mongoose.Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String },
    description: { type: String },
    discountType: { type: String, required: true },
    discountValue: { type: String },
    minimumAmount: { type: String },
    maxTotalUses: { type: String },
    maxUsesPerUser: { type: String },
    currentUses: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    appliesTo: { type: String },
    applicableCinemas: [{ type: String }],
    applicableMovies: [{ type: String }],
    applicableDays: [{ type: String }],
    timeRestrictions: {
        startTime: { type: String },
        endTime: { type: String }
    },
    targetAudience: {
        vipStatus: [{ type: String }],
        ageRange: {
            min: { type: String },
            max: { type: String }
        },
        newUsers: { type: String }
    },
    usageTracking: [{
        userId: { type: String },
        useDate: { type: String }
    }]
}, {
    timestamps: true,
    collection: 'promotions'
});

const Promotion = mongoose.model('Promotion', promotionSchema);
module.exports = Promotion;