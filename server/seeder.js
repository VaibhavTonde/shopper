import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import Order from './model/orderModel.js';
import User from './model/userModel.js';
import Product from './model/productModel.js';

import users from './data/Users.js';
import products from './data/Products.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUsers = createdUsers[2]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, userCreated: adminUsers }
        })

        await Product.insertMany(sampleProducts);
        console.log('***Data Imported***');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}


const deleteData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();

        console.log('***Data Deleted***');
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

if (process.argv[2] === '-d') {
    deleteData();
} else {
    importData();
}