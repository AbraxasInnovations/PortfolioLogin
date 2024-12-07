'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Admin credentials - in a real app, these would be in a secure backend
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'adminpassword123',
};

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      loadAccounts();
    }
  }, [isLoggedIn]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (
      adminUsername.trim().toLowerCase() === ADMIN_CREDENTIALS.username.toLowerCase() &&
      adminPassword === ADMIN_CREDENTIALS.password
    ) {
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
      if (key !== 'currentUser') {
        try {
          const value = JSON.parse(localStorage.getItem(key));
          if (value.password) {
            allAccounts.push({ username: key, ...value });
          }
        } catch (e) {
          // Skip non-JSON entries
        }
      }
    }
    setAccounts(allAccounts);
  };

  const updatePosition = (username, positionIndex, field, newValue) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const positions = userData.positions || [];
    positions[positionIndex][field] = newValue;
    userData.positions = positions;
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts();
  };

  const addPosition = (username) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const newPosition = {
      name: 'New Position',
      description: 'Enter position description',
      value: 0,
      allocation: 0,
    };
    userData.positions = [...(userData.positions || []), newPosition];
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts();
  };

  const deletePosition = (username, positionIndex) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const positions = userData.positions || [];
    positions.splice(positionIndex, 1);
    userData.positions = positions;
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts();
  };

  const addPendingTransferNotice = (username, positionIndex) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const positions = userData.positions || [];
    if (positions[positionIndex]) {
      positions[positionIndex].pendingTransfer = true;
    }
    userData.positions = positions;
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts();
  };

  const removePendingTransferNotice = (username, positionIndex) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const positions = userData.positions || [];
    if (positions[positionIndex]) {
      positions[positionIndex].pendingTransfer = false;
    }
    userData.positions = positions;
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
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        <div className="space-y-6">
          {accounts.map((account, index) => (
            <div key={index} className="bg-gray-800/50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Account: {account.username}</h2>
              <p className="text-gray-400 mb-4">Portfolio Value: ${account.portfolioValue || 0}</p>
              <button
                onClick={() => addPosition(account.username)}
                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded mb-4"
              >
                Add Position
              </button>
              {account.positions?.map((position, posIndex) => (
                <div
                  key={posIndex}
                  className="bg-gray-700 p-4 rounded-lg mb-4 space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Position Name</label>
                    <input
                      type="text"
                      value={position.name}
                      onChange={(e) =>
                        updatePosition(account.username, posIndex, 'name', e.target.value)
                      }
                      className="w-full bg-gray-800 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Description</label>
                    <input
                      type="text"
                      value={position.description}
                      onChange={(e) =>
                        updatePosition(account.username, posIndex, 'description', e.target.value)
                      }
                      className="w-full bg-gray-800 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Value</label>
                    <input
                      type="number"
                      value={position.value}
                      onChange={(e) =>
                        updatePosition(account.username, posIndex, 'value', parseFloat(e.target.value))
                      }
                      className="w-full bg-gray-800 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Allocation (%)</label>
                    <input
                      type="number"
                      value={position.allocation}
                      onChange={(e) =>
                        updatePosition(account.username, posIndex, 'allocation', parseFloat(e.target.value))
                      }
                      className="w-full bg-gray-800 rounded px-3 py-2"
                    />
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => addPendingTransferNotice(account.username, posIndex)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded"
                    >
                      Add Pending Transfer
                    </button>
                    <button
                      onClick={() => removePendingTransferNotice(account.username, posIndex)}
                      className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded"
                    >
                      Remove Pending Transfer
                    </button>
                    <button
                      onClick={() => deletePosition(account.username, posIndex)}
                      className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                    >
                      Delete Position
                    </button>
                  </div>
                  {position.pendingTransfer && (
                    <p className="text-yellow-400 mt-2">Pending Transfer</p>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
