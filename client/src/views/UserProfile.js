import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl, ListGroup, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message'
import Loader from '../components/Loader'

import { getUserDetails, updateUserProfile } from '../actions/userActions'

const UserProfile = ({ location, history }) => {

    const initialUserInfo = {
        name: "",
        email: "",
        contactNumber: ""
    };

    const initialEditableFields = {
        editName: false,
        editEmail: false,
        editContactNumber: false
    };

    const [userData, setUserData] = useState(initialUserInfo);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [tabName, setTabName] = useState('Account Info');
    const [isEditable, setIsEditable] = useState(initialEditableFields);

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdatedProfile = useSelector(state => state.userUpdatedProfile)
    const { sucess } = userUpdatedProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setUserData({
                    name: user.name,
                    email: user.email,
                    contactNumber: user.contactNumber
                })
            }

        }
    }, [history, userInfo, user, dispatch, sucess])

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (password != confirmPassword) {
            setMessage('Password does not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name: userData.name, email: userData.email, contactNumber: userData.contactNumber }))
            const { id } = e.target;
            setIsEditable({
                ...isEditable,
                [id]: false
            })

        }
    }
    const onTabChangeHandler = (tabName) => {
        setTabName(tabName)
    }

    const isEditClicked = (e) => {
        const { id } = e.target;
        setIsEditable({
            ...isEditable,
            [id]: true
        })
    }

    const onEditClose = (e) => {
        const { id } = e.target;
        setIsEditable({
            ...isEditable,
            [id]: false
        })

        setUserData({
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber
        })
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value,
        });

        console.log(userData);
    };

    const reload = () => {
        window.location.reload();
    }


    return (
        <Row>
            <h1>User Details</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {sucess && <Message variant="sucess">Profile Updated</Message> && reload()}
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item style={{ "padding": "2rem", "backgroundColor": "#f9f9f9" }} >
                        <i className="fas fa-user-circle fa-3x"></i>
                        <span style={{ "bottom": "15px", "left": "10px", "position": "relative" }}>
                            {user.name}
                        </span>
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => onTabChangeHandler("Account Info")}>
                        Account Info
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={() => onTabChangeHandler("Orders")}>
                        Orders
                    </ListGroup.Item>
                </ListGroup>


            </Col>
            <Col md={8}>
                <Row>
                    <Card>
                        <Card.Body><h4>{tabName}</h4></Card.Body>
                    </Card>
                </Row>
                <br />
                <Row>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <label style={{ "fontSize": "15px", "lineHeight": "2.5" }}>User Name</label>
                                </Row>
                                <Row hidden={isEditable.name}>
                                    <Col>
                                        <label style={{ "fontSize": "20px", "lineHeight": "2", "fontWeight": "bold" }}>{user.name}</label>
                                    </Col>
                                    <Col>
                                        <label id="name" style={{ "textAlign": "right", "left": "350px", "lineHeight": "2", "position": "relative" }} onClick={isEditClicked}>Edit</label>
                                    </Col>
                                </Row>
                                <Row hidden={!isEditable.name} >
                                    <Col>
                                        <FormControl type="text" placeholder="Name" name="name" value={userData.name} style={{ "width": "40%", "lineHeight": "1" }} onChange={handleInputChange} required></FormControl>
                                        <Button id="name" type="submit" variant="primary" style={{ "width": "20%", "position": "relative", "bottom": "48px", "left": "350px" }} onClick={onSubmitHandler}>Save Changes</Button>
                                        <Button id="name" variant="primary" style={{ "width": "20%", "position": "relative", "bottom": "48px", "left": "375px" }} onClick={onEditClose}>Cancel</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <label style={{ "fontSize": "15px", "lineHeight": "2.5" }}>Email</label>
                                </Row>
                                <Row hidden={isEditable.email}>
                                    <Col>
                                        <label style={{ "fontSize": "20px", "lineHeight": "2", "fontWeight": "bold" }}>{user.email}</label>
                                    </Col>
                                    <Col>
                                        <label id="email" style={{ "textAlign": "right", "left": "350px", "lineHeight": "2", "position": "relative" }} onClick={isEditClicked}>Edit</label>
                                    </Col>
                                </Row>
                                <Row hidden={!isEditable.email} >
                                    <Col>
                                        <FormControl type="text" placeholder="Name" name="email" value={userData.email} style={{ "width": "40%", "lineHeight": "1" }} onChange={handleInputChange} required></FormControl>
                                        <Button id="email" type="submit" variant="primary" style={{ "width": "20%", "position": "relative", "bottom": "48px", "left": "350px" }} onClick={onSubmitHandler}>Save Changes</Button>
                                        <Button id="email" variant="primary" style={{ "width": "20%", "position": "relative", "bottom": "48px", "left": "375px" }} onClick={onEditClose}>Cancel</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <label style={{ "fontSize": "15px", "lineHeight": "2.5" }}>Contact Number</label>
                                </Row>
                                <Row hidden={isEditable.contactNumber}>
                                    <Col>
                                        <label style={{ "fontSize": "20px", "lineHeight": "2", "fontWeight": "bold" }}>{user.contactNumber}</label>
                                    </Col>
                                    <Col>
                                        <label id="contactNumber" style={{ "textAlign": "right", "left": "350px", "lineHeight": "2", "position": "relative" }} onClick={isEditClicked}>Edit</label>
                                    </Col>
                                </Row>
                                <Row hidden={!isEditable.contactNumber} >
                                    <Col>
                                        <FormControl type="text" placeholder="Name" name="contactNumber" value={userData.contactNumber} style={{ "width": "40%", "lineHeight": "1" }} onChange={handleInputChange} required></FormControl>
                                        <Button id="contactNumber" type="submit" variant="primary" style={{ "width": "20%", "position": "relative", "bottom": "48px", "left": "350px" }} onClick={onSubmitHandler}>Save Changes</Button>
                                        <Button id="contactNumber" variant="primary" style={{ "width": "20%", "position": "relative", "bottom": "48px", "left": "375px" }} onClick={onEditClose}>Cancel</Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Row>

            </Col>
        </Row>
    )
}

export default UserProfile
