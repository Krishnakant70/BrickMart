import { useState } from 'react';
import { BarChart3, Users, ShoppingCart, DollarSign, Package, LayoutDashboard, Box, ClipboardList, UserCog, AlertTriangle } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ORDERS } from '../data';

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory'>('overview');

  // Aggregate mock stats
  const totalRevenue = MOCK_ORDERS.reduce((acc, o) => acc + o.total, 0) + 12050.00;
  const totalOrders = MOCK_ORDERS.length + 142;
  const totalCustomers = 89;
  const lowStock = MOCK_PRODUCTS.filter(p => p.stock < 20).length;
  const totalStock = MOCK_PRODUCTS.reduce((acc, p) => acc + p.stock, 0);

  return (
    <div className="flex bg-slate-50 min-h-[calc(100vh-64px)]">
      {/* Admin Sidebar */}
      <aside className="hidden md:flex w-64 bg-slate-900 flex-col py-6">
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'overview' 
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
              : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Dashboard Overview</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              activeTab === 'inventory' 
              ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
              : 'text-slate-400 hover:text-white'
            }`}
          >
            <Box size={20} />
            <span className="font-medium text-sm">Inventory</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl">
            <ClipboardList size={20} />
            <span className="font-medium text-sm">Orders</span>
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors rounded-xl">
            <UserCog size={20} />
            <span className="font-medium text-sm">Customers</span>
          </button>
        </nav>
      </aside>

      {/* Main Admin Content */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          
          {activeTab === 'overview' && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Admin Dashboard</h1>
                  <p className="mt-2 text-slate-500">Overview of your store's performance.</p>
                </div>
                <button className="bg-indigo-600 text-white shadow-md px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition text-sm">
                  Export Report
                </button>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-medium text-slate-500">Total Revenue</h3>
                    <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                      <DollarSign size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  <p className="text-sm text-green-600 font-medium flex items-center">
                    +12.5% <span className="text-slate-400 font-normal ml-1">last month</span>
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-medium text-slate-500">Orders</h3>
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <ShoppingCart size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{totalOrders}</div>
                  <p className="text-sm text-green-600 font-medium flex items-center">
                    +8.2% <span className="text-slate-400 font-normal ml-1">last month</span>
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-medium text-slate-500">Customers</h3>
                    <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                      <Users size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1">{totalCustomers}</div>
                  <p className="text-sm text-slate-400 font-normal flex items-center">
                    Steady growth
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <h3 className="text-sm font-medium text-slate-500">Low Stock Items</h3>
                    <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                      <Package size={20} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 mb-1 relative z-10">{lowStock}</div>
                  <p className="text-sm text-red-600 font-medium relative z-10 flex items-center">
                    Requires attention
                  </p>
                  {lowStock > 0 && <div className="absolute top-0 right-0 w-2 h-full bg-red-500"></div>}
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Orders Table */}
                <div className="xl:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900">Recent Transactions</h2>
                    <button className="text-sm text-indigo-600 font-medium hover:text-indigo-700">View all</button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {MOCK_ORDERS.map((order, i) => (
                          <tr key={order.id} className="hover:bg-slate-50 transition">
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">{order.id}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">{i === 0 ? "Jane Smith" : "John Doe"}</td>
                            <td className="px-6 py-4 text-sm font-medium text-slate-900">${order.total.toFixed(2)}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Inventory Overview */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-slate-900">Inventory Status</h2>
                  </div>
                  <div className="p-6">
                     <ul className="space-y-6">
                        {MOCK_PRODUCTS.slice(0, 5).map(product => (
                          <li key={product.id}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm font-medium text-slate-900 flex-1 truncate pr-4">{product.name}</span>
                              <span className={`text-sm font-bold ${product.stock < 20 ? 'text-red-600' : 'text-slate-900'}`}>{product.stock} units</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                               <div 
                                 className={`h-2 rounded-full ${product.stock < 20 ? 'bg-red-500' : 'bg-green-500'}`} 
                                 style={{ width: `${Math.min(100, (product.stock / 150) * 100)}%` }}
                               ></div>
                            </div>
                          </li>
                        ))}
                     </ul>
                     <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <button 
                          onClick={() => setActiveTab('inventory')}
                          className="text-sm text-slate-600 hover:text-slate-900 font-medium flex items-center justify-center w-full gap-2 transition"
                        >
                           <BarChart3 size={16} /> Full inventory report
                        </button>
                     </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'inventory' && (
            <>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Inventory Management</h1>
                  <p className="mt-2 text-slate-500">Track stock levels and manage your products catalog.</p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-200 transition text-sm">
                    Import
                  </button>
                  <button className="bg-indigo-600 text-white shadow-md px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition text-sm">
                    + New Product
                  </button>
                </div>
              </div>

              {/* Inventory Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
                  <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Box size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Total Stock</h3>
                    <div className="text-2xl font-bold text-slate-900">{totalStock.toLocaleString()}</div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex items-center gap-4">
                  <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-slate-500">Total Products</h3>
                    <div className="text-2xl font-bold text-slate-900">{MOCK_PRODUCTS.length}</div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-red-100 bg-red-50/30 p-6 flex items-center gap-4">
                  <div className="p-4 bg-red-100 text-red-600 rounded-xl">
                    <AlertTriangle size={24} />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-red-600">Low Stock Alerts</h3>
                    <div className="text-2xl font-bold text-slate-900">{lowStock} <span className="text-sm font-normal text-slate-500">items need restock</span></div>
                  </div>
                </div>
              </div>

              {/* Product Inventory Table */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-2">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <h2 className="text-lg font-bold text-slate-900">Products Catalog</h2>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Search products..." 
                      className="px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="px-3 py-1.5 text-xs font-medium bg-slate-100 text-slate-600 rounded-lg hover:bg-slate-200 transition">Filter</button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Item Name</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {MOCK_PRODUCTS.map(product => (
                        <tr key={product.id} className="hover:bg-slate-50 transition cursor-pointer">
                          <td className="px-6 py-4 text-sm font-medium text-slate-900 flex items-center gap-3">
                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded shrink-0 object-cover border border-slate-200" />
                            <span className="truncate max-w-[200px]">{product.name}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500">#{product.id.slice(0,6).toUpperCase()}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{product.category}</td>
                          <td className="px-6 py-4 text-sm font-semibold text-slate-700">{product.stock} units</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-900">${product.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-sm">
                            {product.stock > 10 ? (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded-full uppercase tracking-wider">Available</span>
                            ) : product.stock > 0 ? (
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-[11px] font-bold rounded-full uppercase tracking-wider">Low Stock</span>
                            ) : (
                              <span className="px-3 py-1 bg-red-100 text-red-800 text-[11px] font-bold rounded-full uppercase tracking-wider">Out Of Stock</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
