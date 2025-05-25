import {Router} from "express"
import {register,login,logout,me} from "../controllers/user.controller.js"
import {verifyToken} from "../middlewares/auth.middleware.js"

const router = Router()
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/me").get(verifyToken,me)


export default router