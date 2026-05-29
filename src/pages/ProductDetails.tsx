import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, ShoppingCart, Truck, ShieldCheck, Factory, Info, MessageSquare, Star, MapPin, Building2, PackageCheck } from 'lucide-react';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = MOCK_PRODUCTS.find(p => p.id === id);
  const [quantity, setQuantity] = useState(product?.moq || 1000);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setQuantity(product.moq || 1000);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center border-t border-slate-100">
        <h2 className="text-3xl font-bold">Material Not Found</h2>
        <button onClick={() => navigate('/products')} className="text-blue-600 hover:underline mt-4">
          Return to Catalog
        </button>
      </div>
    );
  }

  // Duplicate image to mock gallery thumbnails
  const images = [
    product.imageUrl,
    product.imageUrl + '&q=70',
    product.imageUrl + '&q=60',
    product.imageUrl + '&q=50'
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleRequestQuote = () => {
    alert("In a real application, this would open a Request for Quote form to contact the supplier directly.");
  };

  return (
    <div className="bg-white min-h-screen pb-12">
      <div className="bg-slate-100 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="text-xs text-slate-500 flex gap-2 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link> / 
            <Link to="/products" className="hover:text-blue-600">Building Materials</Link> / 
            <span className="text-slate-700">{product.category}</span> / 
            <span className="text-slate-900 font-semibold">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Section: Above the fold */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-12">
          
          {/* Left Side: Images */}
          <div className="w-full lg:w-5/12 flex gap-4">
            {/* Thumbnails (Desktop) */}
            <div className="hidden sm:flex flex-col gap-3 w-16 shrink-0">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onMouseEnter={() => setSelectedImage(idx)}
                  className={`w-16 h-16 rounded border-2 overflow-hidden flex items-center justify-center p-1 ${
                    selectedImage === idx ? 'border-amber-500 shadow-sm' : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover rounded-sm mix-blend-multiply" />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-6 relative flex items-center justify-center min-h-[400px]">
              <img 
                src={images[selectedImage]} 
                alt={product.name}
                className="w-full max-w-md h-auto object-contain mix-blend-multiply drop-shadow-lg transition duration-300"
              />
              <div className="absolute top-4 left-4 bg-blue-800 text-white text-[10px] uppercase font-bold px-2 py-1 rounded shadow-sm">
                ISI Certified
              </div>
            </div>
            
            {/* Thumbnails (Mobile) */}
            <div className="sm:hidden flex gap-3 mt-4 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-14 shrink-0 rounded border overflow-hidden flex items-center justify-center p-1 ${
                    selectedImage === idx ? 'border-amber-500 border-2' : 'border-slate-200'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover rounded-sm mix-blend-multiply" />
                </button>
              ))}
            </div>
          </div>

          {/* Middle & Right: Details & Action Box */}
          <div className="w-full lg:w-7/12 flex flex-col lg:flex-row gap-8">
            
            {/* Product Info (Middle) */}
            <div className="flex-1 flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4 text-sm">
                <div className="flex items-center text-blue-600">
                  <Star size={16} className="fill-amber-400 text-amber-400 mr-1"/>
                  <Star size={16} className="fill-amber-400 text-amber-400 mr-1"/>
                  <Star size={16} className="fill-amber-400 text-amber-400 mr-1"/>
                  <Star size={16} className="fill-amber-400 text-amber-400 mr-1"/>
                  <Star size={16} className="fill-slate-200 text-slate-200 mr-1"/>
                  <a href="#reviews" className="ml-2 hover:underline text-blue-600 font-medium">128 Ratings</a>
                </div>
                <div className="text-slate-400">|</div>
                <p className="font-semibold text-blue-800 flex items-center gap-1.5 hover:underline cursor-pointer">
                  <Factory size={14} /> Visit the Standard Mfg. Store
                </p>
              </div>

              <div className="h-px bg-slate-200 w-full mb-4"></div>

              {/* Price Block */}
              <div className="mb-4">
                <div className="flex items-end gap-2 mb-1">
                  <span className="text-sm font-semibold text-slate-700 mb-2">Price:</span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-blue-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-slate-500 text-sm mb-1 line-through">${(product.price * 1.2).toFixed(2)}</span>
                </div>
                <p className="text-sm font-bold text-slate-700">
                  Total Order Value: <span className="text-blue-900">${(product.price * quantity).toFixed(2)}</span>
                </p>
                <p className="text-xs text-slate-500 mt-1">Inclusive of all taxes. Freight calculated at checkout.</p>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm mb-6 max-w-md">
                <div className="text-slate-500 font-medium">Material:</div>
                <div className="font-bold text-slate-800">{product.category}</div>
                
                <div className="text-slate-500 font-medium">Dimensions:</div>
                <div className="font-bold text-slate-800">{product.size || 'Standard Size'}</div>
                
                <div className="text-slate-500 font-medium">Min. Order (MOQ):</div>
                <div className="font-bold text-slate-800">{product.moq || 1000} Pieces</div>
              </div>

              <div className="h-px bg-slate-200 w-full mb-4"></div>

              {/* About this item */}
              <div className="mb-4">
                <h3 className="font-bold text-slate-900 mb-2">About this material</h3>
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                  <li>{product.description}</li>
                  <li>High compressive strength suitable for load-bearing and partition walls.</li>
                  <li>Manufactured using advanced technology ensuring uniform size and shape.</li>
                  <li>Low water absorption reduces the chance of efflorescence.</li>
                  <li>Excellent thermal and sound insulation properties.</li>
                </ul>
              </div>
            </div>

            {/* Buy Box (Right Side) */}
            <div className="w-full lg:w-[300px] shrink-0">
              <div className="border border-slate-300 rounded-lg p-5 bg-white shadow-sm sticky top-24">
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  ${product.price.toFixed(2)}
                </div>
                
                {product.deliveryAvailable ? (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-900">FREE Delivery</p>
                    <p className="text-sm text-slate-700">Estimated between <span className="font-bold">Thursday, June 10</span> and <span className="font-bold">Monday, June 14</span>.</p>
                    <div className="flex items-center gap-1.5 text-sm text-blue-600 mt-2 hover:underline cursor-pointer">
                      <MapPin size={16}/> Deliver to Mumbai 400001
                    </div>
                  </div>
                ) : (
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-red-600">Delivery Not Available</p>
                    <p className="text-sm text-slate-700">Pickup only from supplier warehouse.</p>
                  </div>
                )}

                {product.stock > 0 ? (
                  <h4 className="text-lg font-bold text-green-700 mb-4">In Stock.</h4>
                ) : (
                  <h4 className="text-lg font-bold text-red-600 mb-4">Out of Stock.</h4>
                )}

                <div className="mb-3">
                  <label className="block text-sm font-semibold text-slate-700 mb-1 shadow-sm">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-md h-10 bg-white overflow-hidden w-full">
                    <button 
                      className="px-3 h-full text-slate-600 hover:bg-slate-100 transition border-r border-slate-300 font-bold bg-slate-50"
                      onClick={() => setQuantity(q => Math.max(product.moq || 1000, q - 500))}
                      disabled={product.stock === 0}
                    >
                      -
                    </button>
                    <input 
                      type="number"
                      readOnly
                      value={quantity}
                      className="flex-1 w-full text-center font-bold text-slate-900 focus:outline-none"
                    />
                    <button 
                      className="px-3 h-full text-slate-600 hover:bg-slate-100 transition border-l border-slate-300 font-bold bg-slate-50"
                      onClick={() => setQuantity(q => Math.min(product.stock, q + 500))}
                      disabled={product.stock === 0}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="space-y-2 mt-5">
                  <button 
                    className={`w-full py-2.5 rounded-full font-bold shadow-sm transition flex justify-center items-center gap-2 border ${
                      product.stock === 0 
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed hidden'
                      : isAdded ? 'bg-green-600 text-white border-green-700' : 'bg-amber-400 hover:bg-amber-500 text-slate-900 border-amber-500'
                    }`}
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                  >
                    {isAdded ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  
                  <button
                    className={`w-full py-2.5 rounded-full font-bold shadow-sm transition flex justify-center items-center gap-2 border ${
                      product.stock === 0 
                      ? 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                      : 'bg-[#FFA41C] hover:bg-[#FF8F00] text-slate-900 border-[#FF8F00]'
                    }`}
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                  >
                    Buy Now
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  <button 
                    onClick={handleRequestQuote}
                    className="w-full text-sm font-semibold text-slate-700 border border-slate-300 rounded-md py-2 hover:bg-slate-50 transition"
                  >
                    Request Custom Quote
                  </button>
                </div>

                <div className="mt-5 text-sm space-y-2 text-slate-600">
                  <div className="flex gap-4">
                    <div className="w-20 text-slate-500">Ships from</div>
                    <div className="font-medium text-slate-800">BrickMart Logistics</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-slate-500">Sold by</div>
                    <div className="font-medium text-blue-600 hover:underline cursor-pointer">Standard Mfg.</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-slate-500">Returns</div>
                    <div className="font-medium text-blue-600 hover:underline cursor-pointer">Bulk orders non-returnable</div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-slate-500">Payment</div>
                    <div className="font-medium text-blue-600 hover:underline cursor-pointer">Secure transaction</div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-300 w-full mb-10"></div>

        {/* Bottom Section: Details, Specs, Reviews */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="w-full lg:w-3/4 pr-0 lg:pr-8 mx-auto">
            
            {/* Product Description */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-amber-700 mb-4">Product Description</h2>
              <div className="text-slate-700 text-sm leading-relaxed space-y-4">
                <p>
                  Experience the exceptional durability and aesthetic appeal of our {product.name}. Carefully sourced and manufactured to meet stringent industry standards, these {product.category.toLowerCase()} provide a reliable foundation for any construction project, be it residential, commercial, or industrial.
                </p>
                <p>
                  When you choose our bulk building materials, you invest in structural integrity. These versatile materials are designed for easy laying, minimizing mortar consumption and accelerating your project timeline. Whether you are building load-bearing walls, compound walls, or architectural facades, these bricks deliver consistent performance and lasting value.
                </p>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded mt-4">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><PackageCheck size={18} className="text-blue-600"/> Packaging & Handling</h4>
                  <p className="text-slate-600 text-xs">Products are carefully stacked and palletized for safe transport. Offloading at the site requires a level, firm ground. Handling by forklift or crane is recommended to prevent chipped edges.</p>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-amber-700 mb-4">Technical Details</h2>
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left text-sm text-slate-700">
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 font-bold text-slate-800 w-1/3 bg-slate-100 px-4">Material</td>
                      <td className="py-2.5 px-4 bg-white">{product.category}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 font-bold text-slate-800 w-1/3 bg-slate-100 px-4">Brand</td>
                      <td className="py-2.5 px-4 bg-white">Standard Manufacturing Co.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 font-bold text-slate-800 w-1/3 bg-slate-100 px-4">Dimensions</td>
                      <td className="py-2.5 px-4 bg-white">{product.size || 'Standard'}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 font-bold text-slate-800 w-1/3 bg-slate-100 px-4">Load-bearing</td>
                      <td className="py-2.5 px-4 bg-white">Yes</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 font-bold text-slate-800 w-1/3 bg-slate-100 px-4">Compressive Strength</td>
                      <td className="py-2.5 px-4 bg-white">10.5 N/mm² (Avg)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2.5 font-bold text-slate-800 w-1/3 bg-slate-100 px-4">Water Absorption</td>
                      <td className="py-2.5 px-4 bg-white">Less than 15%</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 font-bold text-slate-800 w-1/3 bg-slate-100 px-4">Certification</td>
                      <td className="py-2.5 px-4 bg-white"><div className="flex items-center gap-1 font-semibold text-slate-900"><ShieldCheck size={16} className="text-green-600"/> ISI Marked</div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Customer Reviews */}
            <div id="reviews" className="mb-10">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">Customer Reviews</h2>
              
              <div className="flex flex-col md:flex-row gap-8 mb-8 items-start">
                {/* Left: Summary */}
                <div className="w-full md:w-1/3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-400">
                      <Star size={20} className="fill-amber-400"/>
                      <Star size={20} className="fill-amber-400"/>
                      <Star size={20} className="fill-amber-400"/>
                      <Star size={20} className="fill-amber-400"/>
                      <Star size={20} className="fill-slate-200 text-slate-200"/>
                    </div>
                    <span className="text-lg font-bold text-slate-900">4.2 out of 5</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4">128 global ratings</p>
                  
                  <div className="space-y-2">
                    {[
                      { stars: 5, pct: 62 },
                      { stars: 4, pct: 21 },
                      { stars: 3, pct: 9 },
                      { stars: 2, pct: 5 },
                      { stars: 1, pct: 3 },
                    ].map(row => (
                      <div key={row.stars} className="flex items-center gap-2 text-sm text-blue-600 hover:underline cursor-pointer">
                        <span className="w-12">{row.stars} star</span>
                        <div className="flex-1 h-4 bg-slate-100 rounded border border-slate-200 overflow-hidden">
                          <div className="h-full bg-amber-400" style={{width: `${row.pct}%`}}></div>
                        </div>
                        <span className="w-8 text-right">{row.pct}%</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h3 className="font-bold text-slate-900 mb-2 text-lg">Review this product</h3>
                    <p className="text-sm text-slate-600 mb-4">Share your thoughts with other business customers</p>
                    <button className="w-full bg-white border border-slate-300 rounded-full py-1.5 text-slate-800 text-sm font-semibold hover:bg-slate-50 transition">
                      Write a product review
                    </button>
                  </div>
                </div>

                {/* Right: Actual Reviews */}
                <div className="w-full md:w-2/3 space-y-6">
                  {/* Review 1 */}
                  <div className="border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs"><Building2 size={16}/></div>
                       <span className="font-semibold text-slate-900 text-sm">Rakesh Builders Ltd.</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-amber-400">
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-amber-400"/>
                      </div>
                      <span className="font-bold text-slate-900 text-sm text-slate-800">Excellent quality and uniform size</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Reviewed in India on May 15, 2026</p>
                    <p className="text-xs text-amber-600 font-bold mb-2">Verified Purchase</p>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      We ordered 50,000 pieces for a residential project. The bricks arrived well-palletized with minimal breakage (less than 2%). The dimensions are very uniform which saved us a lot of mortar and time. Will definitely order again for our next site.
                    </p>
                  </div>
                  
                  {/* Review 2 */}
                  <div className="border-b border-slate-200 pb-6">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">VK</div>
                       <span className="font-semibold text-slate-900 text-sm">Vikram Kumar</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex text-amber-400">
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-amber-400"/>
                        <Star size={14} className="fill-slate-200 text-slate-200"/>
                      </div>
                      <span className="font-bold text-slate-900 text-sm text-slate-800">Good material, slight delay in delivery</span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Reviewed in India on April 28, 2026</p>
                    <p className="text-xs text-amber-600 font-bold mb-2">Verified Purchase</p>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      The material quality is solid, compressive strength matches the certificates provided. However, the delivery took 2 days longer than the estimate which caused a slight delay on site. The pricing is very competitive though.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
