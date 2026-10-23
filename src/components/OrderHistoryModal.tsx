import React, { useState } from 'react';
import { ArrowLeft, Clock, ShoppingBag, RotateCcw, ChevronRight, CheckCircle2, XCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Order } from '../types';
import { formatVND } from '../utils/formatters';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onOpenTracking: (order: Order) => void;
  onReorder: (order: Order) => void;
  onOpenReview: (order: Order) => void;
}

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  orders,
  onOpenTracking,
  onReorder,
  onOpenReview
}) => {
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');
  const [reorderCandidate, setReorderCandidate] = useState<Order | null>(null);

  if (!isOpen) return null;

  const activeOrders = orders.filter(
    (o) => o.status !== 'completed' && o.status !== 'cancelled'
  );
  const pastOrders = orders.filter(
    (o) => o.status === 'completed' || o.status === 'cancelled'
  );

  const displayedOrders = activeTab === 'active' ? activeOrders : pastOrders;

  const handleConfirmReorder = () => {
    if (reorderCandidate) {
      onReorder(reorderCandidate);
      setReorderCandidate(null);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[400px] h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-4 py-3 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 text-stone-700 hover:text-stone-900 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h2 className="text-sm font-bold text-stone-900 font-display">
            Lịch sử đơn hàng của tôi
          </h2>
          <div className="w-8"></div>
        </header>

        {/* Tabs */}
        <div className="p-4 pb-2 shrink-0">
          <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-xl text-center">
            <button
              onClick={() => setActiveTab('active')}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'active'
                  ? 'bg-white text-rose-700 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Đang xử lý ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'completed'
                  ? 'bg-white text-stone-900 shadow-2xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Đã kết thúc ({pastOrders.length})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
          {displayedOrders.length === 0 ? (
            <div className="text-center py-16 text-stone-400 space-y-2">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-[1.2] text-stone-300" />
              <p className="text-xs font-medium">Chưa có đơn hàng nào trong mục này</p>
            </div>
          ) : (
            displayedOrders.map((ord) => {
              const isFinished = ord.status === 'completed';
              const isCancelled = ord.status === 'cancelled';

              return (
                <div
                  key={ord.id}
                  className="p-3.5 rounded-2xl border border-stone-200/80 bg-white hover:border-stone-300 transition-all shadow-2xs space-y-2.5"
                >
                  {/* Top Bar of card */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-stone-900">
                        #{ord.orderNumber}
                      </span>
                      <span className="text-[10px] text-stone-400">·</span>
                      <span className="text-[10px] text-stone-500">{ord.createdAt}</span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isFinished
                          ? 'bg-emerald-50 text-emerald-700'
                          : isCancelled
                          ? 'bg-stone-100 text-stone-500'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {isFinished
                        ? 'Hoàn tất'
                        : isCancelled
                        ? 'Đã hủy'
                        : ord.status === 'delivering'
                        ? 'Đang giao'
                        : ord.status === 'ready_for_pickup'
                        ? 'Sẵn sàng lấy'
                        : 'Đang pha chế'}
                    </span>
                  </div>

                  {/* Mode & Items summary */}
                  <div className="text-xs text-stone-600 space-y-1">
                    <p className="font-medium text-stone-800">
                      {ord.mode === 'delivery' ? 'Giao hàng tận nơi' : 'Đến lấy tại quán'} · {ord.items.reduce((s, i) => s + i.quantity, 0)} món
                    </p>
                    <p className="text-[11px] text-stone-500 line-clamp-1">
                      {ord.items.map((it) => `${it.quantity}x ${it.product.name}`).join(', ')}
                    </p>
                  </div>

                  {/* Price and Action Buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-[10px] text-stone-400">Tổng:</span>
                      <span className="font-display font-extrabold text-sm text-stone-900">
                        {formatVND(ord.total)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenTracking(ord);
                        }}
                        className="py-1.5 px-3 rounded-xl border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <span>Chi tiết</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setReorderCandidate(ord)}
                        className="py-1.5 px-3 rounded-xl bg-stone-900 text-white hover:bg-stone-800 text-xs font-bold flex items-center gap-1 shadow-2xs transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Đặt lại</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Re-order Confirmation Dialog */}
        {reorderCandidate && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
            <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 space-y-3.5 shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div className="text-center">
                <h4 className="text-sm font-bold text-stone-900 font-display">
                  Xác nhận đặt lại đơn hàng #{reorderCandidate.orderNumber}?
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Hệ thống sẽ thêm {reorderCandidate.items.length} món vào giỏ hàng với các tùy chọn tương tự.
                </p>
              </div>

              {/* Requirement: nhắc kiểm tra giá và tình trạng sản phẩm hiện tại */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Lưu ý:</strong> Vui lòng kiểm tra lại đơn giá và tình trạng còn hàng của các món theo thời điểm hiện tại tại cửa hàng.
                </span>
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => setReorderCandidate(null)}
                  className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-xs font-semibold hover:bg-stone-50"
                >
                  Hủy
                </button>
                <button
                  onClick={handleConfirmReorder}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-sm"
                >
                  Xác nhận đặt lại
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
