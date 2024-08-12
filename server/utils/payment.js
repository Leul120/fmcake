/* 
    CHAPA API PAYMENT INTEGRATION TEST
    Required: Chapa secret key || GET THE KEY BY REGISTERING @ https://dashboard.chapa.co/register
*/



const axios=require('axios')
const Order = require('../models/orderModel')
const User = require('../models/userModel')
const Cake=require('../models/cakeModel')
const CHAPA_URL = "https://api.chapa.co/v1/transaction/initialize"
 // || register to chapa and get the key


// req header with chapa secret key


exports.pay= async (req, res) => {
        const cakeID=req.params.cakeID
        // const course=await Course.findById(courseID)
        
        const userID=req.params.userID
        console.log(process.env.MAIN_URL)
        console.log(userID)
        // const user=await User.findById(req.params.userID)
         // chapa redirect you to this url when payment is successful
         const {amount,email,name,phone,customDetails,deliveryDate,remainingPrice,additionalInstructions,customText,cakeName}=req.body
          const order = await Order.create({
                user: userID,
                cakes: cakeID,
                cakeName:cakeName,
                email: email,
                phone: phone,
                customDetails:customDetails,
                paidPrice: amount,
                customText:customText,
                deliveryDate: deliveryDate,
                remainingPrice:remainingPrice,
                additionalInstructions:additionalInstructions,
                uniqueNumber:Math.floor(Math.random()*10000000)
            });
        const CALLBACK_URL = `${process.env.MAIN_URL}/cake/verify-payment/${userID}/${order._id}/${cakeID}/`
        const RETURN_URL = `${process.env.RETURN_URL}/order/${cakeID}`
console.log(CALLBACK_URL)
        // a unique reference given to every transaction
        const TEXT_REF = "tx-myecommerce12345-" + Date.now()
        
        // form data
        const data = {
            amount:amount, 
            currency: "ETB",
            email: email,
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1],
            tx_ref: TEXT_REF,
            callback_url: CALLBACK_URL + TEXT_REF,
            return_url: RETURN_URL,
           
        }
        try{
        const response=await axios.post("https://api.chapa.co/v1/transaction/initialize", data, {
    headers: {
        Authorization: `Bearer ${process.env.CHAPA_AUTH}`
    },
    timeout: 10000 // increase timeout to 10 seconds
})
    
        const responsed=response.data
        res.status(200).json({
            responsed
            
    })}catch(err) {
        if (err.response && err.response.data) {
            const { message, status, data } = err.response.data;
            console.error('Chapa API Error:', message, status, data);
            // Provide a user-friendly error message or handle the error accordingly
        } else {
            console.error('Network Error:', err.message);
        }
    };
}

// verification endpoint
exports.verifyPayment= async (req, res) => {
        const orderID=req.params.orderID.toString()
        const userID=req.params.userID.toString()
        const cakeID=req.params.cakeID.toString()
        //verify the transaction 
        await axios.get("https://api.chapa.co/v1/transaction/verify/" + req.params.id,{
            headers: {
                Authorization:`Bearer ${process.env.CHAPA_AUTH}`
            }
        } )
            .then(async (response) => {
                console.log(orderID)
                await Order.findOneAndUpdate({_id:orderID},{paymentVerified:true})
                await User.findOneAndUpdate({_id:userID},{orderHistory:orderID,
                    $inc:{orderNumber:1}
                })
                await Cake.findOneAndUpdate({_id:cakeID},{$inc:{sold:1}})
                res.status(200).json({
                    status:"success",
                   
                })
            }) 
            .catch((err) => console.log(err))
}
exports.success=(req,res)=>{
    res.status(200).json({
        status:"Success"
    })
}
// app.get("/api/payment-success", async (req, res) => {
//     res.render("success")
// })


