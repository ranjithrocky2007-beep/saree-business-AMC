import React, { useState } from 'react';
import {
  Package,
  ShoppingBag,
  Users,
  DollarSign,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  Clock,
  Eye,
  X,
  ShieldCheck,
  ChevronDown,
  ArrowLeft,
  Percent,
  MessageSquare,
  Settings,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Order } from '../types';
import { CATEGORIES } from '../data/products';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    setCurrentView,
    addToast,
    availableCoupons,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'products' | 'add-product' | 'orders' | 'customers' | 'coupons' | 'settings'
  >('dashboard');

  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New product form state
  const [newProd, setNewProd] = useState<Omit<Product, 'id'>>({
    sku: `AMC-NEW-${Math.floor(100 + Math.random() * 900)}`,
    name: '',
    category: 'Kanchipuram Silk Sarees',
    categorySlug: 'kanchipuram-silk',
    price: 3499,
    originalPrice: 4999,
    discountPercent: 30,
    rating: 5.0,
    reviewCount: 1,
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    image: products[0]?.image || '',
    thumbnails: [products[0]?.image || ''],
    description: '',
    material: 'Pure Mulberry Silk with Tested Zari',
    color: 'Royal Maroon & Gold',
    length: '6.3 Meters (including blouse piece)',
    blouseDetails: 'Unstitched matching silk blouse piece (0.8m)',
    careInstructions: 'Dry clean only. Preserve in cotton muslin bag.',
    stock: 10,
  });

