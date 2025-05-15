'use client';

import { useState } from 'react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });

        const result = await res.json();
        alert(result.message);
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-md bg-white">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className="w-full p-2 border rounded"
                    name="name"
                    placeholder="Your Name"
                    onChange={handleChange}
                    required
                />
                <input
                    className="w-full p-2 border rounded"
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="w-full p-2 border rounded"
                    name="message"
                    placeholder="Message"
                    onChange={handleChange}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Send
                </button>
            </form>
        </div>
    );
}
