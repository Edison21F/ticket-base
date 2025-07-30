const mongoose = require('mongoose');

// Todos los campos se definen como string para mantener uniformidad y facilitar la manipulación de datos.
const reviewSchema = new mongoose.Schema({
    entityType: { type: String, required: true },
    entityId: { type: String },
    userId: { type: String },
    rating: { type: String, required: true },
    title: { type: String },
    comment: { type: String },
    containsSpoilers: { type: String },
    verified: { type: String },
    likes: { type: String },
    dislikes: { type: String },
    reported: { type: String },
    approved: { type: String },
    viewingDate: { type: String },
    aspects: {
        sound: { type: String },
        image: { type: String },
        comfort: { type: String },
        cleanliness: { type: String },
        service: { type: String }
    }
}, {
    timestamps: true,
    collection: 'reviews'
});

const Review = mongoose.model('Review', reviewSchema);  
module.exports = Review;