import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Store as StoreIcon, Phone, MessageSquare, AlertTriangle, CheckCircle2, Bike, ChevronRight, Star, RefreshCw } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { formatVND } from '../utils/formatters';

interface OrderTrackingModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelOrder: (orderId: string) => void;
  onOpenReview: (order: Order) => void;
  onUpdateOrderStatus: (orderId: string, nextStatus: OrderStatus) => void;
  onShowToast: (message: string) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  order,
  isOpen,
  onClose,
  onCancelOrder,
  onOpenReview,
  onUpdateOrderStatus,
  onShowToast
}) => {
  const [showSupportModal, setShowSupportModal] = useState(false);

  if (!isOpen || !order) return null;

  const isDelivery = order.mode === 'delivery';

  // Stages definition
  const stages = isDelivery
    ? [
        { key: 'received', label: 'Đã nhận đơn', desc: 'Hệ thống Bloom đã ghi nhận' },
        { key: 'preparing', label: 'Đang chuẩn bị', desc: 'Barista đang pha chế & nướng bánh' },
        { key: 'delivering', label: 'Đang giao hàng', desc: 'Tài xế đang trên đường tới bạn' },
        { key: 'completed', label: 'Hoàn tất', desc: 'Đã giao thành công' }
      ]
    : [
        { key: 'received', label: 'Đã nhận đơn', desc: 'Cửa hàng đã ghi nhận đơn' },
        { key: 'preparing', label: 'Đang chuẩn bị', desc: 'Đang làm đồ uống & đóng hộp' },
        { key: 'ready_for_pickup', label: 'Sẵn sàng đến lấy', desc: 'Mời bạn tới quầy nhận món' },
        { key: 'completed', label: 'Hoàn tất', desc: 'Đã nhận đồ uống' }
      ];

  const currentStageIndex =
    order.status === 'cancelled'
      ? -1
      : stages.findIndex((s) => s.key === order.status);

  // Can cancel only if 'received'
  const canCancel = order.status === 'received';

  const handleSimulateNextStep = () => {
    if (order.status === 'cancelled' || order.status === 'completed') return;

    if (isDelivery) {
      if (order.status === 'received') onUpdateOrderStatus(order.id, 'preparing');
      else if (order.status === 'preparing') onUpdateOrderStatus(order.id, 'delivering');
      else if (order.status === 'delivering') onUpdateOrderStatus(order.id, 'completed');
    } else {
      if (order.status === 'received') onUpdateOrderStatus(order.id, 'preparing');
      else if (order.status === 'preparing') onUpdateOrderStatus(order.id, 'ready_for_pickup');
      else if (order.status === 'ready_for_pickup') onUpdateOrderStatus(order.id, 'completed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[400px] h-[92vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 hover:text-stone-900 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="text-center">
            <h2 className="text-xs font-bold text-stone-900 font-display">
              Chi tiết theo dõi đơn hàng
            </h2>
            <p className="text-[10px] text-stone-500 font-mono">#{order.orderNumber}</p>
          </div>
          <button
            onClick={() => setShowSupportModal(true)}
            className="text-xs font-semibold text-rose-600 hover:text-rose-700"
          >
            Hỗ trợ
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4">
          {/* Status Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-emerald-600 text-white shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-100">
                  {order.mode === 'delivery' ? 'Giao tận nơi' : 'Đến lấy tại quán'}
                </span>
                <h3 className="text-base font-bold font-display mt-0.5">
                  {order.status === 'cancelled'
                    ? 'Đơn hàng đã hủy'
                    : order.status === 'completed'
                    ? 'Đơn hàng hoàn tất!'
                    : order.status === 'delivering'
                    ? 'Tài xế đang giao tới bạn'
                    : order.status === 'ready_for_pickup'
                    ? 'Món đã sẵn sàng tại quầy!'
                    : order.status === 'preparing'
                    ? 'Bloom đang chuẩn bị món'
                    : 'Đã nhận đơn hàng'}
                </h3>
              </div>

              {/* Status Simulator button for reviewer testing */}
              {order.status !== 'completed' && order.status !== 'cancelled' && (
                <button
                  onClick={handleSimulateNextStep}
                  title="Chuyển bước mô phỏng"
                  className="px-2.5 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-[10px] font-bold text-white backdrop-blur-xs flex items-center gap-1 transition-all"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Tiến độ +1</span>
                </button>
              )}
            </div>

            <p className="text-xs text-rose-100 mt-1">
              Thời gian dự kiến: {order.status === 'completed' ? 'Đã hoàn tất' : '~15 - 20 phút nữa'}
            </p>
          </div>

          {/* Pickup Code Card (if Pickup) */}
          {!isDelivery && order.pickupCode && (
            <div className="p-4 rounded-2xl bg-stone-900 text-white text-center space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400">
                Mã lấy hàng của bạn
              </span>
              <div className="text-3xl font-extrabold tracking-widest text-rose-400 font-mono py-1">
                {order.pickupCode}
              </div>
              <p className="text-[11px] text-stone-300">
                Đưa mã này cho nhân viên tại quầy Bloom: <strong>{order.store?.name}</strong>
              </p>
            </div>
          )}

          {/* Driver Card (if Delivery & in transit) */}
          {isDelivery && order.driverInfo && (
            <div className="p-3.5 rounded-2xl border border-stone-200 bg-white flex items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-stone-100 shrink-0">
                  <img
                    src={order.driverInfo.avatar}
                    alt={order.driverInfo.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase">
                    Tài xế giao hàng
                  </span>
                  <p className="text-xs font-bold text-stone-900 font-display">
                    {order.driverInfo.name}
                  </p>
                  <p className="text-[11px] text-stone-500 font-mono">
                    {order.driverInfo.vehicle} · {order.driverInfo.plateNumber}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onShowToast(`Đang kết nối cuộc gọi đến tài xế ${order.driverInfo?.name}: ${order.driverInfo?.phone}`)}
                className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 flex items-center justify-center shrink-0 transition-colors"
                title="Gọi tài xế"
              >
                <Phone className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Real-time Stepper Timeline */}
          <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-3">
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              Tiến trình đơn hàng
            </span>

            <div className="space-y-4 relative pl-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {stages.map((stg, idx) => {
                const isPassed = currentStageIndex >= idx;
                const isCurrent = currentStageIndex === idx;

                return (
                  <div key={stg.key} className="relative flex items-start gap-3">
                    <div
                      className={`absolute -left-5 top-0.5 w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                        isCurrent
                          ? 'bg-rose-600 ring-4 ring-rose-100 text-white'
                          : isPassed
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-transparent'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                    </div>

                    <div>
                      <p
                        className={`text-xs font-bold ${
                          isCurrent
                            ? 'text-rose-700'
                            : isPassed
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {stg.label}
                      </p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{stg.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Destination Details */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 space-y-1">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
              {isDelivery ? 'Địa chỉ giao hàng' : 'Chi nhánh đến lấy'}
            </span>
            {isDelivery && order.address ? (
              <>
                <p className="font-bold text-stone-900">{order.address.label} - {order.address.recipientName}</p>
                <p className="text-stone-600">{order.address.fullAddress}</p>
                <p className="text-stone-500 text-[11px]">{order.address.detail}</p>
              </>
            ) : order.store ? (
              <>
                <p className="font-bold text-stone-900">{order.store.name}</p>
                <p className="text-stone-600">{order.store.address}</p>
                <p className="text-stone-500 text-[11px]">Khung giờ: {order.pickupTimeSlot}</p>
              </>
            ) : null}
          </div>

          {/* Products Summary */}
          <div className="p-3.5 rounded-2xl bg-white border border-stone-200/80 space-y-2 text-xs">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">
              Chi tiết món đã đặt
            </span>
            {order.items.map((it) => (
              <div key={it.id} className="flex justify-between py-1 border-b border-stone-100 last:border-none">
                <div>
                  <p className="font-semibold text-stone-900">{it.quantity}x {it.product.name}</p>
                  {it.selectedOptions.length > 0 && (
                    <p className="text-[10px] text-stone-400">{it.selectedOptions.map(o => o.optionName).join(', ')}</p>
                  )}
                </div>
                <span className="font-bold text-stone-900 font-display">{formatVND(it.totalPrice)}</span>
              </div>
            ))}

            <div className="pt-2 flex justify-between font-bold text-stone-900">
              <span>Tổng thanh toán ({order.paymentMethod})</span>
              <span className="text-rose-600 font-display">{formatVND(order.total)}</span>
            </div>
          </div>

          {/* Review Service Trigger if Completed */}
          {order.status === 'completed' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-2">
              <div className="flex items-center justify-center gap-1 text-amber-500">
                <Star className="w-5 h-5 fill-amber-400" />
                <Star className="w-5 h-5 fill-amber-400" />
                <Star className="w-5 h-5 fill-amber-400" />
                <Star className="w-5 h-5 fill-amber-400" />
                <Star className="w-5 h-5 fill-amber-400" />
              </div>
              <p className="text-xs font-bold text-rose-900">
                {order.isReviewed ? 'Cảm ơn bạn đã gửi đánh giá!' : 'Bạn thấy dịch vụ Bloom thế nào?'}
              </p>
              <p className="text-[11px] text-rose-700">
                {order.isReviewed
                  ? 'Ý kiến của bạn giúp Bloom ngày càng hoàn thiện hơn.'
                  : 'Đánh giá ngay để nhận +20 BloomPoints tích lũy!'}
              </p>
              {!order.isReviewed && (
                <button
                  onClick={() => onOpenReview(order)}
                  className="py-2.5 px-4 rounded-xl bg-rose-600 text-white text-xs font-bold shadow-sm hover:bg-rose-700"
                >
                  Đánh giá dịch vụ & Món ăn
                </button>
              )}
            </div>
          )}

          {/* Cancel Order Button (Only when received) */}
          {canCancel && (
            <div className="pt-1 text-center">
              <button
                onClick={() => {
                  if (confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
                    onCancelOrder(order.id);
                  }
                }}
                className="text-xs text-stone-400 hover:text-rose-600 font-medium"
              >
                Hủy đơn hàng này
              </button>
            </div>
          )}
        </div>

        {/* Customer Support Modal */}
        {showSupportModal && (
          <div className="fixed inset-0 z-60 flex items-end justify-center bg-black/50 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-[400px] bg-white rounded-t-3xl p-5 space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <h4 className="text-sm font-bold text-stone-900 font-display">Trung tâm hỗ trợ Bloom</h4>
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="w-7 h-7 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center"
                >
                  X
                </button>
              </div>

              <div className="space-y-2 text-xs">
                <a
                  href="tel:19008899"
                  onClick={() => onShowToast('Đang gọi Tổng đài CSKH Bloom: 1900 8899 (8:00 - 22:00)')}
                  className="p-3 rounded-xl border border-stone-200 flex items-center gap-3 hover:bg-stone-50 text-stone-800 font-medium block"
                >
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-bold">Hotline Chăm sóc khách hàng</p>
                    <p className="text-stone-500 text-[11px]">1900 8899 (Miễn phí cước gọi)</p>
                  </div>
                </a>

                <button
                  onClick={() => {
                    setShowSupportModal(false);
                    onShowToast('Đã mở kênh chat trực tiếp với nhân viên Bloom.');
                  }}
                  className="w-full p-3 rounded-xl border border-stone-200 flex items-center gap-3 hover:bg-stone-50 text-stone-800 font-medium text-left"
                >
                  <MessageSquare className="w-4 h-4 text-rose-600 shrink-0" />
                  <div>
                    <p className="font-bold">Trò chuyện trực tuyến (Live Chat)</p>
                    <p className="text-stone-500 text-[11px]">Nhân viên sẵn sàng hỗ trợ bạn</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
