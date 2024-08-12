const express=require('express')
const router=express.Router()
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const multer = require('multer');
const { getAllCakes, getCakeById, createCake, updateCake, deleteCake, getCakesByCategory, getCustomCakes, searchCakes,  order, giveReview, getReviews, getOrderNumbers, getUsersOrders, getOrders, updateOrder } = require('../controllers/cakeControllers');
const { pay, verifyPayment } = require('../utils/payment');

require('dotenv').config();


// Configure AWS SDK
const s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: process.env.AWS_REGION,
  requestTimeout: 1200000, // 20 minutes
  maxAttempts: 15,
});
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const uniqueKey = `${Date.now()}-${req.file.originalname}`;
    const uploadParams = {
      Bucket: 'fm-cake', // Replace with your S3 bucket name
      Key: uniqueKey, // Generate a unique file name
      Body: req.file.buffer,
      ContentType: req.file.mimetype, // Set the content type to the file's mimetype
      // ACL: 'public-read', // Optional: Uncomment if you want the file to be publicly accessible
    };

    // Upload the file to S3
    const uploadCommand = new PutObjectCommand(uploadParams);
    await s3Client.send(uploadCommand);

    console.log(`File uploaded successfully: ${uniqueKey}`);

    // Return the S3 URL of the uploaded image
    res.json({ imageUrl: `https://d30delgrx54kuk.cloudfront.net/${uniqueKey}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});
router.route('/payment/:userID/:cakeID').post(pay)
router.route('/verify-payment/:userID/:orderID/:cakeID/:id').get(verifyPayment)
router.get('/get-all-cakes', getAllCakes);
router.post('/cakes', getCakeById);
router.post('/add-cake', createCake);
router.put('/update-cake/:id', updateCake);
router.delete('/delete-cake/:id', deleteCake);
router.get('/category/:category', getCakesByCategory);
router.get('/custom', getCustomCakes);
router.get('/search/:query', searchCakes);
router.get('/get-user-orders/:userID',getUsersOrders)
router.post('/order/:userID/:cakeID',order)
router.post('/give-review',giveReview)
router.get('/get-review/:cakeID',getReviews)
router.get('/get-order-numbers',getOrderNumbers)
router.get('/get-orders',getOrders)
router.post('/update-order/:orderID',updateOrder)

module.exports=router