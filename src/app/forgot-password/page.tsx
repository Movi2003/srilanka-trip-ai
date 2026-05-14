'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      setSuccess(true);
      setError('');
    } else {
      setError('Email not found');
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-[400px] w-full bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Forgot Password</h2>
        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
        {success ? (
          <p className="text-green-500 mb-6 text-center text-sm">Password reset email sent! Check your inbox.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
            <button type="submit" className="w-full bg-[#3b82f6] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm mt-2">
              Reset Password
            </button>
          </form>
        )}
        <p className="text-center text-sm text-gray-600">
          Back to <Link href="/login" className="text-[#3b82f6] hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
}