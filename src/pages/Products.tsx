import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Filter, Search, ShoppingCart, Check, Factory, MapPin, Truck, ExternalLink, MessageSquare } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();
  
  const [sortBy, setSortBy] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [priceRange, setPriceRange] = useState('');
  
  const categories = Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)));

  let filteredProducts = MOCK_PRODUCTS;
  if (categoryFilter) {
    filteredProducts = filteredProducts.filter(p => p.category === categoryFilter);
  }
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }
  if (inStockOnly) {
    filteredProducts = filteredProducts.filter(p => p.stock > 0);
  }
  if (deliveryOnly) {
    filteredProducts = filteredProducts.filter(p => p.deliveryAvailable);
  }
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(Number);
    if (min !== undefined && max !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
    } else if (priceRange === 'above-2') {
      filteredProducts = filteredProducts.filter(p => p.price > 2.0);
    }
  }

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0; // popular
  });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    if (product.stock === 0) return;
    addToCart(product, product.moq || 1000);
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleBuyNow = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    if (product.stock === 0) return;
    addToCart(product, product.moq || 1000);
    navigate('/cart');
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("In a real application, this would open a Request for Quote form to contact the supplier directly.");
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-6">
          <div className="text-xs text-slate-500 mb-2 flex gap-2 font-medium">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link> / 
            <span className="text-slate-700">Building & Construction Materials</span>
          </div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center bg-white p-5 rounded-lg shadow-sm border border-slate-200">
            <div className="mb-4 lg:mb-0 w-full lg:w-1/4">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {categoryFilter ? `${categoryFilter}` : 'Construction Materials & Bricks'}
              </h1>
              <p className="mt-1 text-sm text-slate-500 font-medium">{sortedProducts.length} materials found</p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 w-full lg:w-3/4">
              <div className="relative w-full sm:flex-1">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <Search size={16} />
                </span>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
                />
              </div>
              <div className="relative w-full sm:w-[220px]">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <MapPin size={16} />
                </span>
                <input 
                  type="text" 
                  placeholder="Location (e.g. Mumbai)" 
                  className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium"
                />
              </div>
              <div className="flex items-center text-sm font-medium text-slate-700 whitespace-nowrap bg-slate-50 px-3 py-2.5 rounded-md border border-slate-300 w-full sm:w-auto mt-2 sm:mt-0">
                <span className="text-slate-500 mr-2">Sort by:</span>
                <select 
                  className="bg-transparent border-0 py-0 pl-1 pr-6 text-sm focus:ring-0 cursor-pointer font-bold text-slate-900 w-full sm:w-auto"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="popular">Best Match</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-[280px] flex-shrink-0">
            <div className="bg-white p-0 rounded-lg shadow-sm border border-slate-200 sticky top-28 overflow-hidden">
              <div className="p-5 border-b border-slate-200 bg-slate-50">
                <h3 className="font-bold text-slate-900 flex items-center gap-2 text-lg">
                  <Filter size={18} className="text-blue-600"/> Filters
                </h3>
              </div>
              
              <div className="p-5 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Related Categories</h4>
                <ul className="space-y-1.5">
                  <li>
                    <button 
                      onClick={() => setSearchParams({})}
                      className={`w-full text-left px-2.5 py-2 rounded text-sm transition-colors ${!categoryFilter ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                    >
                      All Materials
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat}>
                      <button 
                        onClick={() => setSearchParams({ category: cat })}
                        className={`w-full text-left px-2.5 py-2 rounded text-sm transition-colors ${categoryFilter === cat ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : 'text-slate-600 hover:bg-slate-50 font-medium'}`}
                      >
                        {cat}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Price Options</h4>
                <div className="space-y-2">
                  <label className="flex items-center text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="radio" name="price" value="" checked={priceRange === ''} onChange={() => setPriceRange('')} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    Any Price
                  </label>
                  <label className="flex items-center text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="radio" name="price" value="0-0.5" checked={priceRange === '0-0.5'} onChange={() => setPriceRange('0-0.5')} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    Under $0.50
                  </label>
                  <label className="flex items-center text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="radio" name="price" value="0.5-1" checked={priceRange === '0.5-1'} onChange={() => setPriceRange('0.5-1')} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    $0.50 to $1.00
                  </label>
                  <label className="flex items-center text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="radio" name="price" value="1-2" checked={priceRange === '1-2'} onChange={() => setPriceRange('1-2')} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    $1.00 to $2.00
                  </label>
                  <label className="flex items-center text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="radio" name="price" value="above-2" checked={priceRange === 'above-2'} onChange={() => setPriceRange('above-2')} className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    Above $2.00
                  </label>
                </div>
              </div>

              <div className="p-5 border-b border-slate-100">
                <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">Availability</h4>
                <div className="space-y-3">
                  <label className="flex items-center text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} className="mr-3 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                    In Stock Only
                  </label>
                  <label className="flex items-center text-sm text-slate-700 font-medium cursor-pointer">
                    <input type="checkbox" checked={deliveryOnly} onChange={(e) => setDeliveryOnly(e.target.checked)} className="mr-3 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300" />
                    Delivery Available
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Product List */}
          <div className="flex-1">
            <div className="space-y-6">
              {sortedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col md:flex-row overflow-hidden group">
                  {/* Image Section */}
                  <Link to={`/product/${product.id}`} className="md:w-[280px] bg-slate-50 relative shrink-0 border-b md:border-b-0 md:border-r border-slate-200 flex items-center justify-center p-4">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-48 md:h-full object-cover rounded shadow-sm mix-blend-multiply group-hover:scale-105 transition duration-500"
                    />
                    {product.stock === 0 ? (
                       <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
                          <span className="font-bold text-slate-900 bg-white px-4 py-1.5 text-sm rounded-full shadow-sm border border-slate-200">Out of Stock</span>
                       </div>
                    ) : (
                      <span className="absolute top-4 left-4 bg-green-600 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                        Verified Supplier
                      </span>
                    )}
                  </Link>
                  
                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col relative">
                    <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-4">
                      
                      {/* Left Side Details */}
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`}>
                          <h3 className="font-bold text-xl text-slate-900 hover:text-blue-700 hover:underline transition leading-snug mb-1">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <div className="text-sm font-semibold text-blue-800 mb-3 flex items-center gap-1.5">
                          <Factory size={14} className="text-slate-400"/> By Standard Manufacturing Co. 
                          <span className="bg-blue-100 text-blue-800 text-[10px] px-1.5 py-0.5 rounded ml-2">Manufacturer</span>
                        </div>
                        
                        <div className="mb-4">
                          <div className="flex items-end gap-2 mb-1">
                            <span className="text-2xl font-extrabold text-slate-900 leading-none">${product.price.toFixed(2)}</span>
                            <span className="text-sm text-slate-500 font-medium mb-0.5">/ Piece</span>
                          </div>
                          <p className="text-sm text-slate-600 font-medium">Approx. Order Value: <span className="font-bold">${(product.price * (product.moq || 1000)).toFixed(2)}</span> per MOQ</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-w-sm">
                           <div className="text-slate-500">Min. Order:</div>
                           <div className="font-bold text-slate-800">{product.moq || 1000} Pieces</div>
                           <div className="text-slate-500">Size:</div>
                           <div className="font-bold text-slate-800">{product.size || 'Standard'}</div>
                           <div className="text-slate-500">Material:</div>
                           <div className="font-bold text-slate-800">{product.category}</div>
                           <div className="text-slate-500">Available Stock:</div>
                           <div className="font-bold text-slate-800">{product.stock.toLocaleString()} Pieces</div>
                        </div>
                      </div>
                      
                      {/* Right Side Buttons - B2B Focus */}
                      <div className="w-full lg:w-[220px] flex flex-col gap-3 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 mt-4 lg:mt-0">
                        {product.deliveryAvailable && (
                          <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-green-700 bg-green-50 py-1.5 px-3 rounded border border-green-100 mb-2">
                             <Truck size={14}/> Pan India Delivery
                          </div>
                        )}
                        
                        <button 
                          onClick={handleRequestQuote}
                          className="w-full relative overflow-hidden bg-white text-blue-700 border-2 border-blue-600 px-4 py-2.5 rounded font-bold hover:bg-blue-50 transition shadow-sm flex justify-center items-center gap-2 group/btn"
                        >
                          <MessageSquare size={16} /> Contact Supplier
                        </button>

                        <button 
                          onClick={(e) => handleBuyNow(e, product)}
                          disabled={product.stock === 0}
                          className={`w-full px-4 py-2.5 rounded font-bold shadow-sm transition flex justify-center items-center gap-2 ${
                            product.stock === 0 
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                              : 'bg-amber-500 hover:bg-amber-600 text-slate-900 border border-amber-600'
                          }`}
                        >
                          Buy Now
                        </button>
                        
                        <button 
                          onClick={(e) => handleAddToCart(e, product)}
                          disabled={product.stock === 0}
                          className={`w-full px-4 py-2 rounded text-sm font-bold shadow-sm transition flex justify-center items-center gap-2 border ${
                            product.stock === 0 
                              ? 'bg-transparent text-slate-400 border-slate-200 cursor-not-allowed hidden' 
                              : addedItems[product.id]
                                ? 'bg-green-600 text-white border-green-700'
                                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                          }`}
                        >
                          {addedItems[product.id] ? <><Check size={16}/> Added to Cart</> : <><ShoppingCart size={16}/> Add to Cart</>}
                        </button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-24 bg-white rounded-lg border border-slate-200 shadow-sm">
                <div className="mx-auto w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-4">
                  <Search size={24} />
                </div>
                <h2 className="text-xl font-bold text-slate-700">No materials found.</h2>
                <p className="text-slate-500 mt-2 font-medium">Try adjusting your filters or searching for something else.</p>
                <button 
                  onClick={() => {
                    setSearchParams({});
                    setSearchQuery('');
                    setInStockOnly(false);
                    setDeliveryOnly(false);
                    setPriceRange('');
                  }}
                  className="mt-6 text-blue-600 hover:text-blue-800 font-bold px-6 py-2 border border-blue-200 rounded-md hover:bg-blue-50 transition"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
