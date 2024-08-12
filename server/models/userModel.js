// models/User.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt=require('bcrypt')
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role:{type:String,enum:["customer","Head-Baker","Cake-Decorator","Assistant-Baker","Manager","Reception"],default:"customer"},
  orderHistory: [{ type: String, ref: 'Order' }],
  orderNumber:{type:Number,default:0}
}, { timestamps: true });
UserSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next()
    }
    this.password=await bcrypt.hash(this.password,12)
    this.passwordConfirm=undefined
    next()
})
UserSchema.methods.correctPassword=async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword,userPassword)
}
const User = mongoose.model('User', UserSchema);
module.exports = User;
