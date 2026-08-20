export type UserRole = 'customer' | 'seller' | 'admin';

export type ProductType = 'ready-made' | 'customizable';

export type DeliveryMethod = 'post' | 'porter';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  bio?: string;
  artisanStudioName?: string;
  specialty?: string;
  city?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number; // in USD
  priceInr: number; // in INR
  artisanName: string;
  artisanId: string;
  artisanAvatar: string;
  artisanTitle: string;
  artisanBio: string;
  rating: number;
  reviewCount: number;
  type: ProductType;
  category: string;
  material: string;
  region: string;
  description: string;
  specifications: Record<string, string>;
  images: string[];
  videoThumbnail?: string;
  inStock: boolean;
  stockCount: number;
  featured?: boolean;
  deliveryOptions?: {
    postAvailable: boolean;
    porterAvailable: boolean;
    porterEstimatedHours?: string;
    postEstimatedDays?: string;
  };
  homeCraftTags?: string[];
}

export type CustomRequestStatus =
  | 'pending_review'
  | 'proposal_sent'
  | 'proposal_accepted'
  | 'proposal_rejected'
  | 'in_crafting'
  | 'dispatched'
  | 'completed'
  | 'cancelled';

export interface Proposal {
  id: string;
  sellerId: string;
  sellerName: string;
  price: number;
  estimatedDays: number;
  artisanNote: string;
  submittedAt: string;
}

export interface CustomRequest {
  id: string;
  customerName: string;
  customerEmail: string;
  designTitle: string;
  description: string;
  occasion: string;
  budgetRange: string;
  colorPreferences: string;
  dimensions: string;
  referenceImageUrl: string;
  category: string;
  status: CustomRequestStatus;
  createdAt: string;
  proposal?: Proposal | null;
  linkedOrderId?: string;
  preferredDelivery?: DeliveryMethod;
}

export type OrderStatus =
  | 'confirmed'
  | 'seller_processing'
  | 'in_crafting'
  | 'dispatched'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId?: string;
  artisanId?: string;
  artisanAvatar?: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  artisanName: string;
  type: ProductType;
  customDetails?: {
    requestId: string;
    dimensions: string;
    colors: string;
  };
}

export interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  deliveryInstructions?: string;
}

export interface DeliveryDetails {
  method: DeliveryMethod;
  carrierName: string; // 'India Post' | 'Porter Hyperlocal'
  trackingCode: string;
  porterVehicleType?: '2-Wheeler Bike' | '3-Wheeler Mini Van' | 'Tata Ace Porter';
  porterLiveUrl?: string;
  estimatedTimeline: string;
  dispatchDate?: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  type: 'ready-made' | 'custom';
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: ShippingAddress;
  paymentMethod: 'card' | 'upi' | 'cod';
  paymentStatus: 'paid' | 'pending';
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  customRequestId?: string;
  deliveryMethod: DeliveryMethod;
  deliveryDetails: DeliveryDetails;
}

export interface Review {
  id: string;
  productId: string;
  orderId?: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  avatar?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'order' | 'custom' | 'chat';
  timestamp: string;
  read: boolean;
  targetScreen?: string;
  targetId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  recipientName: string;
  text: string;
  timestamp: string;
  productId?: string;
  productTitle?: string;
  orderId?: string;
  orderNumber?: string;
  isDeliveryQuery?: boolean;
}

export interface ChatThread {
  id: string;
  customerId: string;
  customerName: string;
  artisanId: string;
  artisanName: string;
  artisanAvatar: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCountCustomer: number;
  unreadCountArtisan: number;
  relatedProductId?: string;
  relatedProductTitle?: string;
  relatedOrderId?: string;
}
