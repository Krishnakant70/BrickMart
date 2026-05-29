import { Product, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prd-101',
    name: 'Premium Red Clay Solid Brick',
    description: 'High-quality kiln-fired red clay bricks suitable for load-bearing walls and exposed facades.',
    price: 0.12,
    category: 'Clay Bricks',
    imageUrl: 'https://images.unsplash.com/photo-1517415147585-6d0c7c653245?auto=format&fit=crop&q=80&w=800',
    stock: 55000,
    featured: true,
    size: '9 x 4 x 3 inch',
    moq: 3000,
    deliveryAvailable: true
  },
  {
    id: 'prd-102',
    name: 'Fly Ash Solid Brick (Cement Color)',
    description: 'Environment-friendly fly ash bricks with high strength and uniform shape. Reduces mortar consumption.',
    price: 0.08,
    category: 'Fly Ash Bricks',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    stock: 120000,
    featured: true,
    size: '230 x 110 x 70 mm',
    moq: 5000,
    deliveryAvailable: true
  },
  {
    id: 'prd-103',
    name: 'Concrete Hollow Block (8 Inch)',
    description: 'Machine-made concrete hollow blocks for fast construction and excellent thermal insulation.',
    price: 1.25,
    category: 'Concrete Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1541888085-782294157bc2?auto=format&fit=crop&q=80&w=800',
    stock: 8500,
    size: '400 x 200 x 200 mm',
    moq: 500,
    deliveryAvailable: true
  },
  {
    id: 'prd-104',
    name: 'Interlocking Zig-Zag Paver Block',
    description: 'Heavy-duty concrete paver blocks for driveways, pathways, and commercial parking. Thickness: 60mm. Color: Red/Grey.',
    price: 0.45,
    category: 'Paver Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1584464457692-747125740440?auto=format&fit=crop&q=80&w=800',
    stock: 25000,
    featured: true,
    size: '60 mm thickness',
    moq: 1000,
    deliveryAvailable: true
  },
  {
    id: 'prd-105',
    name: 'AAC Lightweight Block',
    description: 'Autoclaved Aerated Concrete blocks. Lightweight, fire-resistant, and provides superior acoustic insulation.',
    price: 1.80,
    category: 'AAC Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1502621008035-7798363784bd?auto=format&fit=crop&q=80&w=800',
    stock: 15400,
    size: '600 x 200 x 150 mm',
    moq: 1000,
    deliveryAvailable: true
  },
  {
    id: 'prd-106',
    name: 'Wire Cut Exposed Facing Brick',
    description: 'Aesthetically pleasing wire-cut bricks designed for exposed exterior or interior masonry walls. Minimal maintenance required.',
    price: 0.65,
    category: 'Facing Bricks',
    imageUrl: 'https://images.unsplash.com/photo-1534237710431-e2fc698436d0?auto=format&fit=crop&q=80&w=800',
    stock: 12000,
    featured: true,
    size: '9 x 4 x 3 inch',
    moq: 2000,
    deliveryAvailable: true
  },
  {
    id: 'prd-107',
    name: 'Standard Machine Made Red Brick',
    description: 'Standard strength machine-made clay brick for general construction.',
    price: 0.10,
    category: 'Clay Bricks',
    imageUrl: 'https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=800',
    stock: 80000,
    size: '9 x 4 x 3 inch',
    moq: 4000,
    deliveryAvailable: true
  },
  {
    id: 'prd-108',
    name: 'Solid Concrete Block (6 Inch)',
    description: 'High density solid concrete block for load bearing walls.',
    price: 1.10,
    category: 'Concrete Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800',
    stock: 10000,
    size: '400 x 150 x 200 mm',
    moq: 600,
    deliveryAvailable: true
  },
  {
    id: 'prd-109',
    name: 'Grass Paver Block',
    description: 'Concrete grass pavers allowing water drainage and grass growth for eco-friendly parking.',
    price: 0.85,
    category: 'Paver Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1584464457692-747125740440?auto=format&fit=crop&q=80&w=800',
    stock: 5000,
    size: '400 x 400 x 80 mm',
    moq: 500,
    deliveryAvailable: false
  },
  {
    id: 'prd-110',
    name: 'CLC Blocks',
    description: 'Cellular Lightweight Concrete blocks for partition walls and non-load bearing application.',
    price: 1.50,
    category: 'AAC Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1502621008035-7798363784bd?auto=format&fit=crop&q=80&w=800',
    stock: 20000,
    size: '600 x 200 x 200 mm',
    moq: 800,
    deliveryAvailable: true
  },
  {
    id: 'prd-111',
    name: 'Refractory Fire Bricks',
    description: 'High temperature resistant fire bricks for furnaces, chimneys, and fireplaces.',
    price: 2.50,
    category: 'Facing Bricks',
    imageUrl: 'https://images.unsplash.com/photo-1517415147585-6d0c7c653245?auto=format&fit=crop&q=80&w=800',
    stock: 2000,
    size: '9 x 4.5 x 3 inch',
    moq: 200,
    deliveryAvailable: true
  },
  {
    id: 'prd-112',
    name: 'I-Shape Interlocking Paver',
    description: 'Heavy duty I-shape pavers for industrial zones and high traffic areas.',
    price: 0.55,
    category: 'Paver Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1584464457692-747125740440?auto=format&fit=crop&q=80&w=800',
    stock: 35000,
    size: '80 mm thickness',
    moq: 1500,
    deliveryAvailable: true
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-8934',
    date: '2026-05-18T10:30:00Z',
    status: 'Delivered',
    total: 395.00,
    items: [
      { product: MOCK_PRODUCTS[0], quantity: 2000 },
      { product: MOCK_PRODUCTS[1], quantity: 1500 }
    ]
  },
  {
    id: 'ORD-9021',
    date: '2026-05-25T14:15:00Z',
    status: 'Shipped',
    total: 625.00,
    items: [
      { product: MOCK_PRODUCTS[2], quantity: 500 }
    ]
  }
];