const handleImageUpload = (
  file: File,
  onLoaded: (imageData: string) => void
) => {
  if (!file.type.startsWith('image/')) {
    addToast('Please select a valid image file.', 'warning');
    return;
  }

  // Avoid oversized images in localStorage
  if (file.size > 1024 * 1024) {
    addToast('Please choose an image under 1 MB.', 'warning');
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result === 'string') {
      onLoaded(reader.result);
    }
  };

  reader.onerror = () => {
    addToast('Unable to read the selected image.', 'warning');
  };

  reader.readAsDataURL(file);
};


  // Derived statistics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  // unique customers
  const uniqueCustomers = Array.from(new Set(orders.map((o) => o.customer.email))).length + 28;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price) {
      addToast('Please provide saree title and price', 'warning');
      return;
    }
    addProduct(newProd);
    setActiveTab('products');
    setNewProd({
      sku: `AMC-NEW-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      category: 'Kanchipuram Silk Sarees',
      categorySlug: 'kanchipuram-silk',
      price: 3499,
      originalPrice: 4999,
      discountPercent: 30,
      rating: 5.0,
      reviewCount: 1,
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: false,
      image: products[0]?.image || '',
      thumbnails: [products[0]?.image || ''],
      description: '',
      material: 'Pure Mulberry Silk with Tested Zari',
      color: 'Royal Maroon & Gold',
      length: '6.3 Meters (including blouse piece)',
      blouseDetails: 'Unstitched matching silk blouse piece (0.8m)',
      careInstructions: 'Dry clean only.',
      stock: 10,
    });
  };

  const handleSaveEditProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    updateProduct(editingProduct.id, editingProduct);
    setEditingProduct(null);
  };

  const filteredAdminProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredAdminOrders = orders.filter(
    (o) =>
      o.orderId.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.fullName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      o.customer.phone.includes(orderSearch)
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-white p-5 rounded-2xl border border-[#E8DFC8] shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#500B1A] text-[#F3E5AB] border border-[#D4AF37] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="font-serif-luxury font-bold text-2xl text-[#380510]">
                Azhagu Mayil Merchant Admin
              </h1>
              <p className="text-xs text-gray-500">
                Catalog & Order Management Console · Live Store State
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setCurrentView('home')}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF7F2] hover:bg-[#F5EFE6] text-[#500B1A] border border-[#D4AF37]/50 text-xs font-semibold transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37]" />
            <span>Return to Storefront</span>
          </button>
        </div>

        {/* Tab Navigation Menu */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 border-b border-[#E8DFC8]">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Package },
            { id: 'products', label: 'All Products', icon: Package },
            { id: 'add-product', label: '+ Add Saree', icon: Plus },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'coupons', label: 'Coupons', icon: Percent },
            { id: 'settings', label: 'Store Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#500B1A] text-[#F3E5AB] shadow-sm'
                    : 'bg-white text-gray-600 hover:text-gray-900 border border-[#E8DFC8]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Revenue</span>
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    ₹
                  </div>
                </div>
                <h3 className="font-mono font-bold text-2xl text-[#380510]">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </h3>
                <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                  +18.4% festive growth vs last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Orders</span>
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-mono font-bold text-2xl text-[#380510]">
                  {totalOrders}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">
                  All domestic & international orders
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Catalog Products</span>
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Package className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-mono font-bold text-2xl text-[#380510]">
                  {totalProducts}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">
                  Active handloom & bridal listings
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-[#E8DFC8] shadow-xs">
                <div className="flex items-center justify-between text-gray-500 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider">Total Customers</span>
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <h3 className="font-mono font-bold text-2xl text-[#380510]">
                  {uniqueCustomers}
                </h3>
                <p className="text-[11px] text-gray-500 mt-1">
                  Verified patron accounts
                </p>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-4 mb-4">
                <h2 className="font-serif-luxury font-bold text-lg text-[#380510]">
                  Recent Orders
                </h2>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className="text-xs font-semibold text-[#500B1A] hover:underline"
                >
                  View All Orders →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E8DFC8] text-gray-500 font-semibold uppercase tracking-wider">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFC8]">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.orderId} className="hover:bg-[#FAF7F2]">
                        <td className="py-3 font-mono font-bold text-[#500B1A]">
                          {order.orderId}
                        </td>
                        <td className="py-3">
                          <p className="font-semibold text-gray-800">{order.customer.fullName}</p>
                          <p className="text-[11px] text-gray-500">{order.customer.city}</p>
                        </td>
                        <td className="py-3 text-gray-600">{order.date}</td>
                        <td className="py-3 font-mono font-bold text-gray-900">
                          ₹{order.total.toLocaleString('en-IN')}
                        </td>
                        <td className="py-3">
                          <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                            {order.paymentMethod} · {order.paymentStatus}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              order.orderStatus === 'Delivered'
                                ? 'bg-emerald-100 text-emerald-800'
                                : order.orderStatus === 'Shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 text-[#500B1A] hover:bg-[#FAF7F2] rounded-lg"
                            title="View order details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E8DFC8]">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search sarees by name, SKU or category..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('add-product')}
                className="px-4 py-2.5 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Saree</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E8DFC8] text-gray-600 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Saree</th>
                      <th className="p-3.5">Category</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Stock</th>
                      <th className="p-3.5">Rating</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFC8]">
                    {filteredAdminProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-[#FAF7F2]/50">
                        <td className="p-3.5 flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="w-12 h-14 object-cover rounded-md bg-[#FAF7F2] shrink-0"
                          />
                          <div>
                            <p className="font-serif-luxury font-bold text-sm text-[#380510]">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-gray-500 font-mono">
                              SKU: {prod.sku}
                            </p>
                          </div>
                        </td>
                        <td className="p-3.5 text-gray-700">{prod.category}</td>
                        <td className="p-3.5">
                          <span className="font-mono font-bold text-gray-900">
                            ₹{prod.price.toLocaleString('en-IN')}
                          </span>
                          <span className="block text-[10px] text-gray-400 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              prod.stock > 5
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {prod.stock} in stock
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-amber-600">
                            {prod.rating.toFixed(1)}★ ({prod.reviewCount})
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(prod)}
                            className="p-1.5 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProduct(prod.id)}
                            className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADD NEW PRODUCT FORM */}
        {activeTab === 'add-product' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#E8DFC8] shadow-xs max-w-3xl mx-auto">
            <h2 className="font-serif-luxury font-bold text-2xl text-[#380510] mb-1">
              Add New Saree to Catalog
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Create a new handcrafted listing with pricing, zari specifications, and stock details.
            </p>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>

<div>
  <label className="block font-semibold text-gray-700 mb-2">
    Saree Photo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, (imageData) => {
          setNewProd((prev) => ({
            ...prev,
            image: imageData,
            thumbnails: [imageData],
          }));
        });
      }
      e.currentTarget.value = '';
    }}
    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
  />

  {newProd.image && (
    <img
      src={newProd.image}
      alt="Saree preview"
      className="mt-3 w-32 h-40 object-cover rounded-xl border border-[#D4AF37]"
    />
  )}
</div>

                  <label className="block font-semibold text-gray-700 mb-1">Saree Name *</label>
                  <input
                    type="text"
                    required
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    placeholder="e.g. Temple Korvai Kanchipuram Silk Saree"
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Category *</label>
                  <select
                    value={newProd.categorySlug}
                    onChange={(e) => {
                      const cat = CATEGORIES.find((c) => c.slug === e.target.value);
                      setNewProd({
                        ...newProd,
                        categorySlug: e.target.value,
                        category: cat ? cat.name : 'Kanchipuram Silk Sarees',
                      });
                    }}
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl focus:outline-none focus:border-[#D4AF37] bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.price}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        price: parseInt(e.target.value) || 0,
                        discountPercent: Math.round(
                          ((newProd.originalPrice - (parseInt(e.target.value) || 0)) /
                            newProd.originalPrice) *
                            100
                        ),
                      })
                    }
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Original Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={newProd.originalPrice}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        originalPrice: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={newProd.stock}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        stock: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Fabric & Zari Material</label>
                  <input
                    type="text"
                    value={newProd.material}
                    onChange={(e) => setNewProd({ ...newProd, material: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Color Palette</label>
                  <input
                    type="text"
                    value={newProd.color}
                    onChange={(e) => setNewProd({ ...newProd, color: e.target.value })}
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  value={newProd.description}
                  onChange={(e) => setNewProd({ ...newProd, description: e.target.value })}
                  placeholder="Describe the weaving technique, pallu motifs, and border design..."
                  className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.isFeatured}
                    onChange={(e) => setNewProd({ ...newProd, isFeatured: e.target.checked })}
                    className="accent-[#500B1A]"
                  />
                  <span>Feature on Homepage</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProd.isNewArrival}
                    onChange={(e) => setNewProd({ ...newProd, isNewArrival: e.target.checked })}
                    className="accent-[#500B1A]"
                  />
                  <span>Mark as New Arrival</span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#F0E6D2]">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500B1A] hover:bg-[#3C133A] text-[#F3E5AB] font-bold uppercase tracking-wider"
                >
                  Save Saree to Catalog
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-[#E8DFC8] flex items-center justify-between">
              <div className="relative max-w-md w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search orders by Order ID, customer name or phone..."
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DFC8] focus:outline-none"
                />
              </div>
              <span className="text-xs text-gray-500 font-medium">
                Total Orders: {orders.length}
              </span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E8DFC8] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF7F2] border-b border-[#E8DFC8] text-gray-600 font-semibold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Order ID</th>
                      <th className="p-3.5">Customer Details</th>
                      <th className="p-3.5">Date</th>
                      <th className="p-3.5">Amount</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Status Update</th>
                      <th className="p-3.5 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8DFC8]">
                    {filteredAdminOrders.map((order) => (
                      <tr key={order.orderId} className="hover:bg-[#FAF7F2]/50">
                        <td className="p-3.5 font-mono font-bold text-[#500B1A]">
                          {order.orderId}
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-gray-900">{order.customer.fullName}</p>
                          <p className="text-[11px] text-gray-500">{order.customer.phone}</p>
                          <p className="text-[11px] text-gray-500">{order.customer.city}, {order.customer.state}</p>
                        </td>
                        <td className="p-3.5 text-gray-600">{order.date}</td>
                        <td className="p-3.5 font-mono font-bold text-[#380510]">
                          ₹{order.total.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5">
                          <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                            {order.paymentMethod} ({order.paymentStatus})
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={order.orderStatus}
                            onChange={(e) =>
                              updateOrderStatus(order.orderId, e.target.value as any)
                            }
                            className="bg-white border border-[#E8DFC8] rounded-lg px-2 py-1 text-xs font-semibold text-gray-800 cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="p-1.5 text-[#500B1A] hover:bg-[#FAF7F2] rounded-lg"
                            title="View order summary"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMERS */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 shadow-xs space-y-4">
            <h2 className="font-serif-luxury font-bold text-xl text-[#380510]">
              Customer Directory ({uniqueCustomers})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {orders.map((ord) => (
                <div key={ord.orderId} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFC8] text-xs space-y-1">
                  <p className="font-bold text-[#380510] text-sm">{ord.customer.fullName}</p>
                  <p className="text-gray-600">{ord.customer.email}</p>
                  <p className="text-gray-600 font-mono">{ord.customer.phone}</p>
                  <p className="text-gray-500 pt-1">
                    {ord.customer.city}, {ord.customer.state} ({ord.customer.pincode})
                  </p>
                  <p className="text-[11px] font-semibold text-[#500B1A] pt-1">
                    Last Order: {ord.orderId} (₹{ord.total.toLocaleString('en-IN')})
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: COUPONS */}
        {activeTab === 'coupons' && (
          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-3">
              <div>
                <h2 className="font-serif-luxury font-bold text-xl text-[#380510]">
                  Active Festive Coupons
                </h2>
                <p className="text-xs text-gray-500">Configured promotional discount codes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {availableCoupons.map((c) => (
                <div key={c.code} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D4AF37]/50 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-lg text-[#500B1A]">{c.code}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#422026] mt-2 font-medium">{c.description}</p>
                  <div className="mt-3 pt-2 border-t border-[#E8DFC8] flex items-center justify-between text-[11px] text-gray-600">
                    <span>Min Order: ₹{c.minOrder.toLocaleString('en-IN')}</span>
                    <span>
                      {c.discountType === 'percentage' ? `${c.value}% Off` : `₹${c.value} Off`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-[#E8DFC8] p-6 sm:p-8 shadow-xs max-w-2xl mx-auto space-y-5 text-xs">
            <h2 className="font-serif-luxury font-bold text-2xl text-[#380510]">
              Store & Boutique Profile
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Business Name</label>
                <input
                  type="text"
                  readOnly
                  value="Azhagu Mayil Collection"
                  className="w-full px-3 py-2 bg-gray-50 border border-[#E8DFC8] rounded-xl font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Currency Standard</label>
                <input
                  type="text"
                  readOnly
                  value="Indian Rupee (INR - ₹)"
                  className="w-full px-3 py-2 bg-gray-50 border border-[#E8DFC8] rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Free Shipping Threshold</label>
                <input
                  type="text"
                  readOnly
                  value="₹1,999 (Orders below this incur flat ₹150 courier charge)"
                  className="w-full px-3 py-2 bg-gray-50 border border-[#E8DFC8] rounded-xl"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Flagship Address</label>
                <textarea
                  readOnly
                  rows={2}
                  value="No. 48, Panagal Park Commercial Square, T. Nagar, Chennai - 600017, Tamil Nadu, India"
                  className="w-full px-3 py-2 bg-gray-50 border border-[#E8DFC8] rounded-xl"
                />
              </div>
            </div>
          </div>
        )}

        {/* ORDER DETAILS MODAL */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setSelectedOrder(null)}
            />
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D4AF37] max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-3 mb-4">
                <div>
                  <h3 className="font-serif-luxury font-bold text-lg text-[#380510]">
                    Order {selectedOrder.orderId}
                  </h3>
                  <span className="text-[11px] text-gray-500">Date: {selectedOrder.date}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Customer Information */}
                <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DFC8]">
                  <p className="font-bold text-[#380510] text-sm">{selectedOrder.customer.fullName}</p>
                  <p className="text-gray-600 font-mono">{selectedOrder.customer.phone} · {selectedOrder.customer.email}</p>
                  <p className="text-gray-600 mt-1">
                    {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state} - {selectedOrder.customer.pincode}
                  </p>
                </div>

                {/* Items */}
                <div className="space-y-2 border border-[#E8DFC8] rounded-xl p-3">
                  <p className="font-bold text-[#380510]">Purchased Sarees:</p>
                  {selectedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1.5 border-b border-gray-100 last:border-0">
                      <div>
                        <span className="font-semibold text-gray-800">{it.product.name}</span>
                        <span className="text-gray-500 text-[11px] block">Qty: {it.quantity}</span>
                      </div>
                      <span className="font-mono font-bold text-[#500B1A]">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Financial Summary */}
                <div className="space-y-1.5 pt-2 text-[#422026]">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-mono">₹{selectedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Discount ({selectedOrder.couponCode}):</span>
                      <span className="font-mono">-₹{selectedOrder.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-sm text-[#380510] pt-1 border-t border-[#F0E6D2]">
                    <span>Total Amount:</span>
                    <span className="font-mono text-base text-[#500B1A]">₹{selectedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                  <span>Payment: <strong>{selectedOrder.paymentMethod}</strong> ({selectedOrder.paymentStatus})</span>
                  <span>Status: <strong>{selectedOrder.orderStatus}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* EDIT PRODUCT MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
              onClick={() => setEditingProduct(null)}
            />
            <div className="relative bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#D4AF37] max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#F0E6D2] pb-3 mb-4">
                <h3 className="font-serif-luxury font-bold text-lg text-[#380510]">
                  Edit Saree Listing
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEditProduct} className="space-y-3.5 text-xs">
                <div>

<div>
  <label className="block font-semibold mb-1">
    Change Saree Photo
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        handleImageUpload(file, (imageData) => {
          setEditingProduct((prev) =>
            prev
              ? {
                  ...prev,
                  image: imageData,
                  thumbnails: [imageData],
                }
              : null
          );
        });
      }
      e.currentTarget.value = '';
    }}
    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
  />

  <img
    src={editingProduct.image}
    alt={editingProduct.name}
    className="mt-3 w-32 h-40 object-cover rounded-xl"
  />
</div>

                  <label className="block font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1">Selling Price (₹)</label>
                    <input
                      type="number"
                      value={editingProduct.price}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          price: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1">Stock</label>
                    <input
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stock: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Material</label>
                  <input
                    type="text"
                    value={editingProduct.material}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, material: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Color</label>
                  <input
                    type="text"
                    value={editingProduct.color}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, color: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-[#E8DFC8] rounded-xl"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2 border-t border-[#F0E6D2]">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 text-gray-600 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#500B1A] text-[#F3E5AB] font-bold rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
