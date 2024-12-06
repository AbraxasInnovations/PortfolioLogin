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

  const updateAccount = (username, field, newValue) => {
    const userData = JSON.parse(localStorage.getItem(username));
    userData[field] = newValue;
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts(); // Refresh the list
  };

  const updatePosition = (username, positionIndex, field, newValue) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const positions = userData.positions || [];
    positions[positionIndex][field] = newValue;
    userData.positions = positions;
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts(); // Refresh the list
  };

  const deletePosition = (username, positionIndex) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const positions = userData.positions || [];
    positions.splice(positionIndex, 1); // Remove the position
    userData.positions = positions;
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts(); // Refresh the list
  };

  const addPendingTransferNotice = (username, positionIndex) => {
    const userData = JSON.parse(localStorage.getItem(username));
    const positions = userData.positions || [];
    if (positions[positionIndex]) {
      positions[positionIndex].pendingTransfer = true;
    }
    userData.positions = positions;
    localStorage.setItem(username, JSON.stringify(userData));
    loadAccounts(); // Refresh the list
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
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Name</label>
                  <input
                    type="text"
                    value={account.name}
                    onChange={(e) =>
                      updateAccount(account.username, 'name', e.target.value)
                    }
                    className="w-full bg-gray-700 rounded px-3 py-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Portfolio Value
                  </label>
                  <input
                    type="number"
                    value={account.portfolioValue}
                    onChange={(e) =>
                      updateAccount(account.username, 'portfolioValue', e.target.value)
                    }
                    className="w-full bg-gray-700 rounded px-3 py-1"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Positions</h3>
                  {account.positions?.map((position, posIndex) => (
                    <div
                      key={posIndex}
                      className="bg-gray-700 p-3 rounded mb-3 space-y-2"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-400">
                          Position Name
                        </label>
                        <input
                          type="text"
                          value={position.name}
                          onChange={(e) =>
                            updatePosition(
                              account.username,
                              posIndex,
                              'name',
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-800 rounded px-3 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">
                          Description
                        </label>
                        <input
                          type="text"
                          value={position.description}
                          onChange={(e) =>
                            updatePosition(
                              account.username,
                              posIndex,
                              'description',
                              e.target.value
                            )
                          }
                          className="w-full bg-gray-800 rounded px-3 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">
                          Value
                        </label>
                        <input
                          type="number"
                          value={position.value}
                          onChange={(e) =>
                            updatePosition(
                              account.username,
                              posIndex,
                              'value',
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full bg-gray-800 rounded px-3 py-1"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400">
                          Allocation (%)
                        </label>
                        <input
                          type="number"
                          value={position.allocation}
                          onChange={(e) =>
                            updatePosition(
                              account.username,
                              posIndex,
                              'allocation',
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-full bg-gray-800 rounded px-3 py-1"
                        />
                      </div>
                      <div className="flex justify-between mt-4">
                        <button
                          onClick={() =>
                            addPendingTransferNotice(account.username, posIndex)
                          }
                          className="bg-yellow-500 hover:bg-yellow-400 text-white px-4 py-2 rounded"
                        >
                          Add Pending Transfer Notice
                        </button>
                        <button
                          onClick={() => deletePosition(account.username, posIndex)}
                          className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded"
                        >
                          Delete Position
                        </button>
                      </div>
                      {position.pendingTransfer && (
                        <p className="text-yellow-400 mt-2">
                          Pending Transfer Notice: This position is currently in transfer.
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

