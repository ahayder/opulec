import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import { Product, CartItem, User } from './types';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setShowCart(true);
  };

  const quickBuy = (product: Product) => {
    setCartItems([{ ...product, quantity: 1 }]);
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const handlePlaceOrder = (formData: any) => {
    console.log('Order placed:', formData);
    setCartItems([]);
    alert('Order placed successfully!');
  };

  const handleLogin = (user: User) => {
    setUser(user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddProduct = async (product: Omit<Product, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      fetchProducts();
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <Router>
      <Layout
        cartItemsCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setShowCart(true)}
        user={user}
        onLogout={handleLogout}
      >
        <Routes>
          <Route path="/" element={
            <div className="flex flex-col md:flex-row gap-8">
              <div className={`${showCart ? 'hidden md:block' : ''} flex-grow`}>
                <ProductList 
                  products={products} 
                  onAddToCart={addToCart} 
                  onQuickBuy={quickBuy}
                />
              </div>
              {showCart && (
                <div className="md:w-1/3">
                  <Cart
                    items={cartItems}
                    onRemoveItem={removeFromCart}
                    onUpdateQuantity={updateQuantity}
                    onClose={() => setShowCart(false)}
                  />
                </div>
              )}
            </div>
          } />
          <Route path="/checkout" element={
            cartItems.length > 0 
              ? <Checkout items={cartItems} onPlaceOrder={handlePlaceOrder} />
              : <Navigate to="/" replace />
          } />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/admin" element={
            user?.isAdmin 
              ? <AdminPanel onAddProduct={handleAddProduct} />
              : <Navigate to="/login" replace />
          } />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;