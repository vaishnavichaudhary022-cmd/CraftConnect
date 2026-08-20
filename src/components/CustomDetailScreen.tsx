import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Sparkles,
  User,
  Calendar,
  DollarSign,
  Send,
  AlertCircle,
  Package,
  XCircle,
  ChevronRight
} from 'lucide-react';
import { CustomRequest } from '../types';

export const CustomDetailScreen: React.FC = () => {
  const {
    customRequests,
    selectedCustomRequestId,
    navigate,
    role,
    submitProposal,
    acceptProposal,
    rejectProposal,
    formatPrice
  } = useApp();

  const request = customRequests.find((r) => r.id === selectedCustomRequestId) || customRequests[0];

  // Artisan proposal input states
  const [proposalPrice, setProposalPrice] = useState<number>(180);
  const [proposalDays, setProposalDays] = useState<number>(14);
  const [proposalNote, setProposalNote] = useState(
    'I have reviewed your requirements and reference photos. I will prepare the clay/loom using traditional techniques and provide photo updates during the firing/dyeing process.'
  );

  if (!request) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-[#574239] mb-4">No custom request selected.</p>
        <button
          onClick={() => navigate('search')}
          className="px-6 py-2 rounded-full bg-[#bd5419] text-white text-sm font-semibold"
        >
          Explore Crafts
        </button>
      </div>
    );
  }

  const handleSellerSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    submitProposal(request.id, {
      sellerId: 'artisan-mrittika',
      sellerName: 'Studio Mrittika / Devika Meher',
      price: Number(proposalPrice),
      estimatedDays: Number(proposalDays),
      artisanNote: proposalNote
    });
  };

  const handleCustomerAccept = () => {
    const orderId = acceptProposal(request.id);
    if (orderId) {
      navigate('orders_tracking', { orderId });
    }
  };

  const handleCustomerReject = () => {
    rejectProposal(request.id);
  };

  const getStatusBadge = (status: CustomRequest['status']) => {
    switch (status) {
      case 'pending_review':
        return (
          <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold flex items-center gap-1">
            <Clock size={12} /> Artisan Reviewing Request
          </span>
        );
      case 'proposal_sent':
        return (
          <span className="px-3 py-1 rounded-full bg-[#ffdbcc] text-[#9c3d00] border border-[#dec0b4] text-xs font-bold flex items-center gap-1">
            <Sparkles size={12} /> Proposal Quote Received!
          </span>
        );
      case 'proposal_accepted':
      case 'in_crafting':
        return (
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold flex items-center gap-1">
            <CheckCircle size={12} /> Accepted & In Crafting
          </span>
        );
      case 'proposal_rejected':
        return (
          <span className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold flex items-center gap-1">
            <XCircle size={12} /> Proposal Declined
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <main role="main" aria-label={`Custom Request ${request.designTitle}`} className="max-w-5xl mx-auto px-4 md:px-8 py-8 pb-24 md:pb-16 animate-in fade-in duration-300">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#eae8e4]">
        <button
          onClick={() => {
            if (role === 'seller') navigate('seller_custom_queue');
            else navigate('orders_tracking');
          }}
          aria-label="Back to requests list"
          className="flex items-center gap-1.5 text-xs font-semibold text-[#574239] hover:text-[#9c3d00] focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded p-1"
        >
          <ArrowLeft size={16} aria-hidden="true" /> Back to Requests
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[#8a7268]">Request #{request.id.toUpperCase()}</span>
          {getStatusBadge(request.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Customer Specifications & Reference (7 Cols) */}
        <section aria-labelledby="custom-details-heading" className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[#dec0b4]/40">
            <h2 id="custom-details-heading" className="font-serif-craft text-2xl font-bold text-[#1b1c1a] mb-2">
              {request.designTitle}
            </h2>
            <p className="text-xs text-[#8a7268] mb-6">
              Requested by {request.customerName} • Occasion: {request.occasion.toUpperCase()}
            </p>

            <div className="p-4 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/30 mb-6">
              <h3 className="text-xs font-bold text-[#9c3d00] uppercase tracking-wider mb-2">
                Design Vision Description
              </h3>
              <p className="text-sm text-[#574239] leading-relaxed whitespace-pre-wrap">
                {request.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs mb-6">
              <div className="p-3 bg-[#fbf9f5] rounded-lg border border-[#eae8e4]">
                <span className="font-semibold text-[#1b1c1a] block mb-1">Color Palette:</span>
                <span className="text-[#574239]">{request.colorPreferences}</span>
              </div>
              <div className="p-3 bg-[#fbf9f5] rounded-lg border border-[#eae8e4]">
                <span className="font-semibold text-[#1b1c1a] block mb-1">Size / Dimensions:</span>
                <span className="text-[#574239]">{request.dimensions}</span>
              </div>
              <div className="p-3 bg-[#fbf9f5] rounded-lg border border-[#eae8e4]">
                <span className="font-semibold text-[#1b1c1a] block mb-1">Budget Target:</span>
                <span className="text-[#574239] font-medium">{request.budgetRange}</span>
              </div>
              <div className="p-3 bg-[#fbf9f5] rounded-lg border border-[#eae8e4]">
                <span className="font-semibold text-[#1b1c1a] block mb-1">Created Date:</span>
                <span className="text-[#574239]">{new Date(request.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Reference Image */}
            {request.referenceImageUrl && (
              <div>
                <h3 className="text-xs font-bold text-[#1b1c1a] uppercase tracking-wider mb-2">
                  Uploaded Reference Image
                </h3>
                <div className="rounded-xl overflow-hidden border border-[#dec0b4] max-w-sm aspect-square bg-[#efeeea]">
                  <img
                    src={request.referenceImageUrl}
                    alt={`Reference inspiration photo for ${request.designTitle}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Right Col: Proposal & Decision Hub (5 Cols) */}
        <section aria-label="Proposal and decision panel" className="lg:col-span-5 space-y-6">
          {/* Active Proposal Card (if proposal exists) */}
          {request.proposal ? (
            <div role="region" aria-label="Artisan Proposal Details" className="bg-white rounded-2xl p-6 shadow-[0px_4px_20px_rgba(42,66,63,0.08)] border-2 border-[#bd5419]/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#bd5419] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                Official Proposal
              </div>

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#ffdbcc] text-[#9c3d00] flex items-center justify-center font-bold" aria-hidden="true">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-[#1b1c1a]">{request.proposal.sellerName}</h3>
                  <p className="text-[11px] text-[#8a7268]">Master Artisan / Creator</p>
                </div>
              </div>

              <div className="bg-[#fbf9f5] p-4 rounded-xl border border-[#dec0b4]/40 mb-5">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs text-[#8a7268]">Proposed Custom Price:</span>
                  <span className="font-serif-craft text-2xl font-bold text-[#bd5419]">
                    {formatPrice(request.proposal.price)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-[#574239]">
                  <span>Estimated Crafting Time:</span>
                  <span className="font-semibold">{request.proposal.estimatedDays} Days</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-semibold text-[#1b1c1a] mb-1">Artisan's Note:</h4>
                <p className="text-xs text-[#574239] bg-[#f5f3ef] p-3 rounded-lg leading-relaxed italic">
                  "{request.proposal.artisanNote}"
                </p>
              </div>

              {/* Customer Decision Actions */}
              {request.status === 'proposal_sent' && (
                <div className="space-y-2.5">
                  <button
                    onClick={handleCustomerAccept}
                    aria-label={`Accept artisan proposal of ${formatPrice(request.proposal.price)} and place custom order`}
                    className="w-full bg-[#bd5419] hover:bg-[#9c3d00] text-white font-semibold text-sm py-3.5 rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <CheckCircle size={18} aria-hidden="true" />
                    Accept Proposal & Place Order ({formatPrice(request.proposal.price)})
                  </button>
                  <button
                    onClick={handleCustomerReject}
                    aria-label="Decline this artisan proposal"
                    className="w-full border border-[#ba1a1a] text-[#ba1a1a] hover:bg-red-50 font-semibold text-xs py-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#ba1a1a]"
                  >
                    Decline Proposal
                  </button>
                </div>
              )}

              {request.status === 'proposal_accepted' && request.linkedOrderId && (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center" role="status" aria-live="polite">
                  <p className="text-xs font-bold text-emerald-800 mb-2">
                    Proposal Accepted! Custom order is active.
                  </p>
                  <button
                    onClick={() => navigate('orders_tracking', { orderId: request.linkedOrderId })}
                    aria-label={`Track linked custom order #${request.linkedOrderId}`}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1 mx-auto focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    Track Custom Order <ChevronRight size={14} aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          ) : role === 'seller' ? (
            /* Seller Proposal Submission Form */
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dec0b4]">
              <h3 className="font-serif-craft text-lg font-bold text-[#1b1c1a] mb-2">
                Submit Artisan Proposal Quote
              </h3>
              <p className="text-xs text-[#574239] mb-4">
                Calculate your material, weaving/firing effort, and dispatch timeline.
              </p>

              <form onSubmit={handleSellerSubmitProposal} aria-label="Submit custom commission proposal quote" className="space-y-4">
                <div>
                  <label htmlFor="proposal-price-input" className="block text-xs font-semibold text-[#1b1c1a] mb-1">
                    Custom Price Quote ($ USD)
                  </label>
                  <input
                    id="proposal-price-input"
                    type="number"
                    min={10}
                    required
                    value={proposalPrice}
                    onChange={(e) => setProposalPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none font-semibold focus:ring-2 focus:ring-[#bd5419]"
                  />
                </div>

                <div>
                  <label htmlFor="proposal-days-input" className="block text-xs font-semibold text-[#1b1c1a] mb-1">
                    Estimated Crafting Time (Days)
                  </label>
                  <input
                    id="proposal-days-input"
                    type="number"
                    min={1}
                    max={60}
                    required
                    value={proposalDays}
                    onChange={(e) => setProposalDays(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-sm focus:border-[#bd5419] outline-none focus:ring-2 focus:ring-[#bd5419]"
                  />
                </div>

                <div>
                  <label htmlFor="proposal-note-input" className="block text-xs font-semibold text-[#1b1c1a] mb-1">
                    Artisan Personal Note / Technical Feasibility
                  </label>
                  <textarea
                    id="proposal-note-input"
                    rows={3}
                    required
                    value={proposalNote}
                    onChange={(e) => setProposalNote(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#dec0b4] text-xs focus:border-[#bd5419] outline-none resize-none leading-relaxed focus:ring-2 focus:ring-[#bd5419]"
                  />
                </div>

                <button
                  type="submit"
                  aria-label="Send official proposal quote to customer"
                  className="w-full bg-[#4b6360] hover:bg-[#334b48] text-white font-semibold text-sm py-3 rounded-full shadow-md transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#4b6360]"
                >
                  <Send size={16} aria-hidden="true" /> Send Official Proposal Quote
                </button>
              </form>
            </div>
          ) : (
            /* Customer Waiting State */
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#dec0b4]/40 text-center" role="status" aria-live="polite">
              <Clock size={36} className="mx-auto text-[#bd5419] mb-3 opacity-70 animate-pulse" aria-hidden="true" />
              <h3 className="font-serif-craft text-base font-bold text-[#1b1c1a] mb-1">
                Awaiting Artisan Review
              </h3>
              <p className="text-xs text-[#574239] leading-relaxed mb-4">
                Our master artisans have received your requirements and are calculating clay, glaze, or thread requirements. You will receive an in-app notification when the proposal quote is ready.
              </p>
              <div className="p-3 bg-[#f5f3ef] rounded-lg text-[11px] text-[#8a7268]">
                Average artisan response time: ~4 hours
              </div>
            </div>
          )}

          {/* Direct Assistance Card */}
          <aside aria-label="CraftConnect Guarantee" className="bg-[#f5f3ef] rounded-2xl p-5 border border-[#dec0b4]/40">
            <h4 className="font-semibold text-xs text-[#1b1c1a] mb-1 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#bd5419]" aria-hidden="true" /> CraftConnect Artisan Guarantee
            </h4>
            <p className="text-[11px] text-[#574239] leading-relaxed">
              Every custom order is protected by our CraftConnect Quality Guarantee. 100% genuine handcrafted materials, transparent pricing, and direct communication.
            </p>
          </aside>
        </section>
      </div>
    </main>
  );
};
