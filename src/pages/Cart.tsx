import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

export function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

  const handleUpdateQty = (id: string, qty: string) => {
    const num = parseInt(qty, 10);
    if (!isNaN(num)) {
      updateQuantity(id, num);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-4">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">Looks like you haven't added any building sets to your cart yet.</p>
        <Link 
          to="/products"
          className="inline-flex justify-center items-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-bold transition"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-10">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items */}
        <div className="flex-1">
          <ul className="divide-y divide-slate-200 border-t border-slate-200">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="py-6 flex flex-col sm:flex-row shadow-sm sm:shadow-none bg-white p-4 sm:p-0 rounded-2xl sm:rounded-none mb-4 sm:mb-0">
                <div className="flex-shrink-0 w-full sm:w-32 h-48 sm:h-32 rounded-xl overflow-hidden bg-slate-100 mb-4 sm:mb-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="sm:ml-6 flex-1 flex flex-col">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-semibold text-lg text-slate-900">
                        <Link to={`/product/${product.id}`} className="hover:text-indigo-600">{product.name}</Link>
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">{product.category}</p>
                    </div>
                    <p className="font-bold text-lg text-slate-900">${(product.price * quantity).toFixed(2)}</p>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-between pt-4 sm:pt-0">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white/50">
                        <button
                          type="button"
                          className="px-3 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition rounded-l-lg"
                          onClick={() => handleUpdateQty(product.id, String(quantity - 1))}
                          disabled={quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-10 text-center font-semibold text-sm">{quantity}</span>
                        <button
                          type="button"
                          className="px-3 py-1 text-slate-600 hover:bg-slate-100 disabled:opacity-50 transition rounded-r-lg"
                          onClick={() => handleUpdateQty(product.id, String(quantity + 1))}
                          disabled={quantity >= product.stock}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeFromCart(product.id)}
                        className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100 sticky top-24">
            <h2 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h2>
            <div className="flow-root">
              <dl className="-my-4 text-sm divide-y divide-slate-200">
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-slate-600">Subtotal</dt>
                  <dd className="font-medium text-slate-900">${totalPrice.toFixed(2)}</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-slate-600">Shipping</dt>
                  <dd className="font-medium text-green-600">Free</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-base font-bold text-slate-900">Total</dt>
                  <dd className="text-xl font-bold text-slate-900">${totalPrice.toFixed(2)}</dd>
                </div>
              </dl>
            </div>
            
            <div className="mt-8">
              <Link
                to="/checkout"
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 border border-transparent rounded-lg shadow-sm py-4 px-4 text-base font-bold text-white hover:bg-indigo-700 transition"
              >
                Checkout <ArrowRight size={20} />
              </Link>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-slate-500">
                or{' '}
                <Link to="/products" className="font-medium text-indigo-600 hover:text-indigo-500 transition">
                  Continue Shopping
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
