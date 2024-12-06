'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// This would be your list of authorized usernames
const AUTHORIZED_USERS = {
  'client1': { name: 'John Smith' },
  'client2': { name: 'Jane Doe' }
};

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if username is authorized
    if (!AUTHORIZED_USERS[username]) {
      setError('Invalid username');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Save account data
    localStorage.setItem(username, JSON.stringify({
      name: AUTHORIZED_USERS[username].name,
      password,
      portfolioValue: 0,
      positions: []
    }));

    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="pt-32 container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Create Account</h1>
          <div className="bg-gray-800/50 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 text-red-300 p-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Username (provided)</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your provided username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Create Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
