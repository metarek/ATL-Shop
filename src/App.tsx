/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu, 
  ChevronRight, 
  Star, 
  Settings, 
  Lock, 
  Plus, 
  Trash2, 
  Edit2,
  LogOut,
  UserCircle,
  ShoppingBag,
  Heart,
  MessageSquare,
  X,
  Image as ImageIcon,
  Video as VideoIcon,
  Layout,
  ChevronDown,
  Zap,
  Check,
  Award,
  TrendingDown,
  Crown,
  Camera,
  CreditCard,
  PackageCheck,
  PackageX,
  Share2,
  Truck,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, SiteConfig, UserProfile, CartItem } from './types';
import { supabaseService } from './supabaseService';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Earbuds - High Bass',
    price: 1250,
    originalPrice: 2500,
    discount: 50,
    image: 'https://picsum.photos/seed/earbuds/300/300',
    rating: 4.5,
    reviews: 128,
    category: 'Electronics',
    description: 'Experience crystal clear sound with deep bass. These wireless earbuds offer 24-hour battery life and a comfortable ergonomic design.'
  },
  {
    id: '2',
    name: 'Smart Watch Series 7 - Waterproof',
    price: 3500,
    originalPrice: 5000,
    discount: 30,
    image: 'https://picsum.photos/seed/watch/300/300',
    rating: 4.8,
    reviews: 85,
    category: 'Electronics',
    description: 'Stay connected and track your fitness with the Smart Watch Series 7. Features heart rate monitoring, GPS, and a vibrant AMOLED display.'
  },
  {
    id: '3',
    name: 'Cotton Casual T-Shirt for Men',
    price: 450,
    originalPrice: 800,
    discount: 44,
    image: 'https://picsum.photos/seed/tshirt/300/300',
    rating: 4.2,
    reviews: 210,
    category: 'Fashion',
    description: 'Premium quality 100% cotton t-shirt. Breathable fabric and stylish fit, perfect for everyday casual wear.'
  },
  {
    id: '4',
    name: 'Non-Stick Cooking Pot Set - 3 Pcs',
    price: 2200,
    originalPrice: 3500,
    image: 'https://picsum.photos/seed/pot/300/300',
    rating: 4.6,
    reviews: 56,
    category: 'Home & Living',
    description: 'High-quality non-stick coating for healthy cooking. This 3-piece set includes different sizes to meet all your kitchen needs.'
  },
  {
    id: '5',
    name: 'Gaming Mouse with RGB Lighting',
    price: 850,
    originalPrice: 1500,
    image: 'https://picsum.photos/seed/mouse/300/300',
    rating: 4.7,
    reviews: 142,
    category: 'Electronics',
    description: 'Precision gaming mouse with adjustable DPI and customizable RGB lighting. Ergonomic design for long gaming sessions.'
  },
  {
    id: '6',
    name: 'Leather Wallet for Men - Premium',
    price: 650,
    originalPrice: 1200,
    image: 'https://picsum.photos/seed/wallet/300/300',
    rating: 4.4,
    reviews: 93,
    category: 'Fashion',
    description: 'Genuine leather wallet with multiple card slots and a sleek design. Durable and stylish accessory for men.'
  },
  {
    id: '7',
    name: 'Professional Badminton Racket - Lightweight Carbon Fiber',
    price: 1850,
    originalPrice: 3200,
    image: 'https://picsum.photos/seed/badminton/300/300',
    rating: 4.9,
    reviews: 42,
    category: 'Sports',
    description: 'Ultra-lightweight carbon fiber racket for professional play. Offers excellent control and power for your game.'
  }
];

const CATEGORIES = [
  'Electronics', 'Fashion', 'Home & Living', 'Health & Beauty', 'Groceries', 'Toys', 'Sports'
];

