import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';

import { getProductDetails } from '../actions/productActions';

import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'



const ProductDetails = ({ match }) => {
    const productId = match.params.id;
    let history = useHistory();
    const dispatch = useDispatch()
    const productDetail = useSelector(state => state.productDetails)
    const { loading, error, productDetails } = productDetail;
    const [qty, setQty] = useState(1)

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
    }, [dispatch, match]);

    const onAddToCartHandler = (params) => {
        history.push(`/cart/${productId}?qty=${qty}`)
    }

    return (
        <>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
                : (
                    <>
                        <Row>
                            <Col md={5} >
                                <Image src={productDetails.image} alt={productDetails.name} fluid />
                            </Col>
                            <Col md={4}>
                                <ListGroup variant='flush' >
                                    <ListGroup.Item>
                                        <h3>{productDetails.name}</h3>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Rating value={productDetails.rating} text={`${productDetails.numReviews} reviews`} />
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        $ {productDetails.price}
                                        {productDetails.countInStock > 0 ? '   In Stock' : '   Out Of Stock'}
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        {productDetails.description}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col md={3}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Price:</Col>
                                                <Col>
                                                    <strong>${productDetails.price}</strong>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Status:</Col>
                                                <Col>
                                                    {productDetails.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>

                                        {productDetails.countInStock > 0 && (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Qty</Col>
                                                    <Col>
                                                        <Form.Control
                                                            as='select'
                                                            value={qty}
                                                            onChange={(e) => setQty(e.target.value)}
                                                        >
                                                            {[...Array(productDetails.countInStock).keys()].map(
                                                                (count) => (
                                                                    <option key={count + 1} value={count + 1}>
                                                                        {count + 1}
                                                                    </option>
                                                                )
                                                            )}
                                                        </Form.Control>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )}

                                        <ListGroup.Item>
                                            <Button
                                                onClick={onAddToCartHandler}
                                                className='btn-block'
                                                type='button'
                                                disabled={productDetails.countInStock === 0}>
                                                Add To Cart
                                            </Button>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </Col>
                        </Row>

                    </>
                )}
        </>
    )
}

export default ProductDetails
