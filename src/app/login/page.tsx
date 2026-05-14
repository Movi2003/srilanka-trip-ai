'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      window.location.href = '/trip-planner'; // redirect to main app
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="max-w-[400px] w-full bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Log In</h2>
        {error && <p className="text-red-500 mb-4 text-center text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          />
          <button type="submit" className="w-full bg-[#3b82f6] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors text-sm mt-2">
            Log In
          </button>
        </form>
        <div className="mt-6 flex flex-col items-center gap-3 text-sm text-gray-600">
          <p>
            Don't have an account? <Link href="/register" className="text-[#3b82f6] hover:underline">Register</Link>
          </p>
          <Link href="/forgot-password" className="text-[#3b82f6] hover:underline">
            Forgot password?
          </Link>
          <p className="text-xs text-gray-500">
            Demo: Use any email with password 'password'
          </p>
        </div>
      </div>
    </div>
  );
}