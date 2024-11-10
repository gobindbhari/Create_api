import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'

dotenv.config()

const validateinput = async (data) => {
    const { name, email, password } = data
    if (!name || !email || !password) {
        return { valid: false }
    }
    return { valid: true }
}

const generateToken = (userid) => {
    const payload = { id: userid }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const getHandler = async (req, res) => {
    try {
        const data = await userModel.find()
        res.send(data)
    } catch (error) {
        console.log('error in getHandler ==========', error)
    }
}

const getByIdHandler = async (req, res) => {
    try {
        const data = await userModel.findById(req.params.id)
        res.send(data)
    } catch (error) {
        console.log('error in getHandler ==========', error)
    }
}

const deleteHandler = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id)
        res.send('data is deleted')
    } catch (error) {
        console.log('error in getHandler ==========', error)
    }
}

const postHandler = async (req, res) => {
    const { name, email, password } = req.body;
    const validatedata = validateinput(name, email, password)
    if (!validatedata.valid) {
        return res.status(400).json({ message: validation.message });
    }
    const hashPassword = bcrypt.hash(password, 10)
    try {
        const newuser = await userModel.create({     // it can save also so no need of data.save() method
            name: name,
            email: email,
            password: hashPassword,
        })
        const token = generateToken(newuser._id)
        console.log('successfull  ======')
        res.json(token)

    } catch (error) {
        console.log('data not post =======', error)
    }
}

const putHandler = async (req, res) => {
    const { name, email, password } = req.body;
    const { id } = req.params
    const updateData = { name, email }
    if (password) { updateData.password = await bcrypt.hash(password, 10) }
    try {
        await userModel.findByIdAndUpdate(id, updateData, { new: true })
        console.log('successfull  ======')
        res.send('successfull  ======')
    } catch (error) {
        console.log('data not post =======', error)
    }
}

const loginHandler = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token on successful login
        const token = generateToken(user._id);
        res.cookie('user',token) //token set in cookies
        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error in loginHandler:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { postHandler, getHandler, getByIdHandler, deleteHandler, putHandler, loginHandler }