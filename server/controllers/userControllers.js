const User = require('../models/userModel'); // Adjust the path to your User model
const ApiFeatures = require('../utils/ApiFeatures');




// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('orderHistory');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, address, paymentMethods,role } = req.body;

    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's details
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.role=role || user.role;
    user.paymentMethods = paymentMethods || user.paymentMethods;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await user.remove();
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const features = new ApiFeatures(User.find(), req.query).filter().searchUsers().sort().limitFields().pagination();
    const users = await features.query.exec();  // Use exec() to execute the query and get the actual data
    
    res.status(200).json({
      status: 'success',
      results: users.length,
      users,
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching orders',
    });
  }
};

// Add a payment method to a user
exports.addPaymentMethod = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.paymentMethods.push(req.body.paymentMethod);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add an order to the user's order history
exports.addOrderToUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.orderHistory.push(req.body.orderId);
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getCrew=async(req,res)=>{
    try{
        const crew=await User.find({role:{$ne:"customer"}})
        console.log(crew)
        res.status(200).json(crew)
    }catch(error){
        res.status(400).json({message:"crew not found!"})
    }
}
