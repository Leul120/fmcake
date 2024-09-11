
const mongoose=require('mongoose')
const Cake = require('../models/cakeModel');
const Order = require('../models/orderModel');
const Review = require('../models/reviewModel');
const ApiFeatures=require('../utils/ApiFeatures')
const express=require('express')
const app=express()
const { ObjectId } = mongoose.Types;
const http = require('http');
const socketIo= require('socket.io')
const server = http.createServer(app);
const socket = require('socket.io')(server, {
  cors: {
    origin: "https://customcake4.vercel.app",
    methods: ["GET", "POST"]
  }
});


socket.on("connection",socket=>{
    console.log(socket.id)
})




// Get all cakes
exports.getAllCakes = async (req, res) => {
  try {
    const features = new ApiFeatures(Cake.find(), req.query).filter().search().sort().limitFields().pagination();
    const cakes = await features.query.exec();  // Use exec() to execute the query and get the actual data
    
    res.status(200).json({
      status: 'success',
      results: cakes.length,
      cakes,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching orders',
    });
  }
};

// Get a single cake by ID
exports.getCakeById = async (req, res) => {
  try {
    const cake = await Cake.find({_id:{$in:req.body.ids}});
    if (!cake) {
      return res.status(400).json({ error: 'Cake not found' });
    }
    res.status(200).json(cake);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new cake
exports.createCake = async (req, res) => {
  try {
    const { name, description, price, category, ingredients, isCustom,image } = req.body;
    

    const cake = new Cake({
      name,
      description,
      price,
      category,
      image,
      ingredients: ingredients.split(','),
      isCustom,
    });

    await cake.save();
    res.status(201).json(cake);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update an existing cake
exports.updateCake = async (req, res) => {
  try {
    const { name, description, price, category, ingredients, isCustom } = req.body;
    const image = req.file ? req.file.path : req.body.image;

    const cake = await Cake.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image,
        ingredients: ingredients.split(','),
        isCustom,
      },
      { new: true }
    );

    if (!cake) {
      return res.status(404).json({ error: 'Cake not found' });
    }

    res.status(200).json(cake);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a cake
exports.deleteCake = async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    if (!cake) {
      return res.status(404).json({ error: 'Cake not found' });
    }
    res.status(200).json({ message: 'Cake deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get cakes by category
exports.getCakesByCategory = async (req, res) => {
  try {
    const cakes = await Cake.find({ category: req.params.category });
    res.status(200).json(cakes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get custom cakes
exports.getCustomCakes = async (req, res) => {
  try {
    const customCakes = await Cake.find({ isCustom: true });
    res.status(200).json(customCakes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search cakes
exports.searchCakes = async (req, res) => {
  try {
    const { query } = req.params;
    const cakes = await Cake.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
        { ingredients: new RegExp(query, 'i') },
      ],
    });
    res.status(200).json(cakes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUsersOrders=async(req,res)=>{
    try{
       const orders = await Order.find({ user:req.params.userID,
        paymentVerified:true
        });
       res.status(200).json(orders)
    }catch(error){
        console.log(error)
    }
}
exports.order=async (req,res)=>{
    try{
const order=await Order.create({
    user:req.params.userID,
    cakes:req.params.cakeID,
    cakeName:req.body.cakeName,
    email:req.body.email,
    phone:req.body.phone,
    customDetails:req.body.customDetails,
    totalAmount:req.body.totalAmount,
    paidPrice:req.body.amount,
    customText:req.body.customText,
    additionalInstructions:req.body.additionalInstruction,
    deliveryDate:req.body.deliveryDate
})
await User.findByIdAndUpdate(req.params.userID,{orderHistory:order._id})
socket.emit('updateOrders')
res.status(200).json(order)
    }catch(error){
        console.log(error)
    }
}
exports.giveReview=async (req,res) =>{
    try{
        const review=await Review.create(req.body)
        res.status(200).json(review)
    }catch(error){
        console.log(error)
    }
}
exports.getReviews=async(req,res)=>{
    try{
    const cakeID=req.params.cakeID
    const reviews=await Review.find({cake:cakeID})
    console.log(reviews)
    res.status(200).json(reviews)
    }catch(error){
        console.log(error)
    }
}
exports.getOrderNumbers=async (req,res)=>{
  try{
    const cakes=await Order.find({paymentVerified:true})
    

    res.status(200).json({
      completed:cakes.filter((cake)=>cake.status==='Completed').length,
      pending:cakes.filter((cake)=>cake.status==='Pending').length,
      cancelled:cakes.filter((cake)=>cake.status==='Cancelled').length,
      delivered:cakes.filter((cake)=>cake.status==='Delivered').length
    })
  }catch(error){
  console.log(error)
}}
exports.getOrders = async (req, res) => {
  try {
    const features = new ApiFeatures(Order.find(), req.query).filter().searchOrders().sort().limitFields().pagination();
    const orders = await features.query.exec();  // Use exec() to execute the query and get the actual data
    
    res.status(200).json({
      status: 'success',
      results: orders.length,
      orders,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching orders',
    });
  }
};
exports.updateOrder=async (req,res)=>{
  try{
    const orderID=req.params.orderID
    const order=await Order.findOneAndUpdate({_id:orderID},{
      status:req.body.status
    })
    socket.emit('updateOrders')
    res.status(200).json(order)
  }catch(error){
    console.log(error)
  }
}



async function removeUnverifiedOrders() {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    await Order.deleteMany({
      paymentVerified: false,
      created_at: { $lte: fiveMinutesAgo },
    });

    console.log('Unverified orders removed successfully.');
  } catch (err) {
    console.error('Error removing unverified orders:', err);
  }
}

// Schedule the function to run every 5 minutes
setInterval(removeUnverifiedOrders, 3 * 60 * 1000);