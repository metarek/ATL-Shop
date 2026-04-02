export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  avatar?: string;
  password?: string;
  createdAt?: string;
  totalOrders?: number;
  totalSpent?: number;
  receivedOrders?: number;
  cancelledOrders?: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
  colors?: string[];
  sizes?: string[];
  stock?: number;
  discount?: number;
}

export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface PremiumOffer {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  productIds: string[];
  mode: 'auto' | 'manual';
}

export interface SiteConfig {
  siteName: string;
  heroBanner: string;
  heroBanners?: string[];
  heroBannerType: 'image' | 'video';
  primaryColor: string;
  footerSections: FooterSection[];
  premiumOffers?: PremiumOffer[];
  paymentNumber?: string;
  deliveryFeeInside?: number;
  deliveryFeeOutside?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  userAddress: string;
  items: CartItem[];
  totalAmount: number;
  deliveryFee: number;
  paymentMethod: 'bkash' | 'nagad' | 'cod';
  transactionId?: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}
