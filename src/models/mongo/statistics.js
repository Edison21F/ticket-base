const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const statisticsSchema = new mongoose.Schema({
    date: { type: String },
    type: { type: String, required: true },
    cinemaId: { type: String },
    movieId: { type: String },
    metrics: {
        totalReservations: { type: String },
        totalRevenue: { type: String },
        totalSeatsSold: { type: String },
        totalProductsSold: { type: String },
        averageOccupancy: { type: String },
        ticketRevenue: { type: String },
        productRevenue: { type: String },
        newUsers: { type: String },
        returningUsers: { type: String },
        averageTicketPrice: { type: String },
        averageSpendPerUser: { type: String }
    },
    popularItems: {
        movies: [{
            id: String,
            title: String,
            totalSales: String,
            revenue: String
        }],
        products: [{
            id: String,
            name: String,
            totalSold: String,
            revenue: String
        }],
        timeSlots: [{
            time: String,
            totalReservations: String,
            occupancyRate: String
        }]
    },
    demographics: {
        ageGroups: [{
            range: String,
            count: String,
            percentage: String
        }],
        genderDistribution: {
            male: String,
            female: String,
            other: String
        },
        vipStatusDistribution: {
            bronze: String,
            silver: String,
            gold: String,
            platinum: String
        }
    },
    paymentMethods: [{
        method: String,
        count: String,
        percentage: String,
        totalAmount: String
    }],
    deviceUsage: [{
        type: String,
        count: String,
        percentage: String
    }],
    peakHours: [{
        hour: String,
        reservations: String,
        revenue: String
    }]
}, {
    timestamps: true,
    collection: 'statistics'
});

const Statistics = mongoose.model('Statistics', statisticsSchema);
module.exports = Statistics;