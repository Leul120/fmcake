// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: { type: String, ref: 'User', required: true },
  cakes: { type: String, ref: 'Cake', required: true },
  cakeName:String,
  email:String,
  phone:Number,
  customDetails: String,
  totalAmount: { type: Number, required: true,default:1 },
  paidPrice:{type:Number},
  status: { type: String, enum: ['Pending', 'Completed', 'Cancelled','Delivered'], default: 'Pending' },
  deliveryDate: Date,
  remainingPrice:Number,
  created_at:{type:Date,default:Date.now()},
  paymentVerified:{type:Boolean,default:false},
  uniqueNumber:Number,
  customText:String,
  additionalInstructions:String
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
