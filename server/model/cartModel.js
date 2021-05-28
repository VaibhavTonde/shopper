import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    cartItems: [{
        productName: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
        deliveryDate: { type: Date }
    }],
}, {
    timestamp: true
})

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;