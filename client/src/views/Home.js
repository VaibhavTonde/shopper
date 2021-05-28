import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import { getProducts } from '../actions/productActions';

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Slider from '../components/Slider'



const Home = () => {

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch]);

    return (
        <>
            <Slider />
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                :
                <Row>
                    {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={2}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            }
        </>
    )
}

export default Home
