// models/Cake.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CakeSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String,
  image: String,
  ingredients: [String],
  isCustom: { type: Boolean, default: false },
  sold:{type:Number,default:0}
}, { timestamps: true });

const Cake = mongoose.model('Cake', CakeSchema);
module.exports = Cake;
