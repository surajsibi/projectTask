import {Router} from "express"
import {register,login,logout,me} from "../controllers/user.controller.js"

const router = Router()
router.route("/register").post(register)
router.route("/login").get(login)
router.route("/logout").get(logout)
router.route("/me").get(me)


export default router