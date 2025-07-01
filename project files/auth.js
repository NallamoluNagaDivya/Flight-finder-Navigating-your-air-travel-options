// server/routes/auth.js
import express from 'express';
import bcrypt  from 'bcryptjs';
import jwt     from 'jsonwebtoken';
import User    from '../models/User.js';   // <-- MATCHES models/User.js (capital “U”)

const router = express.Router();

/* ===============  REGISTER  ================= */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // prevent duplicate emails
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user   = await User.create({ name, email, password: hashed });

    return res.status(201).json({ message: 'User registered', userId: user._id });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

/* ===============  LOGIN  ==================== */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error' });
  }
});

export default router;
