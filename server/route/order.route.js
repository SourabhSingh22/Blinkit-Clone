import {Router} from 'express'
import { CashOnDeliveryOrderController, getOrderDetailsControllers, paymentController, webhookStripe } from '../controllers/order.controller.js'
import auth from '../middleware/auth.js'

const orderRouter = Router()

orderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController)

orderRouter.post('/checkout', auth , paymentController)

orderRouter.post('/webhook', webhookStripe)

orderRouter.get('/order-list', auth, getOrderDetailsControllers)
export default orderRouter