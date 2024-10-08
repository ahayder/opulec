import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import { X } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemoveItem, onUpdateQuantity, onClose }) => {
  const navigate = useNavigate();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Cart</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={24} />
        </button>
      </div>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  className="w-16 text-center border rounded mr-2"
                />
                <button onClick={() => onRemoveItem(item.id)} className="text-red-500">
                  <X size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;