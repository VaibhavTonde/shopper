import axios from 'axios';
import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAILURE,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAILURE,
} from '../constants/productConstant.js';

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })
        const res = await axios.get('/api/products');
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data })

    } catch (error) {
        dispatch({ type: PRODUCT_LIST_FAILURE, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}


export const getProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })
        const res = await axios.get(`/api/products/${productId}`);
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data })

    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAILURE, payload: error.response && error.response.data.message ? error.response.data.message : error.message })
    }
}
