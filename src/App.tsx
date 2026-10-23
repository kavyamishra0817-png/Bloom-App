import React, { useState } from 'react';
import { MobileFrame } from './components/MobileFrame';
import { HeaderBar } from './components/HeaderBar';
import { BottomNavBar, MainTabType } from './components/BottomNavBar';
import { ReceiveModeModal } from './components/ReceiveModeModal';
import { AddressManagerModal } from './components/AddressManagerModal';
import { StoreSelectorModal } from './components/StoreSelectorModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { VoucherModal } from './components/VoucherModal';
import { CheckoutScreen } from './components/CheckoutScreen';
import { PaymentResultModal } from './components/PaymentResultModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { MemberQRModal } from './components/MemberQRModal';
import { LoyaltyTierModal } from './components/LoyaltyTierModal';
import { NotificationsModal } from './components/NotificationsModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { ServiceReviewModal } from './components/ServiceReviewModal';
import { BrandIntroModal } from './components/BrandIntroModal';
import { PromoDetailModal } from './components/PromoDetailModal';
import { SmartFilterModal, FilterState } from './components/SmartFilterModal';

import { HomeView } from './views/HomeView';
import { OrderMenuView } from './views/OrderMenuView';
import { StoresView } from './views/StoresView';
import { AccountView } from './views/AccountView';

import {
  INITIAL_ADDRESSES,
  INITIAL_BANNERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ORDERS,
  INITIAL_PRODUCTS,
  INITIAL_PROFILE,
  INITIAL_STORES,
  INITIAL_VOUCHERS
} from './data/mockData';
import {
  Address,
  CartItem,
  CategoryType,
  MemberProfile,
  NotificationItem,
  Order,
  OrderStatus,
  Product,
  PromoBanner,
  ReceiveMode,
  ServiceReview,
  Store,
  Voucher
} from './types';
import { calculateVoucherDiscount, formatVND } from './utils/formatters';

