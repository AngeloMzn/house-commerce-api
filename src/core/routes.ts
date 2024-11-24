import { Router } from "express";
import { userController } from "../app/controller/UserController";
import { addressController } from "../app/controller/Addresscontroller";
import { verifyToken } from "../core/authMiddleware";

const router: Router = Router()

//Auth
router.post("/signup", verifyToken, userController.signup);
router.post("/login", verifyToken, userController.login);

//Address
router.post("/address/create", verifyToken, addressController.createAddress);
router.get("/addresses", verifyToken, addressController.getAdressesByUserId);
router.put("/address/:id", verifyToken, addressController.updateAddress);
router.delete("/address/:id", verifyToken, addressController.deleteAddress);

//products
/*router.get("/products", verifyToken, addressController.getProducts);
router.get("/product/:id", verifyToken, addressController.getProductById);
router.post("/product/create", verifyToken, addressController.createProduct);
router.put("/product/:id", verifyToken, addressController.updateProduct);
router.delete("/product/:id", verifyToken, addressController.deleteProduct);
*/
if(process.env.DEV_MODE == "true"){
    console.log("DEV MODE ENABLED");
}

export { router };