import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants';

const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const newItem = action.payload;
            const existItem = state.cartItems.find(item => item.product === newItem.product)
            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.product === newItem.product ? newItem : item)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, newItem]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }

        default:
            return state
    }
}

export { cartReducer }
