import React from 'react';
import { CheckCircle2, XCircle, ArrowRight, RefreshCcw, Home, Clock, Sparkles } from 'lucide-react';
import { Order } from '../types';
import { formatVND } from '../utils/formatters';

interface PaymentResultModalProps {
  isOpen: boolean;
  status: 'success' | 'failure';
  order: Order | null;
  errorMessage?: string;
  onTrackOrder: (order: Order) => void;
  onGoHome: () => void;
  onRetryPayment: () => void;
}

export const PaymentResultModal: React.FC<PaymentResultModalProps> = ({
  isOpen,
  status,
  order,
  errorMessage,
  onTrackOrder,
  onGoHome,
  onRetryPayment
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-2xl p-6 text-center space-y-4">
        {status === 'success' && order ? (
          <>
            {/* Success Icon */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md shadow-emerald-100">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Thanh toán thành công
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-display mt-2">
                Bloom đã nhận đơn!
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                Barista đang chuẩn bị đồ uống & bánh tươi thơm ngon cho bạn.
              </p>
            </div>

            {/* Order Card Recap */}
            <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-100 text-left space-y-2 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-stone-200/60">
                <span className="text-stone-500">Mã đơn hàng:</span>
                <span className="font-mono font-bold text-rose-600 text-sm">
                  #{order.orderNumber}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-500">Phương thức nhận:</span>
                <span className="font-semibold text-stone-800">
                  {order.mode === 'delivery' ? 'Giao tận nơi' : 'Đến lấy tại quán'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-stone-500">Hình thức thanh toán:</span>
                <span className="font-semibold text-stone-800">{order.paymentMethod}</span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-stone-200/60">
                <span className="font-bold text-stone-900">Tổng thanh toán:</span>
                <span className="font-bold text-rose-600 font-display text-sm">
                  {formatVND(order.total)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => onTrackOrder(order)}
                className="w-full py-3 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-md shadow-rose-200 flex items-center justify-center gap-1.5 transition-all"
              >
                <span>Theo dõi đơn hàng trực tiếp</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGoHome}
                className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Home className="w-3.5 h-3.5 text-stone-400" />
                <span>Về trang chủ</span>
              </button>
            </div>
          </>
        ) : (
          /* Failure State */
          <>
            <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-md shadow-rose-100">
              <XCircle className="w-10 h-10" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full">
                Thanh toán thất bại
              </span>
              <h3 className="text-lg font-bold text-stone-900 font-display mt-2">
                Chưa hoàn tất đơn hàng
              </h3>
              <p className="text-xs text-stone-600 mt-1">
                {errorMessage ||
                  'Giao dịch không thành công. Đơn hàng của bạn CHƯA được khởi tạo. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.'}
              </p>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-left text-[11px] text-amber-800">
              Lưu ý: Tài khoản của bạn không bị trừ tiền cho giao dịch này. Giỏ hàng của bạn vẫn được lưu giữ an toàn.
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={onRetryPayment}
                className="w-full py-3 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 flex items-center justify-center gap-2 transition-all"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                <span>Thử lại hoặc đổi phương thức thanh toán</span>
              </button>

              <button
                onClick={onGoHome}
                className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-700 text-xs font-semibold hover:bg-stone-50"
              >
                Quay về trang chủ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
