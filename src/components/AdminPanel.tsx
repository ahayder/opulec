import React, { useState } from 'react';
import { Product } from '../types';

interface AdminPanelProps {
  onAddProduct: (product: Product) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddProduct, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now(),
      name,
      price: parseFloat(price),
      image,
      description,
    };
    onAddProduct(newProduct);
    setName('');
    setPrice('');
    setImage('');
    setDescription('');
    alert('Product added successfully!');
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
            min="0"
            step="0.01"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block mb-2">Image URL</label>
          <input
            type="url"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors">
            Add Product
          </button>
          <button type="button" onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;