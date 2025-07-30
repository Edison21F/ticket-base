const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const eventAnalyticsSchema = new mongoose.Schema({
    eventId: { type: String },
    eventType: { type: String, required: true },
    date: { type: String },
    metrics: {
        totalAttendees: { type: String },
        revenue: { type: String },
        averageRating: { type: String },
        conversionRate: { type: String },
        refundRate: { type: String },
        noShowRate: { type: String }
    },
    demographics: {
        ageGroups: [{
            range: { type: String },
            count: { type: String },
            percentage: { type: String }
        }],
        genderDistribution: {
            male: { type: String },
            female: { type: String },
            other: { type: String }
        },
        geographicDistribution: [{
            location: { type: String },
            count: { type: String },
            percentage: { type: String }
        }]
    },
    salesData: {
        advanceSales: [{
            daysBeforeEvent: { type: String },
            ticketsSold: { type: String },
            revenue: { type: String }
        }],
        peakSalesHours: [{
            hour: { type: String },
            sales: { type: String }
        }],
        paymentMethodUsage: [{
            method: { type: String },
            count: { type: String },
            percentage: { type: String }
        }]
    }
}, {
    timestamps: true,
    collection: 'eventAnalytics'
});
const EventAnalytics = mongoose.model('EventAnalytics', eventAnalyticsSchema);
module.exports = EventAnalytics;