import express from 'express';
import dotenv from 'dotenv';
import productsRoutes from './routes/productsRoutes.js';
import usersRoutes from './routes/usersRoutes.js';
import connectDB from './config/db.js';
import { pageNotFound, errorHandler } from './middleware/errorMiddleware.js'

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
connectDB();

app.get('/', (req, res) => {
    res.send('API is running!')
})

app.use(express.json({ extended: false }))
app.use('/api/products', productsRoutes);
app.use('/api/users', usersRoutes);

app.use(pageNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`)
});