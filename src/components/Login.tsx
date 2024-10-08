import React, { useState } from 'react';
import { User } from '../types';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would validate credentials against a backend
    if (username === 'admin' && password === 'admin') {
      onLogin({ username, isAdmin: true });
      navigate('/');
    } else {
      alert('Invalid credentials. Only admin can login.');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
          Login
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-600">
        Use username: admin, password: admin for admin access.
      </p>
    </div>
  );
};

export default Login;