const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const eventSettingsSchema = new mongoose.Schema({
    eventType: { type: String, required: true },
    generalSettings: {
        maxReservationsPerUser: { type: String },
        reservationExpirationMinutes: { type: String },
        cancellationPolicy: {
            hoursBeforeEvent: { type: String },
            refundPercentage: { type: String },
            processingFee: { type: String }
        },
        ageRestrictions: {
            minimumAge: { type: String },
            requiresGuardian: { type: String }
        }
    },
    pricingSettings: {
        dynamicPricing: {
            enabled: { type: String },
            priceMultipliers: [{
                condition: { type: String },
                multiplier: { type: String }
            }]
        },
        discountPolicies: [{
            type: { type: String },
            percentage: { type: String },
            conditions: [{ type: String }]
        }],
        taxConfiguration: {
            taxRate: { type: String },
            taxIncluded: { type: String }
        }
    },
    notificationSettings: {
        reminderTimes: [{ type: String }],
        emailTemplates: {
            confirmation: { type: String },
            reminder: { type: String },
            cancellation: { type: String }
        },
        smsEnabled: { type: String },
        pushNotificationsEnabled: { type: String }
    },
    capacityManagement: { type: String },
    accessibilitySettings: {
        wheelchairSeats: { type: String },
        hearingImpairedSupport: { type: String },
        visuallyImpairedSupport: { type: String },
        signLanguageInterpreter: { type: String }
    },
    securitySettings: {
        idRequired: { type: String },
        bagCheckRequired: { type: String },
        metalDetector: { type: String },
        prohibitedItems: [{ type: String }]
    }
}, {
    timestamps: true,
    collection: 'eventSettings'
});

const EventSettings = mongoose.model('EventSettings', eventSettingsSchema);
module.exports = EventSettings;