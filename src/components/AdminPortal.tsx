import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  Users,
  Package,
  Layers,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Database,
  Lock,
  ArrowRight,
  TrendingUp,
  Sliders,
  DollarSign
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const {
    products,
    updateProduct,
    deleteProduct,
    customRequests,
    orders,
    formatPrice
  } = useApp();

  const [activeTab, setActiveTab] = useState<'moderation' | 'architecture' | 'transactions'>('moderation');

  const totalGTV = orders.reduce((sum, o) => sum + o.total, 0);
  const platformRevenue = totalGTV * 0.05; // 5% marketplace commission pool

  return (
    <main role="main" aria-label="CraftConnect Central Governance & Architecture" className="max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 pb-24 md:pb-16 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-[#eae8e4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-0.5 rounded-full bg-[#1b1c1a] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Lock size={12} aria-hidden="true" /> Platform Administrator
            </span>
            <span className="text-xs text-[#8a7268]">Multi-tenant Governance</span>
          </div>
          <h2 className="font-serif-craft text-3xl font-bold text-[#1b1c1a]">
            CraftConnect Central Governance & Architecture
          </h2>
        </div>
      </div>

      {/* Metrics Row */}
      <section aria-label="Platform performance metrics" className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Gross Merchandise Value</span>
          <span className="font-serif-craft text-2xl font-bold text-[#bd5419]">
            {formatPrice(totalGTV)}
          </span>
          <span className="text-[10px] text-emerald-700 font-medium block mt-1">
            100% Escrow Protected
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Platform Reserve (5%)</span>
          <span className="font-serif-craft text-2xl font-bold text-[#4b6360]">
            {formatPrice(platformRevenue)}
          </span>
          <span className="text-[10px] text-[#8a7268] block mt-1">
            Artisan Guild Welfare Pool
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Active Artisans</span>
          <span className="font-serif-craft text-2xl font-bold text-[#1b1c1a]">
            128 Guilds
          </span>
          <span className="text-[10px] text-emerald-700 font-medium block mt-1">
            Odisha, Bengal, Rajasthan
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-[#dec0b4]/50 shadow-sm">
          <span className="text-xs text-[#8a7268] block mb-1">Custom Commissions</span>
          <span className="font-serif-craft text-2xl font-bold text-[#9c3d00]">
            {customRequests.length}
          </span>
          <span className="text-[10px] text-[#8a7268] block mt-1">
            Direct Maker Match Rate 96%
          </span>
        </div>
      </section>

      {/* Tabs */}
      <div role="tablist" aria-label="Governance administrative tabs" className="flex gap-2 border-b border-[#dec0b4]/60 mb-8 pb-1">
        <button
          role="tab"
          aria-selected={activeTab === 'moderation'}
          aria-controls="panel-admin-moderation"
          id="tab-admin-moderation"
          onClick={() => setActiveTab('moderation')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#1b1c1a] ${
            activeTab === 'moderation'
              ? 'bg-[#1b1c1a] text-white shadow-sm'
              : 'text-[#574239] hover:bg-[#efeeea]'
          }`}
        >
          <Package size={14} aria-hidden="true" /> Catalog Moderation ({products.length})
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'architecture'}
          aria-controls="panel-admin-architecture"
          id="tab-admin-architecture"
          onClick={() => setActiveTab('architecture')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#1b1c1a] ${
            activeTab === 'architecture'
              ? 'bg-[#1b1c1a] text-white shadow-sm'
              : 'text-[#574239] hover:bg-[#efeeea]'
          }`}
        >
          <Database size={14} aria-hidden="true" /> Architecture & Multi-Tenancy Design
        </button>

        <button
          role="tab"
          aria-selected={activeTab === 'transactions'}
          aria-controls="panel-admin-transactions"
          id="tab-admin-transactions"
          onClick={() => setActiveTab('transactions')}
          className={`px-5 py-2.5 rounded-t-xl text-xs font-bold transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#1b1c1a] ${
            activeTab === 'transactions'
              ? 'bg-[#1b1c1a] text-white shadow-sm'
              : 'text-[#574239] hover:bg-[#efeeea]'
          }`}
        >
          <TrendingUp size={14} aria-hidden="true" /> Orders Audit ({orders.length})
        </button>
      </div>

      {/* Tab 1: Moderation */}
      {activeTab === 'moderation' && (
        <section id="panel-admin-moderation" role="tabpanel" aria-labelledby="tab-admin-moderation" className="space-y-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dec0b4]/50">
            <h3 className="font-serif-craft font-bold text-lg text-[#1b1c1a] mb-4">
              Handmade Authentication Verification Queue
            </h3>
            <div className="space-y-3" role="feed" aria-label="Products pending authenticity verification">
              {products.map((prod) => (
                <article
                  key={prod.id}
                  aria-label={`Product moderation: ${prod.title} by ${prod.artisanName}`}
                  className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/40"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={prod.images[0]}
                      alt={`Thumbnail of ${prod.title}`}
                      className="w-14 h-14 object-cover rounded-lg border border-[#dec0b4]"
                    />
                    <div>
                      <h4 className="font-semibold text-xs text-[#1b1c1a]">{prod.title}</h4>
                      <p className="text-[11px] text-[#574239]">
                        Maker: {prod.artisanName} • {prod.region} • {formatPrice(prod.price, prod.priceInr)}
                      </p>
                      <span className="text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                        GI Tag & Heritage Verified
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateProduct(prod.id, { rating: 5.0 })}
                      aria-label={`Certify authenticity for ${prod.title}`}
                      className="px-3 py-1 bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    >
                      Certify Authenticity
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tab 2: Architecture & Multi-Tenancy Verification */}
      {activeTab === 'architecture' && (
        <section id="panel-admin-architecture" role="tabpanel" aria-labelledby="tab-admin-architecture" className="space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#dec0b4]/50">
            <div className="flex items-center gap-2 mb-4">
              <Database size={24} className="text-[#9c3d00]" aria-hidden="true" />
              <h3 className="font-serif-craft font-bold text-2xl text-[#1b1c1a]">
                Multi-Tenant Architecture Alignment
              </h3>
            </div>
            <p className="text-xs text-[#574239] leading-relaxed mb-6">
              CraftConnect is structured to support multi-tenant artisan guilds, master weavers, and independent ceramic studios with role-based access control and tenant data isolation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/50 space-y-2">
                <h4 className="font-bold text-[#9c3d00] flex items-center gap-1.5">
                  <Lock size={14} aria-hidden="true" /> Master Data & Roles
                </h4>
                <p className="text-[#574239]">
                  Strict RBAC separating Customer browsing, Artisan Studio fulfillment, and Platform Administrator governance.
                </p>
              </div>

              <div className="p-4 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/50 space-y-2">
                <h4 className="font-bold text-[#4b6360] flex items-center gap-1.5">
                  <Layers size={14} aria-hidden="true" /> Tenant Data Isolation
                </h4>
                <p className="text-[#574239]">
                  Each artisan guild operates isolated queues for custom requests, price quotes, and delivery courier integrations.
                </p>
              </div>

              <div className="p-4 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/50 space-y-2">
                <h4 className="font-bold text-[#1b1c1a] flex items-center gap-1.5">
                  <CheckCircle size={14} aria-hidden="true" /> GI Authentication
                </h4>
                <p className="text-[#574239]">
                  Geographical Indication (GI) tag verification ensuring 100% genuine Sambalpuri, Warli, and Dhokra provenance.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab 3: Transactions */}
      {activeTab === 'transactions' && (
        <section id="panel-admin-transactions" role="tabpanel" aria-labelledby="tab-admin-transactions" className="bg-white rounded-2xl p-6 shadow-sm border border-[#dec0b4]/50">
          <h3 className="font-serif-craft font-bold text-lg text-[#1b1c1a] mb-4">
            Escrow Transactions & Order Log
          </h3>
          <div className="space-y-3" role="feed" aria-label="Escrow transaction logs">
            {orders.map((ord) => (
              <article
                key={ord.id}
                aria-label={`Transaction for order #${ord.orderNumber}, amount ${formatPrice(ord.total)}, status ${ord.status}`}
                className="flex items-center justify-between p-4 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/30 text-xs"
              >
                <div>
                  <span className="font-bold text-[#1b1c1a]">Order #{ord.orderNumber}</span>
                  <p className="text-[#574239]">
                    Buyer: {ord.customerName} • Items: {ord.items.length}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif-craft font-bold text-[#bd5419] text-sm block">
                    {formatPrice(ord.total)}
                  </span>
                  <span className="text-[10px] text-emerald-800 font-semibold uppercase">
                    Escrow Locked • Status: {ord.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
