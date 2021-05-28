import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(password);
    if (user && await user.matchPassword(password)) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            userRole: user.userRole,
            token: generateToken(user._id)
        });
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            userRole: user.userRole,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password
        }
        user.contactNumber = req.body.contactNumber || user.contactNumber

        const updatedUser = await user.save();
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            contactNumber: updatedUser.contactNumber,
            userRole: updatedUser.userRole,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, contactNumber, userRole } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400).json({ msg: "User already exists" })
    }

    const user = await User.create({
        name,
        email,
        password,
        contactNumber,
        userRole
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            contactNumber: user.contactNumber,
            userRole: user.userRole,
            token: generateToken(user._id)
        })
    } else {
        res.status(404)
        throw new Error('User not created')
    }
})

export { authUser, getUserProfile, createUser, updateUserProfile }