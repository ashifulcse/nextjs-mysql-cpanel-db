// src/pages/api/login.js

import db from '../../lib/db';
import bcrypt from 'bcrypt';
import { signToken } from '../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) return res.status(401).json({ message: 'User not found' });

        const user = rows[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(401).json({ message: 'Invalid credentials' });

        const token = signToken({ id: user.id, email: user.email });

        res.status(200).json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
}
