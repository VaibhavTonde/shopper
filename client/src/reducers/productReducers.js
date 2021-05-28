import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
} from '../constants/productConstant.js';

const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_LIST_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

const productDetailsReducer = (state = { productDetails: { review: [] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_DETAILS_SUCCESS:
            return { loading: false, productDetails: action.payload }
        case PRODUCT_DETAILS_FAILURE:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}


export { productListReducer, productDetailsReducer }
