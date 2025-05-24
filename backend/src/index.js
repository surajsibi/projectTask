import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path:'../.env'
})

connectDB()
.then(()=>{
    app.listen( 8000 ,()=>{
        console.log( `server is running at port:${process.env.PORT}`);  
    })
})
.catch((err)=>{
    console.log('MONGODB connection failed !!!...',err);  
})
