import React, { useState, useEffect } from 'react'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { register } from '../actions/userActions'

const Register = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [message, setMessage] = useState('');

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            console.log(userInfo);
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password does not match')
        } else {
            dispatch(register(name, email, password, contactNumber))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="name">
                    <FormLabel>Name</FormLabel>
                    <FormControl className="form-control-sm " type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required></FormControl>
                </FormGroup>
                <FormGroup controlId="email" style={{ "paddingTop": "10px" }}>
                    <FormLabel>Email</FormLabel>
                    <FormControl className="form-control-sm " type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required></FormControl>
                </FormGroup>
                <FormGroup controlId="password" style={{ "paddingTop": "10px" }}>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="form-control-sm " type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required></FormControl>
                </FormGroup>
                <FormGroup controlId="confirmPassword" style={{ "paddingTop": "10px" }}>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl className="form-control-sm " type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></FormControl>
                </FormGroup>
                <FormGroup controlId="contactNumber" style={{ "paddingTop": "10px" }}>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl className="form-control-sm " type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required></FormControl>
                </FormGroup>
                <br />
                <Button type="submit" variant="primary" style={{ "width": "100%" }}>Sign Up</Button>
            </Form>
        </FormContainer>
    )
}

export default Register
