const express=require('express')
const app=express()
const userRouter=require('./routes/userRouter')
const cakeRouter=require('./routes/cakeRoutes')
const cors=require('cors')
const cookieParser = require('cookie-parser');
const connectDB=require('./db/connectDB')
require('dotenv').config()



app.use(express.json())
app.use(cookieParser());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Authorization','Accept'],
  credentials: true,
}));


app.use('/user',userRouter)
app.use('/cake',cakeRouter)




const hostname='0.0.0.0'
const port = process.env.PORT || 8000;
const start=async ()=>{
    try{ 
        await connectDB(process.env.MONGO_URI)
        app.listen(port ,hostname,
            console.log("running on port: "+port )
        )

    }catch (error){
        console.log(error)
    }
}

start()

module.exports=app