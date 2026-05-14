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
    <div className="min-h-screen flex bg-[#f8fafc] font-sans">
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1574972173516-168a2bf1de66?q=80&w=2000&auto=format&fit=crop')" }} // Sigiriya or beach
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        </div>
        <div className="absolute top-8 left-8">
           <h1 className="text-2xl font-bold text-white">LankaAI</h1>
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16 text-white w-full h-full mt-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Discover the Magic<br/>of Lanka</h1>
          <p className="text-lg text-gray-200 max-w-md">
            Experience seamless recovery for your travel adventures with LankaAI's intelligent assistant.
          </p>
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
            <h3 className="text-3xl font-bold text-[#0f2e8a] mb-2">Forgot Password?</h3>
            <p className="text-gray-500 mb-8 text-sm">Enter the email associated with your account and we'll send a link to reset your password.</p>
            
            {error && <p className="text-red-500 mb-4 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>}
            
            {success ? (
              <div className="text-center">
                <p className="text-green-600 mb-6 font-medium p-4 bg-green-50 rounded-xl border border-green-100">Password reset email sent! Check your inbox.</p>
                <Link href="/login" className="inline-block w-full bg-[#0f2e8a] text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-colors text-sm shadow-md shadow-blue-900/20">
                  Return to Login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0f2e8a] uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0f2e8a] transition-colors text-sm"
                    required
                  />
                </div>

                <button type="submit" className="w-full bg-[#0f2e8a] text-white py-3.5 rounded-xl font-bold hover:bg-blue-900 transition-colors text-sm shadow-md shadow-blue-900/20 flex items-center justify-center gap-2 mt-4">
                  Send Reset Link <span>→</span>
                </button>
              </form>
            )}

            <div className="mt-8 text-center border-t border-gray-100 pt-8">
              <p className="text-sm text-gray-600">
                <Link href="/login" className="font-bold text-[#0f2e8a] hover:underline flex items-center justify-center gap-2">
                  <span>←</span> Back to Login
                </Link>
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