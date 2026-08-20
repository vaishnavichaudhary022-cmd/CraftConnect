import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Search, Sparkles, User, PackageCheck } from 'lucide-react';

export const BottomNavBar: React.FC = () => {
  const { currentScreen, navigate, role } = useApp();

  return (
    <nav
      role="navigation"
      aria-label="Mobile bottom navigation"
      className="md:hidden bg-white border-t border-[#eae8e4] shadow-[0px_-4px_20px_rgba(42,66,63,0.08)] fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-2 rounded-t-2xl"
    >
      {/* Home / Explore */}
      <button
        type="button"
        onClick={() => navigate('search')}
        aria-label="Go to Home"
        aria-current={currentScreen === 'search' || currentScreen === 'home' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center px-3 py-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded-xl ${
          currentScreen === 'search' || currentScreen === 'home'
            ? 'text-[#9c3d00]'
            : 'text-[#574239] hover:text-[#9c3d00]'
        }`}
      >
        <Home size={20} className={currentScreen === 'home' ? 'stroke-[2.5]' : 'stroke-2'} aria-hidden="true" />
        <span className="text-[11px] font-medium mt-1">Home</span>
      </button>

      {/* Search / Catalog (Active pill style from screenshot) */}
      <button
        type="button"
        onClick={() => navigate('search')}
        aria-label="Search and Explore Handicrafts Catalog"
        aria-current={currentScreen === 'search' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
          currentScreen === 'search'
            ? 'bg-[#bd5419] text-white shadow-sm scale-95'
            : 'text-[#574239] hover:text-[#9c3d00]'
        }`}
      >
        <Search size={20} className={currentScreen === 'search' ? 'stroke-[2.5]' : 'stroke-2'} aria-hidden="true" />
        <span className="text-[11px] font-medium mt-0.5">Search</span>
      </button>

      {/* Custom Request */}
      <button
        type="button"
        onClick={() => navigate('custom_request')}
        aria-label="Request a Custom Creation from Artisans"
        aria-current={currentScreen === 'custom_request' ? 'page' : undefined}
        className={`flex flex-col items-center justify-center px-4 py-1 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
          currentScreen === 'custom_request'
            ? 'bg-[#bd5419] text-white shadow-sm scale-95'
            : 'text-[#574239] hover:text-[#9c3d00]'
        }`}
      >
        <Sparkles size={20} className={currentScreen === 'custom_request' ? 'stroke-[2.5]' : 'stroke-2'} aria-hidden="true" />
        <span className="text-[11px] font-medium mt-0.5">Custom</span>
      </button>

      {/* Orders / Account / Role Portal */}
      <button
        type="button"
        onClick={() => {
          if (role === 'seller') {
            navigate('seller_dashboard');
          } else if (role === 'admin') {
            navigate('admin_portal');
          } else {
            navigate('orders_tracking');
          }
        }}
        aria-label={
          role === 'seller'
            ? 'Artisan Studio Dashboard'
            : role === 'admin'
            ? 'Admin Governance Portal'
            : 'Orders and Live Tracking'
        }
        aria-current={
          currentScreen === 'orders_tracking' || currentScreen === 'seller_dashboard' || currentScreen === 'admin_portal'
            ? 'page'
            : undefined
        }
        className={`flex flex-col items-center justify-center px-3 py-1 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded-xl ${
          currentScreen === 'orders_tracking' || currentScreen === 'seller_dashboard' || currentScreen === 'admin_portal'
            ? 'text-[#9c3d00] font-bold'
            : 'text-[#574239] hover:text-[#9c3d00]'
        }`}
      >
        {role === 'customer' ? (
          <PackageCheck size={20} aria-hidden="true" />
        ) : (
          <User size={20} aria-hidden="true" />
        )}
        <span className="text-[11px] font-medium mt-1">
          {role === 'seller' ? 'Studio' : role === 'admin' ? 'Admin' : 'Orders'}
        </span>
      </button>
    </nav>
  );
};

