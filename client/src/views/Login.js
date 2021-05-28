import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

import { login } from '../actions/userActions'

const Login = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const redirect = location.search ? location.search.split('=')[1] : '/'
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <FormGroup controlId="email">
                    <FormLabel>Email</FormLabel>
                    <FormControl className="form-control-sm " type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
                </FormGroup>
                <FormGroup controlId="password" style={{ "paddingTop": "10px" }}>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="form-control-sm " type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
                </FormGroup>
                <br />
                <Button type="submit" variant="primary" style={{ "width": "100%" }}>Sign In</Button>
            </Form>
            <Row className="py-3" style={{ "textAlign": "center" }}>
                <Col>Not a member?<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}> Register Now</Link></Col>
            </Row>
        </FormContainer>
    )
}

export default Login