const ICON_MAP: Record<string, any> = {
  Zap,
  Star,
  Plus,
  Award,
  TrendingDown,
  Crown
};

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('siteConfig');
    const defaultConfig: SiteConfig = {
      siteName: 'ATL Shop',
      heroBanner: 'https://picsum.photos/seed/banner/1200/400',
      heroBanners: [
        'https://picsum.photos/seed/banner1/1200/400',
        'https://picsum.photos/seed/banner2/1200/400',
        'https://picsum.photos/seed/banner3/1200/400',
        'https://picsum.photos/seed/banner4/1200/400',
        'https://picsum.photos/seed/banner5/1200/400'
      ],
      heroBannerType: 'image',
      primaryColor: '#f85606',
      footerSections: [
        {
          title: 'Customer Care',
          links: [
            { label: 'Help Center', url: '#' },
            { label: 'How to Buy', url: '#' },
            { label: 'Returns & Refunds', url: '#' },
            { label: 'Contact Us', url: '#' }
          ]
        },
        {
          title: 'Daraz',
          links: [
            { label: 'About ATL Shop', url: '#' },
            { label: 'Digital Payments', url: '#' },
            { label: 'ATL Shop Blog', url: '#' },
            { label: 'ATL Shop Mart', url: '#' }
          ]
        },
        {
          title: 'Payment Methods',
          links: [
            { label: 'bKash', url: '#' },
            { label: 'Nagad', url: '#' },
            { label: 'Cash on Delivery', url: '#' }
          ]
        },
        {
          title: 'Follow Us',
          links: [
            { label: 'Facebook', url: '#' },
            { label: 'Instagram', url: '#' },
            { label: 'Twitter', url: '#' }
          ]
        }
      ],
      premiumOffers: [
        { title: 'FLASH SALE', subtitle: 'Up to 70% Off', icon: 'Zap', color: 'from-yellow-400 via-yellow-500 to-yellow-600', productIds: ['1', '2'], mode: 'auto' },
        { title: 'BEST SELLERS', subtitle: 'Most Popular Items', icon: 'Star', color: 'from-amber-400 via-amber-500 to-amber-600', productIds: ['3', '4'], mode: 'auto' },
        { title: 'NEW ARRIVALS', subtitle: 'Fresh In Stock', icon: 'Plus', color: 'from-yellow-500 via-amber-600 to-yellow-700', productIds: ['5', '6'], mode: 'auto' },
        { title: 'PREMIUM COLLECTION', subtitle: 'Luxury Selection', icon: 'Award', color: 'from-yellow-300 via-yellow-500 to-amber-500', productIds: ['7', '8'], mode: 'auto' },
        { title: 'BUDGET DEALS', subtitle: 'Under ৳999', icon: 'TrendingDown', color: 'from-amber-500 via-yellow-600 to-amber-700', productIds: ['2', '3'], mode: 'auto' },
        { title: 'LIMITED EDITION', subtitle: 'Exclusive Only', icon: 'Crown', color: 'from-yellow-400 via-amber-400 to-yellow-500', productIds: ['4', '5'], mode: 'auto' },
      ],
      paymentNumber: '01988344070',
      deliveryFeeInside: 75,
      deliveryFeeOutside: 130
    };

    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultConfig, ...parsed };
    }
    return defaultConfig;
  });

  useEffect(() => {
    localStorage.setItem('siteConfig', JSON.stringify(siteConfig));
    // Also save to Supabase for persistence across devices/sessions
    supabaseService.saveSiteConfig(siteConfig);
  }, [siteConfig]);

  const getAutoProducts = (title: string): Product[] => {
    const sortedProducts = [...products];
    switch (title) {
      case 'FLASH SALE':
        return sortedProducts
          .filter(p => p.originalPrice)
          .sort((a, b) => {
            const discA = (a.originalPrice || 0) - a.price;
            const discB = (b.originalPrice || 0) - b.price;
            return discB - discA;
          })
          .slice(0, 2);
      case 'BEST SELLERS':
        return sortedProducts
          .sort((a, b) => b.reviews - a.reviews)
          .slice(0, 2);
      case 'NEW ARRIVALS':
        return sortedProducts.slice(-2).reverse();
      case 'PREMIUM COLLECTION':
        return sortedProducts
          .sort((a, b) => b.price - a.price)
          .slice(0, 2);
      case 'BUDGET DEALS':
        return sortedProducts
          .filter(p => p.price < 1000)
          .sort((a, b) => a.price - b.price)
          .slice(0, 2);
      case 'LIMITED EDITION':
        return sortedProducts
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 2);
      default:
        return sortedProducts.slice(0, 2);
    }
  };

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isFooterSettingsOpen, setIsFooterSettingsOpen] = useState(false);
  const [isPremiumOffersOpen, setIsPremiumOffersOpen] = useState(false);
  const [offerSearch, setOfferSearch] = useState('');
  const [offerSort, setOfferSort] = useState<'rating' | 'reviews' | 'price'>('reviews');
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState('');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('registeredUsers');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'product-details' | 'checkout'>('home');
  const [checkoutItem, setCheckoutItem] = useState<CartItem | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'cod' | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [shippingName, setShippingName] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState<'inside' | 'outside'>('inside');
  const [transactionId, setTransactionId] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    if (!siteConfig.heroBanners || siteConfig.heroBanners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % (siteConfig.heroBanners?.length || 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [siteConfig.heroBanners]);

  // Admin Panel State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Supabase Initial Fetch
  useEffect(() => {
    const fetchData = async () => {
      const dbProducts = await supabaseService.getProducts();
      if (dbProducts.length > 0) setProducts(dbProducts);

      const dbUsers = await supabaseService.getUsers();
      if (dbUsers.length > 0) setRegisteredUsers(dbUsers);

      const dbConfig = await supabaseService.getSiteConfig();
      if (dbConfig) setSiteConfig(dbConfig);
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    if (currentUser) supabaseService.saveUser(currentUser);
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    localStorage.setItem('siteConfig', JSON.stringify(siteConfig));
    supabaseService.saveSiteConfig(siteConfig);
  }, [siteConfig]);

  useEffect(() => {
    if (editingProduct) {
      setImagePreview(editingProduct.image);
    } else {
      setImagePreview(null);
    }
  }, [editingProduct]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setShippingName(currentUser.name);
    }
  }, [currentUser]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '@Tarek8461') {
      setIsAdminAuthenticated(true);
      setError('');
    } else {
      setError('ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।');
    }
  };

  const toggleAuthMode = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setError('');
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    setRegisteredUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    supabaseService.saveUser(updatedUser);
  };

  const getAccountAge = (createdAt?: string) => {
    if (!createdAt) return '0 দিন';
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} দিন`;
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const emailOrPhone = formData.get('email') as string;

    if (authMode === 'signup') {
      const name = formData.get('name') as string;
      if (registeredUsers.find(u => u.email === emailOrPhone)) {
        setError('এই ইমেইল বা নাম্বার দিয়ে অলরেডি একাউন্ট খোলা আছে।');
        return;
      }
      const newUser: UserProfile = {
        id: Math.random().toString(36).substr(2, 9),
        name,
        email: emailOrPhone,
        avatar: `https://picsum.photos/seed/${emailOrPhone}/100/100`,
        createdAt: new Date().toISOString(),
        totalOrders: 0,
        totalSpent: 0,
        receivedOrders: 0,
        cancelledOrders: 0
      };
      setRegisteredUsers([...registeredUsers, newUser]);
      setCurrentUser(newUser);
      supabaseService.saveUser(newUser);
      setIsAuthModalOpen(false);
      setError('');
    } else {
      const user = registeredUsers.find(u => u.email === emailOrPhone);
      if (user) {
        setCurrentUser(user);
        setIsAuthModalOpen(false);
        setError('');
      } else {
        setError('এই ইমেইল বা নাম্বার দিয়ে কোনো একাউন্ট পাওয়া যায়নি।');
      }
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsProfileOpen(false);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const deleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id));
      supabaseService.deleteProduct(id);
    }
  };

  const saveProduct = (product: Product) => {
    if (products.find(p => p.id === product.id)) {
      setProducts(products.map(p => p.id === product.id ? product : p));
    } else {
      setProducts([...products, product]);
    }
    supabaseService.saveProduct(product);
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-daraz-orange to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200">
                <ShoppingBag size={32} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-daraz-orange mb-2">
              {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-sm">
              {authMode === 'login' ? 'Login to access your profile and orders.' : 'Join ATL Shop for a better shopping experience.'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                <input 
                  name="name" 
                  type="text" 
                  required 
                  placeholder="Enter your name"
                  className="w-full border-2 border-gray-100 rounded-lg py-3 px-4 focus:border-daraz-orange outline-none transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email or Phone Number</label>
              <input 
                name="email" 
                type="text" 
                required 
                placeholder="Enter your email or phone number"
                className="w-full border-2 border-gray-100 rounded-lg py-3 px-4 focus:border-daraz-orange outline-none transition-colors"
              />
            </div>

            {error && <p className="text-red-500 text-xs text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full bg-daraz-orange text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-daraz-orange/20"
            >
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            {authMode === 'login' ? (
              <p>Don't have an account? <span onClick={() => toggleAuthMode('signup')} className="text-daraz-orange font-bold cursor-pointer hover:underline">Sign Up</span></p>
            ) : (
              <p>Already have an account? <span onClick={() => toggleAuthMode('login')} className="text-daraz-orange font-bold cursor-pointer hover:underline">Login</span></p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-header transition-all duration-300">
        <div className="bg-daraz-bg py-1 border-b border-gray-100 hidden md:block">
          <div className="daraz-container flex justify-between text-xs">
            <div className="flex gap-4">
              <span>SAVE MORE ON APP</span>
              <span>BECOME A SELLER</span>
              <span>HELP & SUPPORT</span>
            </div>
            <div className="flex gap-4">
              {currentUser ? (
                <span 
                  onClick={() => setIsProfileOpen(true)}
                  className="cursor-pointer hover:underline"
                >
                  {currentUser.name.toUpperCase()}
                </span>
              ) : (
                <>
                  <span 
                    onClick={() => { toggleAuthMode('login'); setIsAuthModalOpen(true); }}
                    className="cursor-pointer hover:underline"
                  >
                    LOGIN
                  </span>
                  <span 
                    onClick={() => { toggleAuthMode('signup'); setIsAuthModalOpen(true); }}
                    className="cursor-pointer hover:underline"
                  >
                    SIGNUP
                  </span>
                </>
              )}
              <span>ভাষা</span>
            </div>
          </div>
        </div>
        <div className="py-4 bg-white">
          <div className="daraz-container flex items-center gap-8">
            <div 
              onClick={() => { setSearchQuery(''); setCurrentView('home'); }}
              className="flex items-center gap-3 cursor-pointer group shrink-0"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-daraz-orange to-orange-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange-200 group-hover:rotate-12 transition-all duration-500 overflow-hidden">
                  <ShoppingBag size={28} className="relative z-10" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-daraz-orange to-orange-700 font-black text-3xl tracking-tighter italic group-hover:scale-105 transition-transform origin-left duration-300">
                  {siteConfig.siteName.split(' ')[0]}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="h-[2px] w-4 bg-daraz-orange/30 rounded-full"></div>
                  <span className="text-gray-400 font-black text-[10px] uppercase tracking-[0.3em]">
                    {siteConfig.siteName.split(' ').slice(1).join(' ') || 'Online Shop'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder={`Search in ${siteConfig.siteName}`} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 py-2 px-4 pr-10 rounded-sm focus:outline-none focus:ring-1 focus:ring-daraz-orange"
              />
              <button className="absolute right-0 top-0 h-full bg-daraz-orange text-white px-4 rounded-r-sm">
                <Search size={20} />
              </button>
            </div>
            <div className="flex items-center gap-6 text-gray-600">
              <div 
                className="flex items-center gap-2 cursor-pointer hover:text-daraz-orange"
                onClick={() => currentUser ? setIsProfileOpen(true) : setIsAuthModalOpen(true)}
              >
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="" className="w-8 h-8 rounded-full border border-gray-200" />
                ) : (
                  <User size={24} />
                )}
                {currentUser && <span className="text-sm font-medium hidden md:block">{currentUser.name}</span>}
              </div>
              <div 
                className="relative cursor-pointer hover:text-daraz-orange"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-daraz-orange text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 daraz-container py-6">
        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <section className="mb-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="rounded-2xl overflow-hidden shadow-premium h-[420px] relative group border border-white/20"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentBannerIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    {siteConfig.heroBannerType === 'video' ? (
                      <video 
                        src={siteConfig.heroBanners?.[currentBannerIndex] || siteConfig.heroBanner} 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={siteConfig.heroBanners?.[currentBannerIndex] || siteConfig.heroBanner} 
                        alt="Hero Banner" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Dots */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  {(siteConfig.heroBanners || [siteConfig.heroBanner]).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentBannerIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-500 ${currentBannerIndex === idx ? 'bg-daraz-orange w-8 shadow-[0_0_10px_rgba(248,86,6,0.6)]' : 'bg-white/40 w-3 hover:bg-white/60'}`}
                    />
                  ))}
                </div>

                {/* Navigation Arrows */}
                <button 
                  onClick={() => setCurrentBannerIndex((prev) => (prev - 1 + (siteConfig.heroBanners?.length || 1)) % (siteConfig.heroBanners?.length || 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 glow-button-white"
                >
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <button 
                  onClick={() => setCurrentBannerIndex((prev) => (prev + 1) % (siteConfig.heroBanners?.length || 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 glow-button-white"
                >
                  <ChevronRight size={24} />
                </button>
              </motion.div>
            </section>

            {/* Golden Premium Offer Boxes */}
            <section className="mb-14">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-10 w-2 bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full shadow-lg shadow-amber-200"></div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic">PREMIUM OFFERS</h2>
                <div className="flex-1 h-[2px] bg-gradient-to-r from-amber-500/30 via-amber-500/10 to-transparent rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {siteConfig.premiumOffers?.map((offer, idx) => {
                  const offerProducts = offer.mode === 'auto' 
                    ? getAutoProducts(offer.title)
                    : offer.productIds
                        .map(id => products.find(p => p.id === id))
                        .filter(Boolean) as Product[];
                  
                  const IconComponent = ICON_MAP[offer.icon] || Star;

                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.6 }}
                      className={`relative overflow-hidden rounded-[2rem] p-1 bg-gradient-to-br ${offer.color} shadow-2xl group cursor-pointer hover-lift`}
                    >
                      <div className="bg-white rounded-[1.8rem] p-6 h-full flex flex-col relative z-10">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h3 className={`text-transparent bg-clip-text bg-gradient-to-r ${offer.color} font-black text-2xl leading-tight tracking-tight`}>
                              {offer.title}
                            </h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1.5">{offer.subtitle}</p>
                          </div>
                          <div className={`p-3 rounded-2xl bg-gradient-to-br ${offer.color} text-white shadow-xl transform group-hover:rotate-12 transition-transform duration-500`}>
                            <IconComponent size={28} />
                          </div>
                        </div>
                        
                        <div className="flex gap-4 mt-auto">
                          {offerProducts.length > 0 ? offerProducts.map((p, pIdx) => (
                            <div 
                              key={pIdx} 
                              className="flex-1 group/item cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProduct(p);
                                setCurrentView('product-details');
                                window.scrollTo(0, 0);
                              }}
                            >
                              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-3 border border-gray-100 relative shadow-inner img-zoom-container">
                                <img 
                                  src={p.image} 
                                  alt={p.name} 
                                  className="w-full h-full object-cover"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                              </div>
                              <div className="text-xs font-black text-gray-900 bg-gray-100 py-1 px-2 rounded-full inline-block">৳{p.price}</div>
                            </div>
                          )) : (
                            <div className="flex-1 h-28 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-300 text-xs italic border-2 border-dashed border-gray-100">
                              No products selected
                            </div>
                          )}
                        </div>
                        
                        <div 
                          onClick={() => {
                            if (offerProducts.length > 0) {
                              setSelectedProduct(offerProducts[0]);
                              setCurrentView('product-details');
                              window.scrollTo(0, 0);
                            }
                          }}
                          className={`mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r ${offer.color} text-white text-center text-sm font-black shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all cursor-pointer uppercase tracking-wider`}
                        >
                          EXPLORE DEALS
                        </div>
                      </div>
                      
                      {/* Decorative elements */}
                      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors"></div>
                      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-black/5 rounded-full blur-3xl group-hover:bg-black/10 transition-colors"></div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            {/* Flash Sale / Products */}
            <section className="mb-16">
              <div className="flex justify-between items-end mb-10">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-2 bg-daraz-orange rounded-full shadow-lg shadow-orange-200"></div>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900 tracking-tighter italic uppercase">
                      {searchQuery ? `Search Results for "${searchQuery}"` : 'JUST FOR YOU'}
                    </h2>
                    <p className="text-gray-400 text-xs font-bold tracking-widest mt-1 uppercase">Curated premium selection</p>
                  </div>
                </div>
                <button className="text-daraz-orange text-sm font-black hover:underline tracking-widest uppercase flex items-center gap-2 group">
                  SHOP MORE 
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.05
                    }
                  }
                }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              >
                {products
                  .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(product => (
                  <motion.div 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    layoutId={`product-${product.id}`}
                    key={product.id} 
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentView('product-details');
                      window.scrollTo(0, 0);
                    }}
                    className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group relative overflow-hidden border border-gray-100 hover-lift"
                  >
                    <div className="aspect-square overflow-hidden relative img-zoom-container">
                      <motion.img 
                        layoutId={`product-image-${product.id}`}
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      {product.discount && (
                        <div className="absolute top-3 left-3 bg-daraz-orange text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg z-10">
                          -{product.discount}%
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                      
                      {/* Quick Add Button on Hover */}
                      <div className="absolute bottom-3 left-3 right-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="w-full py-2 bg-daraz-orange text-white text-xs font-black rounded-xl shadow-xl hover:bg-orange-600 transition-colors uppercase tracking-wider"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <motion.h3 
                        layoutId={`product-name-${product.id}`}
                        className="text-sm line-clamp-2 h-10 mb-1 group-hover:text-daraz-orange transition-colors"
                      >
                        {product.name}
                      </motion.h3>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <motion.div 
                            layoutId={`product-price-${product.id}`}
                            className="text-lg font-black text-daraz-orange tracking-tight"
                          >
                            ৳{product.price}
                          </motion.div>
                          {product.originalPrice && (
                            <span className="text-[10px] text-gray-400 line-through">৳{product.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                          <Star size={10} className="text-yellow-400 fill-yellow-400" />
                          <span className="text-[10px] font-bold text-gray-500">4.8</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </>
        )}

        {currentView === 'product-details' && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4 border-b flex items-center gap-2">
              <button 
                onClick={() => setCurrentView('home')}
                className="text-gray-500 hover:text-daraz-orange flex items-center gap-1 text-sm font-medium glow-button"
              >
                <ChevronRight size={18} className="rotate-180" />
                Back to Shopping
              </button>
            </div>
            <div className="flex flex-col md:flex-row p-6 md:p-10 gap-10">
              <div className="w-full md:w-1/2 aspect-square bg-gray-50 rounded-xl overflow-hidden shadow-inner">
                <motion.img 
                  layoutId={`product-image-${selectedProduct.id}`}
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <motion.h2 
                    layoutId={`product-name-${selectedProduct.id}`}
                    className="text-2xl md:text-3xl font-bold mb-4"
                  >
                    {selectedProduct.name}
                  </motion.h2>

                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      layoutId={`product-price-${selectedProduct.id}`}
                      className="text-3xl font-bold text-daraz-orange"
                    >
                      ৳{selectedProduct.price}
                    </motion.div>
                    {selectedProduct.originalPrice && (
                      <div className="flex items-center gap-2 text-lg text-gray-400">
                        <span className="line-through">৳{selectedProduct.originalPrice}</span>
                        <span className="bg-orange-100 text-daraz-orange px-2 py-0.5 rounded text-sm font-bold">
                          -{Math.round((1 - selectedProduct.price / selectedProduct.originalPrice) * 100)}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">
                      {selectedProduct.rating} Rating | {selectedProduct.reviews} Reviews
                    </span>
                    <button className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-daraz-orange">
                      <Share2 size={20} />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <Truck size={16} className="text-daraz-orange" />
                      FREE DELIVERY
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <ShieldCheck size={16} className="text-daraz-orange" />
                      AUTHENTIC PRODUCT
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">
                      <RotateCcw size={16} className="text-daraz-orange" />
                      7 DAYS RETURN
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    <h3 className="font-bold text-gray-900 border-b pb-2">প্রোডাক্ট ডিটেইলস (Product Description)</h3>
                    <div className="text-gray-600 leading-relaxed markdown-body prose prose-sm max-w-none">
                      {selectedProduct.description ? (
                        <Markdown>{selectedProduct.description}</Markdown>
                      ) : (
                        'এই প্রোডাক্টের জন্য কোনো ডেসক্রিপশন দেওয়া নেই।'
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">Category</p>
                      <p className="font-medium">{selectedProduct.category}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">Stock Status</p>
                      <p className={`font-medium ${selectedProduct.stock && selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedProduct.stock && selectedProduct.stock > 0 ? `${selectedProduct.stock} Pcs Available` : 'Out of Stock'}
                      </p>
                    </div>
                  </div>

                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Available Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map(color => (
                          <span key={color} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-600 border border-gray-200">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-sm font-bold text-gray-900 uppercase mb-3">Available Sizes</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.sizes.map(size => (
                          <span key={size} className="px-4 py-2 bg-white border-2 border-gray-100 rounded-lg text-sm font-bold hover:border-daraz-orange cursor-pointer transition-all">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct);
                    }}
                    className="flex-1 bg-gray-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-black transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ShoppingCart size={24} />
                    ADD TO CART
                  </button>
                  <button 
                    onClick={() => {
                      setCheckoutItem({ ...selectedProduct, quantity: 1 });
                      setCurrentView('checkout');
                      window.scrollTo(0, 0);
                    }}
                    className="flex-1 bg-daraz-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-daraz-orange/20"
                  >
                    <ShoppingBag size={24} />
                    BUY NOW
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentView === 'checkout' && checkoutItem && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="p-6 bg-daraz-orange text-white flex justify-between items-center">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button 
                onClick={() => setCurrentView('product-details')}
                className="text-white/80 hover:text-white flex items-center gap-1 text-sm glow-button-white"
              >
                <X size={20} />
                Cancel
              </button>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShoppingBag className="text-daraz-orange" />
                    Order Summary
                  </h3>
                  <div className="flex gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <img src={checkoutItem.image} alt="" className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">{checkoutItem.name}</h4>
                      <p className="text-daraz-orange font-bold text-xl mt-1">৳{checkoutItem.price}</p>
                      <p className="text-sm text-gray-500 mt-1">Quantity: 1</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <User className="text-daraz-orange" />
                    Shipping Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex gap-2 mb-2">
                      <button 
                        onClick={() => setDeliveryLocation('inside')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 transition-all ${deliveryLocation === 'inside' ? 'border-daraz-orange bg-orange-50 text-daraz-orange' : 'border-gray-100 text-gray-500'}`}
                      >
                        INSIDE DHAKA (৳{siteConfig.deliveryFeeInside || 75})
                      </button>
                      <button 
                        onClick={() => setDeliveryLocation('outside')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 transition-all ${deliveryLocation === 'outside' ? 'border-daraz-orange bg-orange-50 text-daraz-orange' : 'border-gray-100 text-gray-500'}`}
                      >
                        OUTSIDE DHAKA (৳{siteConfig.deliveryFeeOutside || 130})
                      </button>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-daraz-orange outline-none" 
                      value={shippingName}
                      onChange={(e) => setShippingName(e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder="Phone Number" 
                      className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-daraz-orange outline-none" 
                      value={shippingPhone}
                      onChange={(e) => setShippingPhone(e.target.value)}
                    />
                    <textarea 
                      placeholder="Delivery Address" 
                      className="w-full p-3 border rounded-lg focus:ring-1 focus:ring-daraz-orange outline-none" 
                      rows={3}
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Lock className="text-daraz-orange" />
                    Payment Method
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-4 border-2 rounded-xl flex items-center justify-between transition-all ${paymentMethod === 'bkash' ? 'border-daraz-orange bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white font-bold">b</div>
                        <div>
                          <span className="font-bold block">bKash</span>
                          <span className="text-xs text-gray-500">{siteConfig.paymentNumber || '01988344070'} (Personal)</span>
                        </div>
                      </div>
                      {paymentMethod === 'bkash' && <div className="w-5 h-5 bg-daraz-orange rounded-full flex items-center justify-center text-white"><Plus size={14} className="rotate-45" /></div>}
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('nagad')}
                      className={`p-4 border-2 rounded-xl flex items-center justify-between transition-all ${paymentMethod === 'nagad' ? 'border-daraz-orange bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">n</div>
                        <div>
                          <span className="font-bold block">Nagad</span>
                          <span className="text-xs text-gray-500">{siteConfig.paymentNumber || '01988344070'} (Personal)</span>
                        </div>
                      </div>
                      {paymentMethod === 'nagad' && <div className="w-5 h-5 bg-daraz-orange rounded-full flex items-center justify-center text-white"><Plus size={14} className="rotate-45" /></div>}
                    </button>
                    
                    {(paymentMethod === 'bkash' || paymentMethod === 'nagad') && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-orange-50 rounded-xl border border-daraz-orange/20 space-y-3"
                      >
                        <p className="text-sm text-gray-600">
                          উপরের নাম্বারে ৳{checkoutItem.price + (deliveryLocation === 'inside' ? (siteConfig.deliveryFeeInside || 75) : (siteConfig.deliveryFeeOutside || 130))} সেন্ড মানি করে নিচে ট্রানজেকশন আইডি (Transaction ID) দিন।
                        </p>
                        <input 
                          type="text" 
                          placeholder="Transaction ID (e.g. 8N7A6D5C)" 
                          className="w-full p-3 border border-daraz-orange/30 rounded-lg focus:ring-1 focus:ring-daraz-orange outline-none bg-white" 
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      </motion.div>
                    )}
                    <button 
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-4 border-2 rounded-xl flex items-center justify-between transition-all ${paymentMethod === 'cod' ? 'border-daraz-orange bg-orange-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center text-white"><ShoppingBag size={20} /></div>
                        <span className="font-bold">Cash on Delivery</span>
                      </div>
                      {paymentMethod === 'cod' && <div className="w-5 h-5 bg-daraz-orange rounded-full flex items-center justify-center text-white"><Plus size={14} className="rotate-45" /></div>}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{checkoutItem.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee ({deliveryLocation === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'})</span>
                    <span>৳{deliveryLocation === 'inside' ? (siteConfig.deliveryFeeInside || 75) : (siteConfig.deliveryFeeOutside || 130)}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-daraz-orange">৳{checkoutItem.price + (deliveryLocation === 'inside' ? (siteConfig.deliveryFeeInside || 75) : (siteConfig.deliveryFeeOutside || 130))}</span>
                  </div>
                  <button 
                    disabled={!paymentMethod || !shippingName || !shippingPhone || !shippingAddress || ((paymentMethod === 'bkash' || paymentMethod === 'nagad') && !transactionId)}
                    onClick={() => {
                      const whatsappNumber = '01607374498';
                      const currentFee = deliveryLocation === 'inside' ? (siteConfig.deliveryFeeInside || 75) : (siteConfig.deliveryFeeOutside || 130);
                      const total = checkoutItem.price + currentFee;
                      
                      let productList = '';
                      if (checkoutItem.id === 'cart-checkout') {
                        productList = cart.map(item => `- ${item.name} (x${item.quantity}) - ৳${item.price * item.quantity}`).join('\n');
                      } else {
                        productList = `- ${checkoutItem.name} (x1) - ৳${checkoutItem.price}`;
                      }

                      const message = `*নতুন অর্ডার (New Order)*\n\n` +
                        `*প্রোডাক্ট তালিকা:*\n${productList}\n\n` +
                        `*সাব-টোটাল:* ৳${checkoutItem.price}\n` +
                        `*ডেলিভারি চার্জ (${deliveryLocation === 'inside' ? 'ঢাকার ভিতর' : 'ঢাকার বাইরে'}):* ৳${currentFee}\n` +
                        `*মোট বিল:* ৳${total}\n\n` +
                        `*পেমেন্ট মেথড:* ${paymentMethod?.toUpperCase()}\n` +
                        (transactionId ? `*ট্রানজেকশন আইডি:* ${transactionId}\n\n` : `\n`) +
                        `*কাস্টমার ডিটেইলস:*\n` +
                        `*নাম:* ${shippingName}\n` +
                        `*ফোন:* ${shippingPhone}\n` +
                        `*ঠিকানা:* ${shippingAddress}`;
                      
                      const encodedMessage = encodeURIComponent(message);
                      const whatsappUrl = `https://wa.me/88${whatsappNumber}?text=${encodedMessage}`;
                      
                      window.open(whatsappUrl, '_blank');
                      setOrderSuccess(true);
                      
                      // Update user stats
                      if (currentUser) {
                        updateUserProfile({
                          totalOrders: (currentUser.totalOrders || 0) + 1,
                          totalSpent: (currentUser.totalSpent || 0) + (checkoutItem.price + 60)
                        });
                      }

                      // Clear cart if it was a cart checkout
                      if (checkoutItem.id === 'cart-checkout') {
                        setCart([]);
                      }
                      
                      // Reset transaction ID
                      setTransactionId('');
                    }}
                    className="w-full bg-daraz-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-daraz-orange/20"
                  >
                    CONFIRM ORDER
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {orderSuccess && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Plus size={48} className="rotate-45" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Order Successful!</h2>
              <p className="text-gray-500 mb-8">
                আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
              </p>
              <button 
                onClick={() => {
                  setOrderSuccess(false);
                  setCurrentView('home');
                  setCheckoutItem(null);
                  setPaymentMethod(null);
                }}
                className="w-full bg-daraz-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all glow-button"
              >
                Back to Home
              </button>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12 pb-24">
        <div className="daraz-container grid grid-cols-1 md:grid-cols-4 gap-8">
          {siteConfig.footerSections?.map((section, idx) => (
            <div key={idx}>
              <h3 className="font-medium mb-4 text-daraz-orange uppercase text-xs tracking-wider">{section.title}</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a href={link.url} className="hover:text-daraz-orange transition-colors">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-100 daraz-container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} 
            <span className="ml-1 px-2 py-0.5 bg-daraz-orange/10 text-daraz-orange font-black italic rounded-md border border-daraz-orange/20 shadow-sm">
              {siteConfig.siteName}
            </span>. All Rights Reserved.
            <p className="mt-2 font-bold text-gray-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-daraz-orange rounded-full"></span>
              Website designer <span className="text-daraz-orange">Mdtarek</span>
            </p>
          </div>
          <button 
            onClick={() => setIsAdminOpen(!isAdminOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors text-sm font-bold"
          >
            <Settings size={16} />
            CONTROL PANEL
          </button>
        </div>
      </footer>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-[90] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
            >
              <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="text-daraz-orange" />
                  <h2 className="text-xl font-bold">Shopping Cart ({cartCount})</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors glow-button"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                    <ShoppingCart size={64} className="opacity-20" />
                    <p className="text-lg">Your cart is empty</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="bg-daraz-orange text-white px-8 py-2 rounded-full font-bold hover:bg-orange-700 transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex gap-4 bg-gray-50 p-3 rounded-xl group">
                      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h3 className="text-sm font-medium line-clamp-1">{item.name}</h3>
                          <p className="text-daraz-orange font-bold">৳{item.price}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border rounded-lg bg-white overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-1 hover:bg-gray-100 text-gray-500"
                            >
                              -
                            </button>
                            <span className="px-3 py-1 text-sm font-medium border-x">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-1 hover:bg-gray-100 text-gray-500"
                            >
                              +
                            </button>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t bg-white space-y-4">
                  <div className="flex justify-between items-center text-lg">
                    <span className="text-gray-500">Total Amount:</span>
                    <span className="font-bold text-daraz-orange text-2xl">৳{cartTotal}</span>
                  </div>
                    <button 
                      onClick={() => {
                        if (cart.length > 0) {
                          // Create a summary item for the cart
                          const cartSummary: CartItem = {
                            id: 'cart-checkout',
                            name: 'Shopping Cart Items',
                            price: cartTotal,
                            image: cart[0].image,
                            quantity: cart.reduce((acc, item) => acc + item.quantity, 0),
                            category: 'Cart',
                            description: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
                            rating: 0,
                            reviews: 0,
                            stock: 0
                          };
                          setCheckoutItem(cartSummary);
                          setCurrentView('checkout');
                          setIsCartOpen(false);
                          window.scrollTo(0, 0);
                        }
                      }}
                      className="w-full bg-daraz-orange text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-colors shadow-lg shadow-daraz-orange/20"
                    >
                      PROCEED TO CHECKOUT
                    </button>
                  <p className="text-center text-xs text-gray-400">
                    Shipping and taxes calculated at checkout
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Control Panel Overlay */}
      <AnimatePresence>
        {isAdminOpen && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-daraz-orange shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="daraz-container py-6 relative">
              <button 
                onClick={() => setIsAdminOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black glow-button"
              >
                <X size={24} />
              </button>

              {!isAdminAuthenticated ? (
                <div className="max-w-md mx-auto text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-daraz-orange">
                    <Lock size={32} />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Admin Access</h2>
                  <p className="text-gray-500 mb-6">কন্ট্রোল প্যানেলে প্রবেশ করতে পাসওয়ার্ড দিন।</p>
                  <form onSubmit={handleAdminLogin} className="space-y-4">
                    <input 
                      type="password" 
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="পাসওয়ার্ড লিখুন"
                      className="w-full border-2 border-gray-200 rounded-lg py-3 px-4 focus:border-daraz-orange outline-none transition-colors"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button 
                      type="submit"
                      className="w-full bg-daraz-orange text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
                    >
                      প্রবেশ করুন
                    </button>
                  </form>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                      <Settings className="text-daraz-orange" />
                      Control Panel
                    </h2>
                    <button 
                      onClick={() => setIsAdminAuthenticated(false)}
                      className="text-sm text-gray-500 hover:text-red-500"
                    >
                      Logout
                    </button>
                  </div>

                  {/* Site Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Edit2 size={18} />
                        Site Configuration
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Site Name</label>
                          <input 
                            type="text" 
                            value={siteConfig.siteName}
                            onChange={(e) => setSiteConfig({...siteConfig, siteName: e.target.value})}
                            className="w-full border rounded p-2"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Payment Method Setting (bKash/Nagad Number)</label>
                          <input 
                            type="text" 
                            value={siteConfig.paymentNumber || ''}
                            onChange={(e) => setSiteConfig({...siteConfig, paymentNumber: e.target.value})}
                            placeholder="বিকাশ বা নগদ নাম্বার দিন"
                            className="w-full border rounded p-2"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Delivery Fee (Inside Dhaka)</label>
                            <input 
                              type="number" 
                              value={siteConfig.deliveryFeeInside || 75}
                              onChange={(e) => setSiteConfig({...siteConfig, deliveryFeeInside: parseInt(e.target.value) || 0})}
                              className="w-full border rounded p-2"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Delivery Fee (Outside Dhaka)</label>
                            <input 
                              type="number" 
                              value={siteConfig.deliveryFeeOutside || 130}
                              onChange={(e) => setSiteConfig({...siteConfig, deliveryFeeOutside: parseInt(e.target.value) || 0})}
                              className="w-full border rounded p-2"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hero Banners (Carousel - 5 Images)</label>
                          <div className="space-y-3">
                            {[0, 1, 2, 3, 4].map((idx) => (
                              <div key={idx} className="flex gap-2 items-center">
                                <span className="text-[10px] font-bold text-gray-400 w-4">{idx + 1}</span>
                                <input 
                                  type="text" 
                                  value={siteConfig.heroBanners?.[idx] || ''}
                                  onChange={(e) => {
                                    const newBanners = [...(siteConfig.heroBanners || [])];
                                    newBanners[idx] = e.target.value;
                                    setSiteConfig({...siteConfig, heroBanners: newBanners});
                                  }}
                                  placeholder={`Banner ${idx + 1} URL`}
                                  className="flex-1 border rounded p-1.5 text-xs"
                                />
                                <label className="cursor-pointer p-1.5 bg-gray-100 rounded hover:bg-daraz-orange hover:text-white transition-colors">
                                  <ImageIcon size={14} />
                                  <input 
                                    type="file" 
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                          const newBanners = [...(siteConfig.heroBanners || [])];
                                          newBanners[idx] = reader.result as string;
                                          setSiteConfig({...siteConfig, heroBanners: newBanners});
                                        };
                                        reader.readAsDataURL(file);
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Hero Banner Type (Global)</label>
                          <div className="flex gap-2 mb-2">
                            <button 
                              onClick={() => setSiteConfig({...siteConfig, heroBannerType: 'image'})}
                              className={`flex-1 py-1 text-xs font-bold rounded ${siteConfig.heroBannerType === 'image' ? 'bg-daraz-orange text-white' : 'bg-gray-200 text-gray-600'}`}
                            >
                              IMAGE
                            </button>
                            <button 
                              onClick={() => setSiteConfig({...siteConfig, heroBannerType: 'video'})}
                              className={`flex-1 py-1 text-xs font-bold rounded ${siteConfig.heroBannerType === 'video' ? 'bg-daraz-orange text-white' : 'bg-gray-200 text-gray-600'}`}
                            >
                              VIDEO
                            </button>
                          </div>
                          <div className="space-y-3">
                            <label className="flex flex-col items-center justify-center gap-2 w-full py-6 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-daraz-orange hover:bg-orange-50 transition-all group">
                              {siteConfig.heroBannerType === 'image' ? (
                                <ImageIcon size={32} className="text-gray-400 group-hover:text-daraz-orange" />
                              ) : (
                                <VideoIcon size={32} className="text-gray-400 group-hover:text-daraz-orange" />
                              )}
                              <div className="text-center">
                                <p className="text-sm font-bold text-gray-600 group-hover:text-daraz-orange">
                                  {siteConfig.heroBannerType === 'image' ? 'গ্যালারি থেকে ছবি আপলোড করুন' : 'গ্যালারি থেকে ভিডিও আপলোড করুন'}
                                </p>
                                <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Click to browse gallery</p>
                              </div>
                              <input 
                                type="file" 
                                className="hidden"
                                accept={siteConfig.heroBannerType === 'image' ? "image/*" : "video/*"}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setSiteConfig({...siteConfig, heroBanner: reader.result as string});
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>
                            
                            <div className="relative">
                              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Plus size={14} className="text-gray-400" />
                              </div>
                              <input 
                                type="text" 
                                value={siteConfig.heroBanner}
                                onChange={(e) => setSiteConfig({...siteConfig, heroBanner: e.target.value})}
                                placeholder={siteConfig.heroBannerType === 'image' ? "অথবা ছবির লিঙ্ক দিন (URL)" : "অথবা ভিডিওর লিঙ্ক দিন (URL)"}
                                className="w-full border rounded-lg py-2 pl-9 pr-4 text-xs outline-none focus:ring-1 focus:ring-daraz-orange"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <button 
                        onClick={() => setIsPremiumOffersOpen(!isPremiumOffersOpen)}
                        className="w-full flex justify-between items-center group"
                      >
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                          <Award size={20} className="text-daraz-orange" />
                          Premium Offer Boxes
                        </h3>
                        <ChevronDown 
                          size={24} 
                          className={`text-gray-400 group-hover:text-daraz-orange transition-transform duration-300 ${isPremiumOffersOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {isPremiumOffersOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="space-y-4 mt-6 pt-6 border-t border-gray-200">
                              {siteConfig.premiumOffers?.map((offer, idx) => (
                                <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                                  <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-daraz-orange uppercase tracking-wider">Box {idx + 1}: {offer.title}</span>
                                    <div className="flex bg-gray-100 rounded-lg p-1">
                                      <button 
                                        onClick={() => {
                                          const newOffers = [...(siteConfig.premiumOffers || [])];
                                          newOffers[idx] = { ...offer, mode: 'auto' };
                                          setSiteConfig({ ...siteConfig, premiumOffers: newOffers });
                                        }}
                                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${offer.mode === 'auto' ? 'bg-white text-daraz-orange shadow-sm' : 'text-gray-400'}`}
                                      >
                                        AUTO
                                      </button>
                                      <button 
                                        onClick={() => {
                                          const newOffers = [...(siteConfig.premiumOffers || [])];
                                          newOffers[idx] = { ...offer, mode: 'manual' };
                                          setSiteConfig({ ...siteConfig, premiumOffers: newOffers });
                                        }}
                                        className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${offer.mode === 'manual' ? 'bg-white text-daraz-orange shadow-sm' : 'text-gray-400'}`}
                                      >
                                        MANUAL
                                      </button>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Title</label>
                                      <input 
                                        type="text" 
                                        value={offer.title}
                                        onChange={(e) => {
                                          const newOffers = [...(siteConfig.premiumOffers || [])];
                                          newOffers[idx] = { ...offer, title: e.target.value };
                                          setSiteConfig({ ...siteConfig, premiumOffers: newOffers });
                                        }}
                                        className="w-full border rounded p-1.5 text-sm"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Subtitle</label>
                                      <input 
                                        type="text" 
                                        value={offer.subtitle}
                                        onChange={(e) => {
                                          const newOffers = [...(siteConfig.premiumOffers || [])];
                                          newOffers[idx] = { ...offer, subtitle: e.target.value };
                                          setSiteConfig({ ...siteConfig, premiumOffers: newOffers });
                                        }}
                                        className="w-full border rounded p-1.5 text-sm"
                                      />
                                    </div>
                                  </div>
                                  
                                  {offer.mode === 'manual' && (
                                    <div className="space-y-3">
                                      <div className="flex justify-between items-end">
                                        <label className="block text-[10px] font-bold text-gray-400 uppercase">Select Products (Max 2)</label>
                                        <div className="flex gap-2">
                                          <select 
                                            value={offerSort}
                                            onChange={(e) => setOfferSort(e.target.value as any)}
                                            className="text-[10px] border rounded px-1 py-0.5 bg-gray-50 outline-none"
                                          >
                                            <option value="reviews">Most Bought</option>
                                            <option value="rating">Top Rated</option>
                                            <option value="price">Price</option>
                                          </select>
                                          <div className="relative">
                                            <Search size={10} className="absolute left-1.5 top-1/2 -translate-y-1/2 text-gray-400" />
                                            <input 
                                              type="text" 
                                              placeholder="Search..." 
                                              value={offerSearch}
                                              onChange={(e) => setOfferSearch(e.target.value)}
                                              className="text-[10px] border rounded pl-4 pr-1 py-0.5 w-24 outline-none focus:ring-1 focus:ring-daraz-orange"
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-gray-50 rounded border border-gray-100">
                                        {products
                                          .filter(p => p.name.toLowerCase().includes(offerSearch.toLowerCase()))
                                          .sort((a, b) => {
                                            if (offerSort === 'reviews') return b.reviews - a.reviews;
                                            if (offerSort === 'rating') return b.rating - a.rating;
                                            return b.price - a.price;
                                          })
                                          .map(p => {
                                            const isSelected = offer.productIds.includes(p.id);
                                            return (
                                              <button
                                                key={p.id}
                                                onClick={() => {
                                                  const newOffers = [...(siteConfig.premiumOffers || [])];
                                                  const currentIds = [...offer.productIds];
                                                  if (isSelected) {
                                                    newOffers[idx] = { ...offer, productIds: currentIds.filter(id => id !== p.id) };
                                                  } else if (currentIds.length < 2) {
                                                    newOffers[idx] = { ...offer, productIds: [...currentIds, p.id] };
                                                  }
                                                  setSiteConfig({ ...siteConfig, premiumOffers: newOffers });
                                                }}
                                                className={`flex flex-col p-1.5 rounded-lg border transition-all text-left relative group ${
                                                  isSelected 
                                                    ? 'bg-orange-50 border-daraz-orange ring-1 ring-daraz-orange' 
                                                    : 'bg-white border-gray-200 hover:border-daraz-orange'
                                                }`}
                                              >
                                                <div className="aspect-square rounded overflow-hidden mb-1 bg-gray-100">
                                                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                                </div>
                                                <div className="text-[9px] font-bold text-gray-800 line-clamp-1">{p.name}</div>
                                                <div className="flex justify-between items-center mt-0.5">
                                                  <span className="text-[8px] font-black text-daraz-orange">৳{p.price}</span>
                                                  <div className="flex items-center gap-0.5 text-[7px] text-gray-400">
                                                    <Star size={6} className="fill-yellow-400 text-yellow-400" />
                                                    <span>{p.rating}</span>
                                                  </div>
                                                </div>
                                                {isSelected && (
                                                  <div className="absolute top-1 right-1 bg-daraz-orange text-white rounded-full p-0.5 shadow-sm">
                                                    <Check size={8} strokeWidth={4} />
                                                  </div>
                                                )}
                                              </button>
                                            );
                                          })}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {offer.mode === 'auto' && (
                                    <div className="p-2 bg-orange-50 rounded border border-orange-100 text-[10px] text-daraz-orange italic">
                                      Auto-mode active: Products are selected based on the box category.
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl col-span-1 md:col-span-2">
                      <button 
                        onClick={() => setIsFooterSettingsOpen(!isFooterSettingsOpen)}
                        className="w-full flex justify-between items-center group"
                      >
                        <h3 className="font-bold flex items-center gap-2 text-lg">
                          <Layout size={20} className="text-daraz-orange" />
                          Footer Settings
                        </h3>
                        <ChevronDown 
                          size={24} 
                          className={`text-gray-400 group-hover:text-daraz-orange transition-transform duration-300 ${isFooterSettingsOpen ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      <AnimatePresence>
                        {isFooterSettingsOpen && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 pt-6 border-t border-gray-200">
                              {siteConfig.footerSections?.map((section, sIdx) => (
                                <div key={sIdx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                                  <div className="flex justify-between items-center mb-3">
                                    <input 
                                      type="text" 
                                      value={section.title}
                                      onChange={(e) => {
                                        const newSections = [...siteConfig.footerSections];
                                        newSections[sIdx].title = e.target.value;
                                        setSiteConfig({...siteConfig, footerSections: newSections});
                                      }}
                                      className="font-bold text-sm text-daraz-orange uppercase outline-none focus:ring-1 focus:ring-daraz-orange rounded px-1 w-full bg-orange-50/50"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    {section.links.map((link, lIdx) => (
                                      <div key={lIdx} className="flex gap-1 items-center">
                                        <input 
                                          type="text" 
                                          value={link.label}
                                          onChange={(e) => {
                                            const newSections = [...siteConfig.footerSections];
                                            newSections[sIdx].links[lIdx].label = e.target.value;
                                            setSiteConfig({...siteConfig, footerSections: newSections});
                                          }}
                                          className="text-xs border rounded p-1.5 w-full outline-none focus:ring-1 focus:ring-daraz-orange bg-gray-50/50"
                                          placeholder="Label"
                                        />
                                        <button 
                                          onClick={() => {
                                            const newSections = [...siteConfig.footerSections];
                                            newSections[sIdx].links.splice(lIdx, 1);
                                            setSiteConfig({...siteConfig, footerSections: newSections});
                                          }}
                                          className="text-red-400 hover:text-red-600 p-1"
                                        >
                                          <X size={14} />
                                        </button>
                                      </div>
                                    ))}
                                    <button 
                                      onClick={() => {
                                        const newSections = [...siteConfig.footerSections];
                                        newSections[sIdx].links.push({ label: 'New Link', url: '#' });
                                        setSiteConfig({...siteConfig, footerSections: newSections});
                                      }}
                                      className="text-[10px] font-bold text-daraz-orange hover:underline flex items-center gap-1 mt-3 px-1"
                                    >
                                      <Plus size={10} /> Add Link
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="font-bold mb-4 flex items-center gap-2">
                        <Plus size={18} />
                        Quick Actions
                      </h3>
                      <button 
                        onClick={() => setIsAddingProduct(true)}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Plus size={20} />
                        নতুন প্রোডাক্ট যোগ করুন
                      </button>
                    </div>
                  </div>

                  {/* Product Management */}
                  <div>
                    <h3 className="font-bold mb-4">Manage Products ({products.length})</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-3 text-sm font-bold">Image</th>
                            <th className="p-3 text-sm font-bold">Name</th>
                            <th className="p-3 text-sm font-bold">Price</th>
                            <th className="p-3 text-sm font-bold">Category</th>
                            <th className="p-3 text-sm font-bold">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map(p => (
                            <tr key={p.id} className="border-b hover:bg-gray-50">
                              <td className="p-3">
                                <img src={p.image} alt="" className="w-10 h-10 rounded object-cover" referrerPolicy="no-referrer" />
                              </td>
                              <td className="p-3 text-sm font-medium">{p.name}</td>
                              <td className="p-3 text-sm">৳{p.price}</td>
                              <td className="p-3 text-sm">{p.category}</td>
                              <td className="p-3">
                                <div className="flex gap-2">
                                  <button 
                                    onClick={() => setEditingProduct(p)}
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                                  >
                                    <Edit2 size={16} />
                                  </button>
                                  <button 
                                    onClick={() => deleteProduct(p.id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[70] p-4">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            >
              <button 
                onClick={() => setIsAuthModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black glow-button"
              >
                <X size={24} />
              </button>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-daraz-orange mb-2">
                  {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
                </h2>
                <p className="text-gray-500 text-sm">
                  {authMode === 'login' ? 'Login to access your profile and orders.' : 'Join ATL Shop for a better shopping experience.'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <input 
                      name="name" 
                      type="text" 
                      required 
                      placeholder="Enter your name"
                      className="w-full border-2 border-gray-100 rounded-lg py-3 px-4 focus:border-daraz-orange outline-none transition-colors"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email or Phone Number</label>
                  <input 
                    name="email" 
                    type="text" 
                    required 
                    placeholder="Enter your email or phone number"
                    className="w-full border-2 border-gray-100 rounded-lg py-3 px-4 focus:border-daraz-orange outline-none transition-colors"
                  />
                </div>

                {error && <p className="text-red-500 text-xs text-center">{error}</p>}

                <button 
                  type="submit"
                  className="w-full bg-daraz-orange text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-daraz-orange/20"
                >
                  {authMode === 'login' ? 'Login' : 'Sign Up'}
                </button>
              </form>

              <div className="mt-6 text-center text-sm text-gray-500">
                {authMode === 'login' ? (
                  <p>Don't have an account? <span onClick={() => toggleAuthMode('signup')} className="text-daraz-orange font-bold cursor-pointer hover:underline">Sign Up</span></p>
                ) : (
                  <p>Already have an account? <span onClick={() => toggleAuthMode('login')} className="text-daraz-orange font-bold cursor-pointer hover:underline">Login</span></p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Page Overlay */}
      <AnimatePresence>
        {isProfileOpen && currentUser && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-gray-50 z-[80] overflow-y-auto"
          >
            <div className="bg-white shadow-sm sticky top-0 z-10">
              <div className="daraz-container py-4 flex items-center gap-4">
                <button 
                  onClick={() => setIsProfileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors glow-button"
                >
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <h1 className="text-xl font-bold">My Profile</h1>
              </div>
            </div>

            <div className="daraz-container py-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Info Card */}
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <div className="relative inline-block mb-4 group">
                      <img 
                        src={currentUser.avatar} 
                        alt={currentUser.name} 
                        className="w-32 h-32 rounded-full border-4 border-daraz-orange/10 p-1 object-cover"
                      />
                      <label className="absolute bottom-0 right-0 bg-daraz-orange text-white p-2 rounded-full shadow-lg border-2 border-white cursor-pointer hover:bg-orange-700 transition-colors">
                        <Camera size={16} />
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                updateUserProfile({ avatar: reader.result as string });
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                    </div>
                    
                    {isEditingName ? (
                      <div className="flex items-center gap-2 mb-4">
                        <input 
                          type="text" 
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="flex-1 border-2 border-daraz-orange rounded-lg px-3 py-2 outline-none"
                          autoFocus
                        />
                        <button 
                          onClick={() => {
                            updateUserProfile({ name: tempName });
                            setIsEditingName(false);
                          }}
                          className="bg-daraz-orange text-white p-2 rounded-lg"
                        >
                          <Check size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <h2 className="text-2xl font-bold">{currentUser.name}</h2>
                        <button 
                          onClick={() => {
                            setTempName(currentUser.name);
                            setIsEditingName(true);
                          }}
                          className="text-gray-400 hover:text-daraz-orange"
                        >
                          <Edit2 size={16} />
                        </button>
                      </div>
                    )}
                    
                    <p className="text-gray-500 text-sm mb-6">{currentUser.email}</p>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full border-2 border-red-500 text-red-500 py-3 rounded-xl font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-6">
                    <h3 className="font-bold mb-4 flex items-center gap-2">
                      <UserCircle size={18} className="text-daraz-orange" />
                      Account Details
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-medium">{currentUser.phone || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500">Address</span>
                        <span className="font-medium">{currentUser.address || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500">Member Since</span>
                        <span className="font-medium">
                          {currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'March 2026'}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-50">
                        <span className="text-gray-500">Account Age</span>
                        <span className="font-medium">{getAccountAge(currentUser.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Activity Section */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                      <div className="w-12 h-12 bg-orange-50 text-daraz-orange rounded-full flex items-center justify-center mx-auto mb-3">
                        <ShoppingBag size={24} />
                      </div>
                      <div className="text-2xl font-bold">{currentUser.totalOrders || 0}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Orders</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                      <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CreditCard size={24} />
                      </div>
                      <div className="text-xl font-bold">৳{currentUser.totalSpent || 0}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total Spent</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ShoppingCart size={24} />
                      </div>
                      <div className="text-2xl font-bold">{cart.length}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">In Cart</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                      <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <PackageCheck size={24} />
                      </div>
                      <div className="text-2xl font-bold">{currentUser.receivedOrders || 0}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Received</div>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm text-center">
                      <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <PackageX size={24} />
                      </div>
                      <div className="text-2xl font-bold">{currentUser.cancelledOrders || 0}</div>
                      <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Cancelled</div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm p-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold">Recent Orders</h3>
                      <button className="text-daraz-orange text-sm font-bold hover:underline">View All</button>
                    </div>
                    {(currentUser.totalOrders || 0) === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <ShoppingBag size={48} className="mx-auto mb-4 opacity-20" />
                        <p>You haven't placed any orders yet.</p>
                        <button 
                          onClick={() => setIsProfileOpen(false)}
                          className="mt-4 bg-daraz-orange text-white px-6 py-2 rounded-full font-bold hover:bg-orange-700 transition-colors"
                        >
                          Start Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-500 italic text-center py-4">Order history is currently being processed...</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Product Edit Modal */}
      {(editingProduct || isAddingProduct) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">
                {isAddingProduct ? 'নতুন প্রোডাক্ট যোগ করুন' : 'প্রোডাক্ট এডিট করুন'}
              </h3>
              <button 
                className="glow-button p-2 hover:bg-gray-100 rounded-full transition-colors"
                onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
              >
                <X size={24} />
              </button>
            </div>
            
            <form className="space-y-4" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const productData: Product = {
                id: editingProduct?.id || Math.random().toString(36).substr(2, 9),
                name: formData.get('name') as string,
                price: Number(formData.get('price')),
                originalPrice: Number(formData.get('originalPrice')),
                image: imagePreview || (formData.get('image') as string) || 'https://picsum.photos/seed/new/300/300',
                category: formData.get('category') as string,
                description: formData.get('description') as string,
                rating: editingProduct?.rating || 4.5,
                reviews: editingProduct?.reviews || 0,
                colors: (formData.get('colors') as string)?.split(',').map(s => s.trim()).filter(Boolean),
                sizes: (formData.get('sizes') as string)?.split(',').map(s => s.trim()).filter(Boolean),
                stock: Number(formData.get('stock')) || 0
              };
              saveProduct(productData);
              setImagePreview(null);
            }}>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Name</label>
                <input name="name" defaultValue={editingProduct?.name} required className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">প্রোডাক্ট ডেসক্রিপশন (Product Description)</label>
                <textarea 
                  name="description" 
                  defaultValue={editingProduct?.description} 
                  rows={6}
                  className="w-full border rounded p-2 text-sm focus:ring-1 focus:ring-daraz-orange outline-none"
                  placeholder="প্রোডাক্ট সম্পর্কে বিস্তারিত লিখুন... (আপনি চাইলে এখানে Markdown ব্যবহার করতে পারেন)"
                />
                <p className="text-[10px] text-gray-400 mt-1">* আপনি এখানে বুলেট পয়েন্ট বা বোল্ড টেক্সট ব্যবহার করতে পারেন।</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Price (৳)</label>
                  <input name="price" type="number" defaultValue={editingProduct?.price} required className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Original Price (৳)</label>
                  <input name="originalPrice" type="number" defaultValue={editingProduct?.originalPrice} className="w-full border rounded p-2" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Category</label>
                <select name="category" defaultValue={editingProduct?.category} className="w-full border rounded p-2">
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Colors (comma separated)</label>
                  <input name="colors" defaultValue={editingProduct?.colors?.join(', ')} placeholder="Red, Blue, Green" className="w-full border rounded p-2" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Sizes (comma separated)</label>
                  <input name="sizes" defaultValue={editingProduct?.sizes?.join(', ')} placeholder="S, M, L, XL" className="w-full border rounded p-2" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Stock Quantity</label>
                <input name="stock" type="number" defaultValue={editingProduct?.stock} placeholder="Available pieces" className="w-full border rounded p-2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Product Image</label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded border" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-daraz-orange file:text-white hover:file:bg-orange-700 cursor-pointer"
                  />
                </div>
                <div className="mt-2">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Or Image URL</label>
                  <input 
                    name="image" 
                    defaultValue={editingProduct?.image} 
                    onChange={(e) => setImagePreview(e.target.value)}
                    className="w-full border rounded p-2 text-sm" 
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-daraz-orange text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition-colors"
              >
                সেভ করুন
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
