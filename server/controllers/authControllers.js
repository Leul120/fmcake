const Users=require('../models/userModel')
const jwt=require('jsonwebtoken')
const catchAsync=require('../utils/catchAsync')
const AppError=require('../utils/appError')


const signToken=(id)=>{
    return jwt.sign({id:id},process.env.JWT_SECRET)
}
exports.signup=catchAsync(async (req,res,next)=>{
    const {name,email,password}=req.body
    const newUser=await Users.create({
        name:name,
        email:email,
        password:password, 
    })
    if(newUser){
        const token=signToken(newUser._id)
        console.log(token)
        res.status(200).json({
            status:"success",
            token,
            data:{user:newUser}
        })
    }else{
        next(new AppError("couldn't create a user",500))
    }
})
exports.login=async (req,res,next)=>{
    console.log(req.body)
    const email=req.body.email
    const password=req.body.password
    const user=await Users.findOne({email:email}).select('+password')

    if(!user || !await user.correctPassword(password,user.password)){
        
       next(new AppError("incorrect email or password",401))
    }else{
        const token=signToken(user._id)

        if(req.body.remember){
       await res.cookie('token',token,{
            httpOnly:true,
        })}
        console.log(req.cookies)
        res.status(200).json({
            status:"success",
            token,
            user,
        })
    }
    
}
exports.protect=catchAsync(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.headers.authorization.split(' ')[1]
    }
    if(!token){
        return next(AppError("You are not logged in! Please log in to get access",401))
    }
    const decoded=await promisify(jwt.verify)(token,process.env.JWT_SECRET)
    const currentUser=await Users.findById(decoded.id)
    if(!currentUser){
        return next(AppError("The user belonging to this token does no longer exist.",401))
    }
    req.user=currentUser
})
exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(AppError('You do not have the permission to perform this action',403))
        }
        next()
    }
}