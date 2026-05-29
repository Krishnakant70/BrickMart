import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, LogIn, LayoutDashboard, Menu, X, Blocks, Search, Building2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export function Layout() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 leading-relaxed">
      {/* Top Utility Bar (B2B Marketplace style) */}
      <div className="hidden md:block bg-slate-100 text-slate-600 text-xs py-1.5 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Building2 size={12} /> Supplier Portal</span>
            <span>Help Center</span>
          </div>
          <div className="flex gap-4">
            <span>Call us: +1 (800) 555-0199</span>
            <span>English (US)</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="bg-blue-800 border-b border-blue-900 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between h-20 items-center gap-6">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-white hover:text-amber-300 transition shrink-0">
              <Blocks size={36} strokeWidth={2.5} />
              <div className="flex flex-col">
                <span className="font-bold text-2xl tracking-tight leading-none">BrickMart</span>
                <span className="text-[10px] text-blue-200 tracking-wider font-semibold uppercase mt-0.5">B2B Trade Portal</span>
              </div>
            </Link>

            {/* Global Search Bar (Marketplace feature) */}
            <div className="hidden lg:flex flex-1 max-w-2xl relative">
              <input 
                type="text" 
                placeholder="Search for Bricks, Blocks, Pavers, Brands..." 
                className="w-full pl-4 pr-12 py-2.5 rounded-l-md border-0 focus:ring-2 focus:ring-amber-500 text-slate-900"
              />
              <button className="bg-amber-500 hover:bg-amber-600 text-blue-900 px-6 font-bold rounded-r-md transition flex items-center justify-center">
                <Search size={20} />
              </button>
            </div>

            {/* Desktop Nav Actions */}
            <nav className="hidden md:flex items-center gap-6 font-medium text-blue-50 shrink-0">
              <Link to="/products" className="hover:text-amber-300 transition">Catalog</Link>
              <Link to="/calculator" className="hover:text-amber-300 transition shrink-0 flex items-center gap-1.5"><span className="bg-amber-500 text-blue-900 px-1.5 py-0.5 rounded text-[10px] font-bold">NEW</span> Calculator</Link>
              <div className="w-px h-6 bg-blue-700 mx-2"></div>
              <Link to="/dashboard" className="flex items-center gap-2 hover:text-amber-300 transition text-sm">
                <LogIn size={20} /> <span className="hidden xl:inline">Sign In</span>
              </Link>
              <Link to="/admin" className="text-blue-300 hover:text-white text-xs transition border border-blue-600 px-3 py-1 rounded">Seller Admin</Link>
              
              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-white hover:text-amber-300 transition flex items-center gap-2">
                <ShoppingCart size={24} />
                <span className="hidden xl:inline font-semibold">Cart</span>
                {totalItems > 0 && (
                  <span className="absolute top-0 left-6 bg-amber-500 text-blue-900 text-[11px] font-extrabold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                    {totalItems}
                  </span>
                )}
              </Link>
            </nav>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-4 text-white">
              <Link to="/cart" className="relative p-2">
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 bg-amber-500 text-blue-900 text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center -mt-1 -mr-1">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <button 
                className="p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          
          {/* Mobile Search - Visible only on small screens below header */}
          <div className="lg:hidden pb-4">
            <div className="flex w-full">
              <input 
                type="text" 
                placeholder="Search materials..." 
                className="w-full pl-4 pr-10 py-2 rounded-l-md border-0 focus:ring-2 focus:ring-amber-500 text-sm"
              />
              <button className="bg-amber-500 text-blue-900 px-4 font-bold rounded-r-md">
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-[850] border-t border-blue-900 absolute w-full left-0 z-50 text-white shadow-xl">
            <div className="px-4 pt-2 pb-4 space-y-1">
              <Link to="/products" className="block px-3 py-3 text-base font-medium hover:bg-blue-800 rounded-lg border-b border-blue-800" onClick={() => setIsMenuOpen(false)}>Product Catalog</Link>
              <Link to="/calculator" className="block px-3 py-3 text-base font-medium hover:bg-blue-800 rounded-lg border-b border-blue-800" onClick={() => setIsMenuOpen(false)}>Material Calculator</Link>
              <Link to="/dashboard" className="block px-3 py-3 text-base font-medium hover:bg-blue-800 rounded-lg border-b border-blue-800" onClick={() => setIsMenuOpen(false)}>My Account / Orders</Link>
              <Link to="/admin" className="block px-3 py-3 text-base font-medium hover:bg-blue-800 rounded-lg text-blue-300" onClick={() => setIsMenuOpen(false)}>Supplier Admin</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 text-amber-500 mb-4">
              <Blocks size={24} strokeWidth={2.5} />
              <span className="font-bold text-xl tracking-tight text-white">BrickMart B2B</span>
            </div>
            <p className="text-slate-400 text-sm">
              Your reliable sourcing partner for bulk construction materials, clay bricks, concrete blocks, and pavers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-200">Catalog</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/products" className="hover:text-amber-500 transition">All Materials</Link></li>
              <li><Link to="/products?category=Clay%20Bricks" className="hover:text-amber-500 transition">Red Clay Bricks</Link></li>
              <li><Link to="/products?category=Concrete%20Blocks" className="hover:text-amber-500 transition">Concrete Blocks</Link></li>
              <li><Link to="/products?category=Paver%20Blocks" className="hover:text-amber-500 transition">Interlocking Pavers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-200">Tools & Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/calculator" className="hover:text-amber-500 transition">Brick Calculator</Link></li>
              <li><Link to="#" className="hover:text-amber-500 transition">Bulk RFQ</Link></li>
              <li><Link to="#" className="hover:text-amber-500 transition">Logistics Support</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-slate-200">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="#" className="hover:text-amber-500 transition">Terms of Trade</Link></li>
              <li><Link to="#" className="hover:text-amber-500 transition">Privacy Policy</Link></li>
              <li><Link to="/admin" className="hover:text-amber-500 transition">Supplier Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 text-center">
          &copy; {new Date().getFullYear()} BrickMart Wholesale Marketplace MVP. All rights reserved. (Demo Application)
        </div>
      </footer>
    </div>
  );
}
