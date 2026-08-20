import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Bell,
  ShoppingCart,
  Heart,
  Search,
  Sparkles,
  User,
  Shield,
  Palette,
  Check,
  X,
  MessageSquare,
  LogIn,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { UserRole } from '../types';

export const TopAppBar: React.FC = () => {
  const {
    role,
    setRole,
    currentUser,
    currentScreen,
    navigate,
    cart,
    favorites,
    unreadNotificationCount,
    notifications,
    markNotificationAsRead,
    markAllNotificationsRead,
    currency,
    setCurrency,
    openArtisanChat,
    chatMessages
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const roleLabels: Record<UserRole, { label: string; icon: any; color: string; desc: string }> = {
    customer: {
      label: 'Buyer View',
      icon: User,
      color: 'bg-[#9c3d00] text-white',
      desc: 'Browse, custom orders & shopping'
    },
    seller: {
      label: 'Artisan / Maker',
      icon: Palette,
      color: 'bg-[#4b6360] text-white',
      desc: 'Manage studio catalog, quotes & Porter/Post dispatch'
    },
    admin: {
      label: 'Admin Portal',
      icon: Shield,
      color: 'bg-[#735616] text-white',
      desc: 'Platform governance & authenticity moderation'
    }
  };

  const handleOpenGeneralChat = () => {
    openArtisanChat({
      artisanId: 'user-maya',
      artisanName: 'Maya Rao (Needlecraft Studio)',
      artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      productTitle: 'Handmade Crochet & Home Crafts'
    });
  };

  return (
    <header role="banner" className="bg-[#fbf9f5] border-b border-[#eae8e4] sticky top-0 z-40 shadow-[0px_4px_20px_rgba(42,66,63,0.06)]">
      {/* Top Utility Banner: Role Switcher & Live Authenticity Bar */}
      <div className="bg-[#efeeea] border-b border-[#dec0b4]/40 px-4 py-1.5 text-xs text-[#574239] flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 font-medium" aria-label="CraftConnect Marketplace Live Simulation active">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true"></span>
            CraftConnect Marketplace
          </span>
          <span className="hidden sm:inline text-neutral-400" aria-hidden="true">|</span>
          <span className="hidden sm:inline text-[#8a7268]">
            Home-Crafted Crochet, Wall Art, Sewing & Pottery • Porter & Post Delivery
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Currency Switcher */}
          <div
            role="radiogroup"
            aria-label="Select display currency"
            className="flex items-center bg-white rounded-full p-0.5 border border-[#dec0b4]/60 text-[11px]"
          >
            <button
              type="button"
              role="radio"
              aria-checked={currency === 'USD'}
              aria-label="Set currency to US Dollars ($ USD)"
              onClick={() => setCurrency('USD')}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                currency === 'USD' ? 'bg-[#bd5419] text-white font-bold' : 'text-[#574239] hover:text-[#9c3d00]'
              }`}
            >
              $ USD
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={currency === 'INR'}
              aria-label="Set currency to Indian Rupees (₹ INR)"
              onClick={() => setCurrency('INR')}
              className={`px-2 py-0.5 rounded-full transition-colors ${
                currency === 'INR' ? 'bg-[#bd5419] text-white font-bold' : 'text-[#574239] hover:text-[#9c3d00]'
              }`}
            >
              ₹ INR
            </button>
          </div>

          {/* User Persona & Role Selector Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowRoleSelector(!showRoleSelector)}
              aria-haspopup="menu"
              aria-expanded={showRoleSelector}
              aria-label={`Logged in as ${currentUser.name} (${roleLabels[role].label}). Click to switch persona`}
              className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white border border-[#dec0b4] text-[#1b1c1a] hover:border-[#bd5419] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-4 h-4 rounded-full object-cover"
              />
              <span className="truncate max-w-[120px]">{currentUser.name.split(' ')[0]}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                  role === 'customer'
                    ? 'bg-[#ffdbcc] text-[#9c3d00]'
                    : role === 'seller'
                    ? 'bg-[#cae5e1] text-[#4b6360]'
                    : 'bg-[#ffdea5] text-[#735616]'
                }`}
              >
                {role}
              </span>
              <ChevronDown size={12} className="text-[#8a7268]" aria-hidden="true" />
            </button>

            {showRoleSelector && (
              <div
                role="menu"
                aria-label="Select user perspective"
                className="absolute right-0 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-[#dec0b4]/60 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="text-[11px] font-semibold text-[#8a7268] uppercase tracking-wider px-2 py-1 flex items-center justify-between" role="presentation">
                  <span>Switch User Persona</span>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRoleSelector(false);
                      navigate('login');
                    }}
                    className="text-[10px] text-[#bd5419] font-bold hover:underline"
                  >
                    Login Page
                  </button>
                </div>

                {(['customer', 'seller', 'admin'] as UserRole[]).map((r) => {
                  const item = roleLabels[r];
                  const Icon = item.icon;
                  const isCurrent = role === r;
                  return (
                    <button
                      key={r}
                      role="menuitem"
                      aria-current={isCurrent ? 'true' : undefined}
                      aria-label={`Switch to ${item.label}: ${item.desc}`}
                      onClick={() => {
                        setRole(r);
                        setShowRoleSelector(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl flex items-start gap-2.5 transition-colors mb-1 focus:outline-none focus:ring-1 focus:ring-[#bd5419] ${
                        isCurrent ? 'bg-[#ffdbcc]/40 text-[#9c3d00]' : 'hover:bg-[#f5f3ef] text-[#1b1c1a]'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-lg mt-0.5 ${isCurrent ? 'bg-[#bd5419] text-white' : 'bg-[#efeeea] text-[#574239]'}`}
                        aria-hidden="true"
                      >
                        <Icon size={14} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs flex items-center justify-between">
                          <span>{item.label}</span>
                          {isCurrent && <Check size={13} className="text-[#9c3d00]" aria-hidden="true" />}
                        </div>
                        <div className="text-[11px] text-[#8a7268] line-clamp-1">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}

                <div className="pt-2 border-t border-[#eae8e4] mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setShowRoleSelector(false);
                      navigate('login');
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#f5f3ef] hover:bg-[#ffdbcc] text-[#574239] hover:text-[#9c3d00] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <LogIn size={13} aria-hidden="true" />
                    <span>Open Full Login Portal</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="flex justify-between items-center px-4 md:px-12 w-full py-3.5 max-w-7xl mx-auto">
        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#9c3d00] hover:bg-[#efeeea] p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-primary-navigation"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <Menu size={22} aria-hidden="true" />
        </button>

        {/* Brand Logo in Playfair Display */}
        <button
          type="button"
          onClick={() => navigate('search')}
          aria-label="CraftConnect Home - Explore authentic Indian handicrafts"
          className="cursor-pointer font-serif-craft text-2xl md:text-3xl font-bold text-[#9c3d00] tracking-tight hover:opacity-90 transition-opacity text-center md:text-left flex-1 md:flex-none focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded-lg px-1"
        >
          CraftConnect
        </button>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary site navigation" className="hidden md:flex gap-1.5 lg:gap-3 items-center">
          <button
            type="button"
            onClick={() => navigate('search')}
            aria-current={currentScreen === 'search' || currentScreen === 'home' ? 'page' : undefined}
            aria-label="Explore Crafts - Browse handcrafted catalog"
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              currentScreen === 'search' || currentScreen === 'home'
                ? 'bg-[#ffdbcc] text-[#9c3d00] font-semibold'
                : 'text-[#574239] hover:bg-[#efeeea]'
            }`}
          >
            Explore Crafts
          </button>

          <button
            type="button"
            onClick={() => navigate('custom_request')}
            aria-current={currentScreen === 'custom_request' ? 'page' : undefined}
            aria-label="Request Custom Creation from master artisans"
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              currentScreen === 'custom_request'
                ? 'bg-[#bd5419] text-white font-semibold shadow-sm'
                : 'text-[#9c3d00] bg-[#ffdbcc]/40 hover:bg-[#ffdbcc] border border-[#dec0b4]/40'
            }`}
          >
            <Sparkles size={14} aria-hidden="true" />
            Request Custom
          </button>

          <button
            type="button"
            onClick={() => navigate('orders_tracking')}
            aria-current={currentScreen === 'orders_tracking' ? 'page' : undefined}
            aria-label="Orders and Live Tracking"
            className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              currentScreen === 'orders_tracking'
                ? 'bg-[#ffdbcc] text-[#9c3d00] font-semibold'
                : 'text-[#574239] hover:bg-[#efeeea]'
            }`}
          >
            Orders & Tracking
          </button>

          {/* Role Context Actions */}
          {role === 'seller' && (
            <button
              type="button"
              onClick={() => navigate('seller_dashboard')}
              aria-current={currentScreen === 'seller_dashboard' || currentScreen === 'seller_custom_queue' ? 'page' : undefined}
              aria-label="Artisan Studio - Manage listings, quotes, and artisan orders"
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#4b6360] ${
                currentScreen === 'seller_dashboard' || currentScreen === 'seller_custom_queue'
                  ? 'bg-[#4b6360] text-white font-semibold'
                  : 'text-[#4b6360] bg-[#cae5e1]/50 hover:bg-[#cae5e1]'
              }`}
            >
              <Palette size={14} aria-hidden="true" />
              Artisan Studio
            </button>
          )}

          {role === 'admin' && (
            <button
              type="button"
              onClick={() => navigate('admin_portal')}
              aria-current={currentScreen === 'admin_portal' ? 'page' : undefined}
              aria-label="Admin Portal - Platform governance and catalog moderation"
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#735616] ${
                currentScreen === 'admin_portal'
                  ? 'bg-[#735616] text-white font-semibold'
                  : 'text-[#735616] bg-[#ffdea5]/50 hover:bg-[#ffdea5]'
              }`}
            >
              <Shield size={14} aria-hidden="true" />
              Admin Portal
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate('login')}
            aria-current={currentScreen === 'login' ? 'page' : undefined}
            aria-label="Login and account access portal"
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              currentScreen === 'login'
                ? 'bg-[#1b1c1a] text-white'
                : 'text-[#574239] hover:bg-[#efeeea] border border-[#dec0b4]/50'
            }`}
          >
            <User size={13} aria-hidden="true" />
            <span>Login / Switch</span>
          </button>
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {/* Direct Artisan Messaging trigger */}
          <button
            type="button"
            onClick={handleOpenGeneralChat}
            aria-label="Open Direct Artisan Messaging and Delivery Coordination"
            className="text-[#9c3d00] hover:bg-[#ffdbcc]/50 p-2 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            title="Chat with Artisan"
          >
            <MessageSquare size={20} aria-hidden="true" />
            {chatMessages.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#4b6360] text-white text-[10px] rounded-full flex items-center justify-center font-bold" aria-hidden="true">
                {chatMessages.length}
              </span>
            )}
          </button>

          {/* Wishlist quick link */}
          <button
            type="button"
            onClick={() => navigate('search')}
            aria-label={`Saved favorites, ${favorites.length} items saved`}
            className="text-[#9c3d00] hover:bg-[#efeeea] p-2 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            <Heart size={20} className={favorites.length > 0 ? 'fill-[#bd5419] text-[#bd5419]' : ''} aria-hidden="true" />
            {favorites.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#bd5419] text-white text-[10px] rounded-full flex items-center justify-center font-bold" aria-hidden="true">
                {favorites.length}
              </span>
            )}
          </button>

          {/* Notifications Trigger */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-haspopup="dialog"
              aria-expanded={showNotifications}
              aria-label={`Notifications, ${unreadNotificationCount} unread update${unreadNotificationCount === 1 ? '' : 's'}`}
              className="text-[#9c3d00] hover:bg-[#efeeea] p-2 rounded-full transition-colors relative focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            >
              <Bell size={20} aria-hidden="true" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#ba1a1a] text-white text-[10px] rounded-full flex items-center justify-center font-bold animate-pulse" aria-hidden="true">
                  {unreadNotificationCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                role="dialog"
                aria-label="Activity and notification updates"
                className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#dec0b4]/60 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#dec0b4]/30">
                  <div className="font-semibold text-sm text-[#1b1c1a] flex items-center gap-1.5">
                    <Bell size={16} className="text-[#bd5419]" aria-hidden="true" />
                    Activity & Updates
                  </div>
                  {unreadNotificationCount > 0 && (
                    <button
                      type="button"
                      onClick={markAllNotificationsRead}
                      aria-label="Mark all notifications as read"
                      className="text-xs text-[#bd5419] hover:underline font-medium focus:outline-none"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2 no-scrollbar" role="feed" aria-label="Notifications feed">
                  {notifications.length === 0 ? (
                    <p className="text-center text-xs text-[#8a7268] py-6">No notifications yet</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        role="article"
                        aria-label={`Notification: ${notif.title}`}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            markNotificationAsRead(notif.id);
                            if (notif.targetScreen) {
                              navigate(notif.targetScreen, {
                                customRequestId: notif.targetId,
                                orderId: notif.targetId
                              });
                            }
                            setShowNotifications(false);
                          }
                        }}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          if (notif.targetScreen) {
                            navigate(notif.targetScreen, {
                              customRequestId: notif.targetId,
                              orderId: notif.targetId
                            });
                          }
                          setShowNotifications(false);
                        }}
                        className={`p-3 rounded-xl border transition-colors cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                          notif.read
                            ? 'bg-[#fbf9f5] border-[#eae8e4] text-[#574239]'
                            : 'bg-[#ffdbcc]/20 border-[#dec0b4] text-[#1b1c1a]'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-semibold text-xs text-[#9c3d00]">{notif.title}</span>
                          <span className="text-[10px] text-[#8a7268]">{notif.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#574239] leading-relaxed">{notif.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon */}
          <button
            type="button"
            onClick={() => navigate('cart')}
            aria-label={`Shopping cart with ${cartItemsCount} item${cartItemsCount === 1 ? '' : 's'}`}
            className="flex items-center gap-1.5 bg-[#ffdbcc]/60 hover:bg-[#ffdbcc] text-[#9c3d00] px-3 py-1.5 rounded-full transition-colors ml-1 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            <ShoppingCart size={18} aria-hidden="true" />
            <span className="font-semibold">{cartItemsCount}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          id="mobile-primary-navigation"
          aria-label="Mobile Navigation Menu"
          className="md:hidden bg-white border-b border-[#dec0b4] px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200"
        >
          <button
            type="button"
            onClick={() => {
              navigate('search');
              setMobileMenuOpen(false);
            }}
            aria-current={currentScreen === 'search' ? 'page' : undefined}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#1b1c1a] hover:bg-[#f5f3ef] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            Explore Crafts (Search)
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('custom_request');
              setMobileMenuOpen(false);
            }}
            aria-current={currentScreen === 'custom_request' ? 'page' : undefined}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#9c3d00] bg-[#ffdbcc]/40 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            <span>Request Custom Creation</span>
            <Sparkles size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('orders_tracking');
              setMobileMenuOpen(false);
            }}
            aria-current={currentScreen === 'orders_tracking' ? 'page' : undefined}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#1b1c1a] hover:bg-[#f5f3ef] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            Orders & Live Tracking
          </button>
          <button
            type="button"
            onClick={() => {
              handleOpenGeneralChat();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#4b6360] hover:bg-[#f5f3ef] flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#4b6360]"
          >
            <span>Direct Artisan Messages</span>
            <MessageSquare size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('login');
              setMobileMenuOpen(false);
            }}
            aria-current={currentScreen === 'login' ? 'page' : undefined}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-[#bd5419] bg-[#ffdbcc]/30 flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            <span>Login / Persona Portal</span>
            <LogIn size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => {
              navigate('cart');
              setMobileMenuOpen(false);
            }}
            aria-current={currentScreen === 'cart' ? 'page' : undefined}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[#1b1c1a] hover:bg-[#f5f3ef] flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            <span>Shopping Cart ({cartItemsCount})</span>
            <ShoppingCart size={16} aria-hidden="true" />
          </button>
        </nav>
      )}
    </header>
  );
};
