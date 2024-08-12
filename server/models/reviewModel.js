// models/Review.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  cake: { type: String, ref: 'Cake', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
