'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      signIn('credentials', { email, password, callbackUrl: '/trip-planner' });
    } else {
      setError('Registration failed. Email may be in use.');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1588598198321-15b5be8bd36d?q=80&w=2000&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute top-8 left-8">
           <h1 className="text-2xl font-bold text-white">LankaAI</h1>
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16 text-white w-full h-full mt-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Start your AI-powered<br/>journey.</h1>
          <p className="text-lg text-gray-200 max-w-md mb-8">
            Experience the pearl of the Indian Ocean with itineraries optimized by local intelligence.
          </p>
          <div className="flex gap-4">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-40">
              <div className="mb-2">✨</div>
              <div className="font-semibold text-sm">Smart Planning</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 w-40">
              <div className="mb-2">🧭</div>
              <div className="font-semibold text-sm">Hidden Gems</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="p-8 flex justify-end">
           <Link href="/login" className="bg-[#0f2e8a] hover:bg-blue-900 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-colors">
              Login
           </Link>
        </div>
        <div className="flex-1 flex flex-col justify-center items-center p-8 lg:p-16">
          <div className="w-full max-w-[440px] bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
            <h3 className="text-3xl font-bold text-[#0f2e8a] mb-2">Create an account</h3>
            <p className="text-gray-500 mb-8 text-sm">Join thousands of travelers planning with intelligence.</p>
            
            {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f2e8a] uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Arjun Perera"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2e8a] transition-colors text-sm"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0f2e8a] uppercase tracking-wide">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2e8a] transition-colors text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0f2e8a] uppercase tracking-wide">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2e8a] transition-colors text-sm"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0f2e8a] uppercase tracking-wide">Confirm</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2e8a] transition-colors text-sm"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 mb-6">
                <input type="checkbox" id="terms" className="rounded border-gray-300 text-[#0f2e8a] focus:ring-[#0f2e8a]" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <Link href="#" className="font-bold text-[#0f2e8a] hover:underline">Terms</Link> and <Link href="#" className="font-bold text-[#0f2e8a] hover:underline">Privacy</Link>
                </label>
              </div>

              <button type="submit" className="w-full bg-[#0f2e8a] text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-colors text-sm shadow-md shadow-blue-900/20 flex items-center justify-center gap-2">
                Create Account <span>→</span>
              </button>
            </form>

            <div className="mt-8 text-center border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-600">
                Already have an account? <Link href="/login" className="font-bold text-[#0f2e8a] hover:underline">Login</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h4 className="font-bold text-[#0f2e8a] text-sm">LankaAI</h4>
          <div className="flex gap-4 text-xs text-gray-500 font-medium">
            <Link href="#" className="hover:text-gray-800">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-800">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-800">Contact Support</Link>
          </div>
          <p className="text-xs text-gray-400">© 2024 LankaAI. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}