import { Package, MapPin, User, Settings } from 'lucide-react';
import { MOCK_ORDERS } from '../data';

export function CustomerDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden sticky top-24">
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xl mx-auto mb-3">
                JD
              </div>
              <h2 className="text-center font-bold text-slate-900">John Doe</h2>
              <p className="text-center text-sm text-slate-500">john.doe@example.com</p>
            </div>
            <nav className="p-4 space-y-1">
              <a href="#" className="flex items-center gap-3 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg font-medium">
                <Package size={20} /> My Orders
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition">
                <MapPin size={20} /> Addresses
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition">
                <User size={20} /> Profile Details
              </a>
              <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition">
                <Settings size={20} /> Settings
              </a>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">My Orders</h1>
          
          <div className="space-y-6">
            {MOCK_ORDERS.map(order => (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="border-b border-slate-100 bg-slate-50 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:gap-8">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Order Placed</p>
                      <p className="text-sm font-medium text-slate-900">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Total</p>
                      <p className="text-sm font-medium text-slate-900">${order.total.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Order #</p>
                      <p className="text-sm font-medium text-slate-900">{order.id}</p>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <ul className="divide-y divide-slate-100">
                    {order.items.map(item => (
                      <li key={item.product.id} className="py-4 flex flex-col sm:flex-row gap-4">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name} 
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-slate-100" 
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900">{item.product.name}</h4>
                          <p className="text-sm text-slate-500 mt-1">Qty: {item.quantity}</p>
                          <button className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-700">Buy it again</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-50 px-6 py-4 flex flex-col sm:flex-row sm:justify-end gap-3 border-t border-slate-100">
                  <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white bg-slate-50 transition">Track Package</button>
                  <button className="px-4 py-2 border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-white bg-slate-50 transition">View Receipt</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
