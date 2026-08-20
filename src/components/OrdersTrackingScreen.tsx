import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  ShoppingBag,
  ExternalLink,
  Star,
  ArrowLeft,
  MessageSquare,
  MapPin,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { Order, OrderStatus } from '../types';

export const OrdersTrackingScreen: React.FC = () => {
  const {
    orders,
    selectedOrderId,
    customRequests,
    navigate,
    formatPrice,
    role,
    openArtisanChat,
    updateOrderStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'custom' | 'ready'>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(() => {
    if (selectedOrderId) {
      return orders.find((o) => o.id === selectedOrderId) || orders[0] || null;
    }
    return orders[0] || null;
  });

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'custom') return o.type === 'custom';
    if (activeTab === 'ready') return o.type === 'ready-made';
    return true;
  });

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'confirmed':
        return 1;
      case 'seller_processing':
      case 'in_crafting':
        return 2;
      case 'dispatched':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 1;
    }
  };

  const handleChatAboutOrder = (order: Order) => {
    const firstItem = order.items[0];
    openArtisanChat({
      artisanId: firstItem?.artisanId || 'artisan-general',
      artisanName: firstItem?.artisanName || 'Artisan Workshop',
      artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      orderId: order.id,
      orderNumber: order.orderNumber,
      productTitle: firstItem?.title
    });
  };

  return (
    <main role="main" aria-label="Orders and Live Tracking" className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-4 border-b border-[#eae8e4]">
        <div>
          <h1 className="font-serif-craft text-2xl md:text-3xl font-bold text-[#1b1c1a]">
            Orders & Live Tracking
          </h1>
          <p className="text-xs text-[#8a7268] mt-0.5">
            Real-time fulfillment tracking via Porter On-Demand & India Speed Post
          </p>
        </div>

        {/* Filter Tabs */}
        <div role="tablist" aria-label="Order categories" className="flex bg-[#f5f3ef] p-1 rounded-full border border-[#dec0b4]/40 text-xs">
          <button
            role="tab"
            aria-selected={activeTab === 'all'}
            aria-controls="orders-panel"
            id="tab-all-orders"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              activeTab === 'all' ? 'bg-[#bd5419] text-white shadow-sm' : 'text-[#574239]'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'custom'}
            aria-controls="orders-panel"
            id="tab-custom-orders"
            onClick={() => setActiveTab('custom')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              activeTab === 'custom' ? 'bg-[#bd5419] text-white shadow-sm' : 'text-[#574239]'
            }`}
          >
            Custom Commissions ({orders.filter((o) => o.type === 'custom').length})
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'ready'}
            aria-controls="orders-panel"
            id="tab-ready-orders"
            onClick={() => setActiveTab('ready')}
            className={`px-4 py-1.5 rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              activeTab === 'ready' ? 'bg-[#bd5419] text-white shadow-sm' : 'text-[#574239]'
            }`}
          >
            Ready-Made Crafts
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div role="status" aria-live="polite" className="bg-white rounded-3xl p-12 text-center border border-[#dec0b4]/40 max-w-md mx-auto my-12 shadow-sm">
          <Package size={40} className="mx-auto text-[#bd5419] mb-3 opacity-60" aria-hidden="true" />
          <h2 className="font-serif-craft text-xl font-bold text-[#1b1c1a] mb-1">No Orders Found</h2>
          <p className="text-xs text-[#574239] mb-6">
            You haven't placed any orders in this category yet.
          </p>
          <button
            onClick={() => navigate('search')}
            aria-label="Browse handcrafted goods marketplace"
            className="px-6 py-2.5 rounded-full bg-[#bd5419] text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            Browse Handcrafted Goods
          </button>
        </div>
      ) : (
        <div id="orders-panel" role="region" aria-labelledby={`tab-${activeTab}-orders`} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order List (5 cols) */}
          <div role="feed" aria-label="List of orders" className="lg:col-span-5 space-y-3.5">
            {filteredOrders.map((order) => {
              const isSelected = selectedOrderDetails?.id === order.id;
              return (
                <button
                  type="button"
                  key={order.id}
                  onClick={() => setSelectedOrderDetails(order)}
                  aria-label={`View tracking details for order #${order.orderNumber}, ${order.items[0]?.title || 'order'}, total ${formatPrice(order.total)}`}
                  aria-pressed={isSelected}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                    isSelected
                      ? 'bg-[#ffdbcc]/20 border-[#bd5419] shadow-md'
                      : 'bg-white border-[#dec0b4]/60 hover:border-[#bd5419]/60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-serif-craft font-bold text-sm text-[#1b1c1a]">
                        #{order.orderNumber}
                      </span>
                      <span className="text-[11px] text-[#8a7268] block">
                        {order.createdAt.split('T')[0]}
                      </span>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          order.status === 'delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : order.status === 'dispatched'
                            ? 'bg-sky-100 text-sky-800'
                            : order.status === 'in_crafting'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-[#cae5e1] text-[#4b6360]'
                        }`}
                      >
                        {order.status.replace('_', ' ')}
                      </span>

                      <span className="text-[10px] font-semibold text-[#8a7268] flex items-center gap-1">
                        <Truck size={11} className="text-[#bd5419]" aria-hidden="true" />
                        {order.deliveryMethod === 'porter' ? 'Porter Express' : 'India Post'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <img
                      src={order.items[0]?.image}
                      alt={order.items[0]?.title}
                      className="w-12 h-12 object-cover rounded-xl border border-[#dec0b4]"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs text-[#1b1c1a] truncate">
                        {order.items[0]?.title}
                      </h3>
                      <p className="text-[11px] text-[#8a7268]">
                        {order.items.length > 1
                          ? `+${order.items.length - 1} other item${order.items.length > 2 ? 's' : ''}`
                          : `By ${order.items[0]?.artisanName}`}
                      </p>
                    </div>
                    <span className="font-bold text-xs text-[#1b1c1a]">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Tracking Panel (7 cols) */}
          {selectedOrderDetails && (
            <section
              aria-label={`Detailed tracking view for order #${selectedOrderDetails.orderNumber}`}
              className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-[#dec0b4]/60 shadow-md space-y-6"
            >
              {/* Card Header with Delivery Method & Chat Action */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 pb-4 border-b border-[#eae8e4]">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-serif-craft text-xl font-bold text-[#1b1c1a]">
                      Order #{selectedOrderDetails.orderNumber}
                    </h2>
                    {selectedOrderDetails.type === 'custom' && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbcc] text-[#9c3d00] text-[10px] font-bold">
                        Bespoke Commission
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#8a7268] mt-1">
                    Est. Arrival: <span className="font-bold text-[#1b1c1a]">{selectedOrderDetails.estimatedDelivery}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleChatAboutOrder(selectedOrderDetails)}
                    aria-label={`Message artisan regarding order #${selectedOrderDetails.orderNumber}`}
                    className="px-3 py-1.5 rounded-xl bg-[#ffdbcc] hover:bg-[#bd5419] text-[#9c3d00] hover:text-white transition-colors text-xs font-bold flex items-center gap-1.5 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <MessageSquare size={14} aria-hidden="true" />
                    <span>Chat with Artisan</span>
                  </button>
                </div>
              </div>

              {/* Delivery Logistics Card (Porter vs Post) */}
              <div className="p-4 rounded-2xl bg-[#f5f3ef] border border-[#dec0b4]/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#1b1c1a]">
                  <span className="flex items-center gap-1.5">
                    <Truck size={16} className="text-[#bd5419]" aria-hidden="true" />
                    Carrier: {selectedOrderDetails.deliveryDetails?.carrierName || (selectedOrderDetails.deliveryMethod === 'porter' ? 'Porter Hyperlocal On-Demand' : 'India Speed Post')}
                  </span>
                  <span className="text-[11px] font-mono text-[#9c3d00] bg-white px-2.5 py-0.5 rounded-md border border-[#dec0b4]">
                    {selectedOrderDetails.deliveryDetails?.trackingCode || selectedOrderDetails.trackingNumber || 'IND-POST-9928172'}
                  </span>
                </div>

                <p className="text-xs text-[#574239]">
                  {selectedOrderDetails.deliveryDetails?.estimatedTimeline || (selectedOrderDetails.deliveryMethod === 'porter' ? 'Live Courier Rider dispatched direct from artisan home workshop' : 'Doorstep postal delivery via Department of Posts')}
                </p>

                {selectedOrderDetails.deliveryDetails?.porterVehicleType && (
                  <div className="text-[11px] text-[#4b6360] font-semibold flex items-center gap-1 pt-1">
                    <span>Vehicle: {selectedOrderDetails.deliveryDetails.porterVehicleType}</span>
                    <span>• Verified Porter Driver Partner</span>
                  </div>
                )}
              </div>

              {/* Visual 4-Step Stepper */}
              <nav aria-label="Order delivery progress" className="py-2">
                <div className="flex items-center justify-between relative max-w-lg mx-auto">
                  {/* Step 1: Confirmed */}
                  <div className="flex flex-col items-center text-center z-10" aria-current={getStatusStepIndex(selectedOrderDetails.status) === 1 ? 'step' : undefined}>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                        getStatusStepIndex(selectedOrderDetails.status) >= 1
                          ? 'bg-[#bd5419] text-white shadow-sm'
                          : 'bg-[#efeeea] text-[#8a7268]'
                      }`}
                    >
                      <CheckCircle2 size={18} aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#1b1c1a] mt-1.5">Confirmed</span>
                  </div>

                  {/* Line 1 */}
                  <div
                    className={`h-1 flex-1 mx-1 ${
                      getStatusStepIndex(selectedOrderDetails.status) >= 2 ? 'bg-[#bd5419]' : 'bg-[#dec0b4]/40'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Step 2: In Crafting */}
                  <div className="flex flex-col items-center text-center z-10" aria-current={getStatusStepIndex(selectedOrderDetails.status) === 2 ? 'step' : undefined}>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                        getStatusStepIndex(selectedOrderDetails.status) >= 2
                          ? 'bg-[#bd5419] text-white shadow-sm'
                          : 'bg-[#efeeea] text-[#8a7268]'
                      }`}
                    >
                      <Sparkles size={18} aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#1b1c1a] mt-1.5">
                      {selectedOrderDetails.type === 'custom' ? 'In Crafting' : 'Processing'}
                    </span>
                  </div>

                  {/* Line 2 */}
                  <div
                    className={`h-1 flex-1 mx-1 ${
                      getStatusStepIndex(selectedOrderDetails.status) >= 3 ? 'bg-[#bd5419]' : 'bg-[#dec0b4]/40'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Step 3: Dispatched */}
                  <div className="flex flex-col items-center text-center z-10" aria-current={getStatusStepIndex(selectedOrderDetails.status) === 3 ? 'step' : undefined}>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                        getStatusStepIndex(selectedOrderDetails.status) >= 3
                          ? 'bg-[#bd5419] text-white shadow-sm'
                          : 'bg-[#efeeea] text-[#8a7268]'
                      }`}
                    >
                      <Truck size={18} aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#1b1c1a] mt-1.5">
                      {selectedOrderDetails.deliveryMethod === 'porter' ? 'Porter En Route' : 'In Transit'}
                    </span>
                  </div>

                  {/* Line 3 */}
                  <div
                    className={`h-1 flex-1 mx-1 ${
                      getStatusStepIndex(selectedOrderDetails.status) >= 4 ? 'bg-[#bd5419]' : 'bg-[#dec0b4]/40'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Step 4: Delivered */}
                  <div className="flex flex-col items-center text-center z-10" aria-current={getStatusStepIndex(selectedOrderDetails.status) === 4 ? 'step' : undefined}>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
                        getStatusStepIndex(selectedOrderDetails.status) >= 4
                          ? 'bg-[#bd5419] text-white shadow-sm'
                          : 'bg-[#efeeea] text-[#8a7268]'
                      }`}
                    >
                      <Package size={18} aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#1b1c1a] mt-1.5">Delivered</span>
                  </div>
                </div>
              </nav>

              {/* Items List */}
              <div className="border-t border-[#eae8e4] pt-4 space-y-3">
                <h3 className="text-xs font-bold text-[#1b1c1a] uppercase tracking-wider">
                  Ordered Items ({selectedOrderDetails.items.length})
                </h3>

                {selectedOrderDetails.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-3 bg-[#f5f3ef] rounded-2xl border border-[#dec0b4]/40"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-14 h-14 object-cover rounded-xl border border-[#dec0b4]"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-xs text-[#1b1c1a] truncate">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#574239]">
                        Crafted by {item.artisanName} • Qty: {item.quantity}
                      </p>
                      {item.customDetails && (
                        <p className="text-[10px] text-[#9c3d00]">
                          Specs: {item.customDetails.dimensions} | {item.customDetails.colors}
                        </p>
                      )}
                    </div>
                    <span className="font-serif-craft font-bold text-sm text-[#bd5419]">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Shipping & Payment summary */}
              <div className="border-t border-[#eae8e4] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-[#fbf9f5] rounded-xl border border-[#dec0b4]/40">
                  <span className="font-semibold text-[#1b1c1a] block mb-1 flex items-center gap-1">
                    <MapPin size={13} className="text-[#bd5419]" aria-hidden="true" />
                    Delivery Destination:
                  </span>
                  <p className="text-[#574239] leading-relaxed">
                    {selectedOrderDetails.shippingAddress.fullName}<br />
                    {selectedOrderDetails.shippingAddress.street}<br />
                    {selectedOrderDetails.shippingAddress.city}, {selectedOrderDetails.shippingAddress.state} - {selectedOrderDetails.shippingAddress.pincode}<br />
                    <span className="text-[#8a7268]">{selectedOrderDetails.shippingAddress.phone}</span>
                  </p>
                </div>

                <div className="p-3 bg-[#fbf9f5] rounded-xl border border-[#dec0b4]/40">
                  <span className="font-semibold text-[#1b1c1a] block mb-1 flex items-center gap-1">
                    <ShieldCheck size={13} className="text-[#bd5419]" aria-hidden="true" />
                    Payment & Protection:
                  </span>
                  <p className="text-[#574239] leading-relaxed">
                    Method: <span className="font-bold text-[#1b1c1a]">{selectedOrderDetails.paymentMethod.toUpperCase()}</span><br />
                    Status: <span className="text-emerald-700 font-bold">PAID (Escrow Protected)</span><br />
                    Total: <span className="font-bold text-[#bd5419]">{formatPrice(selectedOrderDetails.total)}</span>
                  </p>
                </div>
              </div>

              {/* Admin/Artisan quick status advance simulation */}
              {(role === 'seller' || role === 'admin') && (
                <div className="border-t border-[#eae8e4] pt-4 bg-[#cae5e1]/20 p-4 rounded-2xl border border-[#cae5e1]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#4b6360]">
                      {role === 'seller' ? 'Artisan Studio Dispatch Tool' : 'Admin Fulfillment Override'}
                    </span>
                    <span className="text-[10px] text-[#8a7268]">Advance status to simulate live fulfillment</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['confirmed', 'in_crafting', 'dispatched', 'delivered'] as OrderStatus[]).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => {
                          updateOrderStatus(selectedOrderDetails.id, st);
                          setSelectedOrderDetails((prev) => prev ? { ...prev, status: st } : null);
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                          selectedOrderDetails.status === st
                            ? 'bg-[#4b6360] text-white'
                            : 'bg-white text-[#4b6360] border border-[#4b6360]/30 hover:bg-[#cae5e1]'
                        }`}
                      >
                        Set: {st.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}
        </div>
      )}
    </main>
  );
};
