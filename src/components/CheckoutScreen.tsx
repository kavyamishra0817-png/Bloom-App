import React, { useState } from 'react';
import { ArrowLeft, MapPin, Store as StoreIcon, Clock, CreditCard, ShieldCheck, Check, ChevronRight, Phone, Lock, Sparkles, AlertCircle } from 'lucide-react';
import { Address, CartItem, MemberProfile, Order, ReceiveMode, Store, Voucher } from '../types';
import { calculateVoucherDiscount, formatVND } from '../utils/formatters';

interface CheckoutScreenProps {
  onBack: () => void;
  receiveMode: ReceiveMode;
  selectedAddress: Address | null;
  selectedStore: Store | null;
  items: CartItem[];
  selectedVoucher: Voucher | null;
  onOpenVoucherModal: () => void;
  profile: MemberProfile;
  onOrderSuccess: (order: Order) => void;
  onOrderFailure: (reason: string) => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  onBack,
  receiveMode,
  selectedAddress,
  selectedStore,
  items,
  selectedVoucher,
  onOpenVoucherModal,
  profile,
  onOrderSuccess,
  onOrderFailure
}) => {
  // Recipient info
  const [recipientName, setRecipientName] = useState(profile.name);
  const [recipientPhone, setRecipientPhone] = useState(profile.phone);
  const [pickupSlot, setPickupSlot] = useState('Lấy ngay sau 15 phút');
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'zalopay' | 'vietqr' | 'cod'>('momo');

  // Simulated OTP login modal if required
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // default true for Quỳnh Anh

  // Simulate payment processing state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Financial calculations
  const subtotal = items.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const shippingFee = receiveMode === 'delivery' ? 22000 : 0;
  const discount = calculateVoucherDiscount(selectedVoucher, subtotal, shippingFee);
  const total = Math.max(0, subtotal + shippingFee - discount);

  const handleCreateOrder = () => {
    if (!isLoggedIn) {
      setShowOtpModal(true);
      return;
    }

    if (receiveMode === 'delivery' && !selectedAddress) {
      alert('Vui lòng chọn địa chỉ giao hàng.');
      return;
    }

    if (receiveMode === 'pickup' && !selectedStore) {
      alert('Vui lòng chọn chi nhánh đến lấy.');
      return;
    }

    setIsSubmitting(true);

    // Simulate payment transaction
    setTimeout(() => {
      setIsSubmitting(false);

      // 95% success simulation; can trigger failed state if selected method is specific or for testing
      const orderNumber = `BLM-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: 'Vừa xong',
        mode: receiveMode,
        items,
        subtotal,
        shippingFee,
        discount,
        total,
        status: receiveMode === 'delivery' ? 'received' : 'received',
        paymentMethod:
          paymentMethod === 'momo'
            ? 'Ví MoMo'
            : paymentMethod === 'zalopay'
            ? 'Ví ZaloPay'
            : paymentMethod === 'vietqr'
            ? 'Chuyển khoản VietQR'
            : 'Tiền mặt khi nhận',
        isPaid: paymentMethod !== 'cod',
        address: receiveMode === 'delivery' ? selectedAddress || undefined : undefined,
        store: receiveMode === 'pickup' ? selectedStore || undefined : undefined,
        pickupTimeSlot: receiveMode === 'pickup' ? pickupSlot : undefined,
        pickupCode: receiveMode === 'pickup' ? `B-${Math.floor(10 + Math.random() * 90)}` : undefined,
        driverInfo:
          receiveMode === 'delivery'
            ? {
                name: 'Nguyễn Văn Tuấn',
                phone: '0938 123 456',
                plateNumber: '59-P1 832.19',
                vehicle: 'Honda Wave Xanh',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
              }
            : undefined,
        timeline: [
          { title: 'Đã nhận đơn', time: 'Vừa xong', done: true, current: true },
          { title: 'Đang chuẩn bị', time: 'Dự kiến 5-10 phút', done: false, current: false },
          {
            title: receiveMode === 'delivery' ? 'Tài xế đang giao' : 'Sẵn sàng đến lấy',
            time: 'Dự kiến 20-25 phút',
            done: false,
            current: false
          },
          { title: 'Hoàn tất đơn hàng', time: '', done: false, current: false }
        ],
        isReviewed: false
      };

      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="min-h-full bg-stone-50 flex flex-col justify-between select-none">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 hover:text-stone-900 flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h2 className="text-sm font-bold text-stone-900 font-display">
          Xác nhận đơn hàng
        </h2>
        <div className="w-8"></div>
      </header>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3.5 pb-24">
        {/* Destination Card */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-3.5 shadow-2xs">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-stone-100">
            {receiveMode === 'delivery' ? (
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                <StoreIcon className="w-4 h-4" />
              </div>
            )}
            <span className="text-xs font-bold text-stone-900 font-display">
              {receiveMode === 'delivery' ? 'Giao hàng tận nơi' : 'Đến lấy tại chi nhánh'}
            </span>
          </div>

          {receiveMode === 'delivery' ? (
            selectedAddress ? (
              <div className="text-xs text-stone-700 space-y-0.5">
                <p className="font-bold text-stone-900">
                  {selectedAddress.label} · {selectedAddress.recipientName} ({selectedAddress.phone})
                </p>
                <p className="text-stone-600">{selectedAddress.fullAddress}</p>
                <p className="text-[11px] text-stone-400">
                  {selectedAddress.detail} {selectedAddress.note ? `• ${selectedAddress.note}` : ''}
                </p>
                <div className="pt-2 flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Thời gian giao dự kiến: ~25 - 35 phút</span>
                </div>
              </div>
            ) : (
              <p className="text-xs text-rose-600 font-semibold">Chưa chọn địa chỉ giao hàng</p>
            )
          ) : (
            selectedStore && (
              <div className="text-xs text-stone-700 space-y-1">
                <p className="font-bold text-stone-900">{selectedStore.name}</p>
                <p className="text-stone-600">{selectedStore.address}</p>
                <div className="pt-1.5">
                  <label className="text-[11px] font-semibold text-stone-500 uppercase block mb-1">
                    Chọn khung giờ đến lấy:
                  </label>
                  <select
                    value={pickupSlot}
                    onChange={(e) => setPickupSlot(e.target.value)}
                    className="w-full bg-stone-100 text-stone-800 rounded-xl p-2 text-xs font-semibold focus:outline-none"
                  >
                    <option value="Lấy ngay sau 15 phút">Lấy ngay sau 15 phút</option>
                    <option value="Hôm nay, 11:30 - 11:45">Hôm nay, 11:30 - 11:45</option>
                    <option value="Hôm nay, 12:00 - 12:15">Hôm nay, 12:00 - 12:15</option>
                    <option value="Hôm nay, 15:30 - 15:45">Hôm nay, 15:30 - 15:45</option>
                    <option value="Hôm nay, 17:00 - 17:15">Hôm nay, 17:00 - 17:15</option>
                  </select>
                </div>
              </div>
            )
          )}
        </div>

        {/* Recipient Contact Card */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-3.5 space-y-2">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Thông tin liên hệ nhận hàng
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">Tên người nhận</label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full bg-stone-100 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-400 block mb-0.5">Số điện thoại</label>
              <input
                type="tel"
                value={recipientPhone}
                onChange={(e) => setRecipientPhone(e.target.value)}
                className="w-full bg-stone-100 rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-medium focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Order Items Overview */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <span className="text-xs font-bold text-stone-900 font-display">
              Tóm tắt món ({items.reduce((s, i) => s + i.quantity, 0)})
            </span>
            <button
              onClick={onBack}
              className="text-[11px] font-semibold text-rose-600 hover:text-rose-700"
            >
              Sửa món
            </button>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start text-xs gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-stone-800 truncate">
                    {item.quantity}x {item.product.name}
                  </p>
                  {item.selectedOptions.length > 0 && (
                    <p className="text-[10px] text-stone-400 truncate">
                      {item.selectedOptions.map((o) => o.optionName).join(', ')}
                    </p>
                  )}
                </div>
                <span className="font-bold text-stone-900 shrink-0 font-display">
                  {formatVND(item.totalPrice)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Voucher Row */}
        <div
          onClick={onOpenVoucherModal}
          className="bg-white rounded-2xl border border-rose-200 p-3 flex items-center justify-between cursor-pointer hover:bg-rose-50/30 transition-colors shadow-2xs"
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-rose-900">
                {selectedVoucher ? selectedVoucher.code : 'Chọn mã ưu đãi Bloom'}
              </p>
              <p className="text-[10px] text-rose-600">
                {selectedVoucher ? selectedVoucher.title : 'Tiết kiệm thêm với voucher'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-3.5 space-y-2.5">
          <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
            Phương thức thanh toán
          </span>

          <div className="space-y-2">
            {/* MoMo */}
            <label
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'momo'
                  ? 'border-pink-500 bg-pink-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  MoMo
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Ví MoMo</p>
                  <p className="text-[10px] text-stone-400">Thanh toán nhanh tự động qua ứng dụng</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'momo'}
                onChange={() => setPaymentMethod('momo')}
                className="text-pink-600 focus:ring-pink-500"
              />
            </label>

            {/* ZaloPay */}
            <label
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'zalopay'
                  ? 'border-blue-500 bg-blue-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  Zalo
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Ví ZaloPay</p>
                  <p className="text-[10px] text-stone-400">Liên kết thẻ ngân hàng & quét mã</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'zalopay'}
                onChange={() => setPaymentMethod('zalopay')}
                className="text-blue-600 focus:ring-blue-500"
              />
            </label>

            {/* VietQR */}
            <label
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'vietqr'
                  ? 'border-emerald-500 bg-emerald-50/50'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  QR
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Chuyển khoản VietQR</p>
                  <p className="text-[10px] text-stone-400">Quét mã QR từ mọi ứng dụng ngân hàng</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'vietqr'}
                onChange={() => setPaymentMethod('vietqr')}
                className="text-emerald-600 focus:ring-emerald-500"
              />
            </label>

            {/* Cash on Delivery / Pickup */}
            <label
              className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                paymentMethod === 'cod'
                  ? 'border-stone-800 bg-stone-100'
                  : 'border-stone-200 hover:bg-stone-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-stone-800 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                  Tiền
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">
                    {receiveMode === 'delivery' ? 'Tiền mặt khi nhận hàng (COD)' : 'Thanh toán tại quầy Bloom'}
                  </p>
                  <p className="text-[10px] text-stone-400">Trả tiền mặt trực tiếp</p>
                </div>
              </div>
              <input
                type="radio"
                name="payment"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="text-stone-900 focus:ring-stone-900"
              />
            </label>
          </div>
        </div>

        {/* Detailed Price Breakdown */}
        <div className="bg-white rounded-2xl border border-stone-200/80 p-3.5 space-y-2 text-xs">
          <div className="flex justify-between text-stone-600">
            <span>Tiền hàng ({items.reduce((s, i) => s + i.quantity, 0)} món)</span>
            <span className="font-semibold text-stone-900 font-display">{formatVND(subtotal)}</span>
          </div>

          {receiveMode === 'delivery' && (
            <div className="flex justify-between text-stone-600">
              <span>Phí vận chuyển giao tận nơi</span>
              <span className="font-semibold text-stone-900 font-display">{formatVND(shippingFee)}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="flex justify-between text-rose-600 font-semibold">
              <span>Ưu đãi áp dụng ({selectedVoucher?.code})</span>
              <span className="font-display">-{formatVND(discount)}</span>
            </div>
          )}

          <div className="pt-2 border-t border-stone-100 flex justify-between items-baseline">
            <div>
              <span className="font-bold text-stone-900 text-sm font-display">Tổng thanh toán</span>
              <p className="text-[10px] text-emerald-700">Tích lũy +{Math.round(total * 0.08 / 1000)} BloomPoints</p>
            </div>
            <span className="text-base font-extrabold text-rose-600 font-display">
              {formatVND(total)}
            </span>
          </div>
        </div>

        {/* Test failure simulation trigger for thorough testing */}
        <div className="text-center pt-1">
          <button
            onClick={() => onOrderFailure('Số dư tài khoản thanh toán không đủ để thực hiện giao dịch.')}
            className="text-[10px] text-stone-400 hover:text-stone-600 underline"
          >
            Mô phỏng trường hợp thanh toán thất bại
          </button>
        </div>
      </div>

      {/* Sticky Bottom Order Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-[400px] mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-stone-200/80 z-30">
        <button
          onClick={handleCreateOrder}
          disabled={isSubmitting}
          className="w-full py-3.5 px-5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center justify-between shadow-lg shadow-rose-200 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          <div className="flex flex-col text-left">
            <span className="text-[10px] text-rose-100">Tổng cộng</span>
            <span className="text-sm font-extrabold text-white font-display">
              {formatVND(total)}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-display text-sm font-bold">
            {isSubmitting ? (
              <span>Đang xử lý đơn...</span>
            ) : (
              <>
                <span>Đặt hàng ngay</span>
                <Check className="w-4 h-4 stroke-[3]" />
              </>
            )}
          </div>
        </button>
      </div>

      {/* OTP Phone Authentication Drawer */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-[400px] bg-white rounded-t-3xl p-5 z-10 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-bold text-stone-900 font-display">
                  Xác thực OTP số điện thoại
                </h3>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center"
              >
                X
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Bloom đã gửi mã OTP 4 số tới số điện thoại <strong>{recipientPhone}</strong> để liên kết điểm tích lũy và bảo mật đơn hàng.
            </p>

            <div className="flex justify-center gap-3 py-2">
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-bold bg-stone-100 rounded-xl border border-stone-200 focus:bg-white focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                  value={otpCode[idx] || ''}
                  onChange={(e) => {
                    const char = e.target.value;
                    const newOtp = otpCode.split('');
                    newOtp[idx] = char;
                    setOtpCode(newOtp.join(''));
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => {
                setIsVerifying(true);
                setTimeout(() => {
                  setIsVerifying(false);
                  setIsLoggedIn(true);
                  setShowOtpModal(false);
                  handleCreateOrder();
                }, 600);
              }}
              className="w-full py-3 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800"
            >
              {isVerifying ? 'Đang xác thực...' : 'Xác nhận OTP & Tiếp tục'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
