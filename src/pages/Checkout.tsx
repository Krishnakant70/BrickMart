import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CheckCircle2 } from 'lucide-react';

export function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Fake processing delay
    setTimeout(() => {
      setIsSubmitting(false);
      clearCart();
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Order Confirmed!</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
          Thank you for choosing BrickMart. Your order has been placed and will be shipped soon.
        </p>
        <button 
          onClick={() => navigate('/dashboard')}
          className="inline-flex justify-center items-center bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-bold transition"
        >
          View My Orders
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-10">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                  <input required type="text" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                  <input required type="text" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <input required type="text" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                  <input required type="text" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Postal Code</label>
                  <input required type="text" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
              </div>

              <h2 className="text-xl font-bold mb-6 mt-12">Payment Method</h2>
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4 flex items-center bg-slate-50 bg-opacity-50">
                  <input id="card" type="radio" defaultChecked className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300" />
                  <label htmlFor="card" className="ml-3 block text-sm font-medium text-slate-900 cursor-pointer">
                    Credit Card (Mock)
                  </label>
                </div>
                {/* Mock Card Details */}
                <div className="grid grid-cols-4 gap-y-6 gap-x-4 pl-7">
                  <div className="col-span-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Card Number</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Expiration</label>
                    <input required type="text" placeholder="MM/YY" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">CVC</label>
                    <input required type="text" placeholder="123" className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-wait transition"
                >
                  {isSubmitting ? 'Processing...' : `Pay $${totalPrice.toFixed(2)}`}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-24">
              <h2 className="text-xl font-bold mb-6">In your cart</h2>
              <ul className="divide-y divide-slate-200">
                {items.map((item) => (
                  <li key={item.product.id} className="py-4 flex">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border border-slate-200">
                      <img src={item.product.imageUrl} alt={item.product.name} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-slate-900">
                          <h3 className="line-clamp-1">{item.product.name}</h3>
                          <p className="ml-4">${(item.product.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-slate-500">Qty {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-slate-200 mt-6 pt-6">
                <div className="flex justify-between text-lg font-bold text-slate-900">
                  <p>Total</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
