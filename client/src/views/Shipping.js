import React, { useState, useEffect } from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import CheckOutSteps from '../components/CheckOutSteps'

import { saveShippingAddress } from '../actions/cartActions'

const Shipping = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

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
    const [addressData, setAddressData] = useState(initialAddressState)


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress(addressData))
        history.push('/payment')
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setAddressData({
            ...addressData,
            [name]: value,
        });
    };

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 />
            <h1>Shipping</h1>
            {/* {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>} */}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="addressLine1" >
                    <FormLabel>Address Line 1</FormLabel>
                    <FormControl className="form-control-sm " type="text" name="addressLine1" value={addressData.addressLine1} onChange={handleInputChange} required></FormControl>
                </FormGroup>
                <FormGroup controlId="addressLine2" style={{ "paddingTop": "10px" }}>
                    <FormLabel>Address Line 2</FormLabel>
                    <FormControl className="form-control-sm" type="text" name="addressLine2" value={addressData.addressLine2} onChange={handleInputChange} required></FormControl>
                </FormGroup>
                <FormGroup controlId="landmark" style={{ "paddingTop": "10px" }}>
                    <FormLabel>Landmark</FormLabel>
                    <FormControl className="form-control-sm" type="text" name="landmark" value={addressData.landmark} onChange={handleInputChange} required></FormControl>
                </FormGroup>
                <Row>
                    <Col>
                        <FormGroup controlId="city" style={{ "paddingTop": "10px" }}>
                            <FormLabel>City</FormLabel>
                            <FormControl className="form-control-sm w-auto" type="text" name="city" value={addressData.city} onChange={handleInputChange} required></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="state" style={{ "paddingTop": "10px" }}>
                            <FormLabel>State</FormLabel>
                            <FormControl className="form-control-sm w-auto " type="text" name="state" value={addressData.state} onChange={handleInputChange} required></FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroup controlId="country" style={{ "paddingTop": "10px" }}>
                            <FormLabel>Country</FormLabel>
                            <FormControl className="form-control-sm w-auto" type="text" name="country" value={addressData.country} onChange={handleInputChange} required></FormControl>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup controlId="pinCode" style={{ "paddingTop": "10px" }}>
                            <FormLabel>PinCode</FormLabel>
                            <FormControl className="form-control-sm w-auto" type="text" name="pinCode" value={addressData.pinCode} onChange={handleInputChange} required></FormControl>
                        </FormGroup>
                    </Col>
                </Row>
                <br />
                <Button type="submit" variant="primary" style={{ "width": "100%" }}>Continue</Button>
            </Form>
        </FormContainer>

    )
}

export default Shipping
