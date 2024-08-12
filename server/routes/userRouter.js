const express=require('express')
const { login, signup } = require('../controllers/authControllers')
const { getUserById, updateUser, deleteUser, getAllUsers, addPaymentMethod, addOrderToUser, getCrew } = require('../controllers/userControllers')
const router=express.Router()

router.route('/login').post(login)
router.route('/signup').post(signup)
router.get('/:id', getUserById);
router.put('/update-user/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('', getAllUsers);
router.post('/:id/payment-methods', addPaymentMethod);
router.post('/:id/order', addOrderToUser);
router.get('/get-crew',getCrew)
module.exports=router