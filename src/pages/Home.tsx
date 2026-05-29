import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Building, ShieldCheck } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data';

export function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.featured).slice(0, 4); // show 4 for better grid

  return (
    <div className="flex flex-col bg-slate-100">
      {/* Hero Section */}
      <section className="relative bg-blue-900 border-b border-blue-800 lg:py-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 items-center">
          <div className="lg:w-1/2 space-y-6 z-10">
            <div className="bg-amber-500/20 text-amber-300 px-4 py-1.5 rounded-full inline-block text-sm font-semibold border border-amber-500/30">
              Wholesale Pricing Available
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              India's Largest <br/>
              <span className="text-amber-500">Construction Materials</span> Marketplace.
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-xl">
              Source premium quality clay bricks, concrete blocks, and pavers directly from verified manufacturers. Unbeatable bulk prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                to="/products" 
                className="inline-flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-600 text-blue-900 px-8 py-4 rounded font-bold transition text-lg shadow-lg"
              >
                Browse Catalog <ArrowRight size={20} />
              </Link>
              <Link 
                to="/calculator" 
                className="inline-flex justify-center items-center px-8 py-4 rounded font-bold transition text-lg bg-blue-800 hover:bg-blue-700 text-white border border-blue-600"
              >
                Material Calculator
              </Link>
            </div>
            
            <div className="flex items-center gap-6 pt-6 border-t border-blue-800/50 mt-6 text-blue-200 text-sm">
              <div className="flex items-center gap-2"><Building size={16} className="text-amber-500"/> 500+ Suppliers</div>
              <div className="flex items-center gap-2"><Truck size={16} className="text-amber-500"/> Pan-India Delivery</div>
            </div>
          </div>
          
          <div className="lg:w-1/2 w-full h-[300px] lg:h-[500px] relative rounded-xl overflow-hidden shadow-2xl border-4 border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1541888085-782294157bc2?auto=format&fit=crop&q=80&w=1200" 
              alt="Construction Bricks Stack" 
              className="w-full h-full object-cover"
            />
            {/* Overlay badge */}
            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur text-slate-800 p-4 rounded-lg shadow-xl hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <ShieldCheck size={24}/>
                </div>
                <div>
                  <p className="font-bold text-sm">ISI Certified</p>
                  <p className="text-xs text-slate-500">Quality assured products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex overflow-x-auto gap-4 hide-scrollbar pb-2">
            {[
              { name: 'Red Clay Bricks', img: 'https://images.unsplash.com/photo-1517415147585-6d0c7c653245?auto=format&fit=crop&q=80&w=200' },
              { name: 'Fly Ash Bricks', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200' },
              { name: 'Concrete Blocks', img: 'https://images.unsplash.com/photo-1541888085-782294157bc2?auto=format&fit=crop&q=80&w=200' },
              { name: 'Paver Blocks', img: 'https://images.unsplash.com/photo-1584464457692-747125740440?auto=format&fit=crop&q=80&w=200' },
              { name: 'AAC Blocks', img: 'https://images.unsplash.com/photo-1502621008035-7798363784bd?auto=format&fit=crop&q=80&w=200' },
              { name: 'Facing Bricks', img: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&q=80&w=200' }
            ].map(cat => (
              <Link to={`/products?category=${encodeURIComponent(cat.name)}`} key={cat.name} className="flex flex-col items-center gap-2 group min-w-[100px]">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-amber-500 transition-colors p-0.5">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition"/>
                  </div>
                </div>
                <span className="text-xs font-medium text-slate-700 text-center">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products (Marketplace grid style) */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Top Rated Products</h2>
              <p className="text-slate-500 mt-1 text-sm">Best selling building materials from verified sellers.</p>
            </div>
            <Link to="/products" className="hidden sm:inline-block bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded text-sm font-semibold hover:bg-slate-50 transition">
              View Entire Catalog
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {MOCK_PRODUCTS.slice(0, 5).map(product => (
              <Link to={`/product/${product.id}`} key={product.id} className="bg-white border text-left border-slate-200 hover:border-amber-500 hover:shadow-lg transition-all flex flex-col group relative overflow-hidden group">
                <div className="aspect-square relative overflow-hidden bg-slate-100 p-2">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded mix-blend-multiply group-hover:scale-105 transition duration-500"
                  />
                  {/* B2B style badge */}
                  <span className="absolute top-2 left-2 bg-blue-800 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">
                    Verified
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="text-xs text-slate-500 mb-1">{product.category}</div>
                  <h3 className="font-semibold text-sm text-slate-900 group-hover:text-blue-700 line-clamp-2 leading-snug mb-2">{product.name}</h3>
                  <div className="mt-auto">
                    <div className="text-blue-800 font-bold text-lg">
                      ${product.price.toFixed(2)} <span className="text-xs text-slate-500 font-normal">/ piece</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Min. Order: {product.moq || 1000} pcs</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-6 text-center sm:hidden">
            <Link to="/products" className="block w-full bg-white border border-slate-300 text-slate-700 px-4 py-3 rounded text-sm font-semibold shadow-sm">
              View Entire Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="bg-white py-16 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex gap-4 items-start p-6 border border-slate-100 rounded-lg hover:shadow-md transition bg-slate-50">
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded flex items-center justify-center shrink-0">
                <Building size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-slate-900">Direct from Manufacturers</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Cut out the middlemen and source directly from kilns and factories across the region.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 border border-slate-100 rounded-lg hover:shadow-md transition bg-slate-50">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded flex items-center justify-center shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-slate-900">Reliable Logistics</h3>
                <p className="text-sm text-slate-600 leading-relaxed">End-to-end transportation services ensure your materials arrive at the site on time.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start p-6 border border-slate-100 rounded-lg hover:shadow-md transition bg-slate-50">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold mb-1 text-slate-900">Trade Assurance</h3>
                <p className="text-sm text-slate-600 leading-relaxed">Secure payments and quality guarantees protect your large-scale construction bulk orders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
