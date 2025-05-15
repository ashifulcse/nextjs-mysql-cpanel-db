import db from '../../lib/db'; // adjust the path based on where you put db.js

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { name, email, message } = req.body;

    try {
        const connection = await db();

        await connection.execute(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );

        await connection.end();

        res.status(200).json({ message: 'Data saved successfully!' });
    } catch (error) {
        console.error('DB Error:', error);
        res.status(500).json({ message: 'Database error', error: error.message });
    }
}
