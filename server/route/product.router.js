import { Router } from "express"
import auth from '../middleware/auth.js'
import { createProductController, deleteProductDetails, getProductByCategoryAndSubCategory, getProductByController, getProductController, getProductDetails, searchProduct, updateProductDetails } from "../controllers/product.controller.js"
import { admin } from "../middleware/Admin.js"

const productRouter = Router()

productRouter.post("/create", auth, createProductController)
productRouter.post('/get',getProductController)
productRouter.post('/get-product-by-category', getProductByController)
productRouter.post('/get-product-by-category-and-subcategory', getProductByCategoryAndSubCategory)
productRouter.post('/get-product-details', getProductDetails)

// update product
productRouter.put('/update-product-details', auth, admin , updateProductDetails)

// delete product
productRouter.delete('/delete-product', auth, admin,  deleteProductDetails)

// search product 
productRouter.post('/search-product', searchProduct)

export default productRouter