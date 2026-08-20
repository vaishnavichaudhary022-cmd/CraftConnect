import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  X,
  ChevronDown,
  ArrowUpDown,
  Heart,
  Star,
  Sparkles,
  SlidersHorizontal,
  Check,
  Truck,
  MessageSquare,
  PackageCheck
} from 'lucide-react';
import { Product } from '../types';

export const SearchScreen: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedMaterial,
    setSelectedMaterial,
    selectedRegion,
    setSelectedRegion,
    selectedType,
    setSelectedType,
    inStockOnly,
    setInStockOnly,
    priceFilter,
    setPriceFilter,
    sortBy,
    setSortBy,
    resetFilters,
    navigate,
    favorites,
    toggleFavorite,
    formatPrice,
    openArtisanChat
  } = useApp();

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const categories = [
    { label: 'All Crafts', value: 'All' },
    { label: 'Crochet Crafts', value: 'Crochet Crafts' },
    { label: 'Wall Decor', value: 'Wall Decor' },
    { label: 'Sewing & Needlecraft', value: 'Sewing & Needlecraft' },
    { label: 'Terracotta & Pottery', value: 'Terracotta & Pottery' },
    { label: 'Home Décor & Candles', value: 'Home Décor' },
    { label: 'Textiles & Silk', value: 'Textiles & Silk' }
  ];

  const materials = [
    'All',
    'Organic Milk Cotton Yarn',
    '100% Breathable Combed Cotton',
    'MDF Base, Clay Dough & Mirrors',
    '100% Unbleached Cotton Cord',
    '100% Organic Raw Linen',
    'Natural Terracotta Clay',
    '100% Pure Soy Wax',
    '100% Pure Silk'
  ];

  const regions = ['All', 'Maharashtra', 'Gujarat & Maharashtra', 'Goa', 'Karnataka', 'West Bengal & Odisha', 'Rajasthan', 'Odisha'];
  const priceOptions = [
    { label: 'All Prices', value: 'All' },
    { label: 'Under $30', value: 'under30' },
    { label: '$30 - $60', value: '30to60' },
    { label: 'Over $60', value: 'over60' }
  ];
  const typeOptions = ['All', 'Ready-made', 'Customizable'];

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Search query match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesText =
          item.title.toLowerCase().includes(q) ||
          item.artisanName.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.material.toLowerCase().includes(q) ||
          item.region.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          (item.homeCraftTags && item.homeCraftTags.some((t) => t.toLowerCase().includes(q)));
        if (!matchesText) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) {
        return false;
      }

      // Material
      if (selectedMaterial !== 'All' && !item.material.toLowerCase().includes(selectedMaterial.toLowerCase())) {
        return false;
      }

      // Region
      if (selectedRegion !== 'All' && !item.region.toLowerCase().includes(selectedRegion.toLowerCase())) {
        return false;
      }

      // Type
      if (selectedType !== 'All') {
        const targetType = selectedType.toLowerCase();
        if (item.type !== targetType) return false;
      }

      // In Stock
      if (inStockOnly && !item.inStock) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under30' && item.price >= 30) return false;
      if (priceFilter === '30to60' && (item.price < 30 || item.price > 60)) return false;
      if (priceFilter === 'over60' && item.price <= 60) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return a.price - b.price;
      if (sortBy === 'price_desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // recommended
    });
  }, [
    products,
    searchQuery,
    selectedCategory,
    selectedMaterial,
    selectedRegion,
    selectedType,
    inStockOnly,
    priceFilter,
    sortBy
  ]);

  const handleCardClick = (product: Product) => {
    navigate('product_detail', { productId: product.id });
  };

  const handleDirectChat = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    openArtisanChat({
      artisanId: product.artisanId,
      artisanName: product.artisanName,
      artisanAvatar: product.artisanAvatar,
      productId: product.id,
      productTitle: product.title
    });
  };

  return (
    <main
      role="main"
      aria-label="Explore and search crafts catalog"
      className="max-w-7xl mx-auto px-4 md:px-12 pt-6 md:pt-10 pb-24 md:pb-16 animate-in fade-in duration-300"
    >
      {/* Search Input Area */}
      <div role="search" aria-label="Search crafts" className="mb-6 relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8a7268]" aria-hidden="true">
          <Search size={22} />
        </div>
        <input
          type="search"
          aria-label="Search crochet bouquets, wall decor, sewing crafts, artisans"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search handmade crochet, wall decor, sewing, pottery..."
          className="search-input w-full bg-[#f5f3ef] border-0 border-b-2 border-[#dec0b4] py-3.5 pl-12 pr-10 text-base font-normal text-[#1b1c1a] focus:ring-0 transition-colors focus:bg-transparent rounded-t-xl focus:border-[#bd5419]"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8a7268] hover:text-[#9c3d00] transition-colors focus:outline-none"
            aria-label="Clear search input"
          >
            <X size={20} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Category Pills Row */}
      <div className="mb-5 overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
                  isSelected
                    ? 'bg-[#bd5419] text-white shadow-sm'
                    : 'bg-[#f5f3ef] text-[#574239] hover:bg-[#eae8e4] border border-[#dec0b4]/50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Chips Toolbar */}
      <div role="toolbar" aria-label="Catalog filters" className="flex overflow-x-auto no-scrollbar gap-3 mb-8 pb-2 relative z-30">
        {/* Price Dropdown Chip */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
            aria-haspopup="listbox"
            aria-expanded={activeDropdown === 'price'}
            aria-label={`Filter by price. Current selection: ${priceFilter !== 'All' ? priceFilter : 'All prices'}`}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              priceFilter !== 'All'
                ? 'bg-[#bd5419] text-white border-[#bd5419]'
                : 'bg-[#4b6360]/10 text-[#1b1c1a] hover:bg-[#4b6360]/20 border-transparent'
            }`}
          >
            Price {priceFilter !== 'All' ? `(${priceFilter})` : ''}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
          {activeDropdown === 'price' && (
            <div role="listbox" aria-label="Select price range" className="absolute left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-[#dec0b4] p-2 z-40">
              {priceOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={priceFilter === opt.value}
                  onClick={() => {
                    setPriceFilter(opt.value);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                    priceFilter === opt.value ? 'bg-[#ffdbcc] text-[#9c3d00]' : 'hover:bg-[#f5f3ef]'
                  }`}
                >
                  {opt.label}
                  {priceFilter === opt.value && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Material Dropdown Chip */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === 'material' ? null : 'material')}
            aria-haspopup="listbox"
            aria-expanded={activeDropdown === 'material'}
            aria-label={`Filter by material. Current selection: ${selectedMaterial}`}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              selectedMaterial !== 'All'
                ? 'bg-[#bd5419] text-white border-[#bd5419]'
                : 'bg-[#4b6360]/10 text-[#1b1c1a] hover:bg-[#4b6360]/20 border-transparent'
            }`}
          >
            Material {selectedMaterial !== 'All' ? `(${selectedMaterial.split(' ')[0]})` : ''}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
          {activeDropdown === 'material' && (
            <div role="listbox" aria-label="Select craft material" className="absolute left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#dec0b4] p-2 z-40">
              {materials.map((mat) => (
                <button
                  key={mat}
                  type="button"
                  role="option"
                  aria-selected={selectedMaterial === mat}
                  onClick={() => {
                    setSelectedMaterial(mat);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                    selectedMaterial === mat ? 'bg-[#ffdbcc] text-[#9c3d00]' : 'hover:bg-[#f5f3ef]'
                  }`}
                >
                  {mat}
                  {selectedMaterial === mat && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Region Dropdown Chip */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === 'region' ? null : 'region')}
            aria-haspopup="listbox"
            aria-expanded={activeDropdown === 'region'}
            aria-label={`Filter by region. Current selection: ${selectedRegion}`}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              selectedRegion !== 'All'
                ? 'bg-[#bd5419] text-white border-[#bd5419]'
                : 'bg-[#4b6360]/10 text-[#1b1c1a] hover:bg-[#4b6360]/20 border-transparent'
            }`}
          >
            Region {selectedRegion !== 'All' ? `(${selectedRegion})` : ''}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
          {activeDropdown === 'region' && (
            <div role="listbox" aria-label="Select craft origin region" className="absolute left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#dec0b4] p-2 z-40">
              {regions.map((reg) => (
                <button
                  key={reg}
                  type="button"
                  role="option"
                  aria-selected={selectedRegion === reg}
                  onClick={() => {
                    setSelectedRegion(reg);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                    selectedRegion === reg ? 'bg-[#ffdbcc] text-[#9c3d00]' : 'hover:bg-[#f5f3ef]'
                  }`}
                >
                  {reg}
                  {selectedRegion === reg && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Ready vs Customizable Chip */}
        <div className="relative flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveDropdown(activeDropdown === 'type' ? null : 'type')}
            aria-haspopup="listbox"
            aria-expanded={activeDropdown === 'type'}
            aria-label={`Filter by craft type. Current selection: ${selectedType}`}
            className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
              selectedType !== 'All'
                ? 'bg-[#bd5419] text-white border-[#bd5419]'
                : 'bg-[#4b6360]/10 text-[#1b1c1a] hover:bg-[#4b6360]/20 border-transparent'
            }`}
          >
            Type {selectedType !== 'All' ? `(${selectedType})` : ''}
            <ChevronDown size={14} aria-hidden="true" />
          </button>
          {activeDropdown === 'type' && (
            <div role="listbox" aria-label="Select product type" className="absolute left-0 mt-2 w-44 bg-white rounded-xl shadow-xl border border-[#dec0b4] p-2 z-40">
              {typeOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="option"
                  aria-selected={selectedType === t}
                  onClick={() => {
                    setSelectedType(t);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                    selectedType === t ? 'bg-[#ffdbcc] text-[#9c3d00]' : 'hover:bg-[#f5f3ef]'
                  }`}
                >
                  {t}
                  {selectedType === t && <Check size={14} aria-hidden="true" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* In Stock Toggle */}
        <button
          type="button"
          aria-pressed={inStockOnly}
          onClick={() => setInStockOnly(!inStockOnly)}
          aria-label={`Toggle ready-to-ship in stock only. Currently ${inStockOnly ? 'enabled' : 'disabled'}`}
          className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-medium transition-colors border focus:outline-none focus:ring-2 focus:ring-[#bd5419] ${
            inStockOnly
              ? 'bg-[#bd5419] text-white border-[#bd5419]'
              : 'bg-[#4b6360]/10 text-[#1b1c1a] hover:bg-[#4b6360]/20 border-transparent'
          }`}
        >
          Ready to Ship
        </button>

        {/* Reset Filters */}
        {(selectedCategory !== 'All' ||
          selectedMaterial !== 'All' ||
          selectedRegion !== 'All' ||
          selectedType !== 'All' ||
          inStockOnly ||
          priceFilter !== 'All' ||
          searchQuery) && (
          <button
            type="button"
            onClick={resetFilters}
            aria-label="Reset all search filters"
            className="flex-shrink-0 text-xs text-[#9c3d00] hover:underline px-2 py-2 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Results Count & Sort Bar */}
      <div className="flex justify-between items-center mb-6 pb-2 border-b border-[#dec0b4]/40">
        <h2 className="font-serif-craft text-xl font-bold text-[#1b1c1a]">
          {filteredProducts.length} Handcrafted Goods
        </h2>

        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="text-xs text-[#8a7268] hidden sm:inline">
            Sort by:
          </label>
          <select
            id="sort-select"
            aria-label="Sort product catalog"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#f5f3ef] border border-[#dec0b4]/80 rounded-xl px-3 py-1.5 text-xs text-[#1b1c1a] focus:ring-2 focus:ring-[#bd5419] focus:outline-none cursor-pointer"
          >
            <option value="recommended">Featured & Reviews</option>
            <option value="rating">Highest Rated</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div role="status" aria-live="polite" className="bg-white rounded-3xl p-12 text-center border border-[#dec0b4]/60 max-w-md mx-auto my-12 shadow-sm">
          <Search size={40} className="mx-auto text-[#dec0b4] mb-3" aria-hidden="true" />
          <h3 className="font-serif-craft text-xl font-bold text-[#1b1c1a] mb-1">No Crafts Matched</h3>
          <p className="text-xs text-[#574239] mb-4">
            Try adjusting your search keywords or resetting filters to discover more authentic handmade products.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            aria-label="Reset all search filters"
            className="px-5 py-2.5 rounded-full bg-[#bd5419] text-white text-xs font-semibold hover:bg-[#9c3d00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <section aria-label="Crafts product listings" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFav = favorites.includes(product.id);
            return (
              <article
                key={product.id}
                role="button"
                tabIndex={0}
                aria-label={`View details for ${product.title}, handcrafted by ${product.artisanName}, price ${formatPrice(product.price, product.priceInr)}`}
                onClick={() => handleCardClick(product)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(product);
                  }
                }}
                className="bg-white rounded-2xl overflow-hidden border border-[#dec0b4]/60 hover:border-[#bd5419] transition-all duration-300 hover:shadow-xl group flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-square w-full overflow-hidden bg-[#f5f3ef]">
                  <img
                    src={product.images[0]}
                    alt={`Handcrafted ${product.title} by ${product.artisanName}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Type and Porter badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    {product.type === 'customizable' ? (
                      <span className="px-2.5 py-1 rounded-full bg-[#bd5419] text-white text-[10px] font-bold tracking-wide shadow-sm">
                        Customizable
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-[#4b6360] text-white text-[10px] font-bold tracking-wide shadow-sm">
                        Ready to Ship
                      </span>
                    )}

                    {product.deliveryOptions?.porterAvailable && (
                      <span className="px-2 py-0.5 rounded-full bg-white/90 text-[#1b1c1a] text-[9.5px] font-bold backdrop-blur-xs flex items-center gap-1 border border-[#dec0b4]/60">
                        <Truck size={11} className="text-[#bd5419]" aria-hidden="true" />
                        Porter Express
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    aria-label={isFav ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#9c3d00] hover:bg-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <Heart size={16} className={isFav ? 'fill-[#bd5419] text-[#bd5419]' : ''} aria-hidden="true" />
                  </button>
                </div>

                {/* Card Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Region */}
                    <div className="flex items-center justify-between text-[11px] text-[#8a7268] mb-1">
                      <span>{product.category}</span>
                      <span>{product.region}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-craft font-bold text-sm text-[#1b1c1a] line-clamp-2 mb-2 group-hover:text-[#bd5419] transition-colors">
                      {product.title}
                    </h3>

                    {/* Tags */}
                    {product.homeCraftTags && product.homeCraftTags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2.5">
                        {product.homeCraftTags.slice(0, 2).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.2 bg-[#f5f3ef] text-[#574239] rounded text-[10px] font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* Artisan line */}
                    <div className="flex items-center gap-2 mb-3 pt-2 border-t border-[#eae8e4]">
                      <img
                        src={product.artisanAvatar}
                        alt={product.artisanName}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-[#574239] truncate">{product.artisanName}</span>
                    </div>

                    {/* Price and Action Row */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-base font-bold text-[#1b1c1a]">
                          {formatPrice(product.price, product.priceInr)}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] text-[#8a7268]">
                          <Star size={12} className="fill-[#bd5419] text-[#bd5419]" aria-hidden="true" />
                          <span className="font-semibold text-[#1b1c1a]">{product.rating}</span>
                          <span>({product.reviewCount})</span>
                        </div>
                      </div>

                      {/* Direct Chat with Artisan Button */}
                      <button
                        type="button"
                        onClick={(e) => handleDirectChat(e, product)}
                        aria-label={`Chat with ${product.artisanName} about ${product.title}`}
                        title="Chat about delivery or customization"
                        className="px-2.5 py-1.5 rounded-xl bg-[#ffdbcc]/60 hover:bg-[#ffdbcc] text-[#9c3d00] text-[11px] font-bold flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                      >
                        <MessageSquare size={13} aria-hidden="true" />
                        <span>Chat</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
};
