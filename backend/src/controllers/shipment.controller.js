import {Shipment} from "../models/shipment.model.js"
import { verifyToken } from "../middlewares/auth.middleware.js"
import {User} from "../models/user.model.js"
import { Asynchandler } from "../utils/Asynchandler.js"
import { Apierror } from "../utils/Apierror.js"
import {ApiResponse} from "../utils/Apiresponse.js"



//book

export const book = Asynchandler(async(req,res,next)=>{
    if(req?.user?.role !== "user") throw new Apierror(401,"only user can book shipment")

    const { recipient,pickup, delivery, packageType } = req.body;
    console.log(pickup,"this is it")
    
    const newShipment = await Shipment.create({
        userId: req.user._id,
        recipient,
        pickup,
      delivery,
      packageType
    })
    return res.status(200)
    .json(new ApiResponse(200,newShipment,"Shipment booked successfully"))
})


// Admin gets all shipments

export const allShipment = Asynchandler(async(req,res,next)=>{
    if(req?.user?.role !== "admin") throw new Apierror(401,"only admin can see all shipments")
    const shipments = await Shipment.find().populate("userId","name email").populate('deliveryPersonId', "name email")

    return res.status(200)
    .json(new ApiResponse(200,shipments,"All shipments"))
})


//Admin assigns a delivery person

export const assignShipment = Asynchandler(async(req,res,next)=>{
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Only admins can assign shipments' });

    const { deliveryPersonId } = req.body;

    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { deliveryPersonId, status: 'In Transit' },
      { new: true }
    ).populate('deliveryPersonId', 'name').populate('userId','name email');

    return res.status(200)
    .json(new ApiResponse(200,shipment,"Shipment assigned successfully"))
})

//Delivery personnel views their shipments

export const myDeliveries = Asynchandler(async(req,res,next)=>{
    if(req.user?.role !== "delivery") throw new Apierror(401,"only delivery person can view their shipments")

     const deliveries = await Shipment.find({ deliveryPersonId: req.user._id }).populate("userId", "name email");

    return res.status(200)
    .json(new ApiResponse(200,deliveries,"My deliveries"))
})

//Delivery personnel marks shipment as delivered

export const markDelivered = Asynchandler(async(req,res,next)=>{
    if(req.user?.role !== "delivery") throw new Apierror(401,"only delivery person can mark shipment as delivered")

    console.log(req.params.id,"this is it")
    const shipment = await Shipment.findById(req.params.id);
     

     if (!shipment || shipment.deliveryPersonId.toString() !== req.user._id.toString()){
      return res.status(403).json({ message: 'Not authorized to update this shipment' });}

       shipment.status = 'Delivered';
    await shipment.save();

    return res.status(200)
    .json(new ApiResponse(200,shipment,"Shipment marked as delivered"))

})

// User views their own shipments


export const myShipment = Asynchandler(async(req,res,next)=>{
    if(req.user.role !== "user") {throw new Apierror(401,"only user can view their shipments")}
        
   const shipments = await Shipment.find({ userId: req.user._id }).populate("userId", "name email");

    console.log(shipments) 
     return res.status(200)
    .json(new ApiResponse(200,shipments,"My shipments"))
})

export const getDeliveryPersonnel  = Asynchandler(async(req,res,next)=>{
    if(req.user.role !== "admin") throw new Apierror(401,"only ADMIN can view delivery")
    const users = await User.find({ role: 'delivery' }).select('-password');
    return res.status(200)
    .json(new ApiResponse(200,users,"Delivery personnel"))
})