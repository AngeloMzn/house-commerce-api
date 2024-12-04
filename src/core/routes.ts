import { Router } from "express";
import { userController } from "../app/controller/UserController";
import { productController } from "../app/controller/Productcontroller";
import { verifyToken } from "../core/authMiddleware";

const router: Router = Router()

//Auth
router.post("/signup", verifyToken, userController.signup);
router.post("/login", verifyToken, userController.login);

//product
router.post("/product/create", verifyToken, productController.createProduct);
router.get("/products", verifyToken, productController.getProducts);
 router.get("/product/:id", verifyToken, productController.getProductById);
router.put("/product/:id", verifyToken, productController.updateProduct);
router.delete("/product/:id", verifyToken, productController.deleteProduct);

if(process.env.DEV_MODE == "true"){
    console.log("DEV MODE ENABLED");
}

export { router };