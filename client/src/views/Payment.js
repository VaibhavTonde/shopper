import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from '../components/Message'

import { savePaymentMethod } from '../actions/cartActions'

const Payment = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push('/shipping')
    }

    const initialAddressState = {
        addressLine1: shippingAddress.addressLine1,
        addressLine2: shippingAddress.addressLine2,
        landmark: shippingAddress.landmark,
        city: shippingAddress.city,
        state: shippingAddress.state,
        country: shippingAddress.country,
        pinCode: shippingAddress.pinCode
    }


    const dispatch = useDispatch()
    const [paymentMethod, setPaymentMethod] = useState('')
    const [message, setMessage] = useState('')


    const submitHandler = (e) => {
        e.preventDefault()
        if (!paymentMethod) {
            setMessage('Please choose a payment method')
        } else {
            dispatch(savePaymentMethod(paymentMethod))
            history.push('/placeOrder')
        }
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            {message && <Message variant="danger">{message}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check type="radio" label="PayPal" id="PayPal" name="paymentMethod" value="PayPal" onChange={(e) => { setPaymentMethod(e.target.value) }} />
                        <Form.Check type="radio" label="Stripe" id="Stripe" name="paymentMethod" value="Stripe" onChange={(e) => { setPaymentMethod(e.target.value) }} />
                    </Col>
                    <Button type="submit" variant="primary" style={{ "width": "100%" }}>Continue</Button>
                </Form.Group>
            </Form>
        </FormContainer>

    )
}

export default Payment
