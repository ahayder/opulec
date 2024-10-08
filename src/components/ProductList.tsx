import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickBuy: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, onQuickBuy }) => {
  const navigate = useNavigate();

  const handleQuickBuy = (product: Product) => {
    onQuickBuy(product);
    navigate('/checkout');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
              <div className="space-x-2">
                <button
                  onClick={() => onAddToCart(product)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleQuickBuy(product)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                >
                  Quick Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;