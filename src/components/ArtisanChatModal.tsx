import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Send,
  Truck,
  Package,
  Sparkles,
  MessageSquare,
  Clock,
  Phone,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';

export const ArtisanChatModal: React.FC = () => {
  const {
    activeChatArtisan,
    closeArtisanChat,
    chatMessages,
    sendMessage,
    currentUser,
    role
  } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, activeChatArtisan]);

  if (!activeChatArtisan) return null;

  // Filter messages relevant to this conversation
  const relevantMessages = chatMessages.filter(
    (m) =>
      (m.senderId === currentUser.id && (m.recipientId === activeChatArtisan.artisanId || m.recipientId === 'user-maya' || m.recipientId === 'user-devika')) ||
      (m.recipientId === currentUser.id && (m.senderId === activeChatArtisan.artisanId || m.senderId === 'user-maya' || m.senderId === 'user-devika')) ||
      (m.productId && m.productId === activeChatArtisan.productId) ||
      (m.orderId && m.orderId === activeChatArtisan.orderId)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const isDelivery =
      inputMessage.toLowerCase().includes('porter') ||
      inputMessage.toLowerCase().includes('post') ||
      inputMessage.toLowerCase().includes('delivery') ||
      inputMessage.toLowerCase().includes('dispatch') ||
      inputMessage.toLowerCase().includes('track');

    sendMessage({
      recipientId: activeChatArtisan.artisanId,
      recipientName: activeChatArtisan.artisanName,
      text: inputMessage.trim(),
      productId: activeChatArtisan.productId,
      productTitle: activeChatArtisan.productTitle,
      orderId: activeChatArtisan.orderId,
      orderNumber: activeChatArtisan.orderNumber,
      isDeliveryQuery: isDelivery
    });

    setInputMessage('');
  };

  const quickDeliveryPrompts = [
    '🛵 Can you dispatch via Porter same-day delivery?',
    '📦 Please use extra bubble wrap for fragile ceramic/glass.',
    '📮 When will the India Speed Post tracking ID be active?',
    '🎨 Can you customize this in pastel pink & sage green?'
  ];

  const sendQuickPrompt = (promptText: string) => {
    sendMessage({
      recipientId: activeChatArtisan.artisanId,
      recipientName: activeChatArtisan.artisanName,
      text: promptText,
      productId: activeChatArtisan.productId,
      productTitle: activeChatArtisan.productTitle,
      orderId: activeChatArtisan.orderId,
      orderNumber: activeChatArtisan.orderNumber,
      isDeliveryQuery: true
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="artisan-chat-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
    >
      <div className="bg-white w-full sm:max-w-lg h-[92vh] sm:h-[620px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#dec0b4]">
        {/* Chat Header */}
        <div className="bg-[#4b6360] text-white p-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={activeChatArtisan.artisanAvatar}
                alt={activeChatArtisan.artisanName}
                className="w-11 h-11 rounded-full object-cover border-2 border-white/40"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#4b6360] rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 id="artisan-chat-title" className="font-serif-craft font-bold text-sm text-white">
                  {activeChatArtisan.artisanName}
                </h3>
                <span className="px-1.5 py-0.2 bg-white/20 text-[10px] rounded font-medium">
                  Artisan Maker
                </span>
              </div>
              <p className="text-[11px] text-[#dec0b4]">
                Direct Communication • Delivery & Custom Inquiries
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeArtisanChat}
              aria-label="Close conversation drawer"
              className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Context Banner if discussing an order or product */}
        {(activeChatArtisan.productTitle || activeChatArtisan.orderNumber) && (
          <div className="bg-[#fbf9f5] px-4 py-2 border-b border-[#dec0b4]/50 flex items-center justify-between text-xs text-[#574239]">
            <div className="flex items-center gap-2 truncate">
              {activeChatArtisan.orderNumber ? (
                <>
                  <Truck size={14} className="text-[#bd5419] shrink-0" aria-hidden="true" />
                  <span className="truncate">
                    Inquiry regarding <strong>Order #{activeChatArtisan.orderNumber}</strong> (Porter/Post)
                  </span>
                </>
              ) : (
                <>
                  <Package size={14} className="text-[#bd5419] shrink-0" aria-hidden="true" />
                  <span className="truncate font-medium">
                    Discussing: <strong>{activeChatArtisan.productTitle}</strong>
                  </span>
                </>
              )}
            </div>
            <span className="text-[10px] text-[#8a7268] bg-[#ffdbcc] text-[#9c3d00] px-2 py-0.5 rounded-full font-bold">
              Active Context
            </span>
          </div>
        )}

        {/* Message Stream */}
        <div
          role="log"
          aria-live="polite"
          className="flex-1 p-4 overflow-y-auto bg-[#fdfcfb] space-y-3"
        >
          <div className="text-center my-2">
            <span className="px-3 py-1 rounded-full bg-[#f5f3ef] text-[#8a7268] text-[10px] font-medium border border-[#dec0b4]/40">
              🔒 Direct End-to-End Artisan Channel • Escrow Protected
            </span>
          </div>

          {relevantMessages.length === 0 ? (
            <div className="text-center py-8 px-4">
              <MessageSquare size={36} className="mx-auto text-[#dec0b4] mb-2" aria-hidden="true" />
              <p className="text-xs text-[#574239] font-medium">
                Start a conversation with {activeChatArtisan.artisanName}
              </p>
              <p className="text-[11px] text-[#8a7268] mt-1 max-w-xs mx-auto">
                Ask about Porter hyperlocal delivery timings, speed post tracking, customized colors, or handmade care instructions.
              </p>
            </div>
          ) : (
            relevantMessages.map((msg) => {
              const isMe = msg.senderId === currentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-xs shadow-xs ${
                      isMe
                        ? 'bg-[#bd5419] text-white rounded-br-xs'
                        : 'bg-white border border-[#dec0b4]/70 text-[#1b1c1a] rounded-bl-xs'
                    }`}
                  >
                    {!isMe && (
                      <span className="block text-[10px] font-bold text-[#bd5419] mb-0.5">
                        {msg.senderName}
                      </span>
                    )}

                    {msg.isDeliveryQuery && (
                      <div
                        className={`text-[10px] font-semibold flex items-center gap-1 mb-1 pb-1 border-b ${
                          isMe ? 'border-white/20 text-white/90' : 'border-[#dec0b4] text-[#8a7268]'
                        }`}
                      >
                        <Truck size={12} aria-hidden="true" />
                        <span>Delivery / Logistics Coordination</span>
                      </div>
                    )}

                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>

                    <div
                      className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                        isMe ? 'text-white/75' : 'text-[#8a7268]'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck size={12} aria-hidden="true" />}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Delivery & Inquiry Suggestions */}
        <div className="px-3 py-2 bg-[#f5f3ef] border-t border-[#dec0b4]/40 overflow-x-auto no-scrollbar flex gap-2">
          {quickDeliveryPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => sendQuickPrompt(prompt)}
              className="text-[10.5px] font-medium bg-white hover:bg-[#ffdbcc] text-[#574239] hover:text-[#9c3d00] border border-[#dec0b4] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer shrink-0 focus:outline-none focus:ring-1 focus:ring-[#bd5419]"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-3 bg-white border-t border-[#dec0b4] flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Message ${activeChatArtisan.artisanName.split(' ')[0]} about delivery, custom colors...`}
            aria-label={`Send message to ${activeChatArtisan.artisanName}`}
            className="flex-1 bg-[#fbf9f5] border border-[#dec0b4] rounded-full py-2 px-4 text-xs text-[#1b1c1a] focus:ring-2 focus:ring-[#bd5419] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            aria-label="Send chat message"
            className="p-2.5 rounded-full bg-[#bd5419] hover:bg-[#9c3d00] disabled:opacity-40 text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#bd5419]"
          >
            <Send size={15} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
};
