import { Router } from "express";
import { userController } from "../app/controller/UserController";
import { addressController } from "../app/controller/Addresscontroller";


const router: Router = Router()

//Auth
router.post("/signup", userController.signup);
router.post("/login", userController.login);

//Address
router.post("/address/create", addressController.createAddress);
router.get("/addresses", addressController.getAdressesByUserId);
router.put("/address/:id", addressController.updateAddress);
router.delete("/address/:id", addressController.deleteAddress);

if(process.env.DEV_MODE == "true"){
    console.log("DEV MODE ENABLED");
}

export { router };