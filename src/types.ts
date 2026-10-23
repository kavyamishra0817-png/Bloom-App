export type CategoryType = 'all' | 'coffee' | 'tea' | 'cake' | 'gift';

export interface ProductOptionItem {
  id: string;
  name: string;
  price: number;
  isDefault?: boolean;
}

export interface ProductOptionGroup {
  id: string;
  title: string;
  required: boolean;
  type: 'single' | 'multiple';
  items: ProductOptionItem[];
}

export interface Product {
  id: string;
  name: string;
  category: 'coffee' | 'tea' | 'cake' | 'gift';
  categoryName: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isOutOfStock?: boolean;
  tags: string[];
  calories?: number;
  rating: number;
  reviewsCount: number;
  optionGroups: ProductOptionGroup[];
}

export interface SelectedOption {
  groupId: string;
  groupTitle: string;
  optionId: string;
  optionName: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  selectedOptions: SelectedOption[];
  quantity: number;
  note: string;
  unitPrice: number;
  totalPrice: number;
}

export type ReceiveMode = 'delivery' | 'pickup';

export interface Address {
  id: string;
  label: string; // 'Nhà riêng', 'Văn phòng', 'Bạn bè'
  recipientName: string;
  phone: string;
  fullAddress: string;
  detail: string;
  note?: string;
  isDefault: boolean;
  isOutOfZone?: boolean;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  district: string;
  distance: string;
  openHours: string;
  isOpen: boolean;
  phone: string;
  image: string;
  lat: number;
  lng: number;
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  discountType: 'percent' | 'fixed' | 'shipping';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  description: string;
  category: 'product' | 'shipping';
  isEligible?: boolean;
  ineligibleReason?: string;
}

export type OrderStatus = 'received' | 'preparing' | 'delivering' | 'ready_for_pickup' | 'completed' | 'cancelled';

export interface OrderTimelineStep {
  title: string;
  time?: string;
  done: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  mode: ReceiveMode;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  isPaid: boolean;
  address?: Address;
  store?: Store;
  pickupTimeSlot?: string;
  pickupCode?: string;
  driverInfo?: {
    name: string;
    phone: string;
    plateNumber: string;
    vehicle: string;
    avatar: string;
  };
  timeline: OrderTimelineStep[];
  isReviewed?: boolean;
}

export interface MemberProfile {
  name: string;
  phone: string;
  email: string;
  avatar: string;
  tier: 'Bloom Member' | 'Bloom Gold' | 'Bloom Diamond';
  spendablePoints: number; // Điểm đổi ưu đãi
  tierPoints: number;      // Điểm xét hạng
  nextTierThreshold: number;
  joinedDate: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'order' | 'promo';
  isRead: boolean;
  orderId?: string;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  voucherCode?: string;
  accentColor: string;
  imageUrl?: string;
}

export interface ServiceReview {
  id: string;
  orderId: string;
  orderNumber: string;
  date: string;
  ratingOverall: number;
  ratingTaste: number;
  ratingSpeed: number;
  tags: string[];
  comment: string;
}
