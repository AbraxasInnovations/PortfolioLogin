'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Admin credentials - in a real app, these would be in a secure backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'adminpassword123'
};

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  // Load accounts if admin is logged in
  useEffect(() => {
    if (isLoggedIn) {
      loadAccounts();
    }
  }, [isLoggedIn]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminUsername === ADMIN_CREDENTIALS.username && 
        adminPassword === ADMIN_CREDENTIALS.password) {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid admin credentials');
    }
  };

  const loadAccounts = () => {
    const allAccounts = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key !== 'currentUser') { // Skip session data
        try {
          const value = JSON.parse(localStorage.getItem(key));
          if (value.password) { // Check if it's an account entry
            allAccounts.push({ username: key, ...value });
          }
        } catch (e) {
          // Skip non-JSON entries
        }
      }
    }
    setAccounts(allAccounts);
  };

  const updatePortfolioValue = (username, newValue) => {
    const userData = JSON.parse(localStorage.getItem(username));
    userData.portfolioValue = parseFloat(newValue);
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts(); // Refresh the list
  };

  const addPosition = (username) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const newPosition = {
      name: "New Position",
      description: "Position Description",
      value: 0,
      allocation: 0
    };
    userData.positions = [...(userData.positions || []), newPosition];
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts();
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="pt-32 container mx-auto px-6">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold mb-8 text-center">Admin Login</h1>
            <div className="bg-gray-800/50 rounded-lg p-8">
              <form onSubmit={handleAdminLogin} className="space-y-6">
                {error && (
                  <div className="bg-red-500/20 text-red-300 p-3 rounded">
                    {error}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium mb-2">Username</label>
                  <input
                    type="text"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    className="w-full bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setIsLoggedIn(false)}
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="space-y-6">
          {accounts.map((account, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold">{account.name}</h2>
                  <p className="text-gray-400">Username: {account.username}</p>
                </div>
                <div className="space-x-4">
                  <input
                    type="number"
                    value={account.portfolioValue}
                    onChange={(e) => updatePortfolioValue(account.username, e.target.value)}
                    className="bg-gray-700 rounded px-3 py-1 w-40"
                  />
                  <button
                    onClick={() => addPosition(account.username)}
                    className="bg-blue-500 hover:bg-blue-400 px-4 py-1 rounded"
                  >
                    Add Position
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                {account.positions?.map((position, posIndex) => (
                  <div key={posIndex} className="bg-gray-700/50 p-3 rounded">
                    <p>{position.name} - ${position.value.toLocaleString()} ({position.allocation}%)</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
