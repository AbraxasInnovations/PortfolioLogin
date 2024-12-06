'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Portfolio() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      router.push('/login');
      return;
    }

    const data = localStorage.getItem(currentUser);
    if (!data) {
      router.push('/login');
      return;
    }

    setUserData(JSON.parse(data));
  }, [router]);

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="pt-32 container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Welcome, {userData.name}</h1>
          
          <div className="bg-gray-800/50 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-medium mb-4">Portfolio Value</h2>
            <p className="text-4xl font-bold text-green-400">
              ${userData.portfolioValue.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-8">
            <h2 className="text-xl font-medium mb-4">Positions</h2>
            {userData.positions.length === 0 ? (
              <p className="text-gray-400">No positions to display</p>
            ) : (
              <div className="space-y-4">
                {userData.positions.map((position, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-700/50 p-4 rounded-lg">
                    <div>
                      <h3 className="font-bold">{position.name}</h3>
                      <p className="text-sm text-gray-300">{position.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${position.value.toLocaleString()}</p>
                      <p className="text-sm text-gray-300">{position.allocation}% of portfolio</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => {
              localStorage.removeItem('currentUser');
              router.push('/login');
            }}
            className="mt-8 text-blue-400 hover:text-blue-300 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}