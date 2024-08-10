import express from 'express';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = new Admin({ email, password });
        await admin.save();
        res.status(201).send('Admin registered successfully');
    } catch (error) {
        res.status(400).send('Error registering Admin');
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).send('Invalid email or password');

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).send('Invalid email or password');

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
        // res.send("SigIn Successfull")
    } catch (error) {
        res.status(400).json({ error: 'Invalid email or password' });

    }
});

router.post('/forgot-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).send('Admin not found');

        admin.password = newPassword;
        await admin.save();
        res.send('Password reset successfully');
    } catch (error) {
        res.status(400).send('Admin Registered Already!');
    }
});

export default router;
