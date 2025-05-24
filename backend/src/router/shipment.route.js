import { Router } from "express";
import {allShipment,assignShipment,book,markDelivered,myDeliveries,myShipment,getDeliveryPersonnel} from "../controllers/shipment.controller.js";
import {verifyToken} from "../middlewares/auth.middleware.js"

const router = Router()

router.use(verifyToken)
router.route("/book").post(book)
router.route("/allShipment").get(allShipment)
router.route("/:id/assignShipment").put(assignShipment)
router.route("/:id/markDelivered").put(markDelivered)
router.route("/myShipment").get(myShipment)
router.route("/myDeliveries").get(myDeliveries)
router.route("/delivery").get(getDeliveryPersonnel)

export default router
