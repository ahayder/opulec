import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Watch, User as UserIcon } from 'lucide-react';
import { User } from '../types';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  user: User | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, user, onLogout }) => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin');
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center hover:text-gray-300 transition-colors">
          <Watch className="mr-2" />
          <h1 className="text-2xl font-bold">WatchShop</h1>
        </Link>
        <div className="flex items-center">
          {user?.isAdmin ? (
            <>
              <span className="mr-4">Welcome, {user.username}</span>
              <button onClick={handleAdminClick} className="mr-4 flex items-center hover:text-gray-300 transition-colors">
                <UserIcon className="mr-1" />
                Admin Panel
              </button>
              <button onClick={onLogout} className="mr-4 hover:text-gray-300 transition-colors">Logout</button>
            </>
          ) : (
            <Link to="/login" className="mr-4 hover:text-gray-300 transition-colors">Admin Login</Link>
          )}
          <button onClick={onCartClick} className="flex items-center hover:text-gray-300 transition-colors">
            <ShoppingCart className="mr-2" />
            <span>Cart ({cartItemsCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;