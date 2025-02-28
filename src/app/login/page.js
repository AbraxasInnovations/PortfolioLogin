'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import USER_DATA from "../../data/userData";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the username exists in USER_DATA
    const userData = USER_DATA[username];
    if (!userData) {
      setError("Invalid username");
      return;
    }

    // Redirect to the portfolio page and pass the username
    router.push(`/portfolio?user=${username}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="pt-32 container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Client Login</h1>
          <div className="bg-gray-800/50 rounded-lg p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/20 text-red-300 p-3 rounded">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
