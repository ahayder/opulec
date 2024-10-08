import React, { useState } from 'react';
import { CartItem } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onPlaceOrder: (formData: any) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onPlaceOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'cash',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPlaceOrder(formData);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-2">Shipping Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
            className="w-full border rounded px-3 py-2"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block mb-2">Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleInputChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total:</span>
            <span className="font-bold">${total.toFixed(2)}</span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;