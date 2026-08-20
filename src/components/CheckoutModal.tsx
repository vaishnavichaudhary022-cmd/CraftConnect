import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CreditCard,
  QrCode,
  Truck,
  ShieldCheck,
  CheckCircle,
  Sparkles,
  Lock,
  Package,
  MessageSquare,
  Clock
} from 'lucide-react';
import { ShippingAddress, DeliveryMethod } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  totalAmount
}) => {
  const { createOrderFromCart, formatPrice, navigate, openArtisanChat, cart } = useApp();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: 'Priya Sen',
    street: 'Flat 402, Lotus Orchid, Palm Avenue',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    phone: '+91 98201 44521'
  });

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('porter');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('782');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const deliveryFee = deliveryMethod === 'porter' ? 6 : 3;
  const finalTotal = totalAmount + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = createOrderFromCart(address, paymentMethod, deliveryMethod);
      onClose();
      navigate('orders_tracking', { orderId: newOrder.id });
    }, 1200);
  };

  const handleChatWithFirstArtisan = () => {
    if (cart.length > 0) {
      const firstItem = cart[0].product;
      openArtisanChat({
        artisanId: firstItem.artisanId,
        artisanName: firstItem.artisanName,
        artisanAvatar: firstItem.artisanAvatar,
        productId: firstItem.id,
        productTitle: firstItem.title
      });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#dec0b4] max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-4 md:p-5 bg-[#fbf9f5] border-b border-[#eae8e4] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Lock size={18} className="text-[#bd5419]" aria-hidden="true" />
            <h2 id="checkout-modal-title" className="font-serif-craft text-xl font-bold text-[#1b1c1a]">
              Artisan Checkout & Delivery
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout modal"
            className="p-1.5 rounded-full hover:bg-[#efeeea] text-[#574239] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handlePlaceOrder} className="p-6 overflow-y-auto space-y-5">
          {/* Shipping Address */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 id="delivery-address-heading" className="font-serif-craft text-sm font-bold text-[#1b1c1a]">
                1. Delivery Destination
              </h3>
              <button
                type="button"
                onClick={() =>
                  setAddress({
                    fullName: 'Aarav Mehta',
                    street: '72 Heritage Heights, Indiranagar',
                    city: 'Bengaluru',
                    state: 'Karnataka',
                    pincode: '560038',
                    phone: '+91 99887 76655'
                  })
                }
                className="text-[11px] text-[#bd5419] hover:underline font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded"
              >
                Auto-fill Address
              </button>
            </div>

            <div role="group" aria-labelledby="delivery-address-heading" className="space-y-2.5 text-xs">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label htmlFor="checkout-fullname" className="block text-[#574239] font-medium mb-1">Full Name</label>
                  <input
                    id="checkout-fullname"
                    type="text"
                    required
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    className="w-full p-2.5 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl outline-none focus:border-[#bd5419]"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="block text-[#574239] font-medium mb-1">Phone Number</label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    required
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    className="w-full p-2.5 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl outline-none focus:border-[#bd5419]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="checkout-street" className="block text-[#574239] font-medium mb-1">Street Address</label>
                <input
                  id="checkout-street"
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  className="w-full p-2.5 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl outline-none focus:border-[#bd5419]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <label htmlFor="checkout-city" className="block text-[#574239] font-medium mb-1">City</label>
                  <input
                    id="checkout-city"
                    type="text"
                    required
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    className="w-full p-2.5 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl outline-none focus:border-[#bd5419]"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-state" className="block text-[#574239] font-medium mb-1">State</label>
                  <input
                    id="checkout-state"
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full p-2.5 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl outline-none focus:border-[#bd5419]"
                  />
                </div>
                <div>
                  <label htmlFor="checkout-pincode" className="block text-[#574239] font-medium mb-1">PIN Code</label>
                  <input
                    id="checkout-pincode"
                    type="text"
                    required
                    value={address.pincode}
                    onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                    className="w-full p-2.5 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl outline-none focus:border-[#bd5419]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Method Choice (Porter vs Post) */}
          <div className="border-t border-[#eae8e4] pt-4">
            <div className="flex items-center justify-between mb-2">
              <h3 id="delivery-method-heading" className="font-serif-craft text-sm font-bold text-[#1b1c1a]">
                2. Choose Delivery Carrier
              </h3>
              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={handleChatWithFirstArtisan}
                  className="text-[11px] text-[#9c3d00] font-bold hover:underline flex items-center gap-1"
                >
                  <MessageSquare size={12} aria-hidden="true" />
                  Chat with Maker
                </button>
              )}
            </div>

            <div role="radiogroup" aria-labelledby="delivery-method-heading" className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              {/* Porter Option */}
              <button
                type="button"
                role="radio"
                aria-checked={deliveryMethod === 'porter'}
                aria-label="Porter Hyperlocal On-Demand Delivery: Same-Day Delivery, ₹120 or $6"
                onClick={() => setDeliveryMethod('porter')}
                className={`p-3.5 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                  deliveryMethod === 'porter'
                    ? 'border-[#bd5419] bg-[#ffdbcc]/30 shadow-xs'
                    : 'border-[#dec0b4] bg-[#fbf9f5] hover:bg-[#f5f3ef]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1b1c1a]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Porter Hyperlocal</span>
                  </div>
                  <span className="text-xs font-bold text-[#bd5419]">+$6 (₹120)</span>
                </div>
                <p className="text-[11px] text-[#574239] mb-1">
                  Same-day or next-day on-demand courier with live GPS rider tracking.
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  <Clock size={10} aria-hidden="true" /> Fast Delivery (3-5 hrs)
                </span>
              </button>

              {/* Post Option */}
              <button
                type="button"
                role="radio"
                aria-checked={deliveryMethod === 'post'}
                aria-label="India Speed Post Registered Parcel: 3 to 5 business days, ₹50 or $3"
                onClick={() => setDeliveryMethod('post')}
                className={`p-3.5 rounded-2xl border text-left transition-all focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                  deliveryMethod === 'post'
                    ? 'border-[#bd5419] bg-[#ffdbcc]/30 shadow-xs'
                    : 'border-[#dec0b4] bg-[#fbf9f5] hover:bg-[#f5f3ef]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#1b1c1a]">
                    <span className="w-2 h-2 rounded-full bg-[#bd5419]" />
                    <span>India Speed Post</span>
                  </div>
                  <span className="text-xs font-bold text-[#bd5419]">+$3 (₹50)</span>
                </div>
                <p className="text-[11px] text-[#574239] mb-1">
                  National Postal Service registered parcel with doorstep tracking code.
                </p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#574239] bg-[#efeeea] px-2 py-0.5 rounded-md">
                  <Package size={10} aria-hidden="true" /> 2-4 business days
                </span>
              </button>
            </div>

            <div>
              <label htmlFor="delivery-notes-input" className="block text-[11px] font-semibold text-[#574239] mb-1">
                Special Delivery Notes / Instructions for Artisan & Courier
              </label>
              <input
                id="delivery-notes-input"
                type="text"
                placeholder="e.g., Ring doorbell twice, deliver after 4 PM, please gift-wrap crochet item"
                value={deliveryNotes}
                onChange={(e) => setDeliveryNotes(e.target.value)}
                className="w-full p-2 bg-[#f5f3ef] border border-[#dec0b4] rounded-xl text-xs outline-none focus:border-[#bd5419]"
              />
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="border-t border-[#eae8e4] pt-4">
            <h3 id="payment-method-heading" className="font-serif-craft text-sm font-bold text-[#1b1c1a] mb-2">
              3. Payment Method
            </h3>

            <div role="radiogroup" aria-labelledby="payment-method-heading" className="grid grid-cols-3 gap-2 mb-3">
              <button
                type="button"
                role="radio"
                aria-checked={paymentMethod === 'card'}
                aria-label="Credit or Debit Card"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                  paymentMethod === 'card'
                    ? 'border-[#bd5419] bg-[#ffdbcc]/30 text-[#9c3d00]'
                    : 'border-[#dec0b4] bg-[#fbf9f5] text-[#574239]'
                }`}
              >
                <CreditCard size={16} aria-hidden="true" />
                <span>Card</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={paymentMethod === 'upi'}
                aria-label="UPI or QR payment"
                onClick={() => setPaymentMethod('upi')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                  paymentMethod === 'upi'
                    ? 'border-[#bd5419] bg-[#ffdbcc]/30 text-[#9c3d00]'
                    : 'border-[#dec0b4] bg-[#fbf9f5] text-[#574239]'
                }`}
              >
                <QrCode size={16} aria-hidden="true" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                role="radio"
                aria-checked={paymentMethod === 'cod'}
                aria-label="Pay on Delivery"
                onClick={() => setPaymentMethod('cod')}
                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                  paymentMethod === 'cod'
                    ? 'border-[#bd5419] bg-[#ffdbcc]/30 text-[#9c3d00]'
                    : 'border-[#dec0b4] bg-[#fbf9f5] text-[#574239]'
                }`}
              >
                <Truck size={16} aria-hidden="true" />
                <span>On Delivery</span>
              </button>
            </div>

            {/* Payment Fields */}
            {paymentMethod === 'card' && (
              <div className="bg-[#f5f3ef] p-3.5 rounded-xl space-y-2.5 text-xs border border-[#dec0b4]/40">
                <div>
                  <label htmlFor="checkout-cardnum" className="block text-[#574239] font-medium mb-1">Card Number</label>
                  <input
                    id="checkout-cardnum"
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2 bg-white border border-[#dec0b4] rounded-lg outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label htmlFor="checkout-cardexp" className="block text-[#574239] font-medium mb-1">Expiry</label>
                    <input
                      id="checkout-cardexp"
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full p-2 bg-white border border-[#dec0b4] rounded-lg outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="checkout-cardcvv" className="block text-[#574239] font-medium mb-1">CVV</label>
                    <input
                      id="checkout-cardcvv"
                      type="password"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full p-2 bg-white border border-[#dec0b4] rounded-lg outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="bg-[#f5f3ef] p-3 rounded-xl text-center space-y-1.5 border border-[#dec0b4]/40">
                <QrCode size={30} className="mx-auto text-[#bd5419]" aria-hidden="true" />
                <p className="text-xs font-semibold text-[#1b1c1a]">Instant UPI Auto-Verification</p>
                <p className="text-[11px] text-[#574239]">
                  Supports GPay, PhonePe, Paytm, and any UPI handle.
                </p>
              </div>
            )}

            {paymentMethod === 'cod' && (
              <div className="bg-[#f5f3ef] p-3 rounded-xl text-xs text-[#574239] border border-[#dec0b4]/40">
                Pay in cash or UPI scan when the {deliveryMethod === 'porter' ? 'Porter Driver' : 'Post Carrier'} arrives at your door.
              </div>
            )}
          </div>

          {/* Amount & Place Order Button */}
          <div className="border-t border-[#eae8e4] pt-3">
            <div className="space-y-1 mb-3 text-xs">
              <div className="flex justify-between text-[#574239]">
                <span>Items Subtotal:</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-[#574239]">
                <span>
                  {deliveryMethod === 'porter' ? 'Porter Hyperlocal Delivery:' : 'India Speed Post Delivery:'}
                </span>
                <span className="font-semibold">{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-1 border-t border-[#eae8e4]">
                <span className="font-bold text-sm text-[#1b1c1a]">Total to Authorize:</span>
                <span className="font-serif-craft text-xl font-bold text-[#bd5419]">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              aria-label={`Authorize and place order for ${formatPrice(finalTotal)}`}
              className="w-full bg-[#bd5419] hover:bg-[#9c3d00] text-white font-bold text-sm py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            >
              {isProcessing ? (
                <span className="flex items-center gap-2" role="status" aria-live="polite">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></span>
                  Booking Delivery with {deliveryMethod === 'porter' ? 'Porter' : 'India Post'}...
                </span>
              ) : (
                <>
                  <ShieldCheck size={18} aria-hidden="true" />
                  Place Order ({formatPrice(finalTotal)})
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
