'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import USER_DATA from '../../../data/userData'; // Adjust the path as needed
import { Suspense } from 'react';

function PortfolioContent() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get('user');

  useEffect(() => {
    // Fetch user data from USER_DATA
    const data = USER_DATA[username];
    if (!data) {
      router.push('/login');
      return;
    }
    setUserData(data);
  }, [username, router]);

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
            {userData.positions.length > 0 ? (
              userData.positions.map((position, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-700/50 p-4 rounded-lg mb-4"
                >
                  <div>
                    <h3 className="font-bold">{position.name}</h3>
                    <p className="text-sm text-gray-300">{position.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${position.value.toLocaleString()}</p>
                    <p className="text-sm text-gray-300">
                      {position.allocation}% of portfolio
                    </p>
                    {position.pendingTransfer && (
                      <p className="text-yellow-400 mt-2">Pending Transfer</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No positions to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
