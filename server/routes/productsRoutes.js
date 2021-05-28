import express from 'express';
import { getProducts, getProductDetails } from '../controller/product-controller.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductDetails);


export default router;