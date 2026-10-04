import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Product,
  CartItem,
  Order,
  Coupon,
  PageView,
  Toast,
  CustomerInfo,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  AVAILABLE_COUPONS,
} from '../data/products';

interface AppContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartGrandTotal: number;
  cartCount: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: Order[];
  placeOrder: (customer: CustomerInfo, paymentMethod: 'UPI' | 'COD' | 'Card') => Order;
  updateOrderStatus: (orderId: string, status: Order['orderStatus']) => void;
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  selectedProductId: string | null;
  openProductDetails: (productId: string) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  user: { name: string; email: string; phone?: string; role?: 'customer' | 'admin' } | null;
  login: (email: string, name?: string, role?: 'customer' | 'admin') => void;
  logout: () => void;
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  latestOrder: Order | null;
  availableCoupons: Coupon[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_PRODUCTS = 'azhagu_mayil_products_v1';
const LOCAL_STORAGE_CART = 'azhagu_mayil_cart_v1';
const LOCAL_STORAGE_WISHLIST = 'azhagu_mayil_wishlist_v1';
const LOCAL_STORAGE_ORDERS = 'azhagu_mayil_orders_v1';
const LOCAL_STORAGE_USER = 'azhagu_mayil_user_v1';

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // User
  const [user, setUser] = useState<{ name: string; email: string; phone?: string; role?: 'customer' | 'admin' } | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // UI state
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Shop filter state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000]);
  const [sortBy, setSortBy] = useState('featured');

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products to localStorage', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders to localStorage', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER);
      }
    } catch (e) {
      console.warn('Failed to save user to localStorage', e);
    }
  }, [user]);

  // Toast notifications
  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    addToast(`Added "${product.name}" to your cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => i.product.id === productId);
      if (item) {
        addToast(`Removed "${item.product.name}" from cart`, 'info');
      }
      return prev.filter((i) => i.product.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let cartDiscount = 0;
  if (appliedCoupon && cartSubtotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'percentage') {
      cartDiscount = Math.round((cartSubtotal * appliedCoupon.value) / 100);
    } else {
      cartDiscount = appliedCoupon.value;
    }
  }

  // Free shipping above ₹1,999; ₹150 otherwise
  const cartShipping = cartSubtotal === 0 || cartSubtotal >= 1999 ? 0 : 150;
  const cartGrandTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    const prodName = product ? product.name : 'Saree';
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast(`Removed "${prodName}" from wishlist`, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast(`Saved "${prodName}" to your wishlist!`, 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Product Detail navigation
  const openProductDetails = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Coupons
  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try MAYIL10 or FESTIVE30.' };
    }
    if (cartSubtotal < found.minOrder) {
      return {
        success: false,
        message: `Coupon ${found.code} requires minimum cart total of ₹${found.minOrder.toLocaleString('en-IN')}`,
      };
    }
    setAppliedCoupon(found);
    addToast(`Coupon "${found.code}" applied! You saved!`, 'success');
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast('Coupon removed', 'info');
  };

  // Orders
  const placeOrder = (
    customer: CustomerInfo,
    paymentMethod: 'UPI' | 'COD' | 'Card'
  ): Order => {
    const orderNumber = `AMC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const newOrder: Order = {
      orderId: orderNumber,
      date: dateStr,
      customer,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      couponCode: appliedCoupon?.code,
      shipping: cartShipping,
      total: cartGrandTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending COD' : 'Paid',
      orderStatus: 'Confirmed',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    clearCart();
    setCurrentView('order-success');
    addToast(`Order ${orderNumber} placed successfully!`, 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['orderStatus']) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.orderId === orderId ? { ...ord, orderStatus: status } : ord))
    );
    addToast(`Order ${orderId} updated to ${status}`);
  };

  // Product management for Admin
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const newId = `prod-${Date.now()}`;
    const productWithId: Product = {
      ...newProd,
      id: newId,
    };
    setProducts((prev) => [productWithId, ...prev]);
    addToast(`Product "${productWithId.name}" added to catalog`);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Product updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from catalog', 'warning');
  };

  // Auth
  const login = (email: string, name = 'Valued Customer', role: 'customer' | 'admin' = 'customer') => {
    const loggedUser = {
      email,
      name: role === 'admin' ? 'Store Administrator' : name,
      role,
    };
    setUser(loggedUser);
    setIsAuthOpen(false);
    addToast(`Welcome back, ${loggedUser.name}!`);
  };

  const logout = () => {
    setUser(null);
    addToast('You have been logged out', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartGrandTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        updateOrderStatus,
        currentView,
        setCurrentView,
        selectedProductId,
        openProductDetails,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        user,
        login,
        logout,
        toasts,
        addToast,
        removeToast,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        priceRange,
        setPriceRange,
        sortBy,
        setSortBy,
        latestOrder,
        availableCoupons: AVAILABLE_COUPONS,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