export default function App() {
  // Navigation & Core States
  const [activeTab, setActiveTab] = useState<MainTabType>('home');
  const [receiveMode, setReceiveMode] = useState<ReceiveMode>('delivery');

  // Master Data States
  const [profile, setProfile] = useState<MemberProfile>(INITIAL_PROFILE);
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(INITIAL_ADDRESSES[0]);
  const [stores, setStores] = useState<Store[]>(INITIAL_STORES);
  const [selectedStore, setSelectedStore] = useState<Store | null>(INITIAL_STORES[0]);
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [banners] = useState<PromoBanner[]>(INITIAL_BANNERS);
  const [vouchers, setVouchers] = useState<Voucher[]>(INITIAL_VOUCHERS);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);

  // Menu filter states
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<CategoryType>('all');
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    priceRange: 'all',
    selectedTag: null,
    sortBy: 'popular'
  });

  // Modal Visibility States
  const [isReceiveModeModalOpen, setIsReceiveModeModalOpen] = useState(false);
  const [isAddressManagerOpen, setIsAddressManagerOpen] = useState(false);
  const [isStoreSelectorOpen, setIsStoreSelectorOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isLoyaltyTierOpen, setIsLoyaltyTierOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isBrandIntroOpen, setIsBrandIntroOpen] = useState(false);
  const [isSmartFilterOpen, setIsSmartFilterOpen] = useState(false);

  // Active Context Item Modals
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [activePromoBanner, setActivePromoBanner] = useState<PromoBanner | null>(null);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(null);
  const [activeReviewOrder, setActiveReviewOrder] = useState<Order | null>(null);

  // Payment Result State
  const [paymentResult, setPaymentResult] = useState<{
    isOpen: boolean;
    status: 'success' | 'failure';
    order: Order | null;
    errorMessage?: string;
  }>({
    isOpen: false,
    status: 'success',
    order: null
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr));
    }, 3000);
  };

  // Cart Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.totalPrice, 0);

  // Handlers for Cart
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      // Check if identical item (same product and same options) exists
      const existingIndex = prev.findIndex(
        (i) =>
          i.product.id === item.product.id &&
          JSON.stringify(i.selectedOptions) === JSON.stringify(item.selectedOptions)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        const updatedQty = next[existingIndex].quantity + item.quantity;
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: updatedQty,
          totalPrice: next[existingIndex].unitPrice * updatedQty
        };
        return next;
      }
      return [...prev, item];
    });

    showToast(`Đã thêm "${item.product.name}" vào giỏ hàng`);
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    // Create item with default options
    const defaultOptions = product.optionGroups
      .filter((g) => g.type === 'single')
      .map((g) => {
        const item = g.items.find((i) => i.isDefault) || g.items[0];
        return {
          groupId: g.id,
          groupTitle: g.title,
          optionId: item.id,
          optionName: item.name,
          price: item.price
        };
      });

    const unitPrice =
      product.price + defaultOptions.reduce((s, o) => s + o.price, 0);

    const cartItem: CartItem = {
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      product,
      selectedOptions: defaultOptions,
      quantity: 1,
      note: '',
      unitPrice,
      totalPrice: unitPrice
    };

    handleAddToCart(cartItem);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.unitPrice * newQty
            };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast('Đã xóa món khỏi giỏ hàng.');
  };

  // Re-order handler
  const handleReorder = (order: Order) => {
    // Add all items to cart
    setCart((prev) => [...prev, ...order.items]);
    showToast(`Đã thêm ${order.items.length} món từ đơn #${order.orderNumber} vào giỏ hàng.`);
    setIsCartOpen(true);
  };

  // Order Placement
  const handleOrderSuccess = (newOrder: Order) => {
    // Deduct cart
    setCart([]);
    setSelectedVoucher(null);
    setIsCheckoutOpen(false);

    // Add to orders
    setOrders((prev) => [newOrder, ...prev]);

    // Earn points: 8% for Gold
    const pointsEarned = Math.round((newOrder.total * 0.08) / 1000);
    setProfile((prev) => ({
      ...prev,
      spendablePoints: prev.spendablePoints + pointsEarned,
      tierPoints: prev.tierPoints + pointsEarned
    }));

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: `Đơn hàng #${newOrder.orderNumber} đã được tiếp nhận`,
      message: `Bloom đang chuẩn bị đồ uống và bánh tươi cho bạn. Cảm ơn bạn đã lựa chọn Bloom Cake & Coffee.`,
      time: 'Vừa xong',
      type: 'order',
      isRead: false,
      orderId: newOrder.id
    };
    setNotifications((prev) => [newNotif, ...prev]);

    // Open Payment Result Modal
    setPaymentResult({
      isOpen: true,
      status: 'success',
      order: newOrder
    });
  };

  const handleOrderFailure = (reason: string) => {
    setIsCheckoutOpen(false);
    setPaymentResult({
      isOpen: true,
      status: 'failure',
      order: null,
      errorMessage: reason
    });
  };

  // Order status update (e.g. for live simulator)
  const handleUpdateOrderStatus = (orderId: string, nextStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updated = { ...ord, status: nextStatus };
          if (activeTrackingOrder?.id === orderId) {
            setActiveTrackingOrder(updated);
          }
          return updated;
        }
        return ord;
      })
    );
    showToast(`Đã cập nhật tiến độ đơn hàng.`);
  };

  const handleCancelOrder = (orderId: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status: 'cancelled' } : ord))
    );
    if (activeTrackingOrder?.id === orderId) {
      setActiveTrackingOrder((prev) => (prev ? { ...prev, status: 'cancelled' } : null));
    }
    showToast('Đã hủy đơn hàng thành công.');
  };

  // Service Review Submit
  const handleReviewSubmit = (review: ServiceReview) => {
    // Reward 20 points
    setProfile((prev) => ({
      ...prev,
      spendablePoints: prev.spendablePoints + 20
    }));

    // Mark order as reviewed
    setOrders((prev) =>
      prev.map((ord) => (ord.id === review.orderId ? { ...ord, isReviewed: true } : ord))
    );

    showToast('Cảm ơn bạn! Đã ghi nhận đánh giá và cộng +20 BloomPoints.');
  };

  // Address Handlers
  const handleAddAddress = (newAddr: Address) => {
    setAddresses((prev) => [newAddr, ...prev]);
    setSelectedAddress(newAddr);
    showToast('Đã lưu địa chỉ giao hàng mới.');
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    if (selectedAddress?.id === id) {
      setSelectedAddress(addresses.find((a) => a.id !== id) || null);
    }
    showToast('Đã xóa địa chỉ.');
  };

  // Notifications
  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast('Đã đánh dấu đọc tất cả thông báo.');
  };

  const handleSelectNotification = (notif: NotificationItem) => {
    if (notif.orderId) {
      const targetOrder = orders.find((o) => o.id === notif.orderId);
      if (targetOrder) {
        setActiveTrackingOrder(targetOrder);
      }
    } else {
      setIsVoucherModalOpen(true);
    }
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  // Decide whether bottom navigation should be visible:
  // "Ẩn thanh điều hướng ở các màn thanh toán và tác vụ cần tập trung."
  const isHideBottomNav =
    isCheckoutOpen ||
    paymentResult.isOpen ||
    activeTrackingOrder !== null ||
    activeReviewOrder !== null;

  return (
    <MobileFrame>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-12 left-4 right-4 z-60 max-w-[360px] mx-auto bg-stone-900/95 text-white text-xs font-semibold py-2.5 px-4 rounded-2xl shadow-xl flex items-center justify-between animate-fade-in backdrop-blur-md border border-white/10">
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-2 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {isCheckoutOpen ? (
        <CheckoutScreen
          onBack={() => setIsCheckoutOpen(false)}
          receiveMode={receiveMode}
          selectedAddress={selectedAddress}
          selectedStore={selectedStore}
          items={cart}
          selectedVoucher={selectedVoucher}
          onOpenVoucherModal={() => setIsVoucherModalOpen(true)}
          profile={profile}
          onOrderSuccess={handleOrderSuccess}
          onOrderFailure={handleOrderFailure}
        />
      ) : (
        <div className="flex-1 flex flex-col min-h-full">
          {/* Top Sticky Header */}
          <HeaderBar
            receiveMode={receiveMode}
            selectedAddress={selectedAddress}
            selectedStore={selectedStore}
            onOpenReceiveMode={() => setIsReceiveModeModalOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenSearch={() => {
              setActiveTab('order');
            }}
            unreadNotificationsCount={unreadNotificationsCount}
          />

          {/* Tab 1: Trang chủ */}
          {activeTab === 'home' && (
            <HomeView
              profile={profile}
              banners={banners}
              products={products}
              receiveMode={receiveMode}
              onChangeReceiveMode={setReceiveMode}
              onOpenReceiveModeSheet={() => setIsReceiveModeModalOpen(true)}
              onOpenProductDetail={(prod) => setActiveProductDetail(prod)}
              onQuickAdd={handleQuickAdd}
              onOpenBannerDetail={(b) => setActivePromoBanner(b)}
              onOpenLoyaltyTiers={() => setIsLoyaltyTierOpen(true)}
              onOpenOrderMenu={(catId) => {
                if (catId) setSelectedCategoryTab(catId as CategoryType);
                setActiveTab('order');
              }}
            />
          )}

          {/* Tab 2: Đặt hàng / Menu */}
          {activeTab === 'order' && (
            <OrderMenuView
              products={products}
              receiveMode={receiveMode}
              selectedAddress={selectedAddress}
              selectedStore={selectedStore}
              onOpenReceiveModeSheet={() => setIsReceiveModeModalOpen(true)}
              onOpenProductDetail={(prod) => setActiveProductDetail(prod)}
              onQuickAdd={handleQuickAdd}
              cartCount={cartCount}
              cartSubtotal={cartSubtotal}
              onOpenCart={() => setIsCartOpen(true)}
              onOpenSmartFilter={() => setIsSmartFilterOpen(true)}
              filters={filterState}
              onResetFilters={() =>
                setFilterState({
                  category: 'all',
                  priceRange: 'all',
                  selectedTag: null,
                  sortBy: 'popular'
                })
              }
              selectedCategoryTab={selectedCategoryTab}
              onSelectCategoryTab={setSelectedCategoryTab}
            />
          )}

          {/* Tab 3: Cửa hàng */}
          {activeTab === 'store' && (
            <StoresView
              stores={stores}
              selectedStore={selectedStore}
              onSelectStore={(st) => {
                setSelectedStore(st);
                setReceiveMode('pickup');
              }}
              onShowToast={showToast}
            />
          )}

          {/* Tab 4: Tài khoản */}
          {activeTab === 'account' && (
            <AccountView
              profile={profile}
              onOpenOrderHistory={() => setIsOrderHistoryOpen(true)}
              onOpenVouchers={() => setIsVoucherModalOpen(true)}
              onOpenLoyaltyTiers={() => setIsLoyaltyTierOpen(true)}
              onOpenAddressManager={() => setIsAddressManagerOpen(true)}
              onOpenBrandIntro={() => setIsBrandIntroOpen(true)}
              onOpenServiceReview={() => {
                const finishedOrder = orders.find((o) => o.status === 'completed');
                if (finishedOrder) {
                  setActiveReviewOrder(finishedOrder);
                } else {
                  showToast('Bạn chưa có đơn hàng nào hoàn tất để đánh giá.');
                }
              }}
              onShowToast={showToast}
            />
          )}

          {/* Bottom Tab Bar */}
          {!isHideBottomNav && (
            <BottomNavBar
              activeTab={activeTab}
              onChangeTab={(tab) => {
                if (tab === 'qr') {
                  // Direct trigger member QR modal
                  setIsLoyaltyTierOpen(false);
                }
                setActiveTab(tab);
              }}
              cartCount={cartCount}
            />
          )}
        </div>
      )}

      {/* MODALS & DRAWERS */}

      {/* Member QR & Scanner Modal */}
      <MemberQRModal
        isOpen={activeTab === 'qr'}
        onClose={() => setActiveTab('home')}
        profile={profile}
        onOpenLoyaltyTiers={() => {
          setActiveTab('home');
          setIsLoyaltyTierOpen(true);
        }}
        onScannedResult={(scannedContent) => {
          setActiveTab('order');
          showToast(`Đã nhận diện: ${scannedContent}`);
        }}
      />

      {/* Receive Mode Selector Sheet */}
      <ReceiveModeModal
        isOpen={isReceiveModeModalOpen}
        onClose={() => setIsReceiveModeModalOpen(false)}
        currentMode={receiveMode}
        onSelectMode={setReceiveMode}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
        onOpenAddressManager={() => {
          setIsReceiveModeModalOpen(false);
          setIsAddressManagerOpen(true);
        }}
        stores={stores}
        selectedStore={selectedStore}
        onSelectStore={setSelectedStore}
        onOpenStoreSelector={() => {
          setIsReceiveModeModalOpen(false);
          setIsStoreSelectorOpen(true);
        }}
      />

      {/* Address Manager Modal */}
      <AddressManagerModal
        isOpen={isAddressManagerOpen}
        onClose={() => setIsAddressManagerOpen(false)}
        addresses={addresses}
        selectedAddress={selectedAddress}
        onSelectAddress={setSelectedAddress}
        onAddAddress={handleAddAddress}
        onDeleteAddress={handleDeleteAddress}
      />

      {/* Store Selector Modal */}
      <StoreSelectorModal
        isOpen={isStoreSelectorOpen}
        onClose={() => setIsStoreSelectorOpen(false)}
        stores={stores}
        selectedStore={selectedStore}
        onSelectStore={(st) => {
          setSelectedStore(st);
          setReceiveMode('pickup');
        }}
        onShowToast={showToast}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProductDetail}
        isOpen={Boolean(activeProductDetail)}
        onClose={() => setActiveProductDetail(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onContinueShopping={() => setActiveTab('order')}
        onOpenVoucherModal={() => setIsVoucherModalOpen(true)}
        selectedVoucher={selectedVoucher}
        onRemoveVoucher={() => setSelectedVoucher(null)}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        receiveMode={receiveMode}
      />

      {/* Voucher Modal */}
      <VoucherModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        vouchers={vouchers}
        selectedVoucher={selectedVoucher}
        onApplyVoucher={(v) => {
          setSelectedVoucher(v);
          showToast(`Đã áp dụng mã ưu đãi: ${v.code}`);
        }}
        currentSubtotal={cartSubtotal}
      />

      {/* Payment Result Modal */}
      <PaymentResultModal
        isOpen={paymentResult.isOpen}
        status={paymentResult.status}
        order={paymentResult.order}
        errorMessage={paymentResult.errorMessage}
        onTrackOrder={(ord) => {
          setPaymentResult((prev) => ({ ...prev, isOpen: false }));
          setActiveTrackingOrder(ord);
        }}
        onGoHome={() => {
          setPaymentResult((prev) => ({ ...prev, isOpen: false }));
          setActiveTab('home');
        }}
        onRetryPayment={() => {
          setPaymentResult((prev) => ({ ...prev, isOpen: false }));
          setIsCheckoutOpen(true);
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        order={activeTrackingOrder}
        isOpen={Boolean(activeTrackingOrder)}
        onClose={() => setActiveTrackingOrder(null)}
        onCancelOrder={handleCancelOrder}
        onOpenReview={(ord) => setActiveReviewOrder(ord)}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onShowToast={showToast}
      />

      {/* Order History Modal */}
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
        orders={orders}
        onOpenTracking={(ord) => setActiveTrackingOrder(ord)}
        onReorder={handleReorder}
        onOpenReview={(ord) => setActiveReviewOrder(ord)}
      />

      {/* Loyalty Tier & Points Modal */}
      <LoyaltyTierModal
        isOpen={isLoyaltyTierOpen}
        onClose={() => setIsLoyaltyTierOpen(false)}
        profile={profile}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
        onSelectNotification={handleSelectNotification}
      />

      {/* Service Review Modal */}
      <ServiceReviewModal
        order={activeReviewOrder}
        isOpen={Boolean(activeReviewOrder)}
        onClose={() => setActiveReviewOrder(null)}
        onSubmitReview={handleReviewSubmit}
      />

      {/* Brand Story Modal */}
      <BrandIntroModal
        isOpen={isBrandIntroOpen}
        onClose={() => setIsBrandIntroOpen(false)}
      />

      {/* Promo Banner Detail Modal */}
      <PromoDetailModal
        banner={activePromoBanner}
        isOpen={Boolean(activePromoBanner)}
        onClose={() => setActivePromoBanner(null)}
        onUseCode={(code) => {
          const matchVoucher = vouchers.find((v) => v.code === code);
          if (matchVoucher) setSelectedVoucher(matchVoucher);
          setActiveTab('order');
          showToast(`Đã chọn mã "${code}". Hãy thêm món vào giỏ nhé!`);
        }}
      />

      {/* Smart Filter Modal */}
      <SmartFilterModal
        isOpen={isSmartFilterOpen}
        onClose={() => setIsSmartFilterOpen(false)}
        filters={filterState}
        onChangeFilters={setFilterState}
        onResetFilters={() =>
          setFilterState({
            category: 'all',
            priceRange: 'all',
            selectedTag: null,
            sortBy: 'popular'
          })
        }
      />
    </MobileFrame>
  );
}
