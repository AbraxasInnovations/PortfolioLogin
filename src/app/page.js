'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-black z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">Abraxas Innovations</div>
            <div className="hidden md:flex space-x-8">
              <a href="/login" className="hover:text-blue-400 transition-colors">Client Login</a>
              <a href="/create-account" className="hover:text-blue-400 transition-colors">Create Account</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Client Portal
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-gray-300">
          Access your portfolio and track your investments
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <a 
            href="/login" 
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Login
          </a>
          <a 
            href="/create-account" 
            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}
