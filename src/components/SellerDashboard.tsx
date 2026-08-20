import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Palette,
  Package,
  Sparkles,
  TrendingUp,
  Plus,
  Send,
  Truck,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  Eye,
  DollarSign
} from 'lucide-react';
import { Product, OrderStatus } from '../types';

export const SellerDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    customRequests,
    submitProposal,
    orders,
    updateOrderStatus,
    navigate,
    formatPrice
  } = useApp();

  const [activeTab, setActiveTab] = useState<'requests' | 'orders' | 'catalog'>('requests');
  const [newProductModalOpen, setNewProductModalOpen] = useState(false);

  // New product form
  const [newTitle, setNewTitle] = useState('');
  const [newPrice, setNewPrice] = useState<number>(65);
  const [newCategory, setNewCategory] = useState('Terracotta & Pottery');
  const [newMaterial, setNewMaterial] = useState('Natural Terracotta Clay');
  const [newRegion, setNewRegion] = useState('Odisha');
  const [newType, setNewType] = useState<'ready-made' | 'customizable'>('ready-made');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtEShfKXlo4SGPJ836pSXo4qIaBkX2NWIHH3hr1bTkUsQhfocKGg26C9iJhiHI2khYCij5tKLjaOgF1TIJVfnU1H7ULFzpi3sFqRr4-YosHE8Wymdp3qHRwHAvMc2oaM8sY7_mjCWwfBaTQzO_gB3UEQMES2NzHfaJ6-Zwp9mJ9N621ByhNkCxRrxVbbQf6fbZ3w5iKyCmsPZE--eh9fZQHqVcdlOtxE4aFWwBEGyOPEEnFz5COK0S'
  );

  // Proposal modal for specific request
  const [selectedReqForQuote, setSelectedReqForQuote] = useState<string | null>(null);
  const [quotePrice, setQuotePrice] = useState<number>(140);
  const [quoteDays, setQuoteDays] = useState<number>(12);
  const [quoteNote, setQuoteNote] = useState('Namaste! We can craft this piece using authentic kiln firing.');

  // Tracking update modal
  const [trackingModalOrderId, setTrackingModalOrderId] = useState<string | null>(null);
  const [trackingNumberInput, setTrackingNumberInput] = useState('IND-POST-8841029');

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingRequestsCount = customRequests.filter((r) => r.status === 'pending_review').length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addProduct({
      title: newTitle.trim(),
      price: Number(newPrice),
      priceInr: Math.round(Number(newPrice) * 83.5),
      artisanName: 'Devika Meher & Studio Guild',
      artisanId: 'artisan-devika',
      artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB66YOI2QN4nM5dgPpvy5XtVL5B8cpD4btoUajpe3n43Sc_Wsd7CIVfPdqew-2G7K8IQvhM-1ZZ8gwf9ONnLRDgWZiIPNFqqXkOf1aUTZ26o_m0C06ejAkXV_18qSjOILRwTlK29S4IgINd6psF5mNFj9hSYS26AW-kgsGIhSQlN1U_J86jTOpNaYHFF0b_MPgT4ieIW2JUcoHC6hT4hd78zz1TXo5wnKMfuKPn37JehR8siJbSsTu',
      artisanTitle: 'Master Weaver & Ceramicist',
      artisanBio: 'Preserving authentic handmade techniques with natural materials and mineral pigments.',
      rating: 5.0,
      reviewCount: 1,
      type: newType,
      category: newCategory,
      material: newMaterial,
      region: newRegion,
      description: newDescription || 'Authentic handmade creation crafted with generational master expertise.',
      specifications: {
        'Material': newMaterial,
        'Origin': `${newRegion}, India`,
        'Craft Process': '100% Handcrafted',
        'Care': 'Handle with artisanal care'
      },
      images: [newImageUrl],
      inStock: true,
      stockCount: 10
    });

    setNewTitle('');
    setNewDescription('');
    setNewProductModalOpen(false);
  };

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReqForQuote) return;

    submitProposal(selectedReqForQuote, {
      sellerId: 'artisan-devika',
      sellerName: 'Devika Meher / Studio Mrittika',
      price: Number(quotePrice),
      estimatedDays: Number(quoteDays),
      artisanNote: quoteNote
    });

    setSelectedReqForQuote(null);
  };

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    if (status === 'dispatched') {
      setTrackingModalOrderId(orderId);
    } else {
      updateOrderStatus(orderId, status);
    }
  };

  const confirmDispatch = () => {
    if (trackingModalOrderId) {
      updateOrderStatus(trackingModalOrderId, 'dispatched', trackingNumberInput);
      setTrackingModalOrderId(null);
    }
  };

  return (
    <main role="main" aria-label="Artisan Seller Studio Dashboard" className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 pb-24 md:pb-16 animate-in fade-in duration-300">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-6 border-b border-[#eae8e4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-[#4b6360] text-white text-xs font-bold uppercase tracking-wider">
              Artisan Studio Portal
            </span>
            <span className="text-xs text-[#8a7268]">Maker Workspace</span>
          </div>
          <h2 className="font-serif-craft text-3xl font-bold text-[#1b1c1a]">
            Studio Mrittika & Devika Meher
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setNewProductModalOpen(true)}
          aria-label="Add new handmade listing to catalog"
          className="bg-[#bd5419] hover:bg-[#9c3d00] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
        >
          <Plus size={16} aria-hidden="true" /> Add New Handmade Listing
        </button>
      </div>

      {/* Overview Metric Stats */}
      <section aria-label="Seller performance statistics" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Gross Sales</span>
          <span className="font-serif-craft text-2xl font-bold text-[#bd5419]">
            {formatPrice(totalSales)}
          </span>
          <span className="text-[10px] text-emerald-700 font-medium block mt-1">
            ↑ 100% Payout Guaranteed
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Custom Commissions</span>
          <span className="font-serif-craft text-2xl font-bold text-[#1b1c1a]">
            {customRequests.length}
          </span>
          <span className="text-[10px] text-[#9c3d00] font-bold block mt-1">
            {pendingRequestsCount} Awaiting Your Proposal
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Active Orders</span>
          <span className="font-serif-craft text-2xl font-bold text-[#1b1c1a]">
            {orders.length}
          </span>
          <span className="text-[10px] text-[#4b6360] font-medium block mt-1">
            In Fulfillment Workflow
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Artisan Rating</span>
          <span className="font-serif-craft text-2xl font-bold text-[#e9c176]">
            5.0 ★
          </span>
          <span className="text-[10px] text-[#8a7268] block mt-1">
            Verified Master Artisan Badge
          </span>
        </div>
      </section>

      {/* Navigation Sub-Tabs */}
      <div role="tablist" aria-label="Studio dashboard views" className="flex gap-2 border-b border-[#dec0b4]/60 mb-8 pb-1">
        <button
          role="tab"
          aria-selected={activeTab === 'requests'}
          aria-controls="panel-seller-requests"
          id="tab-seller-requests"
          onClick={() => setActiveTab('requests')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
            activeTab === 'requests'
              ? 'bg-[#bd5419] text-white shadow-sm'
              : 'text-[#574239] hover:bg-[#efeeea]'
          }`}
        >
          <Sparkles size={14} aria-hidden="true" /> Custom Work Queue ({customRequests.length})
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'orders'}
          aria-controls="panel-seller-orders"
          id="tab-seller-orders"
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
            activeTab === 'orders'
              ? 'bg-[#bd5419] text-white shadow-sm'
              : 'text-[#574239] hover:bg-[#efeeea]'
          }`}
        >
          <Package size={14} aria-hidden="true" /> Order Fulfillment ({orders.length})
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'catalog'}
          aria-controls="panel-seller-catalog"
          id="tab-seller-catalog"
          onClick={() => setActiveTab('catalog')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
            activeTab === 'catalog'
              ? 'bg-[#bd5419] text-white shadow-sm'
              : 'text-[#574239] hover:bg-[#efeeea]'
          }`}
        >
          <Palette size={14} aria-hidden="true" /> Product Catalog ({products.length})
        </button>
      </div>

      {/* Tab 1: Custom Requests Queue */}
      {activeTab === 'requests' && (
        <section id="panel-seller-requests" role="tabpanel" aria-labelledby="tab-seller-requests" className="space-y-4">
          {customRequests.map((req) => (
            <article
              key={req.id}
              aria-label={`Custom commission: ${req.designTitle}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#dec0b4]/40 flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center"
            >
              <div className="flex gap-4 items-start">
                <img
                  src={req.referenceImageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgEJdKjVPoXFZdh2HCBZUaLbFF-YKk89UPW59urLQo2KcSNL7VRtvUK0dBOQOADwOYm3apghk4DO6CxtRqpqW_MtL_pTZ5JFaHIlCahSVK7rMNicW2zdxVbsYUrMcDXqv-VAMd83xSieQ8u7MIxqvXGjb0KnQCBy3TUp30irsliLAVKEXHM1yHAtPKcka1osabZc94OPwkGv6TUbHRgYAw5kHYwGn6gpK6_-w2Fgqxw14Fqtg9Nhg'}
                  alt={`Reference image for ${req.designTitle}`}
                  className="w-20 h-20 object-cover rounded-xl border border-[#dec0b4] shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-craft font-bold text-lg text-[#1b1c1a]">
                      {req.designTitle}
                    </h3>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#ffdbcc] text-[#9c3d00] font-semibold">
                      Budget: {req.budgetRange}
                    </span>
                  </div>

                  <p className="text-xs text-[#574239] line-clamp-2 mt-1 mb-2">
                    "{req.description}"
                  </p>

                  <div className="flex gap-4 text-[11px] text-[#8a7268]">
                    <span>Buyer: <strong className="text-[#1b1c1a]">{req.customerName}</strong></span>
                    <span>Colors: <strong className="text-[#1b1c1a]">{req.colorPreferences}</strong></span>
                    <span>Status: <strong className="text-[#9c3d00] uppercase">{req.status.replace('_', ' ')}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 w-full lg:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => navigate('custom_detail', { customRequestId: req.id })}
                  aria-label={`View full details for request ${req.designTitle}`}
                  className="px-4 py-2 rounded-full border border-[#dec0b4] text-xs font-semibold text-[#574239] hover:bg-[#f5f3ef] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  View Details
                </button>

                {req.status === 'pending_review' ? (
                  <button
                    type="button"
                    onClick={() => setSelectedReqForQuote(req.id)}
                    aria-label={`Send proposal quote for request ${req.designTitle}`}
                    className="px-5 py-2 rounded-full bg-[#bd5419] hover:bg-[#9c3d00] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <Send size={14} aria-hidden="true" /> Send Proposal Quote
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    Quote Sent (${req.proposal?.price})
                  </span>
                )}
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Tab 2: Orders Fulfillment */}
      {activeTab === 'orders' && (
        <section id="panel-seller-orders" role="tabpanel" aria-labelledby="tab-seller-orders" className="space-y-4">
          {orders.map((ord) => (
            <article
              key={ord.id}
              aria-label={`Order fulfillment #${ord.orderNumber}`}
              className="bg-white rounded-2xl p-6 shadow-sm border border-[#dec0b4]/40 flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={ord.items[0]?.image}
                  alt={`Item preview for order #${ord.orderNumber}`}
                  className="w-16 h-16 object-cover rounded-xl border border-[#dec0b4] shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-sm text-[#1b1c1a]">
                      Order #{ord.orderNumber}
                    </h3>
                    <span className="font-bold text-sm text-[#bd5419]">
                      {formatPrice(ord.total)}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 text-[#574239] font-medium">
                      {ord.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-xs text-[#574239] mt-0.5">
                    Customer: {ord.customerName} ({ord.shippingAddress.city}, {ord.shippingAddress.state})
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-[#8a7268]">Stage:</span>
                    <span className="text-xs font-bold text-[#4b6360] uppercase bg-[#cae5e1]/40 px-2.5 py-0.5 rounded-full">
                      {ord.status.replace('_', ' ')}
                    </span>
                    {ord.trackingNumber && (
                      <span className="text-[11px] font-mono text-[#8a7268]">
                        ({ord.trackingNumber})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Advance Controls */}
              <div className="flex flex-wrap gap-2" role="group" aria-label={`Update fulfillment status for order #${ord.orderNumber}`}>
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(ord.id, 'in_crafting')}
                  aria-label={`Mark order #${ord.orderNumber} as in crafting on loom`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-[#4b6360] ${
                    ord.status === 'in_crafting'
                      ? 'bg-[#4b6360] text-white border-[#4b6360]'
                      : 'border-[#dec0b4] text-[#574239] hover:bg-[#f5f3ef]'
                  }`}
                >
                  Loom / Crafting
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus(ord.id, 'dispatched')}
                  aria-label={`Mark order #${ord.orderNumber} as dispatched`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                    ord.status === 'dispatched'
                      ? 'bg-[#bd5419] text-white border-[#bd5419]'
                      : 'border-[#dec0b4] text-[#574239] hover:bg-[#f5f3ef]'
                  }`}
                >
                  <Truck size={12} className="inline mr-1" aria-hidden="true" /> Mark Dispatched
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateStatus(ord.id, 'delivered')}
                  aria-label={`Mark order #${ord.orderNumber} as delivered`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-emerald-600 ${
                    ord.status === 'delivered'
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'border-[#dec0b4] text-[#574239] hover:bg-[#f5f3ef]'
                  }`}
                >
                  <CheckCircle size={12} className="inline mr-1" aria-hidden="true" /> Delivered
                </button>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Tab 3: Catalog Management */}
      {activeTab === 'catalog' && (
        <section id="panel-seller-catalog" role="tabpanel" aria-labelledby="tab-seller-catalog" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <article
              key={prod.id}
              aria-label={`Product listing: ${prod.title}`}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#dec0b4]/40 flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#efeeea]">
                <img
                  src={prod.images[0]}
                  alt={`Product photo of ${prod.title}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-[#4b6360]">
                  {prod.type}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#bd5419] text-white text-xs font-bold">
                  {formatPrice(prod.price, prod.priceInr)}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-craft font-bold text-base text-[#1b1c1a] truncate">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[#8a7268] mb-3">
                    {prod.category} • {prod.region}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-[#eae8e4]">
                  <button
                    type="button"
                    onClick={() => navigate('product_detail', { productId: prod.id })}
                    aria-label={`Preview product page for ${prod.title}`}
                    className="text-xs font-semibold text-[#9c3d00] hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded p-1"
                  >
                    <Eye size={14} aria-hidden="true" /> Preview
                  </button>

                  <div className="flex gap-2 items-center">
                    <button
                      type="button"
                      onClick={() =>
                        updateProduct(prod.id, { inStock: !prod.inStock })
                      }
                      aria-label={`Toggle inventory status for ${prod.title}. Currently ${prod.inStock ? 'In Stock' : 'Paused'}`}
                      className={`text-[11px] px-2.5 py-1 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                        prod.inStock
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {prod.inStock ? 'In Stock' : 'Paused'}
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteProduct(prod.id)}
                      className="text-[#8a7268] hover:text-[#ba1a1a] p-1.5 focus:outline-none focus:ring-2 focus:ring-[#ba1a1a] rounded"
                      aria-label={`Delete listing ${prod.title}`}
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {/* Quote Submission Modal */}
      {selectedReqForQuote && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-quote-title">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dec0b4]">
            <h3 id="modal-quote-title" className="font-serif-craft text-xl font-bold text-[#1b1c1a] mb-2">
              Send Official Proposal Quote
            </h3>
            <form onSubmit={handleSendQuote} aria-label="Artisan proposal quotation form" className="space-y-4 text-xs">
              <div>
                <label htmlFor="quote-price-input" className="block font-semibold text-[#574239] mb-1">
                  Custom Price Quote ($ USD)
                </label>
                <input
                  id="quote-price-input"
                  type="number"
                  min={10}
                  required
                  value={quotePrice}
                  onChange={(e) => setQuotePrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none font-bold focus:ring-2 focus:ring-[#bd5419]"
                />
              </div>

              <div>
                <label htmlFor="quote-days-input" className="block font-semibold text-[#574239] mb-1">
                  Lead Time / Crafting Days
                </label>
                <input
                  id="quote-days-input"
                  type="number"
                  min={1}
                  required
                  value={quoteDays}
                  onChange={(e) => setQuoteDays(Number(e.target.value))}
                  className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                />
              </div>

              <div>
                <label htmlFor="quote-note-input" className="block font-semibold text-[#574239] mb-1">
                  Technical Feasibility & Personal Artisan Note
                </label>
                <textarea
                  id="quote-note-input"
                  rows={3}
                  required
                  value={quoteNote}
                  onChange={(e) => setQuoteNote(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-xs focus:border-[#bd5419] outline-none resize-none focus:ring-2 focus:ring-[#bd5419]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedReqForQuote(null)}
                  aria-label="Cancel sending quote"
                  className="px-4 py-2 rounded-full border border-[#dec0b4] text-xs font-semibold text-[#574239] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  aria-label="Submit official quote to customer"
                  className="px-5 py-2 rounded-full bg-[#bd5419] text-white text-xs font-semibold hover:bg-[#9c3d00] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  Send Proposal Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tracking Modal */}
      {trackingModalOrderId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-dispatch-title">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-[#dec0b4]">
            <h3 id="modal-dispatch-title" className="font-serif-craft text-lg font-bold text-[#1b1c1a] mb-2">
              Dispatch Parcel
            </h3>
            <p className="text-xs text-[#574239] mb-4">
              Enter courier tracking identifier (e.g. India Post, BlueDart, DTDC).
            </p>
            <label htmlFor="modal-tracking-input" className="sr-only">Courier Tracking Number</label>
            <input
              id="modal-tracking-input"
              type="text"
              value={trackingNumberInput}
              onChange={(e) => setTrackingNumberInput(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none font-mono mb-4 focus:ring-2 focus:ring-[#bd5419]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setTrackingModalOrderId(null)}
                aria-label="Cancel dispatch action"
                className="px-4 py-2 rounded-full border border-[#dec0b4] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDispatch}
                aria-label="Confirm parcel dispatch and update order"
                className="px-5 py-2 rounded-full bg-[#bd5419] text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
              >
                Confirm Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Product Modal */}
      {newProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="modal-new-product-title">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dec0b4] max-h-[90vh] overflow-y-auto">
            <h3 id="modal-new-product-title" className="font-serif-craft text-2xl font-bold text-[#1b1c1a] mb-4">
              Publish New Handmade Listing
            </h3>
            <form onSubmit={handleCreateProduct} aria-label="New handmade listing form" className="space-y-4 text-xs">
              <div>
                <label htmlFor="new-product-title" className="block font-semibold text-[#1b1c1a] mb-1">
                  Product Title *
                </label>
                <input
                  id="new-product-title"
                  type="text"
                  required
                  placeholder="E.g., Dhokra Tribal Brass Bull Figurine"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="new-product-price" className="block font-semibold text-[#1b1c1a] mb-1">
                    Price ($ USD) *
                  </label>
                  <input
                    id="new-product-price"
                    type="number"
                    required
                    min={5}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                  />
                </div>
                <div>
                  <label htmlFor="new-product-type" className="block font-semibold text-[#1b1c1a] mb-1">
                    Listing Type
                  </label>
                  <select
                    id="new-product-type"
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <option value="ready-made">Ready-made Inventory</option>
                    <option value="customizable">Customizable on Demand</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="new-product-category" className="block font-semibold text-[#1b1c1a] mb-1">
                    Craft Category
                  </label>
                  <select
                    id="new-product-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <option value="Terracotta & Pottery">Terracotta & Pottery</option>
                    <option value="Textiles & Silk">Textiles & Silk</option>
                    <option value="Home Décor">Home Décor</option>
                    <option value="Woodwork">Woodwork & Metal</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="new-product-region" className="block font-semibold text-[#1b1c1a] mb-1">
                    State / Region of Origin
                  </label>
                  <input
                    id="new-product-region"
                    type="text"
                    value={newRegion}
                    onChange={(e) => setNewRegion(e.target.value)}
                    placeholder="e.g. Odisha, Rajasthan"
                    className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="new-product-material" className="block font-semibold text-[#1b1c1a] mb-1">
                  Primary Raw Material
                </label>
                <input
                  id="new-product-material"
                  type="text"
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  placeholder="e.g. Natural Terracotta, Mulberry Silk"
                  className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                />
              </div>

              <div>
                <label htmlFor="new-product-image-url" className="block font-semibold text-[#1b1c1a] mb-1">
                  Product Image URL
                </label>
                <input
                  id="new-product-image-url"
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none font-mono focus:ring-2 focus:ring-[#bd5419]"
                />
              </div>

              <div>
                <label htmlFor="new-product-desc" className="block font-semibold text-[#1b1c1a] mb-1">
                  Artisan Description & Story
                </label>
                <textarea
                  id="new-product-desc"
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Describe the handmade process, raw materials, and heritage significance..."
                  className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none resize-none focus:ring-2 focus:ring-[#bd5419]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#eae8e4]">
                <button
                  type="button"
                  onClick={() => setNewProductModalOpen(false)}
                  aria-label="Cancel publishing listing"
                  className="px-4 py-2 rounded-full border border-[#dec0b4] text-xs font-semibold text-[#574239] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  aria-label="Submit and publish new listing"
                  className="px-6 py-2 rounded-full bg-[#bd5419] text-white text-xs font-semibold hover:bg-[#9c3d00] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};
