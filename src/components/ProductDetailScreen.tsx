import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Share2,
  ShoppingBag,
  Sliders,
  ChevronDown,
  PlayCircle,
  Star,
  CheckCircle2,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Package,
  Clock,
  Compass
} from 'lucide-react';
import { Product, Review } from '../types';

export const ProductDetailScreen: React.FC = () => {
  const {
    products,
    selectedProductId,
    navigate,
    addToCart,
    formatPrice,
    favorites,
    toggleFavorite,
    reviews,
    addReview,
    openArtisanChat,
    showToast
  } = useApp();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [specsOpen, setSpecsOpen] = useState(true);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewComment, setReviewComment] = useState('');

  const isFav = favorites.includes(product.id);
  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: `Discover this authentic handmade "${product.title}" by ${product.artisanName} on CraftConnect.`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!');
    }
  };

  const handleCustomRequestSimilar = () => {
    navigate('custom_request');
  };

  const handleDirectChat = () => {
    openArtisanChat({
      artisanId: product.artisanId,
      artisanName: product.artisanName,
      artisanAvatar: product.artisanAvatar,
      productId: product.id,
      productTitle: product.title
    });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    addReview({
      productId: product.id,
      author: reviewAuthor.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      verifiedPurchase: true
    });

    setReviewAuthor('');
    setReviewComment('');
    setReviewModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col pb-24 md:pb-16 animate-in fade-in duration-300">
      {/* TopAppBar (Transactional - Nav hidden, Back button present) */}
      <header role="banner" className="bg-[#fbf9f5] border-b border-[#eae8e4] shadow-[0px_4px_20px_rgba(42,66,63,0.06)] sticky top-0 z-40 flex justify-between items-center px-4 md:px-12 w-full py-3.5">
        <button
          type="button"
          onClick={() => navigate('search')}
          className="text-[#574239] hover:bg-[#efeeea] rounded-full p-2 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          aria-label="Back to search and crafts catalog"
        >
          <ArrowLeft size={22} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => navigate('search')}
          aria-label="CraftConnect Home"
          className="font-serif-craft text-2xl md:text-3xl font-bold text-[#9c3d00] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded-lg px-2"
        >
          CraftConnect
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDirectChat}
            className="text-[#9c3d00] hover:bg-[#ffdbcc]/50 rounded-full p-2 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            aria-label={`Chat with maker ${product.artisanName}`}
            title="Chat with Maker"
          >
            <MessageSquare size={20} aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="text-[#574239] hover:bg-[#efeeea] rounded-full p-2 transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            aria-label={`Share ${product.title}`}
          >
            <Share2 size={20} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main role="main" aria-label={`Product details for ${product.title}`} className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-12 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Image Gallery (Left Column - 7 Cols on desktop) */}
          <section aria-label="Product media gallery" className="md:col-span-7 flex flex-col gap-4">
            {/* Primary Large Image */}
            <div className="relative w-full aspect-[4/5] md:aspect-square bg-[#f5f3ef] rounded-3xl overflow-hidden shadow-[0px_4px_20px_rgba(42,66,63,0.08)] border border-[#dec0b4]/60">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={`Main view: ${product.title}, handcrafted with ${product.material} by ${product.artisanName}`}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <button
                type="button"
                aria-pressed={isFav}
                aria-label={isFav ? `Remove ${product.title} from favorites` : `Save ${product.title} to favorites`}
                onClick={() => toggleFavorite(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-md transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                  isFav
                    ? 'bg-white text-[#9c3d00]'
                    : 'bg-white/80 text-[#8a7268] hover:text-[#9c3d00]'
                }`}
              >
                <Heart size={20} className={isFav ? 'fill-[#9c3d00]' : ''} aria-hidden="true" />
              </button>

              <div className="absolute bottom-4 left-4 flex flex-col gap-2">
                {product.type === 'customizable' && (
                  <div
                    aria-label="Customization is available for this product"
                    className="bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-xs font-bold text-[#4b6360] shadow-sm flex items-center gap-1.5 border border-[#dec0b4]"
                  >
                    <Sparkles size={14} className="text-[#bd5419]" aria-hidden="true" />
                    Customization Available
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails Row (4 items) */}
            <div role="group" aria-label="Product image thumbnails" className="grid grid-cols-4 gap-2 md:gap-4">
              {product.images.map((imgUrl, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View photo ${idx + 1} of ${product.title}`}
                  aria-pressed={activeImageIndex === idx}
                  className={`aspect-square bg-[#f5f3ef] rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                    activeImageIndex === idx
                      ? 'border-2 border-[#bd5419] shadow-sm scale-100'
                      : 'opacity-70 hover:opacity-100 border border-[#dec0b4]/40'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.title} angle ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {/* 4th Thumbnail - Video / Craft Process Demo Modal */}
              <button
                type="button"
                onClick={() => setVideoModalOpen(true)}
                aria-haspopup="dialog"
                aria-label={`Open craft demonstration video for ${product.title}`}
                className="aspect-square bg-[#e4e2de] rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer opacity-85 hover:opacity-100 transition-all hover:bg-[#dec0b4]/40 text-[#574239] group border border-dashed border-[#8a7268]/40 focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
              >
                <PlayCircle size={30} className="text-[#9c3d00] group-hover:scale-110 transition-transform mb-1" aria-hidden="true" />
                <span className="text-[11px] font-bold text-[#574239]">Studio Demo</span>
              </button>
            </div>
          </section>

          {/* Product Info (Right Column - 5 Cols on desktop) */}
          <section aria-label="Product purchase details" className="md:col-span-5 flex flex-col gap-5 md:pl-4 pt-2 md:pt-0">
            <div>
              {/* Category & Origin Tags */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-[#4b6360]/10 text-[#4b6360] text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
                <span className="bg-[#4b6360]/10 text-[#4b6360] text-xs font-semibold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  {product.region}
                </span>
                {product.inStock && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
                    <CheckCircle2 size={12} aria-hidden="true" /> In Stock ({product.stockCount} left)
                  </span>
                )}
              </div>

              {/* Title in Playfair Display */}
              <h1 className="font-serif-craft text-2xl md:text-3xl font-bold text-[#1b1c1a] leading-tight mb-2">
                {product.title}
              </h1>

              {/* Price in Terracotta Color */}
              <div className="flex items-baseline gap-3 mb-3">
                <span className="font-serif-craft text-2xl md:text-3xl font-bold text-[#bd5419]">
                  {formatPrice(product.price, product.priceInr)}
                </span>
                <span className="text-xs text-[#8a7268]">Direct Maker Fair Pricing</span>
              </div>

              {/* Rating summary */}
              <div
                aria-label={`Average rating: ${product.rating.toFixed(1)} out of 5 stars based on ${product.reviewCount} customer reviews`}
                className="flex items-center gap-2 pb-3 border-b border-[#eae8e4]"
              >
                <div className="flex text-[#e9c176]">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(product.rating) ? 'fill-[#e9c176]' : 'text-neutral-300'}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#1b1c1a]">{product.rating.toFixed(1)}</span>
                <span className="text-xs text-[#8a7268]">({product.reviewCount} verified reviews)</span>
              </div>
            </div>

            {/* Description */}
            <div className="text-sm text-[#574239] leading-relaxed">
              {product.description}
            </div>

            {/* Direct Delivery Options (Porter & Post) */}
            <div className="bg-[#f5f3ef] p-4 rounded-2xl border border-[#dec0b4]/60 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#1b1c1a]">
                <span className="flex items-center gap-1.5">
                  <Truck size={16} className="text-[#bd5419]" aria-hidden="true" />
                  Available Delivery Methods
                </span>
                <button
                  type="button"
                  onClick={handleDirectChat}
                  className="text-[11px] text-[#9c3d00] font-bold hover:underline"
                >
                  Ask maker about delivery
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white border border-[#dec0b4]/50">
                  <div className="flex items-center gap-1.5 font-bold text-[#1b1c1a] mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Porter Hyperlocal</span>
                  </div>
                  <p className="text-[11px] text-[#8a7268]">
                    {product.deliveryOptions?.porterEstimatedHours || 'Same-day / Express in Metro (3-5 hrs)'}
                  </p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-[#dec0b4]/50">
                  <div className="flex items-center gap-1.5 font-bold text-[#1b1c1a] mb-1">
                    <span className="w-2 h-2 rounded-full bg-[#bd5419]" />
                    <span>India Speed Post</span>
                  </div>
                  <p className="text-[11px] text-[#8a7268]">
                    {product.deliveryOptions?.postEstimatedDays || '2-4 business days insured parcel'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                aria-label={`Add ${product.title} to shopping basket for ${formatPrice(product.price, product.priceInr)}`}
                className="w-full bg-[#bd5419] hover:bg-[#9c3d00] text-white font-bold text-sm py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
              >
                <ShoppingBag size={18} className="stroke-[2.5]" aria-hidden="true" />
                Add to Cart
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDirectChat}
                  aria-label={`Connect with artisan ${product.artisanName} about delivery or questions`}
                  className="w-full bg-[#ffdbcc] hover:bg-[#ffcdb3] text-[#9c3d00] font-bold text-xs py-3 rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  <MessageSquare size={16} aria-hidden="true" />
                  Chat with Maker
                </button>

                <button
                  type="button"
                  onClick={handleCustomRequestSimilar}
                  aria-label={`Request custom commissioned piece inspired by ${product.title}`}
                  className="w-full border border-[#4b6360] text-[#4b6360] hover:bg-[#4b6360]/10 font-bold text-xs py-3 rounded-2xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4b6360]"
                >
                  <Sliders size={16} aria-hidden="true" />
                  Custom Inquiry
                </button>
              </div>
            </div>

            {/* Collapsible Accordion Specifications */}
            <div className="border-t border-[#dec0b4] pt-2">
              <button
                type="button"
                onClick={() => setSpecsOpen(!specsOpen)}
                aria-expanded={specsOpen}
                aria-controls="craft-specifications-panel"
                aria-label="Toggle craft specifications"
                className="w-full flex justify-between items-center font-serif-craft text-lg font-semibold text-[#1b1c1a] py-2 text-left focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded-lg px-1"
              >
                <span>Craft Specifications</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`text-[#8a7268] transition-transform duration-200 ${
                    specsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {specsOpen && (
                <div id="craft-specifications-panel" className="mt-2 text-xs text-[#574239] grid grid-cols-2 gap-y-2.5 gap-x-4 bg-[#f5f3ef] p-4 rounded-2xl border border-[#dec0b4]/40">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <React.Fragment key={k}>
                      <span className="font-semibold text-[#1b1c1a]">{k}:</span>
                      <span>{v}</span>
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Meet the Maker Section */}
        <section aria-labelledby="meet-maker-heading" className="mt-16 md:mt-24">
          <h2 id="meet-maker-heading" className="font-serif-craft text-2xl md:text-3xl font-bold text-[#1b1c1a] mb-6 text-center">
            Meet the Maker
          </h2>

          <div className="bg-white shadow-md rounded-3xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 mx-auto max-w-4xl border border-[#dec0b4]/60">
            {/* Maker Portrait with round ring */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shrink-0 border-4 border-[#fbf9f5] shadow-md">
              <img
                src={product.artisanAvatar}
                alt={`Portrait of master artisan ${product.artisanName}, ${product.artisanTitle}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Maker Story */}
            <div className="text-center md:text-left flex-1">
              <h3 className="font-serif-craft text-2xl font-bold text-[#1b1c1a] mb-0.5">
                {product.artisanName}
              </h3>
              <p className="text-xs font-bold text-[#9c3d00] mb-3 uppercase tracking-widest">
                {product.artisanTitle}
              </p>
              <p className="text-xs md:text-sm text-[#574239] leading-relaxed">
                {product.artisanBio}
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                <button
                  type="button"
                  onClick={handleDirectChat}
                  aria-label={`Open direct message channel with ${product.artisanName}`}
                  className="px-4 py-2 rounded-full bg-[#bd5419] text-white hover:bg-[#9c3d00] transition-colors text-xs font-bold flex items-center gap-1.5 shadow-xs focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  <MessageSquare size={14} aria-hidden="true" />
                  Connect & Message {product.artisanName.split(' ')[0]}
                </button>

                <button
                  type="button"
                  onClick={handleCustomRequestSimilar}
                  aria-label={`Request custom piece from master artisan ${product.artisanName}`}
                  className="px-4 py-2 rounded-full bg-[#ffdbcc] text-[#9c3d00] hover:bg-[#ffcdb3] transition-colors text-xs font-semibold flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  <Sparkles size={14} aria-hidden="true" />
                  Request Custom Commission
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews Section */}
        <section aria-labelledby="customer-reviews-heading" className="mt-14 max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 id="customer-reviews-heading" className="font-serif-craft text-2xl font-bold text-[#1b1c1a]">Customer Reviews</h2>
              <p className="text-xs text-[#8a7268]">Verified handmade purchases</p>
            </div>
            <button
              type="button"
              onClick={() => setReviewModalOpen(true)}
              aria-haspopup="dialog"
              aria-label="Write a customer review for this craft item"
              className="px-4 py-2 rounded-full border border-[#bd5419] text-[#bd5419] hover:bg-[#bd5419] hover:text-white transition-colors text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
            >
              Write a Review
            </button>
          </div>

          <div className="space-y-3" role="feed" aria-label="Customer reviews list">
            {productReviews.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl text-center text-xs text-[#8a7268] border border-[#eae8e4]">
                Be the first to review this artisanal handmade creation!
              </div>
            ) : (
              productReviews.map((rev) => (
                <div key={rev.id} role="article" aria-label={`Review by ${rev.author}, rating ${rev.rating} stars`} className="bg-white p-5 rounded-2xl shadow-xs border border-[#dec0b4]/50">
                  <div className="flex justify-between items-start mb-1.5">
                    <div>
                      <span className="font-semibold text-xs text-[#1b1c1a]">{rev.author}</span>
                      {rev.verifiedPurchase && (
                        <span className="ml-2 text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-medium border border-emerald-200">
                          Verified Buyer
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#8a7268]">{rev.date}</span>
                  </div>
                  <div className="flex text-[#e9c176] mb-2" aria-label={`Rated ${rev.rating} out of 5 stars`}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={13}
                        className={i < rev.rating ? 'fill-[#e9c176]' : 'text-neutral-200'}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[#574239] leading-relaxed">{rev.comment}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Video Demonstration Modal */}
      {videoModalOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="video-modal-title" className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#dec0b4]">
            <div className="p-4 bg-[#fbf9f5] border-b border-[#eae8e4] flex justify-between items-center">
              <div id="video-modal-title" className="font-serif-craft font-bold text-base text-[#9c3d00]">
                Artisan Studio Demonstration: {product.artisanName}
              </div>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close craft demonstration video"
                className="p-1.5 rounded-full hover:bg-[#efeeea] text-[#574239] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-neutral-900 rounded-2xl overflow-hidden relative flex flex-col items-center justify-center text-white">
                <img
                  src={product.images[0]}
                  alt="Process background of traditional artisan studio"
                  className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 text-center p-6 max-w-md">
                  <PlayCircle size={56} className="mx-auto text-[#e9c176] mb-3 animate-pulse" aria-hidden="true" />
                  <h4 className="font-serif-craft text-xl font-bold mb-2">Artisanal Handcrafting in Progress</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                    Watch master artisan {product.artisanName} hand-sculpt, stitch, and finish this item in her home workshop.
                  </p>
                  <span className="inline-block bg-[#bd5419] px-4 py-1.5 rounded-full text-xs font-semibold text-white">
                    4K Heritage Craft Recording
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-[#574239] leading-relaxed">
                Every piece is crafted completely by hand with generational master expertise and zero mass-production assembly lines.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Write Review Modal */}
      {reviewModalOpen && (
        <div role="dialog" aria-modal="true" aria-labelledby="review-modal-title" className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#dec0b4]">
            <h3 id="review-modal-title" className="font-serif-craft text-xl font-bold text-[#1b1c1a] mb-3">Review "{product.title}"</h3>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label htmlFor="review-author-input" className="block text-xs font-semibold text-[#574239] mb-1">Your Name</label>
                <input
                  id="review-author-input"
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={reviewAuthor}
                  onChange={(e) => setReviewAuthor(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#dec0b4] text-xs focus:border-[#bd5419] outline-none"
                />
              </div>

              <div>
                <label id="review-rating-label" className="block text-xs font-semibold text-[#574239] mb-1">Rating</label>
                <div role="radiogroup" aria-labelledby="review-rating-label" className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={reviewRating === star}
                      aria-label={`${star} star${star === 1 ? '' : 's'}`}
                      key={star}
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded"
                    >
                      <Star
                        size={22}
                        className={star <= reviewRating ? 'fill-[#e9c176] text-[#e9c176]' : 'text-neutral-300'}
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-feedback-input" className="block text-xs font-semibold text-[#574239] mb-1">Your Feedback</label>
                <textarea
                  id="review-feedback-input"
                  required
                  rows={3}
                  placeholder="Describe the craftsmanship, stitch tension, color accuracy, and Porter/Post delivery..."
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#dec0b4] text-xs focus:border-[#bd5419] outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReviewModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-[#dec0b4] text-xs font-semibold text-[#574239] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#bd5419] text-white text-xs font-semibold hover:bg-[#9c3d00] focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  Post Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
