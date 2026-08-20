import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowLeft,
  Check
} from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';

export const CartScreen: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    formatPrice,
    navigate
  } = useApp();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 0 ? 0 : 0; // Free artisan shipping
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'CRAFT10' || promoCode.trim().toUpperCase() === 'HANDMADE') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "CRAFT10" for 10% off!');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center animate-in fade-in duration-300">
        <div className="w-20 h-20 bg-[#ffdbcc]/40 text-[#bd5419] rounded-full flex items-center justify-center mx-auto mb-4">
          <ShoppingBag size={36} />
        </div>
        <h2 className="font-serif-craft text-2xl md:text-3xl font-bold text-[#1b1c1a] mb-2">
          Your Craft Basket is Empty
        </h2>
        <p className="text-sm text-[#574239] max-w-md mx-auto mb-8 leading-relaxed">
          Explore handmade terracotta pottery, Sambalpuri handloom silks, and custom artisanal treasures.
        </p>
        <button
          onClick={() => navigate('search')}
          className="px-8 py-3.5 rounded-full bg-[#bd5419] hover:bg-[#9c3d00] text-white font-semibold text-sm shadow-md transition-colors"
        >
          Explore Handcrafted Catalog
        </button>
      </div>
    );
  }

  return (
    <main role="main" aria-label="Shopping Cart and Order Summary" className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12 pb-24 md:pb-16 animate-in fade-in duration-300">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#eae8e4]">
        <button
          type="button"
          onClick={() => navigate('search')}
          aria-label="Continue browsing handmade crafts"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#574239] hover:text-[#9c3d00] focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded px-1.5 py-1"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Continue Browsing Crafts
        </button>
        <h2 className="font-serif-craft text-2xl font-bold text-[#1b1c1a]">
          Your Shopping Basket ({cart.reduce((a, b) => a + b.quantity, 0)})
        </h2>
        <button
          type="button"
          onClick={clearCart}
          aria-label="Clear all items from basket"
          className="text-xs text-[#ba1a1a] hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-[#ba1a1a] rounded px-1.5 py-1"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Cart Items List (7 cols) */}
        <section aria-label="Items in your shopping basket" className="lg:col-span-7 space-y-4">
          {cart.map(({ product, quantity }) => (
            <article
              key={product.id}
              aria-label={`${product.title} by ${product.artisanName}, quantity ${quantity}`}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#dec0b4]/40 flex gap-4 md:gap-6 items-center"
            >
              {/* Product Thumbnail */}
              <button
                type="button"
                onClick={() => navigate('product_detail', { productId: product.id })}
                aria-label={`View details for ${product.title}`}
                className="w-20 h-24 md:w-28 md:h-32 bg-[#efeeea] rounded-xl overflow-hidden shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
              >
                <img
                  src={product.images[0]}
                  alt={`Thumbnail of ${product.title}`}
                  className="w-full h-full object-cover"
                />
              </button>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3
                    onClick={() => navigate('product_detail', { productId: product.id })}
                    className="font-serif-craft font-semibold text-base md:text-lg text-[#1b1c1a] truncate cursor-pointer hover:text-[#9c3d00]"
                  >
                    {product.title}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeFromCart(product.id)}
                    className="text-[#8a7268] hover:text-[#ba1a1a] p-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ba1a1a] rounded"
                    aria-label={`Remove ${product.title} from basket`}
                  >
                    <Trash2 size={16} aria-hidden="true" />
                  </button>
                </div>

                <p className="text-xs text-[#574239] mb-1">By {product.artisanName}</p>
                <p className="text-[11px] text-[#4b6360] font-medium mb-3">{product.region}</p>

                <div className="flex justify-between items-center">
                  {/* Quantity Stepper */}
                  <div
                    role="group"
                    aria-label={`Quantity controls for ${product.title}`}
                    className="flex items-center border border-[#dec0b4] rounded-full overflow-hidden bg-[#fbf9f5]"
                  >
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, -1)}
                      aria-label={`Decrease quantity of ${product.title}`}
                      className="p-1.5 md:px-2.5 hover:bg-[#efeeea] text-[#574239] focus:outline-none focus:bg-[#efeeea]"
                    >
                      <Minus size={14} aria-hidden="true" />
                    </button>
                    <span aria-live="polite" className="px-3 text-xs font-bold text-[#1b1c1a]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateCartQuantity(product.id, 1)}
                      aria-label={`Increase quantity of ${product.title}`}
                      className="p-1.5 md:px-2.5 hover:bg-[#efeeea] text-[#574239] focus:outline-none focus:bg-[#efeeea]"
                    >
                      <Plus size={14} aria-hidden="true" />
                    </button>
                  </div>

                  <span className="font-serif-craft font-bold text-base md:text-lg text-[#bd5419]">
                    {formatPrice(product.price * quantity, product.priceInr ? product.priceInr * quantity : undefined)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Order Summary & Checkout Action (5 cols) */}
        <section aria-labelledby="order-summary-heading" className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dec0b4]/50">
            <h3 id="order-summary-heading" className="font-serif-craft text-xl font-bold text-[#1b1c1a] mb-4 pb-2 border-b border-[#eae8e4]">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} aria-label="Promotional coupon form" className="mb-6 flex gap-2">
              <label htmlFor="promo-code-input" className="sr-only">Promotional Discount Code</label>
              <input
                id="promo-code-input"
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo code (e.g. CRAFT10)"
                aria-label="Promotional Discount Code"
                className="flex-1 p-2.5 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl text-xs uppercase outline-none focus:border-[#bd5419]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#4b6360] hover:bg-[#334b48] text-white text-xs font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-[#4b6360]"
              >
                Apply
              </button>
            </form>

            {promoApplied && (
              <div role="status" aria-live="polite" className="mb-4 p-2.5 bg-emerald-50 text-emerald-800 rounded-lg text-xs flex items-center justify-between border border-emerald-200">
                <span className="flex items-center gap-1 font-medium">
                  <Check size={14} aria-hidden="true" /> 10% Artisan Coupon Applied
                </span>
                <span className="font-bold">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            {/* Price Line Items */}
            <div className="space-y-3 text-sm text-[#574239] pb-4 border-b border-[#eae8e4]">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1b1c1a]">{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="flex items-center gap-1">
                  Artisan Direct Shipping <Truck size={14} className="text-[#bd5419]" aria-hidden="true" />
                </span>
                <span className="text-emerald-700 font-semibold uppercase text-xs">Free</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline py-4 mb-6">
              <span className="font-serif-craft font-bold text-lg text-[#1b1c1a]">Grand Total</span>
              <span className="font-serif-craft font-bold text-2xl text-[#bd5419]">
                {formatPrice(grandTotal)}
              </span>
            </div>

            {/* Checkout Trigger */}
            <button
              type="button"
              onClick={() => setCheckoutModalOpen(true)}
              aria-haspopup="dialog"
              aria-label={`Proceed to secure checkout for ${formatPrice(grandTotal)}`}
              className="w-full bg-[#bd5419] hover:bg-[#9c3d00] text-white font-semibold text-base py-4 rounded-full shadow-[0px_4px_20px_rgba(42,66,63,0.15)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            >
              Proceed to Secure Checkout <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Guarantee Box */}
          <div className="bg-[#f5f3ef] rounded-2xl p-5 border border-[#dec0b4]/40 space-y-3 text-xs text-[#574239]">
            <div className="flex items-center gap-2 font-semibold text-[#1b1c1a]">
              <ShieldCheck size={16} className="text-[#bd5419]" aria-hidden="true" />
              Safe & Authentic Transactions
            </div>
            <p className="leading-relaxed text-[11px]">
              Every transaction supports indigenous artisan families directly. We secure all orders with verified craft insurance and live tracking.
            </p>
          </div>
        </section>
      </div>

      {/* Checkout Modal */}
      {checkoutModalOpen && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          totalAmount={grandTotal}
        />
      )}
    </main>
  );
};
