import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js'; 
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);


app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/register', async (req, res) => {
  const { name, email, contactNumber, state, pincode } = req.body;
  try {
    
    if (!name || !email || !contactNumber || !state || !pincode) {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }

    
    const newUser = new User({ name, email, contactNumber, state, pincode });
    await newUser.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
