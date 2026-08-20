import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UploadCloud,
  Check,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Palette,
  Layers,
  Wrench,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';

export const CustomRequestScreen: React.FC = () => {
  const { createCustomRequest, navigate } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form states
  const [customerName, setCustomerName] = useState('Priya Sen');
  const [customerEmail, setCustomerEmail] = useState('priya.sen@example.com');
  const [designTitle, setDesignTitle] = useState('');
  const [description, setDescription] = useState('');
  const [occasion, setOccasion] = useState('home');
  const [budgetRange, setBudgetRange] = useState('150to300');
  const [colorPreferences, setColorPreferences] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [referenceImageUrl, setReferenceImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgEJdKjVPoXFZdh2HCBZUaLbFF-YKk89UPW59urLQo2KcSNL7VRtvUK0dBOQOADwOYm3apghk4DO6CxtRqpqW_MtL_pTZ5JFaHIlCahSVK7rMNicW2zdxVbsYUrMcDXqv-VAMd83xSieQ8u7MIxqvXGjb0KnQCBy3TUp30irsliLAVKEXHM1yHAtPKcka1osabZc94OPwkGv6TUbHRgYAw5kHYwGn6gpK6_-w2Fgqxw14Fqtg9Nhg'
  );
  const [category, setCategory] = useState('Terracotta & Pottery');
  const [customImageUploaded, setCustomImageUploaded] = useState(true);

  // Sample presets for quick demo fill
  const referencePresets = [
    {
      label: 'Rustic Terracotta Vase',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgEJdKjVPoXFZdh2HCBZUaLbFF-YKk89UPW59urLQo2KcSNL7VRtvUK0dBOQOADwOYm3apghk4DO6CxtRqpqW_MtL_pTZ5JFaHIlCahSVK7rMNicW2zdxVbsYUrMcDXqv-VAMd83xSieQ8u7MIxqvXGjb0KnQCBy3TUp30irsliLAVKEXHM1yHAtPKcka1osabZc94OPwkGv6TUbHRgYAw5kHYwGn6gpK6_-w2Fgqxw14Fqtg9Nhg',
      title: 'Hand-carved Geometric Terracotta Urn',
      desc: 'An urn with traditional tribal geometric incisions in ochre and white.',
      color: 'Burnt terracotta, antique white line motifs',
      size: '14" height x 8" diameter'
    },
    {
      label: 'Indigo Ikat Textile',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFDgUuO9Ld1e4VRDS4PLbtrqXJBlHVJMMgTnGZh2Nws-IFHE4K50Q-t457wh079wMZu9UmLogq-73eiwrBwG4Q-2RrqkvjRioFC7KeuWDCllwAG3m75TRQSNGV_qBNvXnHUb4vXE_cPdIgUCJa3C_K3BUEb8Acqw017FRzLOFtmpD7uEQEY6ijbLCrHCABNxPzmSzFRxb4WXYFxEja_sMoigv6je_b4dbAHDMvcNQ_fOaJ7R8dBR31',
      title: 'Custom Mulberry Silk Ikat Shawl',
      desc: 'Fine double-ikat diamond pattern with gold zari borders.',
      color: 'Midnight indigo, emerald green and metallic zari',
      size: '2 meters x 30 inches'
    },
    {
      label: 'Ceramic Serving Bowl',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsGr3nMmcQlxxqbNtmWXVmG_IvFeNNgH_XjUUH0lWL0jOwNUcnXVNDMMUDPfUtmoVcABeqvxMuzq6hVuLlijveSvuajv1gMqRf8kTG5NNRJvLxLve5Wl8dv1rgn3uwSM3LnYW8O9nJv-PtNhW0vY6aEPKCa17wVfQ5FATqAFrAQvUL-g1CBoiPuqL2NKqQJoucYP_EFPE-kG2fjoCxY8L3hRcus_o--kJSfhM_BCXUDeIRECbsWB66',
      title: 'Rustic Teal Glazed Clay Centerpiece',
      desc: 'A heavy hand-thrown bowl with reactive glaze crystallization.',
      color: 'Peacock teal glaze with raw earthenware lip',
      size: '10" diameter, 4" deep'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReferenceImageUrl(reader.result as string);
        setCustomImageUploaded(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyPreset = (preset: typeof referencePresets[0]) => {
    setReferenceImageUrl(preset.url);
    setDesignTitle(preset.title);
    setDescription(preset.desc);
    setColorPreferences(preset.color);
    setDimensions(preset.size);
    setCustomImageUploaded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please describe your custom design vision');
      return;
    }

    const titleToUse = designTitle.trim() || 'Custom Handcrafted Piece';

    const newReqId = createCustomRequest({
      customerName,
      customerEmail,
      designTitle: titleToUse,
      description,
      occasion,
      budgetRange,
      colorPreferences: colorPreferences || 'Artisan Discretion',
      dimensions: dimensions || 'Standard Handmade Dimensions',
      referenceImageUrl: referenceImageUrl,
      category
    });

    navigate('custom_detail', { customRequestId: newReqId });
  };

  return (
    <main role="main" aria-label="Request a Custom Creation" className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-12 py-8 md:py-12 pb-24 md:pb-16 animate-in fade-in duration-300">
      {/* Page Header matching HTML 3 */}
      <div className="mb-10 md:mb-14 text-center max-w-2xl mx-auto">
        <h2 className="font-serif-craft text-3xl md:text-5xl font-bold text-[#1b1c1a] mb-4">
          Request a Custom Creation
        </h2>
        <p className="text-base md:text-lg text-[#574239] leading-relaxed">
          Connect directly with our artisans to bring your unique vision to life. Share your ideas, and we'll craft something special just for you.
        </p>
      </div>

      {/* Bento Grid Layout matching HTML 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        {/* Form Area (8 cols on desktop) */}
        <section aria-labelledby="custom-form-heading" className="lg:col-span-8 bg-white shadow-[0px_4px_25px_rgba(42,66,63,0.08)] rounded-2xl p-6 md:p-10 border border-[#dec0b4]/40">
          <h3 id="custom-form-heading" className="sr-only">Custom Commission Request Multi-Step Form</h3>
          {/* Progress Tracker matching Screenshot 3 */}
          <nav aria-label="Commission form steps" className="flex items-center justify-between mb-10 w-full max-w-md mx-auto">
            {/* Step 1: Details */}
            <button
              type="button"
              onClick={() => setStep(1)}
              aria-label="Step 1: Project Details"
              aria-current={step === 1 ? 'step' : undefined}
              className="flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded p-1"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 1
                    ? 'bg-[#bd5419] text-white border-2 border-[#bd5419]'
                    : 'bg-[#fbf9f5] text-[#8a7268] border-2 border-[#8a7268]'
                }`}
              >
                {step > 1 ? <Check size={14} className="stroke-[3]" aria-hidden="true" /> : '1'}
              </div>
              <span className={`text-xs font-semibold mt-1.5 ${step >= 1 ? 'text-[#bd5419]' : 'text-[#8a7268]'}`}>
                Details
              </span>
            </button>

            {/* Line 1 */}
            <div className={`h-[2px] flex-grow mx-2 transition-colors ${step >= 2 ? 'bg-[#bd5419]' : 'bg-[#dec0b4]'}`} aria-hidden="true" />

            {/* Step 2: Design */}
            <button
              type="button"
              onClick={() => setStep(2)}
              aria-label="Step 2: Specific Details and References"
              aria-current={step === 2 ? 'step' : undefined}
              className="flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded p-1"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= 2
                    ? 'bg-[#bd5419] text-white border-2 border-[#bd5419]'
                    : 'bg-[#fbf9f5] text-[#8a7268] border-2 border-[#8a7268]'
                }`}
              >
                {step > 2 ? <Check size={14} className="stroke-[3]" aria-hidden="true" /> : '2'}
              </div>
              <span className={`text-xs font-semibold mt-1.5 ${step >= 2 ? 'text-[#bd5419]' : 'text-[#8a7268]'}`}>
                Design
              </span>
            </button>

            {/* Line 2 */}
            <div className={`h-[2px] flex-grow mx-2 transition-colors ${step >= 3 ? 'bg-[#bd5419]' : 'bg-[#dec0b4]'}`} aria-hidden="true" />

            {/* Step 3: Review */}
            <button
              type="button"
              onClick={() => setStep(3)}
              aria-label="Step 3: Review and Confirmation"
              aria-current={step === 3 ? 'step' : undefined}
              className="flex flex-col items-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#bd5419] rounded p-1"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step === 3
                    ? 'bg-[#bd5419] text-white border-2 border-[#bd5419]'
                    : 'bg-[#fbf9f5] text-[#8a7268] border-2 border-[#8a7268]'
                }`}
              >
                3
              </div>
              <span className={`text-xs font-semibold mt-1.5 ${step === 3 ? 'text-[#bd5419]' : 'text-[#8a7268]'}`}>
                Review
              </span>
            </button>
          </nav>

          {/* Preset Quick Inspiration Fill */}
          <div role="region" aria-label="Inspiration sample presets" className="mb-8 p-3.5 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]/50">
            <span className="text-xs font-semibold text-[#9c3d00] flex items-center gap-1.5 mb-2">
              <Sparkles size={14} aria-hidden="true" /> Quick Inspiration Sample Presets:
            </span>
            <div className="flex flex-wrap gap-2">
              {referencePresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  aria-label={`Apply preset: ${preset.label}`}
                  className="px-3 py-1 bg-white hover:bg-[#ffdbcc] hover:text-[#9c3d00] rounded-full text-xs font-medium border border-[#dec0b4] transition-colors focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                >
                  ✨ {preset.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} aria-label="Custom commission request form">
            {/* Step 1: Project Basics */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <h4 className="font-serif-craft text-xl md:text-2xl font-bold text-[#1b1c1a] border-b border-[#dec0b4] pb-2">
                  1. Project Basics
                </h4>

                {/* Craft Title */}
                <div>
                  <label htmlFor="custom-design-title" className="block text-sm font-semibold text-[#1b1c1a] mb-2">
                    Project Working Title
                  </label>
                  <input
                    id="custom-design-title"
                    type="text"
                    value={designTitle}
                    onChange={(e) => setDesignTitle(e.target.value)}
                    placeholder="E.g., Hand-painted Terracotta Wedding Urn"
                    className="w-full bg-[#f5f3ef] border-0 border-b border-[#dec0b4] text-[#1b1c1a] p-3 focus:bg-transparent rounded-t-md outline-none focus:border-[#bd5419]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="custom-description" className="block text-sm font-semibold text-[#1b1c1a] mb-2">
                    Design / Theme Description <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <textarea
                    id="custom-description"
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe what you have in mind. E.g., 'A hand-painted terracotta vase with floral motifs, traditional Warli borders, or custom ikat saree weave...'"
                    className="w-full bg-[#f5f3ef] border-0 border-b border-[#dec0b4] text-[#1b1c1a] p-3 resize-none focus:bg-transparent rounded-t-md outline-none focus:border-[#bd5419] leading-relaxed"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Occasion */}
                  <div>
                    <label htmlFor="custom-occasion-select" className="block text-sm font-semibold text-[#1b1c1a] mb-2">
                      Occasion
                    </label>
                    <select
                      id="custom-occasion-select"
                      value={occasion}
                      onChange={(e) => setOccasion(e.target.value)}
                      className="w-full bg-[#f5f3ef] border-0 border-b border-[#dec0b4] text-[#1b1c1a] p-3 appearance-none rounded-t-md outline-none focus:border-[#bd5419] cursor-pointer"
                    >
                      <option value="gift">Gift / Celebration</option>
                      <option value="wedding">Wedding / Ceremony</option>
                      <option value="home">Home Decor</option>
                      <option value="festive">Festive / Heritage Ritual</option>
                      <option value="other">Other Unique Occasion</option>
                    </select>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <label htmlFor="custom-budget-select" className="block text-sm font-semibold text-[#1b1c1a] mb-2">
                      Budget Range
                    </label>
                    <select
                      id="custom-budget-select"
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full bg-[#f5f3ef] border-0 border-b border-[#dec0b4] text-[#1b1c1a] p-3 appearance-none rounded-t-md outline-none focus:border-[#bd5419] cursor-pointer"
                    >
                      <option value="under50">Under $50 (₹4,000)</option>
                      <option value="50to150">$50 - $150 (₹4,000 - ₹12,500)</option>
                      <option value="150to300">$150 - $300 (₹12,500 - ₹25,000)</option>
                      <option value="over300">Over $300 (₹25,000+)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    aria-label="Continue to Specific Details"
                    className="bg-[#bd5419] hover:bg-[#9c3d00] text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-md transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    Continue to Specific Details <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Specific Details */}
            {step === 2 && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <h4 className="font-serif-craft text-xl md:text-2xl font-bold text-[#1b1c1a] border-b border-[#dec0b4] pb-2">
                  2. Specific Details & References
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Color Preferences */}
                  <div>
                    <label htmlFor="custom-color-pref" className="block text-sm font-semibold text-[#1b1c1a] mb-2">
                      Color Preferences
                    </label>
                    <input
                      id="custom-color-pref"
                      type="text"
                      value={colorPreferences}
                      onChange={(e) => setColorPreferences(e.target.value)}
                      placeholder="E.g., Earth tones, bright primary color, terracotta"
                      className="w-full bg-[#f5f3ef] border-0 border-b border-[#dec0b4] text-[#1b1c1a] p-3 rounded-t-md outline-none focus:bg-transparent focus:border-[#bd5419]"
                    />
                  </div>

                  {/* Dimensions */}
                  <div>
                    <label htmlFor="custom-dimensions-pref" className="block text-sm font-semibold text-[#1b1c1a] mb-2">
                      Size / Dimensions (Approx)
                    </label>
                    <input
                      id="custom-dimensions-pref"
                      type="text"
                      value={dimensions}
                      onChange={(e) => setDimensions(e.target.value)}
                      placeholder="E.g., 12 inches tall, medium size, 5.5m saree"
                      className="w-full bg-[#f5f3ef] border-0 border-b border-[#dec0b4] text-[#1b1c1a] p-3 rounded-t-md outline-none focus:bg-transparent focus:border-[#bd5419]"
                    />
                  </div>
                </div>

                {/* Reference Image Upload Dropzone matching HTML 3 */}
                <div>
                  <label htmlFor="custom-ref-file-input" className="block text-sm font-semibold text-[#1b1c1a] mb-2">
                    Reference Image (Optional)
                  </label>
                  
                  <label htmlFor="custom-ref-file-input" className="border-2 border-dashed border-[#dec0b4] rounded-2xl p-8 flex flex-col items-center justify-center bg-[#f5f3ef] hover:bg-[#eae8e4] transition-colors cursor-pointer group block text-center focus-within:ring-2 focus-within:ring-[#bd5419]">
                    <input
                      id="custom-ref-file-input"
                      type="file"
                      accept="image/*"
                      aria-label="Upload reference photo for custom commission"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <UploadCloud size={40} className="text-[#8a7268] mb-2 group-hover:text-[#bd5419] transition-colors mx-auto" aria-hidden="true" />
                    <p className="text-sm text-[#574239]">
                      Drag and drop an image, or <span className="text-[#bd5419] font-semibold underline">browse</span>
                    </p>
                    <p className="text-xs text-[#8a7268] mt-1">Supports JPG, PNG, WEBP (Max 5MB)</p>
                  </label>

                  {/* Uploaded Reference Preview Thumbnail matching Screenshot 3 */}
                  {customImageUploaded && referenceImageUrl && (
                    <div className="mt-4 flex items-center gap-4 p-3 bg-[#f5f3ef] rounded-xl border border-[#dec0b4]">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-[#dec0b4] shrink-0">
                        <img
                          src={referenceImageUrl}
                          alt="Uploaded reference artwork preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#1b1c1a] truncate">
                          Reference Image Attached
                        </p>
                        <p className="text-[11px] text-[#8a7268]">
                          Artisans will review this visual benchmark for pattern, texture, and palette accuracy.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setReferenceImageUrl('');
                          setCustomImageUploaded(false);
                        }}
                        className="p-1.5 rounded-full hover:bg-neutral-200 text-[#ba1a1a] focus:outline-none focus:ring-2 focus:ring-[#ba1a1a]"
                        aria-label="Remove attached reference image"
                      >
                        <X size={16} aria-hidden="true" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    aria-label="Back to project basics step"
                    className="border border-[#dec0b4] text-[#574239] hover:bg-[#f5f3ef] font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    aria-label="Proceed to review and confirmation step"
                    className="bg-[#bd5419] hover:bg-[#9c3d00] text-white font-semibold text-sm px-8 py-3.5 rounded-full shadow-md transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    Review & Confirmation <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h4 className="font-serif-craft text-xl md:text-2xl font-bold text-[#1b1c1a] border-b border-[#dec0b4] pb-2">
                  3. Review Your Custom Request
                </h4>

                <div className="bg-[#f5f3ef] p-6 rounded-2xl border border-[#dec0b4] space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h5 className="font-serif-craft text-lg font-bold text-[#1b1c1a]">
                        {designTitle || 'Custom Handmade Request'}
                      </h5>
                      <p className="text-xs text-[#8a7268]">
                        Category: {category} • Occasion: {occasion.toUpperCase()}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#ffdbcc] text-[#9c3d00] text-xs font-bold">
                      Budget: {budgetRange}
                    </span>
                  </div>

                  <p className="text-sm text-[#574239] leading-relaxed bg-white p-4 rounded-xl border border-[#dec0b4]/40">
                    "{description || 'No description provided'}"
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-semibold text-[#1b1c1a]">Color Palette:</span>
                      <p className="text-[#574239]">{colorPreferences || 'Open to artisan suggestion'}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#1b1c1a]">Dimensions / Size:</span>
                      <p className="text-[#574239]">{dimensions || 'Standard craft specs'}</p>
                    </div>
                  </div>

                  {referenceImageUrl && (
                    <div>
                      <span className="font-semibold text-xs text-[#1b1c1a] block mb-2">Attached Reference:</span>
                      <img
                        src={referenceImageUrl}
                        alt="Attached design reference preview"
                        className="w-24 h-24 object-cover rounded-xl border border-[#dec0b4]"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-6 border-t border-[#dec0b4] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    aria-label="Back to specific details step"
                    className="border border-[#dec0b4] text-[#574239] hover:bg-[#f5f3ef] font-semibold text-sm px-6 py-3 rounded-full flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    <ArrowLeft size={16} aria-hidden="true" /> Back
                  </button>

                  <button
                    type="submit"
                    aria-label="Submit custom commission request to artisan"
                    className="bg-[#bd5419] hover:bg-[#9c3d00] text-white font-semibold text-base px-8 py-4 rounded-full shadow-[0px_4px_20px_rgba(42,66,63,0.15)] hover:scale-[1.02] transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
                  >
                    Submit Request to Artisan
                  </button>
                </div>
              </div>
            )}
          </form>
        </section>

        {/* Artisan / Inspiration Sidebar (4 cols on desktop matching HTML 3) */}
        <aside aria-label="Artisan collaboration tips" className="lg:col-span-4 flex flex-col gap-6">
          {/* Inspiration Card matching HTML 3 & Screenshot 3 */}
          <div className="bg-white shadow-[0px_4px_20px_rgba(42,66,63,0.08)] rounded-2xl overflow-hidden border border-[#dec0b4]/40">
            <div className="h-48 w-full relative overflow-hidden bg-[#efeeea]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsGr3nMmcQlxxqbNtmWXVmG_IvFeNNgH_XjUUH0lWL0jOwNUcnXVNDMMUDPfUtmoVcABeqvxMuzq6hVuLlijveSvuajv1gMqRf8kTG5NNRJvLxLve5Wl8dv1rgn3uwSM3LnYW8O9nJv-PtNhW0vY6aEPKCa17wVfQ5FATqAFrAQvUL-g1CBoiPuqL2NKqQJoucYP_EFPE-kG2fjoCxY8L3hRcus_o--kJSfhM_BCXUDeIRECbsWB66"
                alt="Handcrafted ceramic glazed bowl showcase"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <h4 className="absolute bottom-4 left-4 font-serif-craft text-xl font-bold text-white">
                Handcrafted Magic
              </h4>
            </div>

            <div className="p-6">
              <p className="text-sm text-[#574239] leading-relaxed mb-4">
                Every custom order is a collaboration between your vision and our artisans' generational skills.
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="bg-[#4b6360]/10 text-[#4b6360] text-xs font-semibold px-3 py-1 rounded-full">
                  Ceramics
                </span>
                <span className="bg-[#4b6360]/10 text-[#4b6360] text-xs font-semibold px-3 py-1 rounded-full">
                  Textiles
                </span>
                <span className="bg-[#4b6360]/10 text-[#4b6360] text-xs font-semibold px-3 py-1 rounded-full">
                  Woodwork
                </span>
              </div>
            </div>
          </div>

          {/* How It Works Card matching HTML 3 & Screenshot 3 */}
          <div className="bg-white shadow-[0px_4px_20px_rgba(42,66,63,0.08)] rounded-2xl p-6 border border-[#dec0b4]/40">
            <h4 className="font-serif-craft text-lg font-bold text-[#1b1c1a] mb-5 pb-2 border-b border-[#eae8e4]">
              How it works
            </h4>

            <ul className="space-y-5">
              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdbcc] text-[#9c3d00] flex items-center justify-center shrink-0 mt-0.5">
                  <Palette size={16} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b1c1a]">1. Submit Request</p>
                  <p className="text-xs text-[#574239] mt-0.5">
                    Provide dimensions, color choices, and reference photos.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdbcc] text-[#9c3d00] flex items-center justify-center shrink-0 mt-0.5">
                  <MessageSquare size={16} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b1c1a]">2. Artisan Review & Proposal</p>
                  <p className="text-xs text-[#574239] mt-0.5">
                    Verified artisans calculate crafting time and provide a custom price quote.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-[#ffdbcc] text-[#9c3d00] flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench size={16} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b1c1a]">3. Crafting Begins</p>
                  <p className="text-xs text-[#574239] mt-0.5">
                    Approve the quote to initiate loom weaving or kiln firing with live status updates.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};
