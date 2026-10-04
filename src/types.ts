export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  reviewCount: number;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  image: string;
  thumbnails: string[];
  description: string;
  material: string;
  color: string;
  length: string;
  blouseDetails: string;
  careInstructions: string;
  stock: number;
  sku: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  instructions?: string;
}

export interface Order {
  orderId: string;
  date: string;
  customer: CustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  total: number;
  paymentMethod: 'UPI' | 'COD' | 'Card';
  paymentStatus: 'Paid' | 'Pending COD';
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  verified: boolean;
  date: string;
  location: string;
  sareePurchased?: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  value: number;
  minOrder: number;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export type PageView =
  | 'home'
  | 'shop'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'about'
  | 'contact'
  | 'login'
  | 'admin'
  | 'wishlist'
  | 'order-success';

export interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}
