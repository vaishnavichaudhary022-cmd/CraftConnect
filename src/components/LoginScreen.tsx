import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Palette,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  Truck,
  MessageSquare,
  BadgeCheck,
  Compass,
  LayoutDashboard,
  Layers,
  MapPin,
  FileCheck,
  Coins
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';

export const LoginScreen: React.FC = () => {
  const { allUsers, loginAsUser, setCurrentUser, setRole, navigate, currentUser, showToast } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [loginMode, setLoginMode] = useState<'persona' | 'custom'>('persona');

  // Custom User Creation form state
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [customCity, setCustomCity] = useState('Bengaluru');
  const [customStudioName, setCustomStudioName] = useState('');
  const [customCraftType, setCustomCraftType] = useState('Crochet & Fiber Art');

  // Pre-configured personas
  const customerUser = allUsers.find((u) => u.id === 'user-ananya') || allUsers[0];
  const artisanMaya = allUsers.find((u) => u.id === 'user-maya') || allUsers[1];
  const artisanDevika = allUsers.find((u) => u.id === 'user-devika') || allUsers[2];
  const adminUser = allUsers.find((u) => u.role === 'admin') || allUsers[3];

  // Role Definitions
  const roleDefinitions: Record<
    UserRole,
    {
      title: string;
      subtitle: string;
      targetPageName: string;
      targetPageId: string;
      targetPageIcon: any;
      description: string;
      capabilities: string[];
      logisticsNote: string;
      colorBg: string;
      colorBorder: string;
      colorText: string;
      colorBadge: string;
    }
  > = {
    customer: {
      title: 'Buyer & Collector',
      subtitle: 'Connoisseur of authentic handmade home crafts',
      targetPageName: 'Marketplace & Craft Discovery Page',
      targetPageId: 'search',
      targetPageIcon: Compass,
      description:
        'Explore authentic Indian home handicrafts, commission bespoke custom creations directly from artisans, track deliveries live via Porter & India Post, and chat directly with makers.',
      capabilities: [
        'Browse curated GI-tagged crochet, Lippan wall art, needlecraft & studio pottery',
        'Submit custom creation requests with reference images, dimensions, & color specs',
        'Receive and accept custom price & timeline quotes from verified master artisans',
        'Track live doorstep delivery with Porter Hyperlocal On-Demand or Speed Post',
        'Direct 1-on-1 artisan messaging to coordinate colors, materials & packaging'
      ],
      logisticsNote: 'Same-day Porter courier or insured Speed Post directly to your door',
      colorBg: 'bg-[#ffdbcc]/30',
      colorBorder: 'border-[#bd5419]',
      colorText: 'text-[#9c3d00]',
      colorBadge: 'bg-[#ffdbcc] text-[#9c3d00]'
    },
    seller: {
      title: 'Artisan & Studio Maker',
      subtitle: 'Independent craftsperson & handmade workshop creator',
      targetPageName: 'Artisan Studio & Workshop Dashboard',
      targetPageId: 'seller_dashboard',
      targetPageIcon: LayoutDashboard,
      description:
        'Manage your handmade home-craft inventory, review incoming custom commission briefs, submit quote proposals to buyers, and dispatch packages via Porter courier or India Post.',
      capabilities: [
        'Studio workshop dashboard with real-time sales metrics and escrow payouts',
        'Add & edit listings (crochet bouquets, Lippan wall mirrors, linen totes, clay pottery)',
        'Review bespoke buyer requests and send custom quote proposals with timelines',
        'Schedule instant Porter bike/van pickups or generate India Post tracking numbers',
        'Direct customer chat to clarify custom measurements and yarn/clay preferences'
      ],
      logisticsNote: 'Direct studio door pickup by Porter 2-Wheeler / Mini Van riders',
      colorBg: 'bg-[#cae5e1]/30',
      colorBorder: 'border-[#4b6360]',
      colorText: 'text-[#4b6360]',
      colorBadge: 'bg-[#cae5e1] text-[#4b6360]'
    },
    admin: {
      title: 'Platform Administrator',
      subtitle: 'Central governance, craft provenance & escrow steward',
      targetPageName: 'Platform Governance & Escrow Portal',
      targetPageId: 'admin_portal',
      targetPageIcon: ShieldCheck,
      description:
        'Audit authenticity standards, verify Geographical Indication (GI) tags, supervise 100% buyer-seller escrow funds, monitor logistics, and manage platform integrity.',
      capabilities: [
        'GI-Tag certification auditing & artisan workshop provenance verification',
        '100% Escrow transaction tracking, payout release overrides & refund protection',
        'Listing moderation & handmade quality standards compliance review',
        'Live carrier fulfillment telemetry for Porter on-demand & India Speed Post',
        'Platform-wide user role management & dispute mediation tools'
      ],
      logisticsNote: 'Oversee integrated carrier APIs, tracking SLAs, and courier dispatch logs',
      colorBg: 'bg-[#ffdea5]/30',
      colorBorder: 'border-[#735616]',
      colorText: 'text-[#735616]',
      colorBadge: 'bg-[#ffdea5] text-[#735616]'
    }
  };

  const currentRoleDef = roleDefinitions[selectedRole];

  const handleSelectRoleAndNavigate = (targetRole: UserRole, specificUserId?: string) => {
    if (specificUserId) {
      loginAsUser(specificUserId);
    } else {
      // Find matching user or fallback
      const matched = allUsers.find((u) => u.role === targetRole) || allUsers[0];
      loginAsUser(matched.id);
    }
  };

  const handleCustomProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserName = customName.trim() || (selectedRole === 'seller' ? 'Artisan Maker' : selectedRole === 'admin' ? 'Platform Officer' : 'Conscious Buyer');
    const newUserEmail = customEmail.trim() || `${newUserName.toLowerCase().replace(/\s+/g, '.')}@craftconnect.in`;

    const customProfile: UserProfile = {
      id: `user-custom-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: selectedRole,
      avatar:
        selectedRole === 'seller'
          ? 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
          : selectedRole === 'admin'
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      city: customCity,
      artisanStudioName: selectedRole === 'seller' ? (customStudioName || `${newUserName}'s Handcraft Studio`) : undefined,
      specialty: selectedRole === 'seller' ? customCraftType : undefined
    };

    setCurrentUser(customProfile);
    setRole(selectedRole);

    if (selectedRole === 'seller') {
      navigate('seller_dashboard');
      showToast(`Welcome to Artisan Studio, ${customProfile.name}!`);
    } else if (selectedRole === 'admin') {
      navigate('admin_portal');
      showToast(`Welcome to Central Governance Portal, ${customProfile.name}!`);
    } else {
      navigate('search');
      showToast(`Welcome to CraftConnect Marketplace, ${customProfile.name}!`);
    }
  };

  return (
    <main
      role="main"
      aria-label="Define Role and Select Portal Login"
      className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-16 animate-in fade-in duration-300"
    >
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffdbcc] text-[#9c3d00] text-xs font-bold mb-3">
          <Sparkles size={14} aria-hidden="true" />
          <span>CraftConnect Multi-Role Architecture</span>
        </div>
        <h1 className="font-serif-craft text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight">
          Define Your Role & Enter Portal
        </h1>
        <p className="text-sm text-[#574239] mt-2">
          Select and define your user role below. Each role unlocks a distinct, dedicated workspace tailored for craft discovery, studio management, or platform governance.
        </p>
      </div>

      {/* Step 1: Role Definition & Selector Cards */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#8a7268] flex items-center gap-2">
            <span>Step 1: Choose Your Role Definition</span>
          </h2>
          <span className="text-xs text-[#bd5419] font-semibold">
            Active Selection: <strong className="capitalize">{selectedRole}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="radiogroup" aria-label="Select User Role">
          {/* 1. Buyer Role Card */}
          <div
            role="radio"
            aria-checked={selectedRole === 'customer'}
            tabIndex={0}
            onClick={() => setSelectedRole('customer')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedRole('customer');
            }}
            className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              selectedRole === 'customer'
                ? 'bg-white border-[#bd5419] shadow-lg ring-1 ring-[#bd5419]'
                : 'bg-white/80 border-[#dec0b4]/60 hover:border-[#bd5419]/60 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdbcc] text-[#9c3d00] flex items-center justify-center">
                  <ShoppingBag size={20} aria-hidden="true" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdbcc] text-[#9c3d00] text-[10px] font-bold uppercase">
                  Buyer Role
                </span>
              </div>
              <h3 className="font-serif-craft font-bold text-base text-[#1b1c1a] mb-1">
                Buyer & Collector
              </h3>
              <p className="text-xs text-[#574239] line-clamp-2 mb-3">
                Browse GI crafts, submit custom commission requests, and track Porter deliveries.
              </p>
            </div>

            <div className="pt-3 border-t border-[#eae8e4] text-[11px] font-semibold text-[#bd5419] flex items-center gap-1">
              <Compass size={13} aria-hidden="true" />
              <span>Target: Marketplace & Catalog</span>
            </div>
          </div>

          {/* 2. Artisan Role Card */}
          <div
            role="radio"
            aria-checked={selectedRole === 'seller'}
            tabIndex={0}
            onClick={() => setSelectedRole('seller')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedRole('seller');
            }}
            className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#4b6360] ${
              selectedRole === 'seller'
                ? 'bg-white border-[#4b6360] shadow-lg ring-1 ring-[#4b6360]'
                : 'bg-white/80 border-[#dec0b4]/60 hover:border-[#4b6360]/60 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#cae5e1] text-[#4b6360] flex items-center justify-center">
                  <Palette size={20} aria-hidden="true" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#cae5e1] text-[#4b6360] text-[10px] font-bold uppercase">
                  Artisan Role
                </span>
              </div>
              <h3 className="font-serif-craft font-bold text-base text-[#1b1c1a] mb-1">
                Artisan / Studio Maker
              </h3>
              <p className="text-xs text-[#574239] line-clamp-2 mb-3">
                Publish listings, submit bespoke commission quotes, and coordinate Porter dispatch.
              </p>
            </div>

            <div className="pt-3 border-t border-[#eae8e4] text-[11px] font-semibold text-[#4b6360] flex items-center gap-1">
              <LayoutDashboard size={13} aria-hidden="true" />
              <span>Target: Artisan Studio Dashboard</span>
            </div>
          </div>

          {/* 3. Admin Role Card */}
          <div
            role="radio"
            aria-checked={selectedRole === 'admin'}
            tabIndex={0}
            onClick={() => setSelectedRole('admin')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setSelectedRole('admin');
            }}
            className={`p-5 rounded-2xl cursor-pointer transition-all duration-200 border text-left flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-[#735616] ${
              selectedRole === 'admin'
                ? 'bg-white border-[#735616] shadow-lg ring-1 ring-[#735616]'
                : 'bg-white/80 border-[#dec0b4]/60 hover:border-[#735616]/60 hover:bg-white'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdea5] text-[#735616] flex items-center justify-center">
                  <ShieldCheck size={20} aria-hidden="true" />
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdea5] text-[#735616] text-[10px] font-bold uppercase">
                  Admin Role
                </span>
              </div>
              <h3 className="font-serif-craft font-bold text-base text-[#1b1c1a] mb-1">
                Platform Governance
              </h3>
              <p className="text-xs text-[#574239] line-clamp-2 mb-3">
                Certify GI craftsmanship provenance, oversee 100% escrow, and audit carrier SLAs.
              </p>
            </div>

            <div className="pt-3 border-t border-[#eae8e4] text-[11px] font-semibold text-[#735616] flex items-center gap-1">
              <FileCheck size={13} aria-hidden="true" />
              <span>Target: Admin Governance Portal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Role Details & Destination Target Screen Preview */}
      <div className="bg-white rounded-3xl border border-[#dec0b4]/70 shadow-xl overflow-hidden mb-8 grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Role Definition & Destination Details (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${currentRoleDef.colorBadge}`}>
                Role Defined
              </span>
              <span className="text-xs font-semibold text-[#8a7268]">
                Ready to transition to target screen
              </span>
            </div>
            <h2 className="font-serif-craft text-2xl font-bold text-[#1b1c1a]">
              {currentRoleDef.title}
            </h2>
            <p className="text-xs text-[#574239] mt-1 leading-relaxed">
              {currentRoleDef.description}
            </p>
          </div>

          {/* Destination Page Banner */}
          <div className="p-4 rounded-2xl bg-[#fbf9f5] border border-[#dec0b4]/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-[#dec0b4] flex items-center justify-center text-[#bd5419]">
                <currentRoleDef.targetPageIcon size={20} aria-hidden="true" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8a7268] block">
                  Next Page To Display
                </span>
                <span className="text-sm font-bold text-[#1b1c1a]">
                  {currentRoleDef.targetPageName}
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white rounded-lg border border-[#dec0b4] text-[#9c3d00]">
              /{currentRoleDef.targetPageId}
            </span>
          </div>

          {/* Capabilities List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1b1c1a] mb-2.5 flex items-center gap-1.5">
              <BadgeCheck size={14} className="text-[#bd5419]" aria-hidden="true" />
              <span>Role Permissions & Features</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#574239]">
              {currentRoleDef.capabilities.map((cap, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Logistics Note */}
          <div className="p-3 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/40 text-xs text-[#574239] flex items-center gap-2">
            <Truck size={16} className="text-[#bd5419] shrink-0" aria-hidden="true" />
            <span>
              <strong>Fulfillment Protocol:</strong> {currentRoleDef.logisticsNote}
            </span>
          </div>
        </div>

        {/* Right Column: Fast Login or Custom Role Definition (5 cols) */}
        <div className="lg:col-span-5 bg-[#fbf9f5] border-t lg:border-t-0 lg:border-l border-[#dec0b4]/60 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Mode Toggle: Pre-set Persona vs Custom Define */}
            <div className="flex bg-[#efeeea] p-1 rounded-xl border border-[#dec0b4]/60 text-xs font-semibold mb-5">
              <button
                type="button"
                onClick={() => setLoginMode('persona')}
                className={`flex-1 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-[#bd5419] ${
                  loginMode === 'persona' ? 'bg-white text-[#bd5419] shadow-xs' : 'text-[#574239]'
                }`}
              >
                1-Click Personas
              </button>
              <button
                type="button"
                onClick={() => setLoginMode('custom')}
                className={`flex-1 py-1.5 rounded-lg transition-colors focus:outline-none focus:ring-1 focus:ring-[#bd5419] ${
                  loginMode === 'custom' ? 'bg-white text-[#bd5419] shadow-xs' : 'text-[#574239]'
                }`}
              >
                Custom Profile
              </button>
            </div>

            {/* Persona Quick Actions */}
            {loginMode === 'persona' ? (
              <div className="space-y-3">
                <span className="text-xs font-bold text-[#1b1c1a] block">
                  Select {currentRoleDef.title} Persona:
                </span>

                {selectedRole === 'customer' && (
                  <button
                    type="button"
                    onClick={() => handleSelectRoleAndNavigate('customer', customerUser.id)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#dec0b4] hover:border-[#bd5419] hover:shadow-md transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={customerUser.avatar}
                        alt={customerUser.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#dec0b4]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1b1c1a] group-hover:text-[#bd5419] transition-colors">
                          {customerUser.name}
                        </div>
                        <div className="text-[11px] text-[#8a7268]">
                          Buyer • {customerUser.city}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#bd5419] flex items-center gap-1">
                      Enter Marketplace <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </button>
                )}

                {selectedRole === 'seller' && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSelectRoleAndNavigate('seller', artisanMaya.id)}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#dec0b4] hover:border-[#4b6360] hover:shadow-md transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4b6360]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={artisanMaya.avatar}
                          alt={artisanMaya.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#dec0b4]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#1b1c1a] group-hover:text-[#4b6360] transition-colors">
                            {artisanMaya.name}
                          </div>
                          <div className="text-[11px] text-[#8a7268]">
                            {artisanMaya.artisanStudioName} (Crochet & Sewing)
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#4b6360] flex items-center gap-1">
                        Enter Studio <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectRoleAndNavigate('seller', artisanDevika.id)}
                      className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#dec0b4] hover:border-[#4b6360] hover:shadow-md transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4b6360]"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={artisanDevika.avatar}
                          alt={artisanDevika.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#dec0b4]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#1b1c1a] group-hover:text-[#4b6360] transition-colors">
                            {artisanDevika.name}
                          </div>
                          <div className="text-[11px] text-[#8a7268]">
                            {artisanDevika.artisanStudioName} (Lippan Clay & Pottery)
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#4b6360] flex items-center gap-1">
                        Enter Studio <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </button>
                  </>
                )}

                {selectedRole === 'admin' && (
                  <button
                    type="button"
                    onClick={() => handleSelectRoleAndNavigate('admin', adminUser.id)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#dec0b4] hover:border-[#735616] hover:shadow-md transition-all text-left group cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#735616]"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={adminUser.avatar}
                        alt={adminUser.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#dec0b4]"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1b1c1a] group-hover:text-[#735616] transition-colors">
                          {adminUser.name}
                        </div>
                        <div className="text-[11px] text-[#8a7268]">
                          Platform Administrator • Trust & Escrow
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#735616] flex items-center gap-1">
                      Enter Admin Portal <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </button>
                )}
              </div>
            ) : (
              /* Custom Define Form */
              <form onSubmit={handleCustomProfileSubmit} className="space-y-3 text-xs">
                <div>
                  <label htmlFor="custom-user-name" className="font-semibold text-[#574239] block mb-1">
                    Your Name
                  </label>
                  <input
                    id="custom-user-name"
                    type="text"
                    required
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder={
                      selectedRole === 'customer'
                        ? 'e.g. Priya Sharma'
                        : selectedRole === 'seller'
                        ? 'e.g. Shanti Devi (Weaver)'
                        : 'e.g. Governance Officer'
                    }
                    className="w-full bg-white border border-[#dec0b4] rounded-xl py-2 px-3 text-xs text-[#1b1c1a] focus:ring-2 focus:ring-[#bd5419] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="custom-user-email" className="font-semibold text-[#574239] block mb-1">
                    Email Address
                  </label>
                  <input
                    id="custom-user-email"
                    type="email"
                    required
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    placeholder="user@craftconnect.in"
                    className="w-full bg-white border border-[#dec0b4] rounded-xl py-2 px-3 text-xs text-[#1b1c1a] focus:ring-2 focus:ring-[#bd5419] focus:outline-none"
                  />
                </div>

                {selectedRole === 'seller' && (
                  <>
                    <div>
                      <label htmlFor="custom-studio-name" className="font-semibold text-[#574239] block mb-1">
                        Studio / Workshop Name
                      </label>
                      <input
                        id="custom-studio-name"
                        type="text"
                        value={customStudioName}
                        onChange={(e) => setCustomStudioName(e.target.value)}
                        placeholder="e.g. Vanya Heritage Loom Studio"
                        className="w-full bg-white border border-[#dec0b4] rounded-xl py-2 px-3 text-xs text-[#1b1c1a] focus:ring-2 focus:ring-[#bd5419] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label htmlFor="custom-craft-specialty" className="font-semibold text-[#574239] block mb-1">
                        Craft Technique & Materials
                      </label>
                      <select
                        id="custom-craft-specialty"
                        value={customCraftType}
                        onChange={(e) => setCustomCraftType(e.target.value)}
                        className="w-full bg-white border border-[#dec0b4] rounded-xl py-2 px-3 text-xs text-[#1b1c1a] focus:ring-2 focus:ring-[#bd5419] focus:outline-none"
                      >
                        <option value="Crochet & Yarn Fiber Craft">Crochet & Yarn Fiber Craft</option>
                        <option value="Kutch Lippan Clay Mirror Art">Kutch Lippan Clay Mirror Art</option>
                        <option value="Kantha Sewing & Hand Embroidery">Kantha Sewing & Hand Embroidery</option>
                        <option value="Terracotta & Studio Pottery">Terracotta & Studio Pottery</option>
                        <option value="Botanical Soy Wax Candles">Botanical Soy Wax Candles</option>
                      </select>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#bd5419] hover:bg-[#9c3d00] text-white py-2.5 rounded-xl font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419] mt-2"
                >
                  <span>Launch as {selectedRole.toUpperCase()} & Go to Page</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          <div className="pt-4 border-t border-[#eae8e4] mt-6 text-center">
            <span className="text-[11px] text-[#8a7268]">
              Current active session:{' '}
              <strong className="text-[#1b1c1a]">{currentUser.name}</strong> ({currentUser.role})
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};
