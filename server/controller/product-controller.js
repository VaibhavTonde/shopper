import asyncHandler from 'express-async-handler';
import Product from '../model/productModel.js';

const getProductDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
        res.status(200).json(product);
    } else {
        console.log('failed');
        res.status(404)
        throw new Error('Product not found')
    }
})

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    if (products) {
        res.status(200).json(products);
    } else {
        res.status(404)
        throw new Error('No products found!')
    }
})

export { getProductDetails, getProducts }