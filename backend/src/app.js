import express from "express";
import  cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors(
    {
        origin: 'http://localhost:3000',
        credentials: true
    }
))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//import 

import userRouter from "./router/user.route.js"
import shipmentRouter from "./router/shipment.route.js"

//declaration

app.use("/api/v1/user",userRouter)
app.use("/api/v1/shipment",shipmentRouter)


export {app}