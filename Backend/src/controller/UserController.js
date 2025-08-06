import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
}

export const createUser = async (req, res) => {
    try{
        const { name, email, role, passwordHash, department } = req.body;
        const newUser = new User({ name, email, role, passwordHash, department });
        await newUser.save();
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
}

export const getUserById = async (req, res) => {
    
}

export const updateUser = async (req, res) => {
    
}

export const deleteUser = async (req, res) => {
    
}