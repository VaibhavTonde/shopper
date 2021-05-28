import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Image, Form, Card, Button } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions';

const Cart = ({ match, history, location }) => {
    const productId = match.params.id;
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const qty = location.search ? Number(location.search.split("=")[1]) : 1
    const { cartItems } = cart;

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty))
        }

    }, [dispatch, productId, qty]);


    const onQtyChangeHandler = (e, id) => {
        dispatch(addToCart(id, Number(e.target.value)))
    }

    const checkoutHandler = () => {
        history.push(`/login?redirect=shipping`)
    }

    const removeItemHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <Row>
            <Col md={8}>
                <Card style={{ "borderRadius": "0px" }}>
                    <Card.Header>My Cart ({cartItems.length})</Card.Header>
                    {cartItems.length === 0 ? <Message variant='dark'>Your cart is empty <Link to='/'>Go Back
                    </Link></Message> : (
                        <Card.Body>
                            {cartItems.map(item => (
                                <Card.Body key={item.product}>
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid />
                                        </Col>
                                        <Col md={4}>
                                            <h5><Link to={`/product/${item.product}`}>{item.name}</Link></h5>
                                            <p>Black</p>
                                            <h5>{item.price}</h5>

                                        </Col>
                                        <Col md={1}>
                                            <Form.Control
                                                as='select'
                                                value={item.qty}
                                                onChange={(e) => { onQtyChangeHandler(e, item.product) }}
                                                style={{ "padding": "0px" }}>
                                                {[...Array(item.countInStock).keys()].map(
                                                    (count) => (
                                                        <option key={count + 1} value={count + 1}>
                                                            {count + 1}
                                                        </option>
                                                    )
                                                )}
                                            </Form.Control>
                                        </Col>
                                        <Col md={1}>
                                            <Button type="button" onClick={() => removeItemHandler(item.product)} variant="dark">
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </Col>
                                        {/* <Col >
                                            <h6>Delivery in 2 days</h6>
                                            <p>7 days replacement policy</p>
                                        </Col> */}
                                    </Row>

                                    <hr style={{ "width": "100%", " borderWidth": "initial" }} />
                                </Card.Body>
                            ))}
                        </Card.Body>
                    )}
                </Card>
            </Col>
            <Col md={4}>
                <Card style={{ "borderRadius": "0px" }}>
                    <Card.Header>PRICE DETAILS</Card.Header>
                    <Card.Body>
                        <Row>

                            <Col style={{ "textAlign": "left" }}>
                                <h6>Price (1 Item)</h6>
                                <h6>Discount</h6>
                                <h6>Delivery Charges</h6>
                            </Col>
                            <Col style={{ "textAlign": "right" }}>
                                <h6>{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}</h6>
                                <h6>40</h6>
                                <h6>FREE</h6>
                            </Col>
                            <hr style={{ "width": "100%", " borderWidth": "initial" }} />
                            <Col style={{ "textAlign": "left" }}>
                                <h5>Total Amount</h5>
                            </Col>
                            <Col style={{ "textAlign": "right" }}>
                                <h5>{cartItems.reduce((acc, item) => ((acc + item.price) - 10), 0)}</h5>
                            </Col>
                            <hr style={{ "width": "100%", " borderWidth": "initial" }} />
                            <Col style={{ "textAlign": "left" }}>
                                <h6>You will save 40 on this order</h6>
                            </Col>
                            <hr style={{ "width": "100%", " borderWidth": "initial" }} />
                            <Col style={{ "textAlign": "left" }}>
                                <Button type="button" className="btn-block" disabled={cartItems.length === 0} onClick={checkoutHandler}>Proceed to checkout</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>


        </Row >
    )
}

export default Cart;
