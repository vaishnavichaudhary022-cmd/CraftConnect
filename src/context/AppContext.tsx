import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  UserRole,
  UserProfile,
  Product,
  CustomRequest,
  Order,
  Review,
  NotificationItem,
  CartItem,
  Proposal,
  OrderStatus,
  DeliveryMethod,
  DeliveryDetails,
  ChatMessage,
  ChatThread
} from '../types';
import {
  DEMO_USERS,
  INITIAL_PRODUCTS,
  INITIAL_CUSTOM_REQUESTS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_NOTIFICATIONS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_CHAT_THREADS
} from '../data/mockData';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  allUsers: UserProfile[];
  loginAsUser: (userId: string) => void;
  logout: () => void;
  
  currentScreen: string;
  navigate: (screen: string, params?: { productId?: string; customRequestId?: string; orderId?: string }) => void;
  selectedProductId: string | null;
  selectedCustomRequestId: string | null;
  selectedOrderId: string | null;
  
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  
  // Custom Requests & Proposals
  customRequests: CustomRequest[];
  createCustomRequest: (request: Omit<CustomRequest, 'id' | 'status' | 'createdAt'>) => string;
  submitProposal: (requestId: string, proposal: Omit<Proposal, 'id' | 'submittedAt'>) => void;
  acceptProposal: (requestId: string, deliveryMethod?: DeliveryMethod) => string; // returns created orderId
  rejectProposal: (requestId: string) => void;
  updateCustomRequestStatus: (requestId: string, status: CustomRequest['status']) => void;
  
  // Orders & Tracking
  orders: Order[];
  createOrderFromCart: (
    address: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod'],
    deliveryMethod: DeliveryMethod
  ) => Order;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    deliveryDetailsUpdate?: Partial<DeliveryDetails>
  ) => void;
  
  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  
  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  
  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationCount: number;
  
  // Direct Buyer-Artisan Chat System
  chatMessages: ChatMessage[];
  chatThreads: ChatThread[];
  sendMessage: (msg: {
    recipientId: string;
    recipientName: string;
    text: string;
    productId?: string;
    productTitle?: string;
    orderId?: string;
    orderNumber?: string;
    isDeliveryQuery?: boolean;
  }) => void;
  activeChatArtisan: {
    artisanId: string;
    artisanName: string;
    artisanAvatar: string;
    productId?: string;
    productTitle?: string;
    orderId?: string;
    orderNumber?: string;
  } | null;
  openArtisanChat: (artisan: {
    artisanId: string;
    artisanName: string;
    artisanAvatar?: string;
    productId?: string;
    productTitle?: string;
    orderId?: string;
    orderNumber?: string;
  }) => void;
  closeArtisanChat: () => void;
  
  // Search & Filter State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedMaterial: string;
  setSelectedMaterial: (mat: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  selectedType: string;
  setSelectedType: (type: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
  priceFilter: string;
  setPriceFilter: (price: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  resetFilters: () => void;
  
  // Currency Toggle
  currency: 'USD' | 'INR';
  setCurrency: (c: 'USD' | 'INR') => void;
  formatPrice: (usdPrice: number, inrPrice?: number) => string;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('craftconnect_current_user');
    return saved ? JSON.parse(saved) : DEMO_USERS[0];
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    return currentUser.role || (localStorage.getItem('craftconnect_role') as UserRole) || 'customer';
  });

  const [currentScreen, setCurrentScreen] = useState<string>('login');
  const [selectedProductId, setSelectedProductId] = useState<string | null>('prod-crochet-tulips');
  const [selectedCustomRequestId, setSelectedCustomRequestId] = useState<string | null>('req-101');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>('ord-8820');

  // Data states with localStorage fallback
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('craftconnect_products_v2');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [customRequests, setCustomRequests] = useState<CustomRequest[]>(() => {
    const saved = localStorage.getItem('craftconnect_requests_v2');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_REQUESTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('craftconnect_orders_v2');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('craftconnect_reviews_v2');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('craftconnect_notifications_v2');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('craftconnect_chat_messages_v2');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  const [chatThreads, setChatThreads] = useState<ChatThread[]>(() => {
    const saved = localStorage.getItem('craftconnect_chat_threads_v2');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_THREADS;
  });

  const [activeChatArtisan, setActiveChatArtisan] = useState<{
    artisanId: string;
    artisanName: string;
    artisanAvatar: string;
    productId?: string;
    productTitle?: string;
    orderId?: string;
    orderNumber?: string;
  } | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('craftconnect_cart_v2');
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('craftconnect_favorites_v2');
    return saved ? JSON.parse(saved) : ['prod-crochet-tulips', 'prod-lippan-art-wall-plate'];
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('All');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [priceFilter, setPriceFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('recommended');

  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('craftconnect_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('craftconnect_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('craftconnect_products_v2', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('craftconnect_requests_v2', JSON.stringify(customRequests));
  }, [customRequests]);

  useEffect(() => {
    localStorage.setItem('craftconnect_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('craftconnect_cart_v2', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('craftconnect_favorites_v2', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('craftconnect_chat_messages_v2', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('craftconnect_chat_threads_v2', JSON.stringify(chatThreads));
  }, [chatThreads]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const loginAsUser = (userId: string) => {
    const user = DEMO_USERS.find((u) => u.id === userId) || DEMO_USERS[0];
    setCurrentUserState(user);
    setRoleState(user.role);
    if (user.role === 'seller') {
      setCurrentScreen('seller_dashboard');
      showToast(`Welcome to Artisan Studio, ${user.name}!`);
    } else if (user.role === 'admin') {
      setCurrentScreen('admin_portal');
      showToast(`Welcome to Central Governance Portal, ${user.name}!`);
    } else {
      setCurrentScreen('search');
      showToast(`Welcome back, ${user.name}!`);
    }
  };

  const logout = () => {
    setCurrentScreen('login');
    showToast('Signed out. Please select your user persona to continue.');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Switch to corresponding user profile
    const matchedUser = DEMO_USERS.find((u) => u.role === newRole) || DEMO_USERS[0];
    setCurrentUserState(matchedUser);

    if (newRole === 'seller') {
      setCurrentScreen('seller_dashboard');
      showToast(`Switched to Artisan Studio View (${matchedUser.name})`);
    } else if (newRole === 'admin') {
      setCurrentScreen('admin_portal');
      showToast(`Switched to Platform Governance Portal (${matchedUser.name})`);
    } else {
      setCurrentScreen('search');
      showToast(`Switched to Buyer Experience (${matchedUser.name})`);
    }
  };

  const navigate = (screen: string, params?: { productId?: string; customRequestId?: string; orderId?: string }) => {
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.customRequestId) setSelectedCustomRequestId(params.customRequestId);
    if (params?.orderId) setSelectedOrderId(params.orderId);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedMaterial('All');
    setSelectedRegion('All');
    setSelectedType('All');
    setInStockOnly(false);
    setPriceFilter('All');
    setSortBy('recommended');
  };

  const formatPrice = (usdPrice: number, inrPrice?: number) => {
    if (currency === 'INR') {
      const calculated = inrPrice || Math.round(usdPrice * 83.5);
      return `₹${calculated.toLocaleString('en-IN')}`;
    }
    return `$${usdPrice}`;
  };

  // Product Operations
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newProd: Product = {
      ...productData,
      id: `prod-${Date.now()}`
    };
    setProducts((prev) => [newProd, ...prev]);
    showToast(`"${newProd.title}" published to catalog!`);
    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Listing details updated successfully');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product removed from catalog');
  };

  // Custom Request Operations
  const createCustomRequest = (requestData: Omit<CustomRequest, 'id' | 'status' | 'createdAt'>): string => {
    const newId = `req-${Date.now().toString().slice(-4)}`;
    const newReq: CustomRequest = {
      ...requestData,
      id: newId,
      status: 'pending_review',
      createdAt: new Date().toISOString()
    };
    setCustomRequests((prev) => [newReq, ...prev]);
    
    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Custom Request Submitted',
      message: `Your request "${requestData.designTitle}" has been dispatched to master artisans.`,
      type: 'custom',
      timestamp: 'Just now',
      read: false,
      targetScreen: 'custom_detail',
      targetId: newId
    };
    setNotifications((prev) => [newNotif, ...prev]);
    
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
    showToast('Custom creation request submitted to artisans!');
    return newId;
  };

  const submitProposal = (requestId: string, proposalData: Omit<Proposal, 'id' | 'submittedAt'>) => {
    const newProposal: Proposal = {
      ...proposalData,
      id: `prop-${Date.now()}`,
      submittedAt: new Date().toISOString()
    };

    setCustomRequests((prev) =>
      prev.map((req) => {
        if (req.id === requestId) {
          return {
            ...req,
            status: 'proposal_sent',
            proposal: newProposal
          };
        }
        return req;
      })
    );

    const targetReq = customRequests.find((r) => r.id === requestId);
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Artisan Proposal Received!',
      message: `${proposalData.sellerName} quoted $${proposalData.price} for "${targetReq?.designTitle || 'your request'}".`,
      type: 'custom',
      timestamp: 'Just now',
      read: false,
      targetScreen: 'custom_detail',
      targetId: requestId
    };
    setNotifications((prev) => [newNotif, ...prev]);
    showToast('Proposal quote dispatched to customer');
  };

  const acceptProposal = (requestId: string, deliveryMethod: DeliveryMethod = 'porter'): string => {
    const req = customRequests.find((r) => r.id === requestId);
    if (!req || !req.proposal) return '';

    const newOrderId = `ord-${Date.now().toString().slice(-4)}`;
    const newOrderNumber = `CC-${Math.floor(1000 + Math.random() * 9000)}`;

    const carrierName = deliveryMethod === 'porter' ? 'Porter Hyperlocal Express' : 'India Post (Speed Post)';
    const trackingCode = deliveryMethod === 'porter'
      ? `PORTER-BLR-${Math.floor(100000 + Math.random() * 900000)}`
      : `IND-POST-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder: Order = {
      id: newOrderId,
      orderNumber: newOrderNumber,
      type: 'custom',
      customRequestId: req.id,
      items: [
        {
          title: req.designTitle,
          price: req.proposal.price,
          quantity: 1,
          image: req.referenceImageUrl || 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=800&auto=format&fit=crop&q=80',
          artisanName: req.proposal.sellerName,
          type: 'customizable',
          customDetails: {
            requestId: req.id,
            dimensions: req.dimensions,
            colors: req.colorPreferences
          }
        }
      ],
      subtotal: req.proposal.price,
      shippingFee: deliveryMethod === 'porter' ? 6 : 3,
      total: req.proposal.price + (deliveryMethod === 'porter' ? 6 : 3),
      customerName: req.customerName,
      customerEmail: req.customerEmail,
      shippingAddress: {
        fullName: req.customerName,
        street: '18 Garden Estate, MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        pincode: '560001',
        phone: '+91 98450 99881'
      },
      paymentMethod: 'card',
      paymentStatus: 'paid',
      status: 'in_crafting',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + req.proposal.estimatedDays * 86400000).toISOString().split('T')[0],
      deliveryMethod,
      deliveryDetails: {
        method: deliveryMethod,
        carrierName,
        trackingCode,
        porterVehicleType: '3-Wheeler Mini Van',
        estimatedTimeline: deliveryMethod === 'porter'
          ? 'Scheduled for Direct Porter Van pickup upon artisan completion'
          : 'Registered Speed Post Consignment',
        notes: 'Handcrafted custom item with bespoke packaging.'
      }
    };

    setCustomRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? { ...r, status: 'proposal_accepted', linkedOrderId: newOrderId }
          : r
      )
    );

    setOrders((prev) => [newOrder, ...prev]);

    try {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    } catch {
      // ignore
    }

    showToast(`Proposal accepted! Custom Order ${newOrderNumber} created with ${carrierName}.`);
    return newOrderId;
  };

  const rejectProposal = (requestId: string) => {
    setCustomRequests((prev) =>
      prev.map((r) =>
        r.id === requestId ? { ...r, status: 'proposal_rejected' } : r
      )
    );
    showToast('Proposal declined. You can submit another request anytime.');
  };

  const updateCustomRequestStatus = (requestId: string, status: CustomRequest['status']) => {
    setCustomRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, status } : r))
    );
  };

  // Order Operations
  const createOrderFromCart = (
    address: Order['shippingAddress'],
    paymentMethod: Order['paymentMethod'],
    deliveryMethod: DeliveryMethod = 'porter'
  ): Order => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const shippingFee = deliveryMethod === 'porter' ? 6 : 3;
    const newOrderId = `ord-${Date.now().toString().slice(-4)}`;
    const newOrderNumber = `CC-${Math.floor(1000 + Math.random() * 9000)}`;

    const carrierName = deliveryMethod === 'porter' ? 'Porter Hyperlocal On-Demand' : 'India Post (Speed Post Parcel)';
    const trackingCode = deliveryMethod === 'porter'
      ? `PORTER-BLR-${Math.floor(100000 + Math.random() * 900000)}`
      : `IND-POST-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const estimatedDays = deliveryMethod === 'porter' ? 1 : 4;
    const estDate = new Date(Date.now() + estimatedDays * 86400000).toISOString().split('T')[0];

    const newOrder: Order = {
      id: newOrderId,
      orderNumber: newOrderNumber,
      type: 'ready-made',
      items: cart.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0],
        artisanName: item.product.artisanName,
        type: item.product.type
      })),
      subtotal,
      shippingFee,
      total: subtotal + shippingFee,
      customerName: address.fullName,
      customerEmail: currentUser.email || 'customer@craftconnect.in',
      shippingAddress: address,
      paymentMethod,
      paymentStatus: 'paid',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryMethod === 'porter' ? `${estDate} (Same-Day / Express via Porter)` : `${estDate} via Speed Post`,
      trackingNumber: trackingCode,
      deliveryMethod,
      deliveryDetails: {
        method: deliveryMethod,
        carrierName,
        trackingCode,
        porterVehicleType: '2-Wheeler Bike',
        porterLiveUrl: deliveryMethod === 'porter' ? `https://porter.in/track/${trackingCode}` : undefined,
        estimatedTimeline: deliveryMethod === 'porter' ? 'Artisan is packing. Porter bike rider assigned soon.' : 'Being packed for India Post dispatch.',
        notes: address.deliveryInstructions || 'Handcrafted items fragile care.'
      }
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);

    try {
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } catch {
      // ignore
    }

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Order ${newOrderNumber} Confirmed!`,
      message: `Artisan has received your order and will dispatch via ${carrierName}.`,
      type: 'order',
      timestamp: 'Just now',
      read: false,
      targetScreen: 'orders_tracking',
      targetId: newOrderId
    };
    setNotifications((prev) => [notif, ...prev]);

    showToast(`Order ${newOrderNumber} placed with ${carrierName}!`);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    deliveryDetailsUpdate?: Partial<DeliveryDetails>
  ) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedDetails: DeliveryDetails = {
            ...o.deliveryDetails,
            ...(deliveryDetailsUpdate || {}),
            dispatchDate: status === 'dispatched' ? new Date().toISOString() : o.deliveryDetails.dispatchDate
          };
          return {
            ...o,
            status,
            trackingNumber: deliveryDetailsUpdate?.trackingCode || o.trackingNumber,
            deliveryDetails: updatedDetails
          };
        }
        return o;
      })
    );
    showToast(`Order status updated to: ${status.replace('_', ' ').toUpperCase()}`);
  };

  // Direct Buyer-Artisan Chat System
  const openArtisanChat = (artisan: {
    artisanId: string;
    artisanName: string;
    artisanAvatar?: string;
    productId?: string;
    productTitle?: string;
    orderId?: string;
    orderNumber?: string;
  }) => {
    setActiveChatArtisan({
      artisanId: artisan.artisanId,
      artisanName: artisan.artisanName,
      artisanAvatar: artisan.artisanAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      productId: artisan.productId,
      productTitle: artisan.productTitle,
      orderId: artisan.orderId,
      orderNumber: artisan.orderNumber
    });
  };

  const closeArtisanChat = () => {
    setActiveChatArtisan(null);
  };

  const sendMessage = (msgData: {
    recipientId: string;
    recipientName: string;
    text: string;
    productId?: string;
    productTitle?: string;
    orderId?: string;
    orderNumber?: string;
    isDeliveryQuery?: boolean;
  }) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: role,
      recipientId: msgData.recipientId,
      recipientName: msgData.recipientName,
      text: msgData.text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      productId: msgData.productId,
      productTitle: msgData.productTitle,
      orderId: msgData.orderId,
      orderNumber: msgData.orderNumber,
      isDeliveryQuery: msgData.isDeliveryQuery
    };

    setChatMessages((prev) => [...prev, newMsg]);

    // Update threads
    setChatThreads((prev) => {
      const threadId = `thread-${currentUser.id}-${msgData.recipientId}`;
      const existing = prev.find((t) => t.id === threadId || (t.customerId === currentUser.id && t.artisanId === msgData.recipientId));
      if (existing) {
        return prev.map((t) =>
          t.id === existing.id
            ? {
                ...t,
                lastMessage: msgData.text,
                lastTimestamp: 'Just now'
              }
            : t
        );
      }
      const newThread: ChatThread = {
        id: threadId,
        customerId: currentUser.id,
        customerName: currentUser.name,
        artisanId: msgData.recipientId,
        artisanName: msgData.recipientName,
        artisanAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        lastMessage: msgData.text,
        lastTimestamp: 'Just now',
        unreadCountCustomer: 0,
        unreadCountArtisan: 1,
        relatedProductId: msgData.productId,
        relatedProductTitle: msgData.productTitle,
        relatedOrderId: msgData.orderId
      };
      return [newThread, ...prev];
    });

    // Auto simulated response if from buyer to artisan
    if (role === 'customer') {
      setTimeout(() => {
        const artisanReply: ChatMessage = {
          id: `msg-rep-${Date.now()}`,
          senderId: msgData.recipientId,
          senderName: msgData.recipientName,
          senderRole: 'seller',
          recipientId: currentUser.id,
          recipientName: currentUser.name,
          text: msgData.isDeliveryQuery
            ? `Namaste ${currentUser.name.split(' ')[0]}! Noted regarding your delivery instructions. We will pack this with protective padding and coordinate with the Porter / Post courier.`
            : `Namaste ${currentUser.name.split(' ')[0]}! Thank you for contacting me. I am currently working in my home studio and would love to customize this piece exactly to your liking.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          productId: msgData.productId,
          productTitle: msgData.productTitle,
          orderId: msgData.orderId,
          orderNumber: msgData.orderNumber
        };
        setChatMessages((prev) => [...prev, artisanReply]);
      }, 1500);
    }
  };

  // Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.title}" to cart`);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
      );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart');
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Reviews
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Today'
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your artisan review was submitted.');
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        currentUser,
        setCurrentUser: setCurrentUserState,
        allUsers: DEMO_USERS,
        loginAsUser,
        logout,
        currentScreen,
        navigate,
        selectedProductId,
        selectedCustomRequestId,
        selectedOrderId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        customRequests,
        createCustomRequest,
        submitProposal,
        acceptProposal,
        rejectProposal,
        updateCustomRequestStatus,
        orders,
        createOrderFromCart,
        updateOrderStatus,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        favorites,
        toggleFavorite,
        reviews,
        addReview,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        unreadNotificationCount,
        chatMessages,
        chatThreads,
        sendMessage,
        activeChatArtisan,
        openArtisanChat,
        closeArtisanChat,
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
        currency,
        setCurrency,
        formatPrice,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
