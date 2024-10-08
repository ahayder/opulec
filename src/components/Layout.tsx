import React from 'react';
import Header from './Header';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  cartItemsCount: number;
  onCartClick: () => void;
  user: User | null;
  onLogout: () => void;
  onAdminPanelClick: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  cartItemsCount, 
  onCartClick, 
  user, 
  onLogout, 
  onAdminPanelClick 
}) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header 
        cartItemsCount={cartItemsCount}
        onCartClick={onCartClick}
        user={user}
        onLogout={onLogout}
        onAdminPanelClick={onAdminPanelClick}
      />
      <main className="container mx-auto py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;