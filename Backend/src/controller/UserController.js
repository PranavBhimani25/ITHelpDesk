import User from '../models/User.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({isActive: true});
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
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user.isActive) {
            return res.status(400).json({ message: "User is Disable" });
        }
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ 
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            department: user.department
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
}

export const updateUser = async (req, res) => {
    try{
        const { id } = req.params
        const { name, email, role, department } = req.body;
        if (!id) {
            return res.status(400).json({ message: "User ID is required" });
        }
        
        if (req.user.role !== "Admin" && req.user._id.toString() !== id) {
            return res.status(403).json({ message: "You are not authorized to update this user" });
        }
        console.error(id);
        const user = await User.findByIdAndUpdate(id);
        
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        user.name = name;
        user.email = email;
        user.role = role;
        user.department = department;

        user.save();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        if(!id) return res.status(400).json({ message: "User ID is required" });

        if (req.user.role !== "Admin" && req.user._id.toString() !== id) {
            return res.status(403).json({ message: "You are not authorized to delete this user" });
        }
        const user = await User.findByIdAndUpdate(id);
        if (user.isActive == true){
            user.isActive = false;
        }
        user.save();
        res.status(200).json({message : "User is Succesfully Deteted!"})

    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}