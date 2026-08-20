import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { SearchScreen } from './components/SearchScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CustomRequestScreen } from './components/CustomRequestScreen';
import { CustomDetailScreen } from './components/CustomDetailScreen';
import { CartScreen } from './components/CartScreen';
import { OrdersTrackingScreen } from './components/OrdersTrackingScreen';
import { SellerDashboard } from './components/SellerDashboard';
import { AdminPortal } from './components/AdminPortal';
import { LoginScreen } from './components/LoginScreen';
import { Sparkles, Heart, Shield, Award, Mail } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentScreen, toastMessage, navigate } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'search':
        return <SearchScreen />;
      case 'product_detail':
        return <ProductDetailScreen />;
      case 'custom_request':
        return <CustomRequestScreen />;
      case 'custom_detail':
        return <CustomDetailScreen />;
      case 'cart':
        return <CartScreen />;
      case 'orders_tracking':
        return <OrdersTrackingScreen />;
      case 'seller_dashboard':
      case 'seller_custom_queue':
        return <SellerDashboard />;
      case 'admin_portal':
        return <AdminPortal />;
      case 'login':
        return <LoginScreen />;
      default:
        return <SearchScreen />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf9f5] text-[#1b1c1a] font-sans selection:bg-[#ffdbcc] selection:text-[#9c3d00]">
      {/* Top App Bar Header (Only shown when not on transactional product detail to match exact screenshots) */}
      {currentScreen !== 'product_detail' && <TopAppBar />}

      {/* Primary Screen View */}
      <div className="flex-1 flex flex-col">
        {renderScreen()}
      </div>

      {/* Global CraftConnect Footer */}
      {currentScreen !== 'product_detail' && (
        <footer
          role="contentinfo"
          aria-label="CraftConnect footer and platform information"
          className="bg-[#f5f3ef] border-t border-[#dec0b4]/50 py-12 px-4 md:px-12 text-[#574239] text-xs"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h3 className="font-serif-craft text-xl font-bold text-[#9c3d00]">
                CraftConnect
              </h3>
              <p className="text-[#8a7268] leading-relaxed text-xs">
                Bridging generational craft communities and conscious global collectors. 100% verified handmade provenance.
              </p>
              <div
                className="flex items-center gap-1.5 text-xs text-[#4b6360] font-semibold"
                aria-label="Geographical Indication GI Certified provenance guarantee"
              >
                <Award size={14} className="text-[#bd5419]" aria-hidden="true" />
                <span>Geographical Indication (GI) Certified</span>
              </div>
            </div>

            <div>
              <h4
                id="footer-traditions-heading"
                className="font-bold text-[#1b1c1a] mb-3 uppercase tracking-wider text-[11px]"
              >
                Artisanal Traditions
              </h4>
              <nav aria-labelledby="footer-traditions-heading">
                <ul className="space-y-2 text-[#574239]" role="list">
                  <li>
                    <button
                      onClick={() => navigate('search')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Explore Sambalpuri & Ikat Handloom crafts"
                    >
                      Sambalpuri & Ikat Handloom
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('search')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Explore Terracotta & Studio Pottery crafts"
                    >
                      Terracotta & Studio Pottery
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('search')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Explore Dhokra Lost-Wax Bell Metal crafts"
                    >
                      Dhokra Lost-Wax Bell Metal
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('search')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Explore Warli & Pattachitra Paintings"
                    >
                      Warli & Pattachitra Painting
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <h4
                id="footer-governance-heading"
                className="font-bold text-[#1b1c1a] mb-3 uppercase tracking-wider text-[11px]"
              >
                Platform Governance
              </h4>
              <nav aria-labelledby="footer-governance-heading">
                <ul className="space-y-2 text-[#574239]" role="list">
                  <li>
                    <button
                      onClick={() => navigate('admin_portal')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Learn about 100% Maker Escrow Protection"
                    >
                      100% Maker Escrow Protection
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('admin_portal')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Learn about Fair Price Commission Model"
                    >
                      Fair Price Commission Model
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('admin_portal')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Learn about Multi-tenant Guild Isolation architecture"
                    >
                      Multi-tenant Guild Isolation
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => navigate('custom_request')}
                      className="hover:text-[#9c3d00] transition-colors text-left focus:outline-none focus:underline"
                      aria-label="Access Direct Maker-Buyer Custom Chat"
                    >
                      Direct Maker-Buyer Chat
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <div>
              <h4
                id="footer-support-heading"
                className="font-bold text-[#1b1c1a] mb-3 uppercase tracking-wider text-[11px]"
              >
                Artisan Guild Support
              </h4>
              <p className="text-xs text-[#8a7268] mb-3">
                Need bespoke guidance or custom bridal handloom orders?
              </p>
              <nav aria-labelledby="footer-support-heading">
                <a
                  href="mailto:guild-desk@craftconnect.art"
                  aria-label="Email the artisan guild desk support at guild-desk@craftconnect.art"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#bd5419] hover:underline focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded-md px-1 py-0.5"
                >
                  <Mail size={14} aria-hidden="true" />
                  <span>guild-desk@craftconnect.art</span>
                </a>
              </nav>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 border-t border-[#dec0b4]/40 flex flex-col sm:flex-row justify-between items-center gap-3 text-[11px] text-[#8a7268]">
            <p>© {new Date().getFullYear()} CraftConnect Inc. Handcrafted with reverence for artisanal legacy.</p>
            <nav aria-label="Legal and policy links" className="flex gap-4">
              <button
                onClick={() => navigate('admin_portal')}
                className="hover:text-[#9c3d00] hover:underline focus:outline-none"
                aria-label="View Privacy Policy"
              >
                Privacy Policy
              </button>
              <span aria-hidden="true">•</span>
              <button
                onClick={() => navigate('admin_portal')}
                className="hover:text-[#9c3d00] hover:underline focus:outline-none"
                aria-label="View Terms of Craftsmanship"
              >
                Terms of Craftsmanship
              </button>
              <span aria-hidden="true">•</span>
              <button
                onClick={() => navigate('admin_portal')}
                className="hover:text-[#9c3d00] hover:underline focus:outline-none"
                aria-label="View Artisan Charter"
              >
                Artisan Charter
              </button>
            </nav>
          </div>
        </footer>
      )}

      {/* Bottom Nav Bar for Mobile */}
      <BottomNavBar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <aside
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="fixed bottom-20 md:bottom-8 right-6 z-50 bg-[#1b1c1a] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold border border-[#dec0b4]/20 animate-in slide-in-from-bottom-5 duration-300"
        >
          <Sparkles size={16} className="text-[#e9c176]" aria-hidden="true" />
          <span>{toastMessage}</span>
        </aside>
      )}
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
