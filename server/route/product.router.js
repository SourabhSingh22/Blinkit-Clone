import { Router } from "express"
import auth from '../middleware/auth.js'
import { createProductController, getProductByController, getProductController } from "../controllers/product.controller.js"

const productRouter = Router()

productRouter.post("/create", auth, createProductController)
productRouter.post('/get',getProductController)
productRouter.post('/get-product-by-category', getProductByController)

export default productRouter