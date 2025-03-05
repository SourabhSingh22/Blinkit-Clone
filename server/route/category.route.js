import {Router} from 'express';
import auth from '../middleware/auth.js';
import { AddCategoryController } from '../controllers/category.controller.js';


const categoryRouter = Router();

categoryRouter.post("/add-category", auth, AddCategoryController)

export default categoryRouter;
// Compare this snippet from server/controllers/category.controller.js: